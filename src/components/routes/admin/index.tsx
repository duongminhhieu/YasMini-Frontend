import { PropsWithChildren } from 'react';
import { useAppSelector } from '../../../hooks/useRedux';
import { selectCurrentUser } from '../../../lib/redux/auth/authSlice';
import { User } from '../../../types/User';
import { Navigate } from 'react-router-dom';

type AdminRouteProps = PropsWithChildren;

function hasAdminRole(user: User) {
    return user.roles && user.roles.some((role) => role.name === 'ADMIN');
}

export default function AdminRoute({ children }: AdminRouteProps) {
    const userAuth = useAppSelector(selectCurrentUser);

    // if user is not logged in redirect to login page
    if (!userAuth) {
        return <Navigate to="/admin/login" />;
    }

    // check if user is not admin redirect to forbidden page
    if (userAuth && !hasAdminRole(userAuth)) {
        return <Navigate to="/forbidden" />;
    }

    return children;
}
