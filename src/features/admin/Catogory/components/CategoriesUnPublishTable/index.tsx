import { useEffect, useState } from 'react';
import { Button, Table, message } from 'antd';
import type { GetProp, TableProps } from 'antd';
import { Category, CategoryParams } from '../../../../../types/Category';
import {
    useGetCategoriesQuery,
    useToggleAvailabilityCategoryMutation,
} from '../../../../../lib/redux/category/categoryApiSlice';

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

function CategoriesUnPublishTable() {
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
                    <button className="cursor-pointer">Edit</button>
                    <button
                        onClick={() => handlePublishCategory([id])}
                        className="cursor-pointer"
                    >
                        Publish
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
        isAvailable: false,
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
    const [publicCategory, status] = useToggleAvailabilityCategoryMutation();

    // Effect
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
            setSelectedRowKeys([]);
            message.success('Publish category success');
        }
        if (status.isError) {
            console.log('error', status.error);
            message.error('Publish category failed');
        }
    }, [status.isSuccess, status.error]);

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

    const handlePublishCategory = async (ids: string[]) => {
        await publicCategory(ids);
    };

    return (
        <>
            {hasSelected && (
                <div className="mb-4">
                    <Button type="primary" danger className="mr-2">
                        Delete
                    </Button>
                    <Button
                        type="primary"
                        className="mr-2"
                        onClick={() =>
                            handlePublishCategory(selectedRowKeys.map(String))
                        }
                    >
                        Publish
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

export default CategoriesUnPublishTable;
