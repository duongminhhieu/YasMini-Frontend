import { Card } from 'antd';
import ManageUserTable from '../../components/ManageUserTable';

function ManageListUser() {
    return (
        <Card size="default" bordered={true} className="h-full">
            <div className="flex justify-between mb-4">
                <p className="text-2xl font-semibold">My Customers</p>
            </div>

            <ManageUserTable />
        </Card>
    );
}

export default ManageListUser;
