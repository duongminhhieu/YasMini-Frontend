import { Badge, FloatButton, Space } from 'antd';
import CategoryComponent from '../../components/Category';
import FeaturedProductsComponent from '../../components/FeaturedProducts';
import { FileSearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    return (
        <Space direction="vertical" size="middle">
            <CategoryComponent />
            <FeaturedProductsComponent />
            <div className="flex gap">
                <FloatButton.BackTop />

                <FloatButton
                    badge={{ dot: true }}
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
                    onClick={() => {
                        navigate('/search-by-image');
                    }}
                />
            </div>
        </Space>
    );
}

export default Home;
