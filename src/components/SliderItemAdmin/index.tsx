import {
    AppstoreOutlined,
    FilterOutlined,
    InboxOutlined,
    ProductOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        icon: <AppstoreOutlined />,
    },
    {
        key: 'product',
        icon: <ProductOutlined />,
        label: 'Products',
        children: [
            { key: 'productList', label: 'My Products' },
            { key: 'addNewProduct', label: 'Add New Product' },
        ],
    },
    {
        key: 'category',
        label: 'Categories',
        icon: <FilterOutlined />,
        children: [
            { key: 'categoriesList', label: 'My Categories' },
            { key: 'addNewCategory', label: 'Add New Category ' },
        ],
    },
    {
        key: 'order',
        label: 'My Orders',
        icon: <InboxOutlined />,
        children: [
            { key: 'orderList', label: 'My Orders' },
            { key: 'addNewOrder', label: 'Add New Order' },
        ],
    },
    {
        key: 'user',
        label: 'Manage Customers',
        icon: <UserOutlined />,
        children: [{ key: 'userList', label: 'My Users' }],
    },
];

function SliderItemAdmin() {
    const navigate = useNavigate();

    const onClick: MenuProps['onClick'] = (e) => {
        switch (e.key) {
            case 'dashboard':
                navigate('/admin');
                break;
            case 'productList':
                navigate('/admin/products');
                break;

            case 'addNewProduct':
                navigate('/admin/products/new');
                break;
            case 'categoriesList':
                navigate('/admin/categories');
                break;
            case 'addNewCategory':
                navigate('/admin/categories/new');
                break;
            case 'userList':
                navigate('/admin/users');
                break;
            default:
                break;
        }
    };
    return (
        <Sider
            width="16%"
            className="ml-4 mt-4 drop-shadow-lg"
            style={{ backgroundColor: 'transparent' }}
        >
            <Menu
                className="h-full rounded-lg"
                defaultOpenKeys={['product', 'category']}
                defaultSelectedKeys={['dashboard']}
                items={items}
                onClick={onClick}
                mode="inline"
            />
        </Sider>
    );
}

export default SliderItemAdmin;
