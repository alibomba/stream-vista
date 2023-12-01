import { useContext } from 'react';
import Loading from '../components/loading/Loading';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext, ContextType } from '../contexts/AuthProvider';
import Header from '../components/header/Header';

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
            <Header />
            <Outlet />
        </>
    )
}

export default DefaultLayout
