import {
    Button,
    Input,
    Pagination,
    Popconfirm,
    PopconfirmProps,
    Select,
    SelectProps,
    Table,
    TableProps,
    Tag,
    message,
} from 'antd';
import { useEffect, useState } from 'react';
import { Product, ProductParams } from '../../../../../types/Product';
import {
    useGetAllCategoriesQuery,
    useGetProductsAdminQuery,
    useHardDeleteProductMutation,
    useToggleAvailabilityProductsMutation,
} from '../../../../../lib/redux/product/productApiSlice';
import APIResponse from '../../../../../types/APIResponse';
import { Category } from '../../../../../types/Category';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

type ColumnsType<T> = TableProps<T>['columns'];

function ProductTable() {
    // Columns
    const columns: ColumnsType<Product> = [
        {
            title: 'Product(s)',
            dataIndex: 'name',
            className: 'text-blue-500',
            render(_, product) {
                return (
                    <Link
                        className="flex"
                        to={`/admin/products/${[product.id]}`}
                    >
                        <img
                            src={product?.thumbnail ?? ''}
                            alt={_}
                            className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex flex-col ml-2">
                            <div>{_}</div>

                            <span className="text-gray-400 text-xs">
                                SKU: {product.sku}
                            </span>
                            {product.isFeatured && (
                                <span className="">
                                    <Tag color="green" className="text-xs">
                                        Featured
                                    </Tag>
                                </span>
                            )}
                        </div>
                    </Link>
                );
            },
        },
        {
            title: 'Slug',
            dataIndex: 'slug',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: (price: number) => (
                <span>
                    {price.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    })}
                </span>
            ),
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            sorter: (a, b) => a.quantity - b.quantity,
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
            sorter: (a, b) => {
                return (
                    new Date(a.lastModifiedDate).getTime() -
                    new Date(b.lastModifiedDate).getTime()
                );
            },
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
                    <Link
                        className="cursor-pointer items-center text-center"
                        to={`/admin/products/${id}`}
                    >
                        Edit
                    </Link>
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
    const [options, setOptions] = useState<ProductParams>({
        page: 1,
        itemsPerPage: 10,
        name: '',
        isAvailable: true,
        isFeatured: null,
        categoryIds: [],
        minPrice: null,
        maxPrice: null,
        minRating: null,
        orderBy: ['price'],
        sortBy: 'asc',
    });

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const [selectCategoryOptions, setSelectCategoryOptions] = useState<
        SelectProps['options']
    >([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const [selectedCategories, setSelectedCategories] = useState([]);

    // Query
    const { data, isLoading } = useGetProductsAdminQuery(options);
    const { currentData: categoryData, isLoading: isCategoryLoading } =
        useGetAllCategoriesQuery();
    const [softDeleteProduct, status] = useToggleAvailabilityProductsMutation();
    const [hardDeleteProduct, hardDeletestatus] =
        useHardDeleteProductMutation();

    // UseEffect

    useEffect(() => {
        if (categoryData) {
            setSelectCategoryOptions(
                categoryData.result.map((category: Category) => ({
                    label: category.name,
                    value: category.id,
                })),
            );
        }
    }, [categoryData]);

    useEffect(() => {
        if (status.isSuccess) {
            message.success('Delist product success');
            setSelectedRowKeys([]);
        }
        if (status.isError) {
            const error = status.error as { data: APIResponse };
            console.log('error', error);
            message.error('Delist product failed');
        }
    }, [status.isError, status.isSuccess]);

    useEffect(() => {
        if (hardDeletestatus.isSuccess) {
            message.success('Delete product success');
            setSelectedRowKeys([]);
        }
        if (hardDeletestatus.isError) {
            const error = hardDeletestatus.error as { data: APIResponse };
            console.log('error', error);
            message.error('Delete product failed');
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

    const handleSoftDelete = async (ids: string[]) => {
        await softDeleteProduct(ids);
    };

    const onSearch = () => {
        setOptions({
            ...options,
            name: searchValue,
            categoryIds: [...selectedCategories],
        });
    };

    const confirm: PopconfirmProps['onConfirm'] = async () => {
        await hardDeleteProduct(selectedRowKeys.map(String));
    };

    const resetFilters = () => {
        setSelectedRowKeys([]);
        setSearchValue('');
        setSelectedCategories([]);
        setOptions({
            ...options,
            page: 1,
            itemsPerPage: 10,
            name: '',
            isAvailable: true,
            isFeatured: null,
            categoryIds: [],
            orderBy: ['price'],
            sortBy: 'asc',
        });
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

            <div className="flex items-center gap-4">
                <Input
                    placeholder="Search name product here"
                    className="w-1/2 my-4"
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                    }}
                    prefix={<SearchOutlined />}
                />
                <Select
                    mode="multiple"
                    placeholder="Select categories"
                    className="w-1/2"
                    tokenSeparators={[',']}
                    options={selectCategoryOptions}
                    optionFilterProp="label"
                    loading={isCategoryLoading}
                    value={selectedCategories}
                    showSearch
                    autoClearSearchValue
                    onChange={setSelectedCategories}
                />
                <Button type="primary" onClick={onSearch} loading={isLoading}>
                    Apply
                </Button>
                <Button type="default" onClick={resetFilters}>
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

export default ProductTable;
