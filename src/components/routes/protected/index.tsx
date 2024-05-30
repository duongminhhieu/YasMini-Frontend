import { Layout } from 'antd';
import { PropsWithChildren } from 'react';
import HeaderUser from '../../../layouts/user/HeaderUser';
import FooterUser from '../../../layouts/user/FooterUser';
import { useAppSelector } from '../../../hooks/useRedux';
import { selectCurrentUser } from '../../../lib/redux/auth/authSlice';
import { Navigate } from 'react-router-dom';
import { User } from '../../../types/User';

type ProtectedRouteProps = PropsWithChildren;

function hasUserRole(user: User) {
    return user.roles && user.roles.some((role) => role.name === 'USER');
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const userAuth = useAppSelector(selectCurrentUser);

    // if user is not logged in redirect to login page
    if (!userAuth?.id || !hasUserRole(userAuth)) {
        return <Navigate to="/login" />;
    }

    return (
        <Layout className="min-h-screen">
            <HeaderUser />
            <Layout>
                <Layout className="mt-4 mx-10 ">{children}</Layout>
            </Layout>
            <FooterUser />
        </Layout>
    );
}
