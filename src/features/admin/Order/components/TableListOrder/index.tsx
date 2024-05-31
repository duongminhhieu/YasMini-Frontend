import { Card, Pagination, Table, TableProps, Tag } from 'antd';
import { useState } from 'react';

import { Order, OrderParams } from '../../../../../types/Order';
import { useGetAllOrdersAdminQuery } from '../../../../../lib/redux/order/orderApiSlice';
import { convertToDollar } from '../../../../../utils/convert';
import { formatDistanceToNow } from 'date-fns';
import ListProductOrderedComponent from '../ListProductOrdered';

type ColumnsType<T> = TableProps<T>['columns'];

function TableListOrderComponent() {
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
            filters: [
                { text: 'PENDING', value: 'PENDING' },
                { text: 'DELIVERING', value: 'DELIVERING' },
                { text: 'COMPLETED', value: 'COMPLETED' },
                { text: 'CANCELED', value: 'CANCELED' },
            ],
            filterMultiple: false,
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
            title: 'Amount',
            dataIndex: 'totalQuantity',
            sorter: (a, b) => a.totalQuantity - b.totalQuantity,
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
                formatDistanceToNow(new Date(date)) + ' ago',
        },
        {
            title: 'Action',
            render: (_, record) => {
                return (
                    <a
                        href={`/admin/orders/${record.id}`}
                        className="text-blue-500"
                    >
                        View Detail
                    </a>
                );
            },
        },
    ];

    // State
    const [options, setOptions] = useState<OrderParams>({
        status: null,
        page: 1,
        itemsPerPage: 10,
        sortBy: 'createdDate',
        orderBy: 'desc',
    });

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    // Query
    const { data, isLoading } = useGetAllOrdersAdminQuery(options);

    // UseEffect

    // Handlers
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleTableChange: TableProps['onChange'] = (
        pagination,
        filters,
        sorter,
    ) => {
        setOptions({
            ...options,
            status: filters.status?.[0].toString() || null,
        });
    };

    return (
        <>
            <Table
                columns={columns}
                rowSelection={rowSelection}
                rowKey={(record) => record.id}
                dataSource={data?.result?.data}
                pagination={false}
                loading={isLoading}
                onChange={handleTableChange}
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

            <Pagination
                className="flex justify-end my-4 mr-4"
                total={data?.result?.total || 0}
                current={data?.result?.page || 1}
                onChange={(page, pageSize) => {
                    setOptions({
                        ...options,
                        page,
                        itemsPerPage: pageSize || 10,
                    });
                }}
                showQuickJumper
                showSizeChanger
                showTotal={(total, range) =>
                    `${range[0]}-${range[1]} of ${total} items`
                }
            />
        </>
    );
}

export default TableListOrderComponent;
