import { Navigate, useParams } from 'react-router-dom';
import EditProduct from '../../features/admin/Product/pages/EditProduct';

function EditProductPage() {
    const { id } = useParams<{ id: string }>();
    return id ? <EditProduct id={id} /> : <Navigate to="/admin/products" />;
}

export default EditProductPage;
