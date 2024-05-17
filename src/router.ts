
import App from './App';
import C404 from './components/404';
import { createBrowserRouter } from 'react-router-dom';
import {
    LoginPage,
    AboutMePage
} from './pages/_index.page';

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
        path: "*",
        element: C404(),
    }
]);