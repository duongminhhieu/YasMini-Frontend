import C404 from './components/404';
import { createBrowserRouter } from 'react-router-dom';
import AdminRoute from './components/routes/admin';
import ForbiddenPage from './components/Forbidden';
import SignInPageAdmin from './pages/admin/SignInPageAdmin';
import DashboardPage from './pages/admin/DashboardPage';
import ProductListPage from './pages/admin/ProductListPage';
import CategoryListPage from './pages/admin/CategoryListPage';
import AddNewCategoryPage from './pages/admin/AddNewCategoryPage';
import AddNewProducrtPage from './pages/admin/AddNewProductPage';
import EditCategoryPage from './pages/admin/EditCategory';
import EditProductPage from './pages/admin/EditProductPage';
import PublicRoute from './components/routes/public';
import HomePage from './pages/public/HomePage';
import SearchPage from './pages/public/SearchPage';
import ProductDetailPage from './pages/public/ProductDetailPage';

export default createBrowserRouter([
    // Public routes
    {
        path: '/',
        element: (
            <PublicRoute>
                <HomePage />
            </PublicRoute>
        ),
    },

    {
        path: '/:productSlug',
        element: (
            <PublicRoute>
                <ProductDetailPage />
            </PublicRoute>
        ),
    },

    {
        path: '/search',
        element: (
            <PublicRoute>
                <SearchPage />
            </PublicRoute>
        ),
    },

    // Admin routes
    {
        path: '/admin',
        element: (
            <AdminRoute>
                <DashboardPage />
            </AdminRoute>
        ),
    },
    {
        path: '/admin/products',
        element: (
            <AdminRoute>
                <ProductListPage />
            </AdminRoute>
        ),
    },
    {
        path: '/admin/products/new',
        element: (
            <AdminRoute>
                <AddNewProducrtPage />
            </AdminRoute>
        ),
    },
    {
        path: '/admin/categories',
        element: (
            <AdminRoute>
                <CategoryListPage />
            </AdminRoute>
        ),
    },
    {
        path: '/admin/categories/new',
        element: (
            <AdminRoute>
                <AddNewCategoryPage />
            </AdminRoute>
        ),
    },
    {
        path: '/admin/categories/:id',
        element: (
            <AdminRoute>
                <EditCategoryPage />
            </AdminRoute>
        ),
    },
    {
        path: '/admin/products/:id',
        element: (
            <AdminRoute>
                <EditProductPage />
            </AdminRoute>
        ),
    },
    {
        path: '/admin/login',
        element: <SignInPageAdmin />,
    },

    // Other routes
    {
        path: '/forbidden',
        element: <ForbiddenPage />,
    },
    {
        path: '*',
        element: <C404 />,
    },
]);
