import { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { GetProp, TableProps } from 'antd';
import { Category, CategoryParams } from '../../../../../types/Category';
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
        sorter: (a, b) => a.productCount - b.productCount,
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

function CategoriesTable({ isActive = true }) {
    const [options, setOptions] = useState<CategoryParams>({
        page: 1,
        itemsPerPage: 10,
        name: '',
        isAvailable: isActive,
    });

    const { data, isLoading } = useGetCategoriesQuery(options);

    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
            total: 10,
        },
    });

    useEffect(() => {
        if (data) {
            setTableParams({
                pagination: {
                    current: data?.result?.page || 1,
                    pageSize: data?.result?.itemsPerPage || 1,
                    total: data?.result?.total || 10,
                },
            });
        }
    }, [data]);

    useEffect(() => {
        setOptions({
            ...options,
            page: tableParams.pagination?.current || 1,
            itemsPerPage: tableParams.pagination?.pageSize || 10,
        });
    }, [tableParams.pagination]);

    const handleTableChange: TableProps['onChange'] = (pagination) => {
        setTableParams({
            ...tableParams,
            pagination,
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
