
import App from './App';
import C404 from './components/404';
import { createBrowserRouter } from 'react-router-dom';
import {
    LoginPage,
    AboutMePage
} from './pages/_index.page';
import AdminRoute from './components/routes/admin';
import SignIn from './pages/admin/SignIn';

export default createBrowserRouter([
    {
        path: '/',
        element: App(),
        children: [
            {
                path: '/about-me',
                element: AboutMePage(),
            },
            {
                path: '/login',
                element: LoginPage(),
            },

        ],
    },
    {
      path: "/admin",
      element: <AdminRoute>
                    <AboutMePage />
                </AdminRoute>
    },
    {
        path: "/admin/login",
        element: <AdminRoute>
                    <SignIn />
                </AdminRoute>
    },
    {
        path: "*",
        element: <C404 />,
    }
]);