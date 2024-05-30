import { Table, Tag } from 'antd';
import { useGetAllOrdersQuery } from '../../../../../lib/redux/order/orderApiSlice';
import { ColumnsType } from 'antd/es/table';
import { Order } from '../../../../../types/Order';
import { useState } from 'react';
import { convertToDollar } from '../../../../../utils/convert';
import { formatDistanceToNow } from 'date-fns';

function TableAllPurchaseComponent() {
    // columns
    const columns: ColumnsType<Order> = [
        {
            title: 'Order ID',
            dataIndex: 'id',
            className: 'text-blue-500',
            render: (id: string) => {
                return <a href={`/order/${id}`}>{id}</a>;
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
                } else if (status === 'DELIVERED') {
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
    ];

    // state

    // query
    const { data: dataOrderData, isLoading: isOderDataLoading } =
        useGetAllOrdersQuery();

    // hooks

    // handlers

    return (
        <Table
            columns={columns}
            rowKey={(record) => record.id}
            dataSource={dataOrderData?.result}
            pagination={false}
            loading={isOderDataLoading}
        />
    );
}

export default TableAllPurchaseComponent;
