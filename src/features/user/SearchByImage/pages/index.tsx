import { Card, Col, Empty, Image, Row, Spin, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import TableSearchByImage from '../components/TableSearchByImage';
import { useEffect, useState } from 'react';
import { Product } from '../../../../types/Product';
import { useSearchProductByImageMutation } from '../../../../lib/redux/yasminiai/yasminiAiApiSlice';
import { RcFile } from 'antd/es/upload';
import APIResponse from '../../../../types/APIResponse';

const { Dragger } = Upload;

function SearchByImage() {
    // state
    const [productData, setProductData] = useState<Product[]>([]);
    const [imageUrl, setImageUrl] = useState<string | null>(null); // Add this line

    // query
    const [searchProductByImage, status] = useSearchProductByImageMutation();

    // useEffect

    useEffect(() => {
        if (status.isSuccess) {
            const data = status.data as APIResponse;
            setProductData(data.result as Product[]);
            message.success(
                'There are ' + data.result.length + ' products found!',
            );
        }

        if (status.isError) {
            const error = status.error as { data: APIResponse };
            message.error(error.data.message);
        }
    }, [status]);

    // handlers
    const handleUpload = async ({ file, onSuccess, onError }: any) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            await searchProductByImage(formData);
            onSuccess(null, file);

            // Add these lines
            const url = URL.createObjectURL(file);
            setImageUrl(url);
        } catch (error) {
            onError(error);
        }
    };

    const beforeUpload = (file: RcFile) => {
        const isLt5M = file.size / 1024 / 1024 < 2;
        if (!isLt5M) {
            message.error('Image must smaller than 2MB!');
        }

        const isImage = file.type.includes('image');

        const isWebp = file.type.includes('webp');

        if (isWebp) {
            message.error('You can not upload webp file!');
        }

        if (!isImage) {
            message.error('You can only upload image file!');
        }

        return isLt5M && isImage && !isWebp;
    };

    return (
        <>
            <Card
                title={
                    <div className="flex justify-center items-center flex-col text-2xl">
                        Search by Image
                        <span className="text-xs">
                            (The power by YasMini AI 🪄)
                        </span>
                    </div>
                }
            >
                <Row gutter={16} className="mt-4">
                    <Col span={6}>
                        <div className="h-fit">
                            <Dragger
                                customRequest={handleUpload}
                                beforeUpload={beforeUpload}
                                maxCount={8}
                                showUploadList={false}
                                multiple={false}
                            >
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">
                                    Click or drag file to this area to upload
                                </p>
                                <p className="ant-upload-hint">
                                    Support for a single or bulk upload.
                                    Strictly prohibited from uploading company
                                    data or other banned files.
                                </p>
                            </Dragger>
                            <Card className="mt-4">
                                {imageUrl ? <Image src={imageUrl} /> : null}
                            </Card>
                        </div>
                    </Col>
                    <Col span={18}>
                        {status.isLoading ? (
                            <Spin className="flex justify-center items-center h-full"></Spin>
                        ) : productData.length > 0 ? (
                            <TableSearchByImage productData={productData} />
                        ) : (
                            <Empty></Empty>
                        )}
                    </Col>
                </Row>
            </Card>
        </>
    );
}

export default SearchByImage;
