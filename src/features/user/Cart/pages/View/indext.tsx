import { Button, Card, Popconfirm, Table, Tag, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../../../../hooks/useRedux';
import { Cart, CartUpdate } from '../../../../../types/Cart';
import { convertToDollar } from '../../../../../utils/convert';
import { useUpdateCartMutation } from '../../../../../lib/redux/cart/cartApiSlice';
import APIResponse from '../../../../../types/APIResponse';
import { useDispatch } from 'react-redux';
import { updateACartState } from '../../../../../lib/redux/cart/cartSlice';

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
                            <a href={`/${[cart.product.slug]}`}>
                                {cart.product.name}
                            </a>

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
                <button className="cursor-pointer text-red-500 hover:text-red-400">
                    Delete
                </button>
            ),
        },
    ];

    // State
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const carts = useAppSelector((state) => state.cart.carts);
    const dispatch = useDispatch();
    const [cartState, setCartState] = useState<CartUpdate>();

    // query
    const [updateCart, statusUpdateCart] = useUpdateCartMutation();

    // effect
    useEffect(() => {
        if (statusUpdateCart.isSuccess) {
            // update cart in redux
            dispatch(updateACartState(statusUpdateCart.data.result as Cart));
        }

        if (statusUpdateCart.isError) {
            const error = statusUpdateCart.error as { data: APIResponse };
            message.error(error.data.message);
        }
    }, [statusUpdateCart]);

    useEffect(() => {
        if (cartState) {
            console.log('Update cart', cartState);
            updateCart(cartState);
        }
    }, [cartState]);

    // handlers
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    return (
        <>
            {hasSelected && (
                <div className="mb-4">
                    <Popconfirm
                        title="Delete selected items?"
                        description="Are you sure you want to delete these items?"
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger className="mr-2">
                            Delete
                        </Button>
                    </Popconfirm>

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
                            {convertToDollar(100)}
                        </span>
                    </div>
                    <div className="mt-1">
                        Taxs and shipping calculated at checkout
                    </div>

                    <Button
                        type="primary"
                        className="mt-4 w-full"
                        disabled={!hasSelected}
                    >
                        Checkout
                    </Button>
                </Card>
            </div>
        </>
    );
}

export default ViewCartList;
