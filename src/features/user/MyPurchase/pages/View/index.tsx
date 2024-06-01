import { Card } from 'antd';
import TableAllPurchaseComponent from '../../components/AllPurchaseTable';

function ViewPurchase() {
    return (
        <Card
            title={
                <div className="flex items-center justify-center m-4">
                    <p className=" text-2xl font-medium ">My Purchase</p>
                </div>
            }
            className="min-h-screen"
        >
            <TableAllPurchaseComponent />
        </Card>
    );
}

export default ViewPurchase;
