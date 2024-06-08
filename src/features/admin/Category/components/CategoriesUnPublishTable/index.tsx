import { useEffect, useState } from 'react';
import { Button, Pagination, Popconfirm, Table, message } from 'antd';
import type { PopconfirmProps, TableProps } from 'antd';
import { Category, CategoryParams } from '../../../../../types/Category';
import {
    useGetCategoriesQuery,
    useHardDeleteCategoryMutation,
    useToggleAvailabilityCategoryMutation,
} from '../../../../../lib/redux/category/categoryApiSlice';
import Search, { SearchProps } from 'antd/es/input/Search';
import APIResponse from '../../../../../types/APIResponse';
import { Link } from 'react-router-dom';

type ColumnsType<T> = TableProps<T>['columns'];

function CategoriesUnPublishTable() {
    // Columns
    const columns: ColumnsType<Category> = [
        {
            title: 'Category(s)',
            dataIndex: 'name',
            className: 'text-blue-500',
            render(_, { id }) {
                return <Link to={`/admin/categories/${id}`}>{_}</Link>;
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
                <div className="flex flex-col text-blue-500 gap-2 items-center">
                    <Link
                        className="cursor-pointer"
                        to={`/admin/categories/${id}`}
                    >
                        Edit
                    </Link>
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

    // Query
    const { data, isLoading } = useGetCategoriesQuery(options);
    const [publicCategory, status] = useToggleAvailabilityCategoryMutation();
    const [hardDeleteCategory, hardDeletestatus] =
        useHardDeleteCategoryMutation();

    // Effect

    useEffect(() => {
        if (status.isSuccess) {
            setSelectedRowKeys([]);
            message.success('Publish category success');
        }
        if (status.isError) {
            const error = status.error as { data: APIResponse };
            message.error(error.data.message);
        }
    }, [status.isSuccess, status.error]);

    useEffect(() => {
        if (hardDeletestatus.isSuccess) {
            message.success('Delete category success');
            setSelectedRowKeys([]);
        }
        if (hardDeletestatus.isError) {
            const error = hardDeletestatus.error as { data: APIResponse };
            message.error(error.data.message);
        }
    }, [hardDeletestatus.isSuccess, hardDeletestatus.isError]);

    // Handlers

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

    const onSearch: SearchProps['onSearch'] = (value, _e) => {
        setOptions({
            ...options,
            name: value,
        });
    };

    const confirm: PopconfirmProps['onConfirm'] = async () => {
        await hardDeleteCategory(selectedRowKeys.map(String));
    };
    return (
        <>
            {hasSelected && (
                <div className="mb-4">
                    <Popconfirm
                        title="Delete selected items?"
                        description="Are you sure you want to delete these items?"
                        onConfirm={confirm}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger className="mr-2">
                            Delete
                        </Button>
                    </Popconfirm>
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
                pagination={false}
                loading={isLoading}
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

export default CategoriesUnPublishTable;
