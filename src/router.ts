
import C404 from './components/404';
import AboutMe from './pages/AboutMe';

import { createBrowserRouter } from 'react-router-dom';

export default createBrowserRouter([
    // {
    //   path: '/',
    //   element: <ProgramListPage />,
    // },
    {
        path: '/aboutme',
        element: AboutMe(),
    },
    {
        path: "*",
        element: C404(),
    }
]);