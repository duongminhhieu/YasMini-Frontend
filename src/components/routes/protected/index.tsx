import { FloatButton, Layout } from 'antd';
import { PropsWithChildren } from 'react';
import HeaderUser from '../../../layouts/user/HeaderUser';
import FooterUser from '../../../layouts/user/FooterUser';
import { useAppSelector } from '../../../hooks/useRedux';
import { selectCurrentUser } from '../../../lib/redux/auth/authSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { User } from '../../../types/User';
import { FileSearchOutlined } from '@ant-design/icons';

type ProtectedRouteProps = PropsWithChildren;

function hasUserRole(user: User) {
    return user.roles && user.roles.some((role) => role.name === 'USER');
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const userAuth = useAppSelector(selectCurrentUser);
    const navigate = useNavigate();

    // if user is not logged in redirect to login page
    if (!userAuth?.id || !hasUserRole(userAuth)) {
        return <Navigate to="/login" />;
    }

    return (
        <Layout className="min-h-screen">
            <HeaderUser />
            <Layout>
                <Layout className="mt-4 mx-10 ">
                    {children}

                    <FloatButton
                        badge={{ dot: true }}
                        shape="square"
                        className="w-fit"
                        description={
                            <div className="m-3">
                                <div className="text-sm">
                                    {' '}
                                    <FileSearchOutlined />
                                    <span className="ml-2">
                                        Search by Image 🪄
                                    </span>
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
                </Layout>
            </Layout>
            <FooterUser />
        </Layout>
    );
}
