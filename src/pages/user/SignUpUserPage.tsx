import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useRedux';
import { selectCurrentUser } from '../../lib/redux/auth/authSlice';
import RegisterUser from '../../features/user/Authentication/Register';

function SignUpUserPage() {
    // check if user is already logged in
    const userAuth = useAppSelector(selectCurrentUser);
    if (userAuth?.id && userAuth.roles.some((role) => role.name === 'USER')) {
        // redirect to admin home page
        return <Navigate to="/" />;
    }
    return <RegisterUser />;
}

export default SignUpUserPage;
