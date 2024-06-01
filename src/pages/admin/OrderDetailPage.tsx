import { Navigate, useParams } from 'react-router-dom';
import OrderDetail from '../../features/admin/Order/pages/OrderDetail';

function OrderDetailPage() {
    const { id } = useParams<{ id: string }>();

    return id ? <OrderDetail id={id} /> : <Navigate to="/admin/orders" />;
}
export default OrderDetailPage;
