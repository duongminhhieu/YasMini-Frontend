import { HomeOutlined, InboxOutlined } from '@ant-design/icons';
import { Breadcrumb, Card, Form, Radio, Spin, Tag } from 'antd';
import { convertDate, convertToDollar } from '../../../../../utils/convert';
import { useGetOrderByIdAdminQuery } from '../../../../../lib/redux/order/orderApiSlice';
import ListProductOrderComponent from '../../../../user/Order/components/ListProductsOrder';
import { useNavigate } from 'react-router-dom';

function OrderDetail({ id }: { id: string }) {
    // state
    const navigage = useNavigate();

    // query

    const { data: orderDetailData, isLoading: isDataLoading } =
        useGetOrderByIdAdminQuery(id);

    // effect

    // handlers
    function renderStatus(status: any): import('react').ReactNode {
        if (status === 'PENDING') {
            return <Tag color="orange">{status}</Tag>;
        } else if (status === 'DELIVERING') {
            return <Tag color="blue">{status}</Tag>;
        } else if (status === 'COMPLETED') {
            return <Tag color="green">{status}</Tag>;
        } else if (status === 'CANCELED') {
            return <Tag color="red">{status}</Tag>;
        }
    }

    if (isDataLoading)
        return <Spin className="flex justify-center items-center" />;

    return (
        <>
            <Card size="default" bordered={true} className="h-full">
                <div className="flex justify-between mb-8">
                    <Breadcrumb
                        items={[
                            {
                                href: '/admin',
                                title: <HomeOutlined />,
                            },
                            {
                                title: (
                                    <>
                                        <InboxOutlined />
                                        <span>My Orders</span>
                                    </>
                                ),
                                className: 'hover:text-blue-500 cursor-pointer',
                                onClick: () => {
                                    navigage('/admin/orders');
                                },
                            },
                            {
                                title: 'Order Details',
                            },
                        ]}
                    />
                </div>
                <Form
                    name="nest-messages"
                    className="justify-center items-center w-full"
                >
                    <Card title="Order Details" className="gap-4">
                        <Card
                            title="User Information"
                            className="mb-4 border-gray-200 shadow-sm"
                        >
                            <div>
                                <div className="flex gap-4">
                                    <p className="font-semibold">ID:</p>
                                    <p className="font-normal">
                                        {orderDetailData?.result?.user.id}
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <p className="font-semibold">Name:</p>
                                    <p className="font-normal">
                                        {
                                            orderDetailData?.result?.user
                                                .firstName
                                        }{' '}
                                        {orderDetailData?.result?.user.lastName}
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <p className="font-semibold">Email:</p>
                                    <p className="font-normal">
                                        {orderDetailData?.result?.user.email}
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card
                            title="Order Information"
                            className="mb-4 border-gray-200 shadow-sm"
                        >
                            <div className="flex flex-col gap-3">
                                <div className="flex gap-4">
                                    <p className="font-semibold">ID:</p>
                                    <p className="font-normal">
                                        {orderDetailData?.result?.id}
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <p className="font-semibold">
                                        Total Price:
                                    </p>
                                    <p className="font-normal">
                                        {convertToDollar(
                                            orderDetailData?.result?.totalPrice,
                                        )}
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <p className="font-semibold">Amount:</p>
                                    <p className="font-normal">
                                        {orderDetailData?.result?.totalQuantity}
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <p className="font-semibold">Status</p>
                                    <p className="font-normal">
                                        {renderStatus(
                                            orderDetailData?.result?.status,
                                        )}
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <p className="font-semibold">
                                        Created Date:
                                    </p>
                                    <p className="font-normal">
                                        {convertDate(
                                            orderDetailData?.result
                                                ?.createdDate,
                                        )}
                                    </p>
                                </div>

                                <div className="flex gap-4">
                                    <p className="font-semibold">
                                        Updated Date:
                                    </p>
                                    <p className="font-normal">
                                        {convertDate(
                                            orderDetailData?.result
                                                ?.lastModifiedDate,
                                        )}
                                    </p>
                                </div>
                            </div>
                        </Card>
                        <Card
                            title="Delivery Information"
                            className="mb-4 border-gray-200 shadow-sm"
                        >
                            <div className="flex flex-col gap-3">
                                <div className="flex gap-4">
                                    <p className="font-semibold">
                                        Contact Name:
                                    </p>
                                    <p className="font-normal">
                                        {
                                            orderDetailData?.result
                                                ?.orderAddress.contactName
                                        }
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <p className="font-semibold">Phone:</p>
                                    <p className="font-normal">
                                        {
                                            orderDetailData?.result
                                                ?.orderAddress.phone
                                        }
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <p className="font-semibold">
                                        AddressLine 1:
                                    </p>
                                    <p className="font-normal">
                                        {
                                            orderDetailData?.result
                                                ?.orderAddress.addressLine1
                                        }
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <p className="font-semibold">
                                        AddressLine 2:
                                    </p>
                                    <p className="font-normal">
                                        {
                                            orderDetailData?.result
                                                ?.orderAddress.addressLine2
                                        }
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* form Products Ordered */}
                        <Card title="Products Ordered" className="mt-8">
                            <ListProductOrderComponent
                                carts={orderDetailData?.result?.orderItems}
                            />
                        </Card>
                        <Card title="Order Summary" className="mt-8">
                            <div className="flex justify-between gap-4 mt-4">
                                <div className="flex flex-col">
                                    <h2 className="text-xl mb-4">
                                        Payment Method
                                    </h2>
                                    <Radio checked className="ml-4">
                                        {' '}
                                        Ship COD{' '}
                                    </Radio>
                                </div>

                                <Card className="flex flex-col gap-4">
                                    <div className="flex items-center font-normal w-full text-base justify-between">
                                        <span>
                                            Total (
                                            {
                                                orderDetailData?.result
                                                    ?.totalQuantity
                                            }{' '}
                                            cars):
                                        </span>

                                        <span className="text-orange-400 font-semibold text-2xl ml-12">
                                            {convertToDollar(
                                                orderDetailData?.result
                                                    ?.totalPrice,
                                            )}
                                        </span>
                                    </div>
                                </Card>
                            </div>
                        </Card>
                    </Card>
                </Form>
            </Card>
        </>
    );
}

export default OrderDetail;
