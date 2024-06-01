import { Card, Divider, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { formatDistanceToNowStrict } from 'date-fns';
import { Order } from '../../../../../types/Order';
import { convertToDollar } from '../../../../../utils/convert';
import ListProductOrderedComponent from '../../../Order/components/ListProductOrdered';

function TableLatestOrdersComponent({
    lastestOrder,
}: {
    lastestOrder: Order[];
}) {
    // Columns
    const columns: ColumnsType<Order> = [
        {
            title: 'Order ID',
            dataIndex: 'id',
            className: 'text-blue-500',
            render: (id: string) => {
                return <a href={`/admin/orders/${id}`}>{id}</a>;
            },
        },
        {
            title: "Customer's Name",
            dataIndex: 'user',
            render: (_, record) => {
                return record.user?.firstName + ' ' + record.user?.lastName;
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',

            render: (status: string) => {
                if (status === 'PENDING') {
                    return <Tag color="orange">{status}</Tag>;
                } else if (status === 'DELIVERING') {
                    return <Tag color="blue">{status}</Tag>;
                } else if (status === 'COMPLETED') {
                    return <Tag color="green">{status}</Tag>;
                } else if (status === 'CANCELED') {
                    return <Tag color="red">{status}</Tag>;
                }
            },
        },
        {
            title: 'Total Price',
            dataIndex: 'totalPrice',
            sorter: (a, b) => a.totalPrice - b.totalPrice,
            render: (price: number) => {
                return convertToDollar(price);
            },
        },
        {
            title: 'Created Date',
            dataIndex: 'createdDate',
            sorter: (a, b) => {
                return (
                    new Date(a.createdDate).getTime() -
                    new Date(b.createdDate).getTime()
                );
            },
            render: (date: string) =>
                formatDistanceToNowStrict(new Date(date)) + ' ago',
        },
    ];

    return (
        <>
            <Divider>Latest Orders</Divider>
            <Table
                bordered
                size="small"
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={lastestOrder}
                pagination={false}
                expandable={{
                    expandedRowRender: (record) => (
                        <Card>
                            <ListProductOrderedComponent
                                orderItems={record.orderItems}
                            />
                        </Card>
                    ),
                }}
            />
        </>
    );
}

export default TableLatestOrdersComponent;
