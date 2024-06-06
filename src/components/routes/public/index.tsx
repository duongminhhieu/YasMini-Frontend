import { FloatButton, Layout } from 'antd';
import { PropsWithChildren } from 'react';
import HeaderPublic from '../../../layouts/public/HeaderPublic';
import FooterPublic from '../../../layouts/public/FooterPublic';
import { useAppSelector } from '../../../hooks/useRedux';
import { selectCurrentUser } from '../../../lib/redux/auth/authSlice';
import { User } from '../../../types/User';
import HeaderUser from '../../../layouts/user/HeaderUser';
import { FileSearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

type PublicRouteProps = PropsWithChildren;

function hasUserRole(user: User) {
    return user.roles && user.roles.some((role) => role.name === 'USER');
}

export default function PublicRoute({ children }: PublicRouteProps) {
    const userAuth = useAppSelector(selectCurrentUser);
    const navigate = useNavigate();

    return (
        <>
            <Layout className="min-h-screen">
                {userAuth && hasUserRole(userAuth) ? (
                    <HeaderUser />
                ) : (
                    <HeaderPublic />
                )}
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
                <FooterPublic />
            </Layout>
        </>
    );
}
