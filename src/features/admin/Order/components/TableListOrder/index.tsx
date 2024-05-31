import {
    Card,
    Dropdown,
    MenuProps,
    Pagination,
    Space,
    Table,
    TableProps,
    Tag,
    Typography,
    message,
} from 'antd';
import { useEffect, useState } from 'react';

import { Order, OrderParams } from '../../../../../types/Order';
import {
    useGetAllOrdersAdminQuery,
    useUpdateStatusOrderMutation,
} from '../../../../../lib/redux/order/orderApiSlice';
import { convertToDollar } from '../../../../../utils/convert';
import { formatDistanceToNow } from 'date-fns';
import ListProductOrderedComponent from '../ListProductOrdered';
import { DownOutlined } from '@ant-design/icons';
import APIResponse from '../../../../../types/APIResponse';

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
                const items: MenuProps['items'] = [
                    {
                        label: (
                            <Tag color="orange" className="w-full">
                                PENDING
                            </Tag>
                        ),
                        key: 'pending',
                        onClick: async () => {
                            await updateStatusOrder({
                                id: record.id,
                                status: 'PENDING',
                            });
                        },
                    },
                    {
                        label: (
                            <Tag color="blue" className="w-full">
                                DELIVERING
                            </Tag>
                        ),
                        key: 'delivering',
                        onClick: async () => {
                            await updateStatusOrder({
                                id: record.id,
                                status: 'DELIVERING',
                            });
                        },
                    },
                    {
                        label: (
                            <Tag color="green" className="w-full">
                                COMPLETED
                            </Tag>
                        ),
                        key: 'completed',
                        onClick: async () => {
                            await updateStatusOrder({
                                id: record.id,
                                status: 'COMPLETED',
                            });
                        },
                    },
                    {
                        label: (
                            <Tag color="red" className="w-full">
                                CANCELED
                            </Tag>
                        ),
                        key: 'canceled',
                        onClick: async () => {
                            await updateStatusOrder({
                                id: record.id,
                                status: 'CANCELED',
                            });
                        },
                    },
                ];

                return (
                    <div className="flex flex-col gap-4">
                        <a
                            href={`/admin/orders/${record.id}`}
                            className="text-blue-500"
                        >
                            View Detail
                        </a>
                        <div>
                            <Dropdown
                                menu={{
                                    items,
                                    selectable: true,
                                    multiple: false,
                                    selectedKeys: [
                                        record.status
                                            ? record.status.toLowerCase()
                                            : '',
                                    ],
                                }}
                            >
                                <Typography.Link>
                                    <Space>
                                        Change Status
                                        <DownOutlined />
                                    </Space>
                                </Typography.Link>
                            </Dropdown>
                        </div>
                    </div>
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
    const {
        data,
        isLoading,
        refetch: refetchOrder,
    } = useGetAllOrdersAdminQuery(options);
    const [updateStatusOrder, statusUpdateStatus] =
        useUpdateStatusOrderMutation();

    // UseEffect
    useEffect(() => {
        if (statusUpdateStatus.isSuccess) {
            message.success('Update status success');
            refetchOrder();
        }

        if (statusUpdateStatus.isError) {
            const error = statusUpdateStatus.error as { data: APIResponse };
            message.error(error.data.message);
        }
    }, [statusUpdateStatus]);

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
                loading={isLoading || statusUpdateStatus.isLoading}
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
