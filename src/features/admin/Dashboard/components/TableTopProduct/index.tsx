import { Divider, Image, List } from 'antd';
import { Product } from '../../../../../types/Product';
import { convertToDollar } from '../../../../../utils/convert';

function TableTopProductComponent({ topProducts }: { topProducts: Product[] }) {
    return (
        <>
            <Divider>Top Products</Divider>
            <List
                itemLayout="horizontal"
                bordered
                size="small"
                dataSource={topProducts}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={
                                <Image src={item.thumbnail || ''} width={80} />
                            }
                            title={
                                <a href={'/admin/products/' + item.id}>
                                    {item.name} {item.isFeatured && '🔥'}
                                </a>
                            }
                            description={
                                <div className="flex justify-between text-xs">
                                    <span>{item.quantity + ' in stock'}</span>
                                    <span className="text-green-600">
                                        {convertToDollar(item.price)}
                                    </span>
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
        </>
    );
}

export default TableTopProductComponent;
