import { useState } from 'react';
import { Table } from 'antd';
import type { GetProp, TableProps } from 'antd';
import { Category } from '../../../../../types/Category';
import { useGetCategoriesQuery } from '../../../../../lib/redux/category/categoryApiSlice';

type ColumnsType<T> = TableProps<T>['columns'];

type TablePaginationConfig = Exclude<
    GetProp<TableProps, 'pagination'>,
    boolean
>;

interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

const columns: ColumnsType<Category> = [
    {
        title: 'Category(s)',
        dataIndex: 'name',
        className: 'text-blue-500',
        render(_, { id }) {
            return <a href={`/admin/categories/${id}`}>{_}</a>;
        },
    },
    {
        title: 'Slug',
        dataIndex: 'slug',
        width: '20%',
    },
    {
        title: 'Product Count',
        dataIndex: 'productCount',
        filters: [
            { text: 'Ascending', value: 'asc' },
            { text: 'Descending', value: 'desc' },
        ],
    },
    {
        title: 'Created Date',
        dataIndex: 'createdDate',
        render: (date: string) =>
            new Date(date).toLocaleString('en-US', {
                timeZone: 'Asia/Ho_Chi_Minh',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            }),
    },
    {
        title: 'Last Modified Date',
        dataIndex: 'lastModifiedDate',
        render: (date: string) =>
            new Date(date).toLocaleString('en-US', {
                timeZone: 'Asia/Ho_Chi_Minh',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            }),
    },
    {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: () => (
            <div className="flex flex-col text-blue-500 gap-2">
                <a className="cursor-pointer">Edit</a>
                <a className="cursor-pointer">Delete</a>
            </div>
        ),
    },
];

function CategoriesTable() {
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const [options, setOptions] = useState({
        page: 1,
        itemsPerPage: 10,
        name: '',
        isAvailable: true,
    });

    const { data, isLoading } = useGetCategoriesQuery(options);

    const handleTableChange: TableProps['onChange'] = (
        pagination,
        filters,
        sorter,
    ) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        // Update options
        setOptions({
            ...options,
            page: pagination.current || 1,
            itemsPerPage: pagination.pageSize || 10,
        });
    };

    return (
        <Table
            columns={columns}
            rowKey={(record) => record.id}
            dataSource={data?.result?.data}
            pagination={tableParams.pagination}
            loading={isLoading}
            onChange={handleTableChange}
        />
    );
}

export default CategoriesTable;
