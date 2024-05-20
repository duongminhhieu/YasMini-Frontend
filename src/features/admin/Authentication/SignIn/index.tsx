import type { FormProps } from 'antd';
import {
    Button,
    Card,
    Checkbox,
    Flex,
    Form,
    Input,
    Layout,
    message,
} from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import {
    AccountInfo,
    Credentials,
    useLoginMutation,
} from '../../../../lib/redux/auth/authApiSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

type FieldType = {
    username: string;
    password: string;
    remember: boolean;
};

export default function SignIn() {
    const [doLogin, statusLogin] = useLoginMutation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        console.log('Success:', values);
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
            <Header className="bg-white drop-shadow-md flex items-center lg:h-20">
                <Flex className="items-center">
                    <img src="/YasMiniLogo.png" className="w-24 mr-2" alt="" />
                    <h1 className="text-2xl font-semibold text-dark">
                        YasMini - Car Shop
                    </h1>
                </Flex>
            </Header>
            <Content className="lg:flex justify-center items-center m-12">
                <Card className="w-auto">
                    <div className="flex flex-col justify-start items-start m-8">
                        <p className="text-xl font-normal text-center">
                            Welcome back to{' '}
                            <span className="text-xl font-medium text-center text-blue-500">
                                YasMini - Car Shop
                            </span>{' '}
                            Admin Panel
                        </p>

                        <p className="text-xl font-nomarl text-center mt-2">
                            Sign in to continue
                        </p>
                    </div>

                    <Form
                        name="normal_login"
                        className="login-form m-8"
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
                            <Input
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
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                loading={isLoading}
                                type="primary"
                                htmlType="submit"
                                className="login-form-button w-full lg:w-24"
                            >
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Content>
            <Footer className="flex justify-center">
                © 2024 YasMini. All rights reserved.
            </Footer>
        </Layout>
    );
}
