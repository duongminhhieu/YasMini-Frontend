import {
    Button,
    Card,
    Checkbox,
    Flex,
    Form,
    FormProps,
    Input,
    Layout,
    message,
} from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import FooterUser from '../../../../layouts/user/FooterUser';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {
    AccountInfo,
    Credentials,
    useLoginMutation,
} from '../../../../lib/redux/auth/authApiSlice';
import BannerIntroductionComponent from '../components/BannerIntroduction';

type FieldType = {
    username: string;
    password: string;
    remember: boolean;
};

const LoginUser = () => {
    const [doLogin, statusLogin] = useLoginMutation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const credentials: Credentials = {
            email: values.username,
            password: values.password,
        };

        const accountInfo: AccountInfo = {
            credentials,
            rememberMe: values.remember,
        };
        setIsLoading(true);
        await doLogin(accountInfo);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
        errorInfo,
    ) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (statusLogin.isSuccess) {
            setIsLoading(false);
            message.success('Login success!');
            navigate('/admin');
        }
        if (statusLogin.error) {
            setIsLoading(false);
        }
    }, [statusLogin.error, statusLogin.isSuccess]);

    return (
        <Layout className="min-h-screen">
            <Header className="bg-white drop-shadow-md flex items-center justify-between lg:h-20">
                <Flex
                    className="items-center cursor-pointer"
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    <img src="/YasMiniLogo.png" className="w-24 mr-2" alt="" />
                    <h1 className="text-2xl font-semibold text-dark">
                        YasMini - Car Shop
                    </h1>
                </Flex>
                <h2 className="flex items-center font-semibold text-lg">
                    Sign In
                </h2>
            </Header>
            <Content className="lg:flex justify-center items-center m-8">
                <Card className="w-1/2">
                    <BannerIntroductionComponent />

                    <Form
                        name="normal_login"
                        className="login-form"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Email"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Email!',
                                },
                                {
                                    type: 'email',
                                    message: 'Please input a valid email!',
                                },
                            ]}
                        >
                            <Input
                                prefix={
                                    <UserOutlined className="site-form-item-icon" />
                                }
                                placeholder="Enter your email ..."
                            />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                                {
                                    min: 8,
                                    message:
                                        'Password must be at least 8 characters long!',
                                },
                            ]}
                        >
                            <Input.Password
                                prefix={
                                    <LockOutlined className="site-form-item-icon" />
                                }
                                type="password"
                                placeholder="Enter your password ..."
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item
                                name="remember"
                                valuePropName="checked"
                                noStyle
                            >
                                <Checkbox>Stay signed in</Checkbox>
                            </Form.Item>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                loading={isLoading}
                                type="primary"
                                htmlType="submit"
                                className="login-form-button w-full lg:w-full"
                            >
                                Log in
                            </Button>
                            <div className="mt-4">
                                Or{' '}
                                <a href="/register" className=" text-blue-500">
                                    register now!
                                </a>
                            </div>
                        </Form.Item>
                    </Form>
                </Card>
            </Content>
            <FooterUser />
        </Layout>
    );
};

export default LoginUser;
