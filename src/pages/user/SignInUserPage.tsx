import { Navigate } from 'react-router-dom';
import LoginUser from '../../features/user/Authentication/Login';
import { useAppSelector } from '../../hooks/useRedux';
import { selectCurrentUser } from '../../lib/redux/auth/authSlice';

function SignInUserPage() {
    // check if user is already logged in
    const userAuth = useAppSelector(selectCurrentUser);
    if (userAuth?.id && userAuth.roles.some((role) => role.name === 'USER')) {
        // redirect to admin home page
        return <Navigate to="/" />;
    }
    return <LoginUser />;
}

export default SignInUserPage;
