import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Tabs, TabsProps } from 'antd';
import ProductTable from '../../components/ProductTable';
import { useNavigate } from 'react-router-dom';

const items: TabsProps['items'] = [
    {
        key: 'allProducts',
        label: 'All Products',
        children: <ProductTable />,
    },
    {
        key: 'unPublished',
        label: 'Unpublished',
        children: <ProductTable />,
    },
];

function ViewProductList() {
    const navigate = useNavigate();

    return (
        <Card size="default" bordered={true} className="h-full">
            <div className="flex justify-between mb-4">
                <p className="text-2xl font-semibold">My Products</p>
                <div className="flex justify-end">
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        size="large"
                        onClick={() => {
                            navigate('/admin/products/new');
                        }}
                    >
                        Add a New Product
                    </Button>
                </div>
            </div>

            <Tabs defaultActiveKey="1" items={items} size="large" />
        </Card>
    );
}

export default ViewProductList;
