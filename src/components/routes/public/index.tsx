import { Layout } from 'antd';
import { PropsWithChildren } from 'react';
import HeaderPublic from '../../../layouts/public/HeaderPublic';
import FooterPublic from '../../../layouts/public/FooterPublic';

type PublicRouteProps = PropsWithChildren;

export default function PublicRoute({ children }: PublicRouteProps) {
    return (
        <>
            <Layout className="min-h-screen">
                <HeaderPublic />
                <Layout>
                    <Layout className="mt-4 mx-10 ">{children}</Layout>
                </Layout>
                <FooterPublic />
            </Layout>
        </>
    );
}
