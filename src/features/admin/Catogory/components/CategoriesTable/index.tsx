import { useEffect, useState } from 'react';
import { Button, Table, message } from 'antd';
import type { GetProp, TableProps } from 'antd';
import { Category, CategoryParams } from '../../../../../types/Category';
import {
    useGetCategoriesQuery,
    useToggleAvailabilityCategoryMutation,
} from '../../../../../lib/redux/category/categoryApiSlice';
import APIResponse from '../../../../../types/APIResponse';
import { SearchProps } from 'antd/es/input';
import Search from 'antd/es/input/Search';

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

function CategoriesTable({ isActive = true }) {
    // Columns
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
            render: (_, { id }) => (
                <div className="flex flex-col text-blue-500 gap-2">
                    <a
                        className="cursor-pointer items-center text-center"
                        href={`/admin/categories/${id}`}
                    >
                        Edit
                    </a>
                    <button
                        className="cursor-pointer text-red-500 hover:text-red-400"
                        onClick={() => handleSoftDelete([id])}
                    >
                        Delist
                    </button>
                </div>
            ),
        },
    ];

    // State
    const [options, setOptions] = useState<CategoryParams>({
        page: 1,
        itemsPerPage: 10,
        name: '',
        isAvailable: isActive,
    });
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
            total: 10,
        },
    });

    // Query
    const { data, isLoading } = useGetCategoriesQuery(options);
    const [softDeleteCategory, status] =
        useToggleAvailabilityCategoryMutation();

    // UseEffect
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

    useEffect(() => {
        if (status.isSuccess) {
            message.success('Delist category success');
            setSelectedRowKeys([]);
        }
        if (status.isError) {
            const error = status.error as { data: APIResponse };
            console.log('error', error);
            message.error('Delist category failed');
        }
    }, [status.error, status.isSuccess]);

    // Handlers
    const handleTableChange: TableProps['onChange'] = (pagination) => {
        setTableParams({
            ...tableParams,
            pagination,
        });
    };

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    const handleSoftDelete = async (ids: string[]) => {
        await softDeleteCategory(ids);
    };

    const onSearch: SearchProps['onSearch'] = (value, _e) => {
        setOptions({
            ...options,
            name: value,
        });
    };

    return (
        <>
            {hasSelected && (
                <div className="mb-4">
                    <Button type="primary" danger className="mr-2">
                        Delete
                    </Button>
                    <Button
                        type="default"
                        danger
                        className="mr-2"
                        onClick={() =>
                            handleSoftDelete(selectedRowKeys.map(String))
                        }
                    >
                        Delist
                    </Button>
                    <span style={{ marginLeft: 8 }}>
                        {hasSelected
                            ? `Selected ${selectedRowKeys.length} items`
                            : ''}
                    </span>
                </div>
            )}

            <div className="flex items-center">
                <Search
                    placeholder="Search name category"
                    enterButton="Search"
                    onSearch={onSearch}
                    className="w-1/2 my-4"
                    loading={isLoading}
                />
                <Button
                    type="default"
                    className="ml-4"
                    onClick={() => {
                        setSelectedRowKeys([]);
                        setOptions({
                            ...options,
                            name: '',
                        });
                    }}
                >
                    Reset
                </Button>
            </div>

            <Table
                columns={columns}
                rowSelection={rowSelection}
                rowKey={(record) => record.id}
                dataSource={data?.result?.data}
                pagination={tableParams.pagination}
                loading={isLoading}
                onChange={handleTableChange}
            />
        </>
    );
}

export default CategoriesTable;
