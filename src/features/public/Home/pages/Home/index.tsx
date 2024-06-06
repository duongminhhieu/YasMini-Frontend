import { FloatButton, Space } from 'antd';
import CategoryComponent from '../../components/Category';
import FeaturedProductsComponent from '../../components/FeaturedProducts';

function Home() {
    return (
        <Space direction="vertical" size="middle">
            <CategoryComponent />
            <FeaturedProductsComponent />
            <div className="flex gap">
                <FloatButton.BackTop />
            </div>
        </Space>
    );
}

export default Home;
