import { Layout } from 'antd';
import { PropsWithChildren } from 'react';
import HeaderPublic from '../../../layouts/public/HeaderPublic';
import FooterPublic from '../../../layouts/public/FooterPublic';
import { useAppSelector } from '../../../hooks/useRedux';
import { selectCurrentUser } from '../../../lib/redux/auth/authSlice';
import { User } from '../../../types/User';
import HeaderUser from '../../../layouts/user/HeaderUser';

type PublicRouteProps = PropsWithChildren;

function hasUserRole(user: User) {
    return user.roles && user.roles.some((role) => role.name === 'USER');
}

export default function PublicRoute({ children }: PublicRouteProps) {
    const userAuth = useAppSelector(selectCurrentUser);

    return (
        <>
            <Layout className="min-h-screen">
                {userAuth && hasUserRole(userAuth) ? (
                    <HeaderUser />
                ) : (
                    <HeaderPublic />
                )}
                <Layout>
                    <Layout className="mt-4 mx-10 ">{children}</Layout>
                </Layout>
                <FooterPublic />
            </Layout>
        </>
    );
}
