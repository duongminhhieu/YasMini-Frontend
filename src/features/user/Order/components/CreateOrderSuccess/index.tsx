import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

function CreateOrderSuccessComponent({ orderNumber }: { orderNumber: string }) {
    return (
        <Result
            status="success"
            title="Successfully Created Order!"
            subTitle={`Order number: ${orderNumber} The seller will contact you soon!`}
            extra={[
                <Link to="/purchase" type="primary" key="console">
                    <Button type="primary">Go Purchase</Button>
                </Link>,
                <Link to="/">
                    <Button type="default">Go Home</Button>
                </Link>,
            ]}
        />
    );
}

export default CreateOrderSuccessComponent;
