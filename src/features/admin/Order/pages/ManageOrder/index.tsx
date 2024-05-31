import { Card } from 'antd';
import TableListOrderComponent from '../../components/TableListOrder';

function ManageOrder() {
    return (
        <Card size="default" bordered={true} className="h-full">
            <div className="flex justify-between mb-4">
                <p className="text-2xl font-semibold">My Orders</p>
            </div>

            <div className="mt-8">
                <TableListOrderComponent />
            </div>
        </Card>
    );
}

export default ManageOrder;
