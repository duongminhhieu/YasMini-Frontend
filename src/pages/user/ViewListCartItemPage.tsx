import { Card } from 'antd';
import ViewCartList from '../../features/user/Cart/pages/View/indext';

function ViewListCartItemPage() {
    return (
        <Card
            title={
                <div className="flex items-center justify-center m-4">
                    <p className=" text-2xl font-medium ">Shopping Cart</p>
                </div>
            }
            className="min-h-screen"
        >
            <ViewCartList />
        </Card>
    );
}

export default ViewListCartItemPage;
