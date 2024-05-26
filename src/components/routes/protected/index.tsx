import { Layout } from 'antd';
import { PropsWithChildren } from 'react';
import HeaderUser from '../../../layouts/user/HeaderUser';
import FooterUser from '../../../layouts/user/FooterUser';

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
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
