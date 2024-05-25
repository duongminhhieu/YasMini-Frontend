import {
    ArrowDownOutlined,
    BulbOutlined,
    FilterOutlined,
} from '@ant-design/icons';
import {
    Button,
    Card,
    Checkbox,
    Divider,
    InputNumber,
    Layout,
    Pagination,
    Radio,
    Rate,
    Select,
    Spin,
} from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import {
    useGetAllCategoriesQuery,
    useGetProductsQuery,
} from '../../../../../lib/redux/product/productApiSlice';
import { Category } from '../../../../../types/Category';
import { useEffect, useState } from 'react';
import ProductCard from '../../../../../components/common/ProductCard';
import { Product, ProductParams } from '../../../../../types/Product';

function Search({ search }: { search: string }) {
    // state
    const [isExpanded, setIsExpanded] = useState(false);
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(0);
    const [applyRange, setApplyRange] = useState<boolean>(false);
    const [selectedCategories, setSelectedCategories] = useState<Category[]>(
        [],
    );
    const [selectedRate, setSelectedRate] = useState(null);
    const [priceSort, setPriceSort] = useState<string>('asc');

    const [options, setOptions] = useState<ProductParams>({
        page: 1,
        itemsPerPage: 20,
        name: search,
        isAvailable: true,
        isFeatured: true,
        categoryIds: [],
        minPrice: null,
        maxPrice: null,
        minRating: null,
        orderBy: ['price'],
        sortBy: 'asc',
    });

    // hooks
    const { data: categoriesResponse, isLoading: isCategoryLoading } =
        useGetAllCategoriesQuery();

    const { data: productResponse, isLoading: isProductLoading } =
        useGetProductsQuery(options);

    // effect

    useEffect(() => {
        setOptions({
            ...options,
            categoryIds: selectedCategories.map((category) => category.id),
            minPrice: minPrice,
            maxPrice: maxPrice,
            minRating: selectedRate,
            orderBy: ['price'],
            sortBy: priceSort,
        });
    }, [selectedCategories, applyRange, selectedRate, priceSort]);

    return (
        <Layout>
            <Sider
                width="20%"
                style={{ backgroundColor: 'transparent' }}
                className="bg-transparent"
            >
                <Card
                    title={
                        <Title level={5}>
                            <div className="flex text-base gap-4 justify-center items-center mt-2">
                                <FilterOutlined />
                                <span className="font-semibold flex justify-center items-center">
                                    SEARCH FILTER
                                </span>
                            </div>
                        </Title>
                    }
                    bordered={true}
                    className="h-full border-gray-200 shadow-sm"
                >
                    <div className="flex flex-col justify-center items-start">
                        <div className="text-base font-semibold">
                            By Category
                        </div>

                        <Checkbox.Group
                            className="flex flex-col gap-2 mt-4"
                            onChange={(values) => {
                                setSelectedCategories(
                                    values as unknown as Category[],
                                );
                            }}
                        >
                            {isCategoryLoading ? (
                                <div className="flex justify-center items-center">
                                    <Spin size="small" />
                                </div>
                            ) : (
                                categoriesResponse?.result
                                    ?.slice(
                                        0,
                                        isExpanded
                                            ? categoriesResponse?.result?.length
                                            : 5,
                                    )
                                    .map((category: Category) => (
                                        <div key={category.id}>
                                            <Checkbox value={category}>
                                                {category.name}
                                            </Checkbox>
                                        </div>
                                    ))
                            )}
                            {categoriesResponse?.result?.length > 5 && (
                                <div>
                                    <Button
                                        type="link"
                                        onClick={() =>
                                            setIsExpanded(!isExpanded)
                                        }
                                        className="flex justify-start items-center w-full text-left"
                                    >
                                        {!isExpanded && (
                                            <div className="flex gap-2 justify-center items-center">
                                                More <ArrowDownOutlined />
                                            </div>
                                        )}
                                    </Button>
                                </div>
                            )}
                        </Checkbox.Group>
                    </div>

                    <Divider className="my-4 w-full bg-gray-100" />
                    <div className="flex flex-col justify-center items-start mt-4">
                        <div className="text-base font-semibold">
                            Price Range ($)
                        </div>

                        <div className="flex gap-2 mt-4">
                            <div className="w-full flex flex-col gap-1">
                                <span>Min Price</span>
                                <InputNumber
                                    className="w-full p-0"
                                    min={0}
                                    formatter={(value) =>
                                        `$ ${value}`.replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ',',
                                        )
                                    }
                                    parser={(value) =>
                                        value
                                            ? parseFloat(
                                                  value.replace(
                                                      /\$\s?|(,*)/g,
                                                      '',
                                                  ),
                                              )
                                            : 0
                                    }
                                    value={minPrice || 0}
                                    onChange={(value) =>
                                        setMinPrice(value || 0)
                                    }
                                />
                            </div>
                            <div className="w-full flex flex-col gap-1">
                                <span>Max Price</span>
                                <InputNumber
                                    className="w-full p-0"
                                    min={0}
                                    formatter={(value) =>
                                        `$ ${value}`.replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ',',
                                        )
                                    }
                                    parser={(value) =>
                                        value
                                            ? parseFloat(
                                                  value.replace(
                                                      /\$\s?|(,*)/g,
                                                      '',
                                                  ),
                                              )
                                            : 0
                                    }
                                    value={maxPrice}
                                    onChange={(value) =>
                                        setMaxPrice(value || 0)
                                    }
                                />
                            </div>
                        </div>
                        <Button
                            type="primary"
                            className="w-full mt-4"
                            onClick={() => {
                                setApplyRange(!applyRange);
                            }}
                            loading={isProductLoading}
                        >
                            Apply
                        </Button>
                    </div>

                    <Divider className="my-4 w-full bg-gray-100" />
                    <div className="flex flex-col justify-center items-start mt-4">
                        <div className="text-base font-semibold">Ratings</div>
                        <Radio.Group
                            className="flex flex-col gap-2 mt-4"
                            onChange={(e) => {
                                setSelectedRate(e.target.value);
                            }}
                            value={selectedRate}
                        >
                            <Radio value={5}>
                                <Rate
                                    className="text-sm text-yellow-400"
                                    defaultValue={5}
                                    disabled
                                />
                            </Radio>
                            <Radio value={4}>
                                <Rate
                                    className="text-sm text-yellow-400"
                                    defaultValue={4}
                                    disabled
                                />{' '}
                                & Up
                            </Radio>
                            <Radio value={3}>
                                <Rate
                                    className="text-sm text-yellow-400"
                                    defaultValue={3}
                                    disabled
                                />{' '}
                                & Up
                            </Radio>
                            <Radio value={2}>
                                <Rate
                                    className="text-sm text-yellow-400"
                                    defaultValue={2}
                                    disabled
                                />{' '}
                                & Up
                            </Radio>
                            <Radio value={1}>
                                <Rate
                                    className="text-sm text-yellow-400"
                                    defaultValue={1}
                                    disabled
                                />{' '}
                                & Up
                            </Radio>

                            <Radio value={0}>No Rating</Radio>
                        </Radio.Group>
                    </div>
                    <Divider className="my-4 w-full bg-gray-100" />

                    {/* clear all */}
                    <Button
                        type="default"
                        className="w-full mt-4"
                        onClick={() => {
                            setApplyRange(false);
                            setSelectedCategories([]);
                            setSelectedRate(null);
                            setMinPrice(0);
                            setMaxPrice(0);
                        }}
                    >
                        Clear All
                    </Button>
                </Card>
            </Sider>
            <Content className="ml-4">
                <Card className="h-full">
                    <div className="flex justify-start items-center mb-4">
                        <div className="text-lg font-normal text-gray-600">
                            <BulbOutlined className="mr-2" />
                            Search result for{' '}
                            <span className=" text-blue-500">
                                '{search}'
                            </span>{' '}
                        </div>
                    </div>
                    {/* sort by price and featured quantity */}
                    <div className="flex justify-start items-center mb-4 gap-5">
                        <div className="text-base font-semibold">Sort By</div>
                        <div className="flex gap-2">
                            <Select
                                defaultValue="Price"
                                className="w-44 flex justify-center items-center"
                                value={priceSort}
                                onSelect={(value) => {
                                    setPriceSort(value);
                                }}
                                options={[
                                    {
                                        value: 'asc',
                                        label: 'Price: Low to High',
                                    },
                                    {
                                        value: 'desc',
                                        label: 'Price: High to Low',
                                    },
                                ]}
                            />
                        </div>
                    </div>

                    {/* search result */}
                    {isProductLoading ? (
                        <Spin
                            tip="Loading featured products..."
                            className="justify-center w-full h-full"
                            size="large"
                        />
                    ) : (
                        <>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {productResponse?.result.data?.map(
                                    (featuredProducts: Product) => (
                                        <ProductCard
                                            key={featuredProducts.id}
                                            product={featuredProducts}
                                        />
                                    ),
                                )}
                            </div>
                            <div className="flex justify-center mt-12">
                                <Pagination
                                    current={productResponse?.result.page}
                                    total={productResponse?.result.total}
                                    pageSize={
                                        productResponse?.result.itemsPerPage
                                    }
                                    onChange={(page) => {
                                        setOptions({
                                            ...options,
                                            page: page,
                                        });
                                    }}
                                    size="default"
                                />
                            </div>
                        </>
                    )}
                </Card>
            </Content>
        </Layout>
    );
}

export default Search;
