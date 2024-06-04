import { Card } from 'antd';
import ProductCard from '../../../../../components/common/ProductCard';
import { Product } from '../../../../../types/Product';
import Title from 'antd/es/typography/Title';
function TableSearchByImage({ productData }: { productData: Product[] }) {
    // state

    // hooks

    // effect

    return (
        <Card
            title={
                <Title level={4}>
                    <div>
                        {' '}
                        Search Result:{' '}
                        <span className="text-green-600">
                            {productData.length} results
                        </span>
                    </div>
                </Title>
            }
        >
            <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {productData?.map((featuredProducts: Product) => (
                        <ProductCard
                            key={featuredProducts.id}
                            product={featuredProducts}
                        />
                    ))}
                </div>
            </>
        </Card>
    );
}

export default TableSearchByImage;
