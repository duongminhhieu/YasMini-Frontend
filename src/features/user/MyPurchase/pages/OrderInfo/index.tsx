import { Breadcrumb, Card, Spin, Tag } from 'antd';
import { useGetOrderByIdQuery } from '../../../../../lib/redux/order/orderApiSlice';
import { convertDate, convertToDollar } from '../../../../../utils/convert';
import ListProductOrderComponent from '../../../Order/components/ListProductsOrder';
import { ContainerOutlined, HomeOutlined } from '@ant-design/icons';

function OrderInfo({ orderId }: { orderId: string }) {
    // state

    // query
    const { data: orderDetailData, isLoading: isOrderDetailLoading } =
        useGetOrderByIdQuery(orderId);

    // useEffect

    // handlers
    function renderStatus(status: any): import('react').ReactNode {
        if (status === 'PENDING') {
            return <Tag color="orange">{status}</Tag>;
        } else if (status === 'DELIVERING') {
            return <Tag color="blue">{status}</Tag>;
        } else if (status === 'DELIVERED') {
            return <Tag color="green">{status}</Tag>;
        } else if (status === 'CANCELED') {
            return <Tag color="red">{status}</Tag>;
        }
    }

    if (isOrderDetailLoading)
        return <Spin className="flex justify-center items-center" />;

    return (
        <>
            <div className="m-4">
                <Breadcrumb
                    items={[
                        {
                            href: '/',
                            title: <HomeOutlined />,
                        },
                        {
                            href: '/purchase',
                            title: (
                                <>
                                    <ContainerOutlined />
                                    <span>My Purchase</span>
                                </>
                            ),
                        },
                        {
                            title: 'Order Details',
                        },
                    ]}
                />
            </div>

            <Card title="Order Details" className="gap-4">
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
                            <p className="font-semibold">Total Price:</p>
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
                                {renderStatus(orderDetailData?.result?.status)}
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <p className="font-semibold">Date:</p>
                            <p className="font-normal">
                                {convertDate(
                                    orderDetailData?.result?.createdDate,
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
                            <p className="font-semibold">Contact Name:</p>
                            <p className="font-normal">
                                {
                                    orderDetailData?.result?.orderAddress
                                        .contactName
                                }
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <p className="font-semibold">Phone:</p>
                            <p className="font-normal">
                                {orderDetailData?.result?.orderAddress.phone}
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <p className="font-semibold">AddressLine 1:</p>
                            <p className="font-normal">
                                {
                                    orderDetailData?.result?.orderAddress
                                        .addressLine1
                                }
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <p className="font-semibold">AddressLine 2:</p>
                            <p className="font-normal">
                                {
                                    orderDetailData?.result?.orderAddress
                                        .addressLine2
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
            </Card>
        </>
    );
}

export default OrderInfo;
