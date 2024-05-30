import { Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Cart } from '../../../../../types/Cart';
import { convertToDollar } from '../../../../../utils/convert';

function ListProductOrder({ carts }: { carts: Cart[] }) {
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
                    <p className=" font-semibold">
                        {convertToDollar(cart.product?.price)}
                    </p>
                </div>
            ),
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            render: (quantity: number) => {
                return (
                    <div>
                        <span>{quantity}</span>
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
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={carts}
                rowKey={(record) => record.id}
                pagination={false}
            />
        </>
    );
}

export default ListProductOrder;
