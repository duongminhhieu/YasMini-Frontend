import { Navigate, useParams } from 'react-router-dom';
import OrderInfo from '../../features/user/MyPurchase/pages/OrderInfo';

function OrderInfoPage() {
    const { orderId } = useParams<{ orderId: string }>();

    return orderId ? (
        <OrderInfo orderId={orderId} />
    ) : (
        <Navigate to="/purchase" />
    );
}

export default OrderInfoPage;
