import {
    Breadcrumb,
    Button,
    Card,
    Modal,
    Rate,
    Result,
    Space,
    Spin,
    Tag,
    message,
} from 'antd';
import { useGetProductBySlugQuery } from '../../../../lib/redux/product/productApiSlice';
import { Link, useNavigate } from 'react-router-dom';
import {
    HomeOutlined,
    MinusOutlined,
    PlusOutlined,
    ProductOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';
import CarouselImageComponents from '../components/CarouselImage';
import { convertToDollar } from '../../../../utils/convert';
import ProductAttributeComponent from '../components/ProductAttribute';
import { useEffect, useState } from 'react';
import Paragraph from 'antd/es/typography/Paragraph';
import ProductRatingComponent from '../components/ProductRating';
import { useAppSelector } from '../../../../hooks/useRedux';
import { selectCurrentUser } from '../../../../lib/redux/auth/authSlice';
import { useCreateCartMutation } from '../../../../lib/redux/cart/cartApiSlice';
import APIResponse from '../../../../types/APIResponse';
import { useDispatch } from 'react-redux';
import { addCart } from '../../../../lib/redux/cart/cartSlice';

function ProductDetail({ productSlug }: { productSlug: string }) {
    // redux, hooks
    const userAuth = useAppSelector(selectCurrentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // state
    const [quantity, setQuantity] = useState(1);

    //  query
    const {
        data: productResponse,
        isLoading: isProductLoading,
        isError: isProductError,
        refetch: refetchProduct,
    } = useGetProductBySlugQuery(productSlug);

    const [createCart, statusCreateCart] = useCreateCartMutation();

    // effect
    useEffect(() => {
        if (statusCreateCart.isSuccess) {
            message.success('Add to cart success');
            dispatch(addCart(statusCreateCart.data.result));
        }

        if (statusCreateCart.isError) {
            const error = statusCreateCart.error as { data: APIResponse };
            message.error(error.data.message);
        }
    }, [statusCreateCart]);

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

    const handleAddToCart = async () => {
        // check user is not login
        if (
            !userAuth ||
            (!userAuth?.id &&
                !userAuth?.roles?.some((role) => role.name === 'USER'))
        ) {
            Modal.confirm({
                title: 'You need to login to add to cart',
                content: 'Do you want to login now?',
                onOk() {
                    navigate('/login');
                },
            });
            return;
        } else {
            // create cart
            await createCart({
                productId: productResponse?.result.id,
                quantity: quantity,
            });
        }
    };

    if (!productResponse?.result?.isAvailable)
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

    return (
        <Card>
            <Breadcrumb
                className="mb-8"
                items={[
                    {
                        href: '/',
                        title: <HomeOutlined />,
                    },
                    {
                        title: (
                            <>
                                <ProductOutlined />
                                <span>
                                    {
                                        productResponse?.result.categories[0]
                                            ?.name
                                    }
                                </span>
                            </>
                        ),
                        onClick: () => {
                            navigate(
                                `/categories/${productResponse?.result.categories[0]?.slug}`,
                            );
                        },
                        className: 'cursor-pointer hover:text-blue-500',
                    },
                    {
                        title: `${productResponse?.result.name}`,
                    },
                ]}
            />
            {isProductLoading ? (
                <div className="flex justify-center item-center">
                    <Space size="middle">
                        <Spin size="large" />
                    </Space>
                </div>
            ) : (
                <Space
                    className="min-h-screen"
                    size="large"
                    direction="vertical"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <CarouselImageComponents
                            images={productResponse?.result.images}
                        />
                        <div className="p-4 pt-0">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-4">
                                {productResponse?.result.name}
                                <div>
                                    {productResponse?.result?.isFeatured && (
                                        <Tag
                                            icon={'🔥 '}
                                            color="orange"
                                            className=" text-base mb-1"
                                        >
                                            Hot 🔥
                                        </Tag>
                                    )}
                                </div>
                            </h2>
                            <Rate
                                disabled
                                allowHalf
                                value={productResponse?.result.averageRating}
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

                            {productResponse?.result.quantity <= 0 ? (
                                <Tag color="red" className="mt-4">
                                    Out of stock
                                </Tag>
                            ) : (
                                <Button
                                    type="primary"
                                    className="w-36 font-semibold mt-8"
                                    size="large"
                                    icon={
                                        <ShoppingCartOutlined
                                            style={{ fontSize: '1.2rem' }}
                                        />
                                    }
                                    onClick={handleAddToCart}
                                >
                                    Add to cart
                                </Button>
                            )}
                        </div>
                    </div>

                    <ProductRatingComponent
                        productId={productResponse?.result.id}
                        averageRating={productResponse?.result.averageRating}
                        refetchProduct={refetchProduct}
                    />
                </Space>
            )}
        </Card>
    );
}

export default ProductDetail;
