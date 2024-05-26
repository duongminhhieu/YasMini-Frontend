import { PropsWithChildren } from 'react';
import { useAppSelector } from '../../../hooks/useRedux';
import { selectCurrentUser } from '../../../lib/redux/auth/authSlice';
import { User } from '../../../types/User';
import { Navigate } from 'react-router-dom';
import HeaderAdmin from '../../../layouts/admin/HeaderAdmin';
import FooterAdmin from '../../../layouts/admin/FooterAdmin';
import { Layout } from 'antd';

import SliderItemAdmin from '../../SliderItemAdmin';

type AdminRouteProps = PropsWithChildren;

function hasAdminRole(user: User) {
    return user.roles && user.roles.some((role) => role.name === 'ADMIN');
}

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
                    <SliderItemAdmin />
                    <Layout className="mt-4 mx-4 rounded-md drop-shadow-lg">
                        {children}
                    </Layout>
                </Layout>
                <FooterAdmin />
            </Layout>
        </>
    );
}
