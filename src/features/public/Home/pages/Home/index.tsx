import { Space } from 'antd';
import CategoryComponent from '../../components/Category';
import FeaturedProductsComponent from '../../components/FeaturedProducts';

function Home() {
    return (
        <Space direction="vertical" size="middle">
            <CategoryComponent />
            <FeaturedProductsComponent />
        </Space>
    );
}

export default Home;
