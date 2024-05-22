import { Breadcrumb, Button, Card, Form, Input, Switch, message } from 'antd';
import {
    useGetInfoCategoryQuery,
    useUpdateCategoryMutation,
} from '../../../../../lib/redux/category/categoryApiSlice';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { convertDate } from '../../../../../utils/convert';
import {
    CheckOutlined,
    CloseOutlined,
    FilterOutlined,
    HomeOutlined,
} from '@ant-design/icons';
import { InternalErrorCode } from '../../../../../utils/InternalErrorCode';
import APIResponse from '../../../../../types/APIResponse';

const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 16 },
};

function EditCategory({ id }: { id: string }) {
    // state
    const [form] = Form.useForm();

    // query
    const { data, isError } = useGetInfoCategoryQuery(id);
    const [updateCategory, status] = useUpdateCategoryMutation();

    const navigate = useNavigate();

    // effect
    useEffect(() => {
        if (isError) {
            message.error('Error when get category info');
            navigate('/admin/categories');
        }

        if (data) {
            form.setFieldsValue(data?.result);
        }
    }, [isError, data]);

    useEffect(() => {
        if (status.isSuccess) {
            message.success('Update category success');
            navigate('/admin/categories');
        }
        if (status.isError) {
            const error = status.error as { data: APIResponse };
            console.log('error', error);

            if (
                error.data.internalCode ===
                InternalErrorCode.SLUG_ALREADY_EXISTS
            ) {
                message.error('Slug already exists');
            } else {
                message.error('Update category failed');
            }
        }
    }, [status.error, status.isSuccess]);

    // handlers
    const onFinish = async (values: any) => {
        console.log('Category Update:', values);
        await updateCategory({ id, ...values });
    };

    return (
        <Card size="default" bordered={true} className="h-full">
            <div className="flex justify-between mb-8">
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
                            title: 'Category Details',
                        },
                    ]}
                />
            </div>
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                className="justify-center items-center w-full"
                form={form}
            >
                <Card
                    title="Category Information"
                    className="mb-4 border-gray-200 shadow-sm"
                >
                    <Form.Item name="id" label="ID">
                        <p className="font-semibold">{data?.result?.id}</p>
                    </Form.Item>
                    <Form.Item name="productCount" label="Products">
                        <p className="font-semibold">
                            {data?.result?.productCount}
                        </p>
                    </Form.Item>
                    <Form.Item name="createdBy" label="Created By">
                        <p className="font-semibold">
                            {data?.result?.createdBy}
                        </p>
                    </Form.Item>
                    <Form.Item name="createdDate" label="Created Date">
                        <p className="font-semibold">
                            {convertDate(data?.result?.createdDate)}
                        </p>
                    </Form.Item>
                    <Form.Item name="lastModifiedBy" label="Update By">
                        <p className="font-semibold">
                            {data?.result?.lastModifiedBy}
                        </p>
                    </Form.Item>
                    <Form.Item name="lastModifiedDate" label="Update Date">
                        <p className="font-semibold">
                            {convertDate(data?.result?.lastModifiedDate)}
                        </p>
                    </Form.Item>
                </Card>

                <Card
                    title="Category Update"
                    className="mb-4 border-gray-200 shadow-sm"
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
                    <Form.Item label="Publish" name="isAvailable">
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            defaultChecked={data?.result?.isAvailable}
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 3 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={status.isLoading}
                        >
                            Update
                        </Button>
                    </Form.Item>
                </Card>
            </Form>
        </Card>
    );
}

export default EditCategory;
