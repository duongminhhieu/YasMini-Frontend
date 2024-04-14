
import App from './layouts/App';
import C404 from './components/404';
import AboutMe from './pages/AboutMe';
import { createBrowserRouter } from 'react-router-dom';

export default createBrowserRouter([
    {
        path: '/',
        element: App(),
        children: [
            {
                path: '/about-me',
                element: AboutMe(),
            },
        ],
    },

    {
        path: "*",
        element: C404(),
    }
]);