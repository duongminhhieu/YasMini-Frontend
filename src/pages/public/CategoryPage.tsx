import { Navigate, useParams } from 'react-router-dom';
import ListProductOfCategory from '../../features/public/ListProductOfCategory/pages';

function CategoryPage() {
    const { categorySlug } = useParams();
    return categorySlug ? (
        <ListProductOfCategory categorySlug={categorySlug} />
    ) : (
        <Navigate to="/" />
    );
}

export default CategoryPage;
