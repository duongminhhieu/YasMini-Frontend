import { Card, Pagination, Spin } from 'antd';
import Title from 'antd/es/typography/Title';
import { useGetProductsQuery } from '../../../../../lib/redux/product/productApiSlice';
import { useState } from 'react';
import { Product, ProductParams } from '../../../../../types/Product';
import ProductCard from '../../../../../components/common/ProductCard';

function FeaturedProductsComponent() {
    // state
    const [options, setOptions] = useState<ProductParams>({
        page: 1,
        itemsPerPage: 12,
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

    // hooks
    const { data: featuredProducts, isLoading: isFeaturedProductsLoading } =
        useGetProductsQuery(options);

    // effect

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
                            current={featuredProducts?.result?.page}
                            total={featuredProducts?.result?.total || 0}
                            pageSize={
                                featuredProducts?.result?.itemsPerPage || 1
                            }
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
