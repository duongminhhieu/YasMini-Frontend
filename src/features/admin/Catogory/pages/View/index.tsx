import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Tabs, TabsProps } from 'antd';
import CategoriesTable from '../../components/CategoriesTable';

const onChange = (key: string) => {
    console.log(key);
};

const items: TabsProps['items'] = [
    {
        key: 'allCategories',
        label: 'All Categories',
        children: <CategoriesTable />,
    },
    {
        key: 'unPublished',
        label: 'Unpublished',
        children: 'Content of Tab Pane 2',
    },
];

function ViewCategoryList() {
    return (
        <Card size="default" bordered={true} className="h-full">
            <div className="flex justify-between mb-4">
                <p className="text-2xl font-semibold">My Categories</p>
                <div className="flex justify-end">
                    <Button type="primary" icon={<PlusOutlined />} size="large">
                        Add a New Category
                    </Button>
                </div>
            </div>

            <Tabs
                defaultActiveKey="1"
                items={items}
                onChange={onChange}
                size="large"
            />
        </Card>
    );
}

export default ViewCategoryList;
