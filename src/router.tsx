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
import EditCategoryPage from './pages/admin/EditCategoryPage';
import EditProductPage from './pages/admin/EditProductPage';
import PublicRoute from './components/routes/public';
import HomePage from './pages/public/HomePage';
import SearchPage from './pages/public/SearchPage';
import ProductDetailPage from './pages/public/ProductDetailPage';
import SignInUserPage from './pages/user/SignInUserPage';
import SignUpUserPage from './pages/user/SignUpUserPage';
import CategoryPage from './pages/public/CategoryPage';
import ManageUserListPage from './pages/admin/ManageUserListPage';
import ProtectedRoute from './components/routes/protected';
import ViewListCartItemPage from './pages/user/ViewListCartItemPage';
import CheckoutPage from './pages/user/CheckoutPage';
import MyPurchasePage from './pages/user/MyPurchasePage';
import OrderInfoPage from './pages/user/OrderInfoPage';
import ManageOrderPage from './pages/admin/ManageOrderPage';
import OrderDetailPage from './pages/admin/OrderDetailPage';
import SearchByImagePage from './pages/user/SearchByImagePage';

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
    {
        path: '/categories/:categorySlug',
        element: (
            <PublicRoute>
                <CategoryPage />
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
    {
        path: '/admin/users',
        element: (
            <AdminRoute>
                <ManageUserListPage />
            </AdminRoute>
        ),
    },
    {
        path: '/admin/orders',
        element: (
            <AdminRoute>
                <ManageOrderPage />
            </AdminRoute>
        ),
    },
    {
        path: '/admin/orders/:id',
        element: (
            <AdminRoute>
                <OrderDetailPage />
            </AdminRoute>
        ),
    },

    // User routes
    {
        path: '/login',
        element: <SignInUserPage />,
    },
    {
        path: '/register',
        element: <SignUpUserPage />,
    },

    {
        path: '/cart',
        element: (
            <ProtectedRoute>
                <ViewListCartItemPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/checkout',
        element: (
            <ProtectedRoute>
                <CheckoutPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/my-purchase',
        element: (
            <ProtectedRoute>
                <MyPurchasePage />
            </ProtectedRoute>
        ),
    },

    {
        path: '/order/:orderId',
        element: (
            <ProtectedRoute>
                <OrderInfoPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/search-by-image',
        element: (
            <ProtectedRoute>
                <SearchByImagePage />
            </ProtectedRoute>
        ),
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
