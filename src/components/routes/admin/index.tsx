import { PropsWithChildren } from 'react';
import { useAppSelector } from '../../../hooks/useRedux';
import { selectCurrentUser } from '../../../lib/redux/auth/authSlice';
import { User } from '../../../types/User';
import { Navigate } from 'react-router-dom';
import HeaderAdmin from '../../../layouts/admin/HeaderAdmin';
import FooterAdmin from '../../../layouts/admin/FooterAdmin';
import { Layout, Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import {
    AppstoreOutlined,
    FilterOutlined,
    ProductOutlined,
} from '@ant-design/icons';

type AdminRouteProps = PropsWithChildren;

function hasAdminRole(user: User) {
    return user.roles && user.roles.some((role) => role.name === 'ADMIN');
}

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        icon: <AppstoreOutlined />,
    },
    {
        key: '1',
        icon: <ProductOutlined />,
        label: 'Products',
        children: [
            { key: '1', label: 'Create' },
            { key: '2', label: 'List Product' },
        ],
    },
    {
        key: 'category',
        label: 'Categories',
        icon: <FilterOutlined />,
        children: [
            { key: '3', label: 'Create ' },
            { key: '4', label: 'List Category' },
        ],
    },
];

export default function AdminRoute({ children }: AdminRouteProps) {
    const userAuth = useAppSelector(selectCurrentUser);

    // if user is not logged in redirect to login page
    if (!userAuth?.id) {
        return <Navigate to="/admin/login" />;
    }

    // check if user is not admin redirect to forbidden page
    if (userAuth && !hasAdminRole(userAuth)) {
        return <Navigate to="/forbidden" />;
    }

    return (
        <>
            <Layout className="min-h-screen">
                <HeaderAdmin />
                <Layout>
                    <Sider
                        width="20%"
                        className="mr-2 mt-2 ml-2"
                        style={{ backgroundColor: 'transparent' }}
                    >
                        <Menu
                            className="h-full rounded-lg"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            items={items}
                            mode="inline"
                        />
                    </Sider>
                    <Layout className="bg-red-400 mt-2 ml-2 mr-2 rounded-md">
                        {children}
                    </Layout>
                </Layout>
                <FooterAdmin />
            </Layout>
        </>
    );
}
