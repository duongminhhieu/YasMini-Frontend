import { Card, Pagination, Spin } from 'antd';
import Title from 'antd/es/typography/Title';
import { useGetProductsQuery } from '../../../../../lib/redux/product/productApiSlice';
import { useEffect, useState } from 'react';
import { Product, ProductParams } from '../../../../../types/Product';
import ProductCard from '../../../../../components/common/ProductCard';

type PaginationParams = {
    current: number;
    pageSize: number;
    total: number;
};

function FeaturedProductsComponent() {
    // state
    const [options, setOptions] = useState<ProductParams>({
        page: 1,
        itemsPerPage: 20,
        name: '',
        isAvailable: true,
        isFeatured: true,
        categoryIds: [],
        minPrice: null,
        maxPrice: null,
        minRating: null,
        orderBy: ['price'],
        sortBy: 'asc',
    });
    const [pagination, setPagination] = useState<PaginationParams>({
        current: 1,
        pageSize: 1,
        total: 1,
    });

    // hooks
    const { data: featuredProducts, isLoading: isFeaturedProductsLoading } =
        useGetProductsQuery(options);

    // effect
    useEffect(() => {
        if (featuredProducts) {
            console.log('featuredProducts', featuredProducts);
            setPagination({
                current: featuredProducts?.result.page || 1,
                pageSize: featuredProducts?.result.itemsPerPage || 1,
                total: featuredProducts?.result.total || 1,
            });
        }
    }, [featuredProducts]);

    return (
        <Card
            title={
                <Title level={5}>
                    <div className="text-red-600">🔥 FEATURED PRODUCTS 🔥</div>
                </Title>
            }
        >
            {isFeaturedProductsLoading ? (
                <Spin
                    tip="Loading featured products..."
                    className="justify-center w-full h-full"
                    size="large"
                />
            ) : (
                <>
                    <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                        {featuredProducts?.result.data?.map(
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
                            current={pagination.current}
                            total={pagination.total}
                            pageSize={pagination.pageSize}
                            onChange={(page, pageSize) => {
                                setOptions({
                                    ...options,
                                    page: page,
                                    itemsPerPage: pageSize,
                                });
                            }}
                            size="default"
                        />
                    </div>
                </>
            )}
        </Card>
    );
}

export default FeaturedProductsComponent;
