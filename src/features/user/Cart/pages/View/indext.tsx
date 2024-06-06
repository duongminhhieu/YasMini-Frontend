import { Button, Card, Table, Tag, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../../../../hooks/useRedux';
import { Cart, CartUpdate } from '../../../../../types/Cart';
import { convertToDollar } from '../../../../../utils/convert';
import {
    useDeleteCartsMutation,
    useUpdateCartMutation,
} from '../../../../../lib/redux/cart/cartApiSlice';
import APIResponse from '../../../../../types/APIResponse';
import { useDispatch } from 'react-redux';
import {
    deleteACart,
    updateACartState,
    updateTotalPriceSelected,
} from '../../../../../lib/redux/cart/cartSlice';
import { Link, useNavigate } from 'react-router-dom';

function ViewCartList() {
    // Columns
    const columns: ColumnsType<Cart> = [
        {
            title: 'Product(s)',
            dataIndex: 'name',
            className: 'text-blue-500',
            width: '40%',
            render(_, cart) {
                return (
                    <div className="flex">
                        <img
                            src={cart.product?.thumbnail ?? ''}
                            alt={cart.product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex flex-col ml-2">
                            <Link to={`/${[cart.product.slug]}`}>
                                {cart.product.name}
                            </Link>

                            <span className="text-gray-400 text-xs">
                                SKU: {cart.product.sku}
                            </span>
                            {cart.product.isFeatured && (
                                <span className="">
                                    <Tag color="green" className="text-xs">
                                        Featured
                                    </Tag>
                                </span>
                            )}
                            {!cart.product.isAvailable && (
                                <span className="mt-1">
                                    <span className="text-sm text-red-600">
                                        Variation selected is deleted. Please
                                        select another variation
                                    </span>
                                </span>
                            )}
                        </div>
                    </div>
                );
            },
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: (_, cart) => (
                <div className="flex justify-start gap-2 items-center">
                    <p className="line-through text-gray-500 text-xs">
                        {convertToDollar(cart.product?.price + 4000)}
                    </p>
                    <p className=" font-semibold">
                        {convertToDollar(cart.product?.price)}
                    </p>
                </div>
            ),
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            render: (quantity: number, cart) => {
                return (
                    <div>
                        <Button
                            onClick={() => {
                                setCartState({
                                    id: cart.id,
                                    quantity: quantity - 1,
                                });
                            }}
                            disabled={quantity <= 1}
                            icon={<MinusOutlined />}
                        />
                        <span className="mx-4">{quantity}</span>
                        <Button
                            onClick={() => {
                                setCartState({
                                    id: cart.id,
                                    quantity: quantity + 1,
                                });
                            }}
                            icon={<PlusOutlined />}
                        />
                        <span className="ml-2">
                            {' '}
                            ({cart.product.quantity} in stock)
                        </span>
                    </div>
                );
            },
        },
        {
            title: 'Total Price',
            dataIndex: 'total',
            render: (_, cart) => (
                <span className="text-orange-400 font-semibold">
                    {convertToDollar(cart.price)}
                </span>
            ),
        },

        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (_, { id }) => (
                <button
                    className="cursor-pointer text-red-500 hover:text-red-400"
                    onClick={() => {
                        deleteCart([id]);
                    }}
                >
                    Delete
                </button>
            ),
        },
    ];

    // State
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const carts = useAppSelector((state) => state.cart.carts);
    const totalPrice = useAppSelector((state) => state.cart.totalPriceSelected);
    const dispatch = useDispatch();
    const [cartState, setCartState] = useState<CartUpdate>();
    const navigate = useNavigate();

    // query
    const [updateCart, statusUpdateCart] = useUpdateCartMutation();
    const [deleteCart, statusDeleteCart] = useDeleteCartsMutation();

    // effect
    useEffect(() => {
        if (statusUpdateCart.isSuccess) {
            // update cart in redux
            dispatch(updateACartState(statusUpdateCart.data.result as Cart));
            dispatch(updateTotalPriceSelected(selectedRowKeys as string[]));
        }

        if (statusUpdateCart.isError) {
            const error = statusUpdateCart.error as { data: APIResponse };
            message.error(error.data.message);
        }
    }, [statusUpdateCart]);

    useEffect(() => {
        if (statusDeleteCart.isSuccess) {
            message.success('Delete cart successfully');
            dispatch(deleteACart(selectedRowKeys.map(String)));
            setSelectedRowKeys([]);
        }

        if (statusDeleteCart.isError) {
            const error = statusDeleteCart.error as { data: APIResponse };
            message.error(error.data.message);
        }
    }, [statusDeleteCart]);

    useEffect(() => {
        if (cartState) {
            updateCart(cartState);
        }
    }, [cartState]);

    dispatch(updateTotalPriceSelected(selectedRowKeys as string[]));

    // handlers
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
        dispatch(updateTotalPriceSelected(newSelectedRowKeys as string[]));
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        getCheckboxProps: (record: Cart) => ({
            disabled:
                record.product.quantity === 0 || !record.product.isAvailable,
        }),
    };

    const hasSelected = selectedRowKeys.length > 0;

    const handleCheckout = () => {
        const cartIds = selectedRowKeys.map(String);
        navigate('/checkout', { state: { cartIds } });
    };

    return (
        <>
            {hasSelected && (
                <div className="mb-4">
                    <Button
                        type="primary"
                        danger
                        className="mr-2"
                        onClick={() => {
                            deleteCart(selectedRowKeys.map(String));
                        }}
                    >
                        Delete
                    </Button>

                    <span style={{ marginLeft: 8 }}>
                        {hasSelected
                            ? `Selected ${selectedRowKeys.length} items`
                            : ''}
                    </span>
                </div>
            )}

            <Table
                columns={columns}
                dataSource={carts}
                rowSelection={rowSelection}
                rowKey={(record) => record.id}
                pagination={false}
            />

            <div className="flex justify-end gap-4 mt-4">
                <Card className="flex flex-col gap-4">
                    <div className="flex items-start font-normal w-full text-base justify-between">
                        <span>Total({selectedRowKeys.length} items): </span>
                        <span className="text-orange-400 font-semibold text-xl ml-2">
                            {convertToDollar(totalPrice || 0)}
                        </span>
                    </div>
                    <div className="mt-1">
                        Taxs and shipping calculated at checkout
                    </div>

                    <Button
                        type="primary"
                        className="mt-4 w-full"
                        disabled={!hasSelected}
                        onClick={handleCheckout}
                    >
                        Checkout
                    </Button>
                </Card>
            </div>
        </>
    );
}

export default ViewCartList;
