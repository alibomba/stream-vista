import { useContext } from 'react';
import { AuthContext, ContextType } from '../contexts/AuthProvider';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import Loading from '../components/loading/Loading';


const DefaultLayout = () => {
    const { isLoading, isAuthorized, isPaid } = useContext<ContextType>(AuthContext);

    if (isLoading) {
        return <Loading />
    }

    if (!isLoading && !isAuthorized) {
        return <Navigate to='/logowanie' />
    }

    if (!isLoading && isAuthorized && !isPaid) {
        return <Navigate to='/plany' />
    }

    return (
        <>
            <Outlet />
        </>
    )
}

export default DefaultLayout
