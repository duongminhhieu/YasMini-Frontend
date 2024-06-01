import { Navigate, useParams } from 'react-router-dom';
import ProductDetail from '../../features/public/ProductDetail/pages';

function ProductDetailPage() {
    const { productSlug } = useParams<{ productSlug: string }>();

    return productSlug ? (
        <ProductDetail productSlug={productSlug} />
    ) : (
        <Navigate to="/" />
    );
}

export default ProductDetailPage;
