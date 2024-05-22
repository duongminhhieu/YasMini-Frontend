import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import APIResponse from '../../../../../types/APIResponse';
import { InternalErrorCode } from '../../../../../utils/InternalErrorCode';
import { useCreateCategoryMutation } from '../../../../../lib/redux/category/categoryApiSlice';
import {
    Breadcrumb,
    Button,
    Card,
    Form,
    GetProp,
    Image,
    Input,
    Upload,
    UploadFile,
    UploadProps,
    message,
} from 'antd';
import { HomeOutlined, PlusOutlined, ProductOutlined } from '@ant-design/icons';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

function AddNewProduct() {
    // state
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    // query
    const [createCategory, status] = useCreateCategoryMutation();

    const navigate = useNavigate();

    // effect
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

    // Handlers

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (
        <Card size="default" bordered={true} className="h-full">
            <Breadcrumb
                items={[
                    {
                        href: '/admin',
                        title: <HomeOutlined />,
                    },
                    {
                        href: '/admin/products',
                        title: (
                            <>
                                <ProductOutlined />
                                <span>My Products</span>
                            </>
                        ),
                    },
                    {
                        title: 'Add New Product',
                    },
                ]}
            />

            <Card title="Basic Information" className="mt-8">
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    name="nest-messages"
                    className="m-8 justify-center items-center w-full"
                >
                    <Form.Item
                        label="Product Images"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        required
                    >
                        <Upload
                            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                        >
                            {fileList.length >= 8 ? null : uploadButton}
                        </Upload>
                        {previewImage && (
                            <Image
                                wrapperStyle={{ display: 'none' }}
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) =>
                                        setPreviewOpen(visible),
                                    afterOpenChange: (visible) =>
                                        !visible && setPreviewImage(''),
                                }}
                                src={previewImage}
                            />
                        )}
                    </Form.Item>
                </Form>
            </Card>
        </Card>
    );
}

export default AddNewProduct;
