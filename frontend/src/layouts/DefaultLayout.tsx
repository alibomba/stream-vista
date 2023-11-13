import { useContext, useState, useEffect } from 'react';
import { AuthContext, ContextType } from '../contexts/AuthProvider';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Header } from '../sections';
import axiosClient from '../axiosClient';
import axios from 'axios';
import Error from '../components/error/Error';

import Loading from '../components/loading/Loading';


const DefaultLayout = () => {
    const { isLoading, isAuthorized, isPaid } = useContext<ContextType>(AuthContext);
    const [pageLoading, setPageLoading] = useState<boolean>(true);
    const [userCategories, setUserCategories] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        if (!isLoading && isAuthorized && isPaid) {
            axiosClient({
                method: 'get',
                url: '/users-categories',
                cancelToken: source.token
            })
                .then(res => {
                    setUserCategories(res.data);
                })
                .catch(() => {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                })
                .finally(() => setPageLoading(false));

            return () => {
                source.cancel();
            }
        }

    }, [isLoading]);

    if (isLoading) {
        return <Loading />
    }

    if (!isLoading && !isAuthorized) {
        return <Navigate to='/logowanie' />
    }

    if (!isLoading && isAuthorized && !isPaid) {
        return <Navigate to='/plany' />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <>
            {
                pageLoading ? <Loading /> :
                    userCategories.length === 0 ? <Navigate to='/preferencje' /> :
                        <>
                            <Header />
                            <Outlet />
                        </>
            }
        </>
    )
}

export default DefaultLayout
