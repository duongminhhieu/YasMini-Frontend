import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Tabs, TabsProps } from 'antd';
import CategoriesTable from '../../components/CategoriesTable';
import CategoriesUnPublishTable from '../../components/CategoriesUnPublishTable';
import { useNavigate } from 'react-router-dom';

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
        children: <CategoriesUnPublishTable />,
    },
];

function ViewCategoryList() {
    const navigate = useNavigate();

    return (
        <Card size="default" bordered={true} className="h-full">
            <div className="flex justify-between mb-4">
                <p className="text-2xl font-semibold">My Categories</p>
                <div className="flex justify-end">
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        size="large"
                        onClick={() => {
                            navigate('/admin/categories/new');
                        }}
                    >
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
