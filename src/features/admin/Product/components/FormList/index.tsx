import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Space } from 'antd';

function FormList() {
    return (
        <Form.List name="attributes">
            {(fields, { add, remove }) => (
                <div
                    style={{
                        display: 'flex',
                        rowGap: 16,
                        flexDirection: 'column',
                    }}
                >
                    {fields.map((field) => (
                        <Card
                            size="small"
                            title={`Attribute ${field.name + 1}`}
                            key={field.key}
                            extra={
                                <CloseOutlined
                                    onClick={() => {
                                        remove(field.name);
                                    }}
                                />
                            }
                        >
                            <Form.Item
                                label="Name"
                                name={[field.name, 'name']}
                                required
                            >
                                <Input />
                            </Form.Item>

                            {/* Nest Form.List */}
                            <Form.Item label="Values" required>
                                <Form.List name={[field.name, 'values']}>
                                    {(subFields, subOpt) => (
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                rowGap: 16,
                                            }}
                                        >
                                            {subFields.map((subField) => (
                                                <Space key={subField.key}>
                                                    <Form.Item
                                                        noStyle
                                                        name={[
                                                            subField.name,
                                                            'value',
                                                        ]}
                                                    >
                                                        <Input placeholder="value" />
                                                    </Form.Item>
                                                </Space>
                                            ))}
                                            <Button
                                                type="dashed"
                                                onClick={() => subOpt.add()}
                                                block
                                            >
                                                + Add Value
                                            </Button>
                                        </div>
                                    )}
                                </Form.List>
                            </Form.Item>
                        </Card>
                    ))}

                    <Button type="dashed" onClick={() => add()} block>
                        + Add Attribute
                    </Button>
                </div>
            )}
        </Form.List>
    );
}

export default FormList;
