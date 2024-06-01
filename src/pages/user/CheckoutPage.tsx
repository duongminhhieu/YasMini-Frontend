import { Button, Card, Result } from 'antd';
import Checkout from '../../features/user/Order/pages/Checkout';
import { Link, useLocation } from 'react-router-dom';

function CheckoutPage() {
    const location = useLocation();
    const { cartIds } = (location.state as { cartIds: string[] }) || {
        cartIds: [],
    };

    return (
        <Card
            title={
                <div className="flex items-center justify-center m-4">
                    <p className=" text-2xl font-semibold ">Check out</p>
                </div>
            }
            className="min-h-screen"
        >
            {cartIds.length === 0 && (
                <Result
                    title="No items in cart"
                    extra={
                        <Link to={'/cart'}>
                            <Button type="primary">Go to Cart</Button>
                        </Link>
                    }
                />
            )}

            {cartIds.length > 0 && <Checkout cartIds={cartIds} />}
        </Card>
    );
}

export default CheckoutPage;
