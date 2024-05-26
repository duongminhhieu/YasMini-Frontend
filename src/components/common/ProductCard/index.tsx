import { Card, Rate, Tag } from 'antd';
import { convertToDollar } from '../../../utils/convert';
import { Product } from '../../../types/Product';
import Paragraph from 'antd/es/typography/Paragraph';

// ...

function ProductCard({ product }: { product: Product }) {
    return (
        <Card
            hoverable
            className="w-full h-full"
            cover={
                <img
                    alt={product?.name}
                    src={product?.images[0]?.url}
                    className="h-48 w-full object-cover"
                />
            }
        >
            <div className="flex flex-col">
                <Paragraph
                    ellipsis={{ rows: 2, expandable: false }}
                    className="text-semibold h-12"
                >
                    {product?.name}
                </Paragraph>

                <div className="flex flex-col justify-around h-full">
                    {product?.isFeatured && (
                        <Tag
                            icon={'🔥 '}
                            color="orange"
                            className="w-1/3 text-xs mb-1"
                        >
                            Hot
                        </Tag>
                    )}
                    <div className="flex justify-around">
                        <p className=" text-red-500 font-semibold">
                            {convertToDollar(product?.price)}
                        </p>
                        <p className="line-through text-gray-500">
                            {convertToDollar(product?.price + 4000)}
                        </p>
                    </div>

                    <div className="flex justify-around mt-1">
                        <Rate
                            disabled
                            allowHalf
                            className="text-xs"
                            defaultValue={product?.averageRating}
                        />

                        <div>
                            <p className="text-xs text-gray-500">
                                {product?.quantity} in stock
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default ProductCard;
