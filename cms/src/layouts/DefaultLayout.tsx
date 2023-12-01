import { useContext } from 'react';
import Loading from '../components/loading/Loading';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext, ContextType } from '../contexts/AuthProvider';

const DefaultLayout = () => {
    const { isLoading, isAuthorized } = useContext<ContextType>(AuthContext);

    if (isLoading) {
        return <Loading />
    }

    if (!isLoading && !isAuthorized) {
        return <Navigate to='/login' />
    }

    return (
        <>
            <Outlet />
        </>
    )
}

export default DefaultLayout
