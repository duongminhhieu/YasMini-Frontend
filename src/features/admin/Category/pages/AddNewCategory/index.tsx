import { Breadcrumb, Button, Card, Form, Input, message } from 'antd';
import { useCreateCategoryMutation } from '../../../../../lib/redux/category/categoryApiSlice';
import { useEffect } from 'react';
import APIResponse from '../../../../../types/APIResponse';
import { InternalErrorCode } from '../../../../../utils/InternalErrorCode';
import { useNavigate } from 'react-router-dom';
import { FilterOutlined, HomeOutlined } from '@ant-design/icons';

function AddNewCategory() {
    const [createCategory, status] = useCreateCategoryMutation();

    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        console.log('Success:', values);
        await createCategory(values);
    };

    useEffect(() => {
        if (status.isSuccess) {
            message.success('Create category success');
            // redirect to category list
            navigate('/admin/categories');
        }
        if (status.isError) {
            const error = status.error as { data: APIResponse };
            console.log('error', error);
            if (
                error?.data.internalCode ===
                InternalErrorCode.SLUG_ALREADY_EXISTS
            ) {
                message.error('Slug already exists');
            } else {
                message.error('Create category failed');
            }
        }
    }, [status.error, status.isSuccess]);

    return (
        <Card size="default" bordered={true} className="h-full">
            <Breadcrumb
                items={[
                    {
                        href: '/admin',
                        title: <HomeOutlined />,
                    },
                    {
                        href: '/admin/categories',
                        title: (
                            <>
                                <FilterOutlined />
                                <span>My Categories</span>
                            </>
                        ),
                    },
                    {
                        title: 'Add New Category',
                    },
                ]}
            />

            <Card title="Basic Information" className="mt-8">
                <Form
                    labelCol={{ span: 2 }}
                    wrapperCol={{ span: 16 }}
                    name="nest-messages"
                    onFinish={onFinish}
                    className="m-8 justify-center items-center w-full"
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                            { required: true, message: 'Please input name' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="slug"
                        label="Slug"
                        rules={[
                            { required: true, message: 'Please input slug' },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[
                            {
                                required: true,
                                message: 'Please input description',
                            },
                        ]}
                    >
                        <Input.TextArea
                            showCount
                            maxLength={100}
                            autoSize={{ minRows: 3, maxRows: 6 }}
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 2 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={status.isLoading}
                        >
                            Save and Publish Category
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Card>
    );
}

export default AddNewCategory;
