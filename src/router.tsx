import App from './App';
import C404 from './components/404';
import { createBrowserRouter } from 'react-router-dom';
import { AboutMePage } from './pages/_index.page';
import AdminRoute from './components/routes/admin';
import ForbiddenPage from './components/Forbidden';
import SignInPageAdmin from './pages/admin/SignInPageAdmin';
import DashboardPage from './pages/admin/DashboardPage';
import ProductListPage from './pages/admin/ProductListPage';
import CategoryListPage from './pages/admin/CategoryListPage';
import AddNewCategoryPage from './pages/admin/AddNewCategoryPage';
import AddNewProducrtPage from './pages/admin/AddNewProductPage';
import EditCategoryPage from './pages/admin/EditCategory';
import AddNewProductPage from './pages/admin/AddNewProductPage';
import EditProductPage from './pages/admin/EditProductPage';

export default createBrowserRouter([
    {
        path: '/',
        element: App(),
        children: [
            {
                path: '/about-me',
                element: AboutMePage(),
            },
        ],
    },
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
        path: '/forbidden',
        element: <ForbiddenPage />,
    },
    {
        path: '*',
        element: <C404 />,
    },
]);
