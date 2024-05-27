import { Button, Card, Checkbox, Flex, Form, Input, Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import FooterUser from '../../../../layouts/user/FooterUser';
import BannerIntroductionComponent from '../components/BannerIntroduction';
import { useRegisterMutation } from '../../../../lib/redux/auth/authApiSlice';
import { UserRegister } from '../../../../types/User';

function RegisterUser() {
    // form
    const [form] = Form.useForm();

    // hooks
    const [doRegister, statusRegister] = useRegisterMutation();

    // handlers
    const onFinish = async (values: UserRegister) => {
        await doRegister(values);
    };

    return (
        <Layout className="min-h-screen">
            <Header className="bg-white drop-shadow-md flex items-center justify-between lg:h-20">
                <Flex className="items-center">
                    <img src="/YasMiniLogo.png" className="w-24 mr-2" alt="" />
                    <h1 className="text-2xl font-semibold text-dark">
                        YasMini - Car Shop
                    </h1>
                </Flex>
                <h2 className="flex items-center font-semibold text-lg">
                    Sign Up
                </h2>
            </Header>
            <Content className="lg:flex justify-center items-center m-8">
                <Card className="w-1/2">
                    <BannerIntroductionComponent />

                    <Form
                        layout="vertical"
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        className="w-full"
                        scrollToFirstError
                    >
                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (
                                            !value ||
                                            getFieldValue('password') === value
                                        ) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error(
                                                'The new password that you entered do not match!',
                                            ),
                                        );
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="firstName"
                            label="First Name"
                            tooltip="Expample: John Wick. First Name is John."
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your first name!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="lastName"
                            label="Last Name"
                            tooltip="Expample: John Wick. Last Name is Wick."
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your last name!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="agreement"
                            valuePropName="checked"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        value
                                            ? Promise.resolve()
                                            : Promise.reject(
                                                  new Error(
                                                      'Should accept agreement',
                                                  ),
                                              ),
                                },
                            ]}
                        >
                            <Checkbox>
                                I have read the <a href="">agreement</a>
                            </Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="w-full"
                                loading={statusRegister.isLoading}
                            >
                                Register
                            </Button>
                        </Form.Item>

                        <div className="text-sm text-gray-500">
                            Have an account?{' '}
                            <a href="/login" className="text-blue-500">
                                Log In
                            </a>
                        </div>
                    </Form>
                </Card>
            </Content>
            <FooterUser />
        </Layout>
    );
}

export default RegisterUser;
