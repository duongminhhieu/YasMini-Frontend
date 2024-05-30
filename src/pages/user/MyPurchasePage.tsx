import { Breadcrumb } from 'antd';
import ViewPurchase from '../../features/user/MyPurchase/pages/View';
import { HomeOutlined } from '@ant-design/icons';

function MyPurchasePage() {
    return (
        <div>
            <Breadcrumb
                className="m-4"
                items={[
                    {
                        href: '/',
                        title: <HomeOutlined />,
                    },

                    {
                        title: 'My Purchase',
                    },
                ]}
            />
            <ViewPurchase />
        </div>
    );
}

export default MyPurchasePage;
