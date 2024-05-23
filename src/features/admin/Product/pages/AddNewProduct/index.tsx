import { useEffect, useState } from 'react';

import {
    Breadcrumb,
    Button,
    Card,
    Form,
    GetProp,
    Image,
    Input,
    InputNumber,
    Select,
    SelectProps,
    Upload,
    UploadFile,
    UploadProps,
    message,
} from 'antd';
import { HomeOutlined, PlusOutlined, ProductOutlined } from '@ant-design/icons';
import {
    useGetAllCategoriesQuery,
    useStoreImageMutation,
} from '../../../../../lib/redux/product/productApiSlice';
import APIResponse from '../../../../../types/APIResponse';
import { RcFile } from 'antd/es/upload';
import { Category } from '../../../../../types/Category';

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
    const [selectCategoryOptions, setSelectCategoryOptions] = useState<
        SelectProps['options']
    >([]);

    // query
    const [uploadProductImage, status] = useStoreImageMutation();
    const { data, isLoading } = useGetAllCategoriesQuery();

    // effect
    useEffect(() => {
        if (status.isSuccess) {
            message.success('Upload image success');
        }
        if (status.isError) {
            message.error('Upload image failed');
        }
    }, [status.isSuccess, status.isError]);

    useEffect(() => {
        console.log(fileList);
    }, [fileList]);

    useEffect(() => {
        if (data) {
            setSelectCategoryOptions(
                data.result.map((category: Category) => ({
                    label: category.name,
                    value: category.id,
                })),
            );
        }
    }, [data]);

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

    const handleUpload = async ({ file, onSuccess, onError }: any) => {
        const formData = new FormData();
        formData.append('file', file);

        // Add the file to the fileList right away
        setFileList((oldFileList) => [...oldFileList, file]);

        try {
            const response = (await uploadProductImage(
                formData,
            ).unwrap()) as APIResponse;

            const newFile: UploadFile = {
                name: response.result.name,
                size: response.result.size,
                type: response.result.type,
                url: response.result.url,
                ...file,
            };
            newFile.uid = response.result.id;

            // Replace the old file with the new file in the fileList
            setFileList((oldFileList) =>
                oldFileList.map((oldFile) =>
                    oldFile === file ? newFile : oldFile,
                ),
            );

            onSuccess(null, newFile);
        } catch (error) {
            message.error(`${file.name} file upload failed.`);
            onError(error);
            // Remove the file from the fileList if the upload fails
            setFileList((oldFileList) =>
                oldFileList.filter((oldFile) => oldFile !== file),
            );
        }
    };

    const handleRemove = (file: UploadFile) => {
        const newFileList = fileList.filter((item) => item.uid !== file.uid);
        setFileList(newFileList);
    };

    const beforeUpload = (file: RcFile) => {
        const isLt5M = file.size / 1024 / 1024 < 2;
        if (!isLt5M) {
            message.error('Image must smaller than 2MB!');
        }
        return isLt5M;
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Add Image</div>
            <div>({fileList.length}/8)</div>
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

            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                name="nest-messages"
                className="justify-center items-center w-full"
            >
                <Card title="Basic Information" className="mt-8">
                    <Form.Item
                        label="Product Images"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        required
                    >
                        <Upload
                            customRequest={handleUpload}
                            beforeUpload={beforeUpload}
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onRemove={handleRemove}
                            maxCount={8}
                            multiple
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

                    <Form.Item
                        label="Product Name"
                        name="productName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input product name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Slug"
                        name="slug"
                        rules={[
                            {
                                required: true,
                                message: 'Please input slug!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[
                            {
                                required: true,
                                message: 'Please input category!',
                            },
                        ]}
                    >
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            tokenSeparators={[',']}
                            options={selectCategoryOptions}
                            loading={isLoading}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Please input description!',
                            },
                        ]}
                    >
                        <Input.TextArea showCount maxLength={3000} rows={8} />
                    </Form.Item>
                </Card>

                <Card title="Product Attribute" className="mt-8">
                    <Form.Item
                        label="Product Attribute"
                        name="productAttribute"
                        rules={[
                            {
                                required: true,
                                message: 'Please input !',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Card>

                <Card title="Product Inventory" className="mt-8">
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Please input price!',
                            },
                        ]}
                    >
                        <InputNumber<number>
                            defaultValue={1000}
                            required
                            formatter={(value) =>
                                `$ ${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ',',
                                )
                            }
                            parser={(value) =>
                                value?.replace(
                                    /\$\s?|(,*)/g,
                                    '',
                                ) as unknown as number
                            }
                            min={100}
                            className="w-full"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Quantity"
                        name="quantity"
                        rules={[
                            {
                                required: true,
                                message: 'Please input quantity!',
                            },
                        ]}
                    >
                        <InputNumber
                            required
                            defaultValue={1}
                            className="w-full"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Sku Code"
                        name="sku"
                        rules={[
                            {
                                required: true,
                                message: 'Please input SKU CODE!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Card>

                <Form.Item
                    wrapperCol={{ offset: 2 }}
                    className="mt-8 flex justify-end items-center"
                >
                    <div className="flex justify-end">
                        <Button
                            type="default"
                            className="mr-2"
                            onClick={() => {
                                window.history.back();
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={status.isLoading}
                        >
                            Save and Publish
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default AddNewProduct;
