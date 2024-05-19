import { Navigate } from 'react-router-dom';
import SignIn from '../../features/admin/Authentication/SignIn';
import { User } from '../../types/User';

export default function SignInPageAdmin() {
    // check if user is already logged in
    const user = JSON.parse(localStorage.getItem('USER') || '{}') as User;
    if (user?.id) {
        // redirect to admin home page
        return <Navigate to="/admin" />;
    }

    return <SignIn />;
}
