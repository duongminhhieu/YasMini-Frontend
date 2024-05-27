import { useParams } from 'react-router-dom';

function CategoryPage() {
    const { categorySlug } = useParams();
    return <div>CategoryPage:: {categorySlug}</div>;
}

export default CategoryPage;
