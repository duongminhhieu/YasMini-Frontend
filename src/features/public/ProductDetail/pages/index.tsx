import { Button, Card, Rate, Result, Space, Spin } from 'antd';
import { useGetProductBySlugQuery } from '../../../../lib/redux/product/productApiSlice';
import { Link } from 'react-router-dom';
import {
    MinusOutlined,
    PlusOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';
import CarouselImageComponents from '../components/CarouselImage';
import { convertToDollar } from '../../../../utils/convert';
import ProductAttributeComponent from '../components/ProductAttribute';
import { useState } from 'react';
import Paragraph from 'antd/es/typography/Paragraph';

function ProductDetail({ productSlug }: { productSlug: string }) {
    // state
    const [quantity, setQuantity] = useState(1);

    // hooks
    const {
        data: productResponse,
        isLoading: isProductLoading,
        isError: isProductError,
    } = useGetProductBySlugQuery(productSlug);

    // effect

    // handle functions

    // render
    if (isProductError) {
        return (
            <Result
                status="404"
                title="NOT FOUND"
                subTitle="Product not found"
                extra={
                    <Link to={'/'} type="primary">
                        Back Home
                    </Link>
                }
            />
        );
    }

    return (
        <Card>
            {isProductLoading ? (
                <div className="flex justify-center item-center">
                    <Space size="middle">
                        <Spin size="large" />
                    </Space>
                </div>
            ) : (
                <div className="min-h-screen">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <CarouselImageComponents
                            images={productResponse?.result.images}
                        />
                        <div className="p-4">
                            <h2 className="text-2xl font-bold mb-4">
                                {productResponse?.result.name}
                            </h2>
                            <Rate
                                disabled
                                allowHalf
                                defaultValue={productResponse?.result.rating}
                                className="mb-2"
                            />

                            <div className="flex justify-start gap-2">
                                <p className="line-through text-sm font-bold my-4 text-gray-500">
                                    {convertToDollar(
                                        productResponse?.result?.price + 4000,
                                    )}
                                </p>
                                <p className="text-xl font-bold my-4">
                                    {convertToDollar(
                                        productResponse?.result.price,
                                    )}
                                </p>
                            </div>

                            <Paragraph
                                className="mb-8"
                                ellipsis={{
                                    rows: 6,
                                    expandable: 'collapsible',
                                }}
                            >
                                {productResponse?.result.description}
                            </Paragraph>

                            <ProductAttributeComponent
                                attributes={productResponse?.result.attributes}
                            />

                            <div className="flex justify-start items-center mt-8 gap-10">
                                <span className="font-medium text-gray-500 col-span-1">
                                    Quantity:
                                </span>
                                <div>
                                    <Button
                                        onClick={() =>
                                            setQuantity(quantity - 1)
                                        }
                                        disabled={quantity <= 1}
                                        icon={<MinusOutlined />}
                                    />

                                    <span className="mx-4">{quantity}</span>

                                    <Button
                                        onClick={() =>
                                            setQuantity(quantity + 1)
                                        }
                                        disabled={
                                            quantity >=
                                            productResponse?.result.quantity
                                        }
                                        icon={<PlusOutlined />}
                                    />
                                    <span className="ml-4">
                                        {productResponse?.result.quantity} in
                                        stock
                                    </span>
                                </div>
                            </div>

                            <Button
                                type="primary"
                                className="w-36 font-semibold mt-8"
                                size="large"
                                icon={
                                    <ShoppingCartOutlined
                                        style={{ fontSize: '1.2rem' }}
                                    />
                                }
                            >
                                Add to cart
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </Card>
    );
}

export default ProductDetail;