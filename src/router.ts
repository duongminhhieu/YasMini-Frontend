
import App from './App';
import C404 from './components/404';
import { AboutMePage } from './pages/_index.page';
import { createBrowserRouter } from 'react-router-dom';

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
        path: "*",
        element: C404(),
    }
]);