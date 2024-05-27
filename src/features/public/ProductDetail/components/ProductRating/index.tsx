import { Avatar, Card, List, Rate, Spin } from 'antd';
import { useGetRatingsQuery } from '../../../../../lib/redux/rating/ratingApiSlice';
import { useState } from 'react';
import { Rating, RatingParams } from '../../../../../types/Rating';
import { convertDate } from '../../../../../utils/convert';

function ProductRatingComponent({ productId }: { productId: string }) {
    // state
    const [ratingParams, setRatingParams] = useState<RatingParams>({
        productId: productId,
        page: 1,
        itemsPerPage: 10,
    });

    // query
    const { data: ListRatingResponse, isLoading: isRatingLoading } =
        useGetRatingsQuery(ratingParams);

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
            <List
                pagination={{
                    position: 'bottom',
                    align: 'center',
                    pageSize: ratingParams.itemsPerPage,
                    total: ListRatingResponse?.result.total,
                    current: ratingParams.page,
                    onChange: (page) => {
                        setRatingParams({
                            ...ratingParams,
                            page: page,
                        });
                    },
                }}
                dataSource={ListRatingResponse?.result.data || []}
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
        </Card>
    );
}

export default ProductRatingComponent;
