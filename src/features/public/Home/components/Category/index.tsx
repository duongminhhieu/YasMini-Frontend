import { Card } from 'antd';
import { useGetAllCategoriesQuery } from '../../../../../lib/redux/product/productApiSlice';
import { Category } from '../../../../../types/Category';
import { useNavigate } from 'react-router-dom';
import Title from 'antd/es/typography/Title';

const gridStyle: React.CSSProperties = {
    width: '16.66666%',
    textAlign: 'center',
};

function CategoryComponent() {
    // hooks
    const { data: categoryList } = useGetAllCategoriesQuery();
    const navigate = useNavigate();

    return (
        <Card
            title={
                <Title level={5}>
                    <div className="text-gray-600">CATEGORIES</div>
                </Title>
            }
        >
            {categoryList?.result &&
                categoryList.result.map((category: Category) => (
                    <Card.Grid
                        style={gridStyle}
                        key={category.id}
                        className="cursor-pointer hover:border-blue-600"
                        onClick={() => {
                            navigate(`/categories/${category.slug}`);
                        }}
                    >
                        {category.name}
                    </Card.Grid>
                ))}
        </Card>
    );
}

export default CategoryComponent;
