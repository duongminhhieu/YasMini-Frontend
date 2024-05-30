import { Alert, Button, Card, Form, Input, Radio, Spin, message } from 'antd';
import Marquee from 'react-fast-marquee';
import { useGetCartsByIdsQuery } from '../../../../../lib/redux/cart/cartApiSlice';
import { useEffect } from 'react';
import APIResponse from '../../../../../types/APIResponse';
import { convertToDollar } from '../../../../../utils/convert';
import { Cart } from '../../../../../types/Cart';
import { usePlaceOrderMutation } from '../../../../../lib/redux/order/orderApiSlice';
import { OrderCreateBody } from '../../../../../types/Order';
import ListProductOrderComponent from '../../components/ListProductsOrder';
import OrderSuccess from '../OrderSuccess';
import { useAppDispatch } from '../../../../../hooks/useRedux';
import { deleteACart } from '../../../../../lib/redux/cart/cartSlice';

function Checkout({ cartIds }: { cartIds: string[] }) {
    // state
    const dispatch = useAppDispatch();

    // query
    const {
        data: cartOrderData,
        isLoading: isCartLoading,
        isError: isCartError,
        error: cartError,
    } = useGetCartsByIdsQuery(cartIds);

    const [placeOrder, statusPlaceOrder] = usePlaceOrderMutation();

    // useEffect
    useEffect(() => {
        if (cartError) {
            const error = cartError as { data: APIResponse };
            message.error(error.data.message);
        }
    }, [isCartError]);

    useEffect(() => {
        if (statusPlaceOrder.isSuccess) {
            message.success('Place order success');
            dispatch(deleteACart(cartIds));
        }

        if (statusPlaceOrder.isError) {
            const error = statusPlaceOrder.error as { data: APIResponse };
            message.error(error.data.message);
        }
    }, [statusPlaceOrder]);

    // handlers
    const onFinish = async (values: any) => {
        const orderBody: OrderCreateBody = {
            orderAddress: {
                contactName: values.contactName,
                phone: values.phone,
                addressLine1: values.addressLine1,
                addressLine2: values.addressLine2,
            },
            cartItemIds: cartIds,
        };
        await placeOrder(orderBody);
    };

    if (statusPlaceOrder.isSuccess) {
        return <OrderSuccess orderNumber={statusPlaceOrder.data.result.id} />;
    }

    return (
        <div className="flex flex-col">
            <Alert
                banner
                message={
                    <Marquee pauseOnHover gradient={false}>
                        <div className="flex items-center justify-center">
                            <p className="text-base font-normal">
                                Please enter your delivery information carefully
                                before placing your order
                            </p>
                        </div>
                    </Marquee>
                }
            />

            {/* form Delivery Address */}
            <Form
                scrollToFirstError
                name="deliveryAddress"
                className="justify-center items-center w-full"
                onFinish={onFinish}
            >
                <Card title="Delivery Address" className="mt-8">
                    <Form.Item
                        name="contactName"
                        label="Contact Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input contact name',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!',
                            },
                        ]}
                    >
                        <Input addonBefore={'+84'} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="addressLine1"
                        label="Address Line 1"
                        rules={[
                            {
                                required: true,
                                message: 'Please input address line 1',
                            },
                        ]}
                    >
                        <Input.TextArea
                            showCount
                            maxLength={120}
                            autoSize={{ minRows: 3, maxRows: 6 }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="addressLine2"
                        label="Address Line 2"
                        rules={[
                            {
                                required: true,
                                message: 'Please input address line 2',
                            },
                        ]}
                    >
                        <Input.TextArea
                            showCount
                            maxLength={120}
                            autoSize={{ minRows: 3, maxRows: 6 }}
                        />
                    </Form.Item>
                </Card>
                {/* form Products Ordered */}
                <Card title="Products Ordered" className="mt-8">
                    {isCartLoading ? (
                        <Spin className="flex justify-center items-center" />
                    ) : (
                        <>
                            <ListProductOrderComponent
                                carts={cartOrderData?.result}
                            />
                        </>
                    )}
                </Card>

                <Card title="Order Summary" className="mt-8">
                    <div className="flex justify-between gap-4 mt-4">
                        <div className="flex flex-col">
                            <h2 className="text-xl mb-4">Payment Method</h2>
                            <Radio checked className="ml-4">
                                {' '}
                                Ship COD{' '}
                            </Radio>
                        </div>

                        <Card className="flex flex-col gap-4">
                            <div className="flex items-start font-normal w-full text-base justify-between">
                                <span>
                                    Total (
                                    {cartOrderData?.result.reduce(
                                        (acc: number, cart: Cart) =>
                                            acc + cart.quantity,
                                        0,
                                    )}
                                    {' cars'}
                                    ):{' '}
                                </span>
                                <span className="text-orange-400 font-semibold text-2xl ml-12">
                                    {convertToDollar(
                                        cartOrderData?.result.reduce(
                                            (acc: number, cart: Cart) =>
                                                acc + cart.price,
                                            0,
                                        ) || 0,
                                    )}
                                </span>
                            </div>
                            <div className="mt-1">
                                The seller will contact you to confirm the order
                            </div>

                            <Button
                                type="primary"
                                className="mt-4 w-full"
                                size="large"
                                htmlType="submit"
                                loading={statusPlaceOrder.isLoading}
                            >
                                Place Order
                            </Button>
                        </Card>
                    </div>
                </Card>
            </Form>
        </div>
    );
}

export default Checkout;
