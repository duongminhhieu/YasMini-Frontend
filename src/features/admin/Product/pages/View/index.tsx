import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Tabs, TabsProps } from 'antd';
import ProductTable from '../../components/ProductTable';

const onChange = (key: string) => {
    console.log(key);
};

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'All Products',
        children: <ProductTable />,
    },
    {
        key: '2',
        label: 'Tab 2',
        children: 'Content of Tab Pane 2',
    },
    {
        key: '3',
        label: 'Tab 3',
        children: 'Content of Tab Pane 3',
    },
];

function ViewProductList() {
    return (
        <Card size="default" bordered={true} className="bg-red-400 h-full m-5">
            <div className="flex justify-between">
                <p className="text-2xl font-semibold">Product List</p>
                <div className="flex justify-end">
                    <Button type="primary" icon={<PlusOutlined />} size="large">
                        Add a New Product
                    </Button>
                </div>
            </div>

            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </Card>
    );
}

export default ViewProductList;
