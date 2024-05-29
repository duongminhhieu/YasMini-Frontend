import {
    Avatar,
    Button,
    Card,
    Form,
    Input,
    List,
    Modal,
    Rate,
    Spin,
    message,
} from 'antd';
import {
    useCreateRatingMutation,
    useGetRatingsQuery,
} from '../../../../../lib/redux/rating/ratingApiSlice';
import { useEffect, useState } from 'react';
import { Rating, RatingParams } from '../../../../../types/Rating';
import { convertDate } from '../../../../../utils/convert';
import APIResponse from '../../../../../types/APIResponse';
import { InternalErrorCode } from '../../../../../utils/InternalErrorCode';
import { useAppSelector } from '../../../../../hooks/useRedux';
import { selectCurrentUser } from '../../../../../lib/redux/auth/authSlice';

function ProductRatingComponent({
    productId,
    averageRating,
    refetchProduct,
}: {
    productId: string;
    averageRating: number;
    refetchProduct: () => void;
}) {
    const userAuth = useAppSelector(selectCurrentUser);

    // state
    const [ratingParams, setRatingParams] = useState<RatingParams>({
        productId: productId,
        page: 1,
        itemsPerPage: 10,
    });

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    // query
    const [createRating, statusCreateRating] = useCreateRatingMutation();
    const {
        data: listRatingResponse,
        isLoading: isRatingLoading,
        refetch,
    } = useGetRatingsQuery(ratingParams);

    // useEffect
    useEffect(() => {
        if (statusCreateRating.isSuccess) {
            message.success('Create rating success');

            // refetch rating and product
            refetch();
            refetchProduct();
        }
        if (statusCreateRating.isError) {
            const error = statusCreateRating.error as { data: APIResponse };

            if (error.data.internalCode === InternalErrorCode.UNAUTHORIZED) {
                message.error('You must login to write a review');
            } else {
                message.error(error.data.message);
            }
        }
    }, [statusCreateRating]);

    // handle functions
    const showModal = () => {
        if (
            !userAuth.id &&
            !userAuth.roles?.some((role) => role.name === 'USER')
        ) {
            message.error('You must login to write a review');
        } else {
            setIsModalVisible(true);
        }
    };

    const handleOk = () => {
        form.validateFields()
            .then(async (values) => {
                await createRating({
                    star: values.rating,
                    comment: values.comment,
                    productId: productId,
                });

                form.resetFields();
                setIsModalVisible(false);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Card
            title={
                <div className="flex justify-start items-center text-xl font-medium">
                    Product Ratings
                </div>
            }
        >
            {/* List of ratings */}
            {isRatingLoading && <Spin />}
            <Card className="flex">
                <div className="flex flex-col gap-4 mb-4">
                    <div className="text-3xl font-light">
                        <span className="text-6xl font-semibold">
                            {averageRating.toFixed(1)}
                        </span>{' '}
                        out of 5
                    </div>

                    <div className="text-3xl flex gap-4 items-center mt-2">
                        <Rate disabled allowHalf value={averageRating} />
                        <div className="text-sm font-extralight">
                            ({listRatingResponse?.result.total} ratings)
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <span className="text-base text-gray-500">
                        What do you think about this car?
                    </span>
                    <Button onClick={showModal} type="primary">
                        Write a review
                    </Button>
                </div>
            </Card>

            <List
                pagination={{
                    position: 'bottom',
                    align: 'center',
                    pageSize: ratingParams.itemsPerPage,
                    total: listRatingResponse?.result.total,
                    current: ratingParams.page,
                    onChange: (page) => {
                        setRatingParams({
                            ...ratingParams,
                            page: page,
                        });
                    },
                }}
                dataSource={listRatingResponse?.result.data || []}
                renderItem={(item: Rating) => (
                    <List.Item>
                        <div className="flex gap-4">
                            <div>
                                <Avatar>{item.user.firstName[0]}</Avatar>
                            </div>
                            <div className="flex flex-col">
                                <div className="font-semibold">
                                    {item.user.firstName} {item.user.lastName}
                                </div>

                                <div className="m-0">
                                    <Rate
                                        disabled
                                        allowHalf
                                        className="text-xs"
                                        defaultValue={item.star}
                                    />
                                </div>

                                <span className="text-xs">
                                    {convertDate(item.createdDate)}
                                </span>

                                <div className="mt-2">
                                    <p>{item.comment}</p>
                                </div>
                            </div>
                        </div>
                    </List.Item>
                )}
                locale={{ emptyText: 'No ratings' }}
            />
            <Modal
                title="Write a review"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical" name="review_form">
                    <Form.Item
                        name="rating"
                        label="Rating"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your rating!',
                            },
                        ]}
                    >
                        <Rate />
                    </Form.Item>
                    <Form.Item
                        name="comment"
                        label="Comment"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your comment!',
                            },
                            {
                                max: 1000,
                                message:
                                    'Comment must be less than 1000 characters',
                            },
                            {
                                min: 10,
                                message:
                                    'Comment must be more than 10 characters',
                            },
                        ]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
}

export default ProductRatingComponent;
