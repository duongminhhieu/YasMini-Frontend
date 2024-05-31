import { useParams } from 'react-router-dom';
import OrderDetail from '../../features/admin/Order/pages/OrderDetail';

function OrderDetailPage() {
    const { id } = useParams<{ id: string }>();

    console.log(id);

    return (
        <>
            <OrderDetail />
        </>
    );
}

export default OrderDetailPage;
