import { FloatButton, Space } from 'antd';
import CategoryComponent from '../../components/Category';
import FeaturedProductsComponent from '../../components/FeaturedProducts';
import { FileSearchOutlined } from '@ant-design/icons';

function Home() {
    return (
        <Space direction="vertical" size="middle">
            <CategoryComponent />
            <FeaturedProductsComponent />
            <FloatButton.BackTop />
            <FloatButton
                shape="square"
                className="w-fit"
                description={
                    <div className="m-3">
                        <div className="text-sm">
                            {' '}
                            <FileSearchOutlined />
                            <span className="ml-2">Search by Image 🪄</span>
                        </div>
                        <div className="text-xs">
                            (The power by YasMini AI 🤖)
                        </div>
                    </div>
                }
                tooltip="Search by Image"
                href="/search-by-image"
            />
        </Space>
    );
}

export default Home;
