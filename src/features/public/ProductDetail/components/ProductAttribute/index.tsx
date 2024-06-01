import { Button, Space } from 'antd';
import { ProductAttributes } from '../../../../../types/Product';

function ProductAttributeComponent({
    attributes,
}: {
    attributes: ProductAttributes[];
}) {
    return (
        <>
            {attributes.map((attribute) => {
                return (
                    <div
                        key={attribute.id}
                        className="flex flex-col gap-2 text-gray-700"
                    >
                        <div className="flex justify-start items-center gap-7">
                            <span className="font-medium text-gray-500 col-span-1">
                                {attribute.name}:
                            </span>
                            <Space
                                className="ml-8"
                                direction="horizontal"
                                size="small"
                            >
                                {attribute.values.map((value) => {
                                    return (
                                        <Button className="">
                                            {value.value}
                                        </Button>
                                    );
                                })}
                            </Space>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default ProductAttributeComponent;
