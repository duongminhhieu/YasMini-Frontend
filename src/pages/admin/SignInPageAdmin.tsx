import { Navigate } from 'react-router-dom';
import SignIn from '../../features/admin/Authentication/SignIn';
import { useAppSelector } from '../../hooks/useRedux';
import { selectCurrentUser } from '../../lib/redux/auth/authSlice';

export default function SignInPageAdmin() {
    // check if user is already logged in
    const userAuth = useAppSelector(selectCurrentUser);
    if (userAuth?.id) {
        // redirect to admin home page
        return <Navigate to="/admin" />;
    }

    return <SignIn />;
}
