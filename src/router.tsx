import App from './App';
import C404 from './components/404';
import { createBrowserRouter } from 'react-router-dom';
import { AboutMePage } from './pages/_index.page';
import AdminRoute from './components/routes/admin';
import ForbiddenPage from './components/Forbidden';
import HomePageAdmin from './pages/admin/HomePageAdmin';
import SignInPageAdmin from './pages/admin/SignInPageAdmin';

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
                <HomePageAdmin />
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
