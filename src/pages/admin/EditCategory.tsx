import { Navigate, useParams } from 'react-router-dom';
import EditCategory from '../../features/admin/Catogory/pages/EditCategory';

function EditCategoryPage() {
    const { id } = useParams<{ id: string }>();
    return id ? <EditCategory id={id} /> : <Navigate to="/admin/categories" />;
}

export default EditCategoryPage;
