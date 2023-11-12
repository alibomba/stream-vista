import { useContext } from 'react';
import Loading from '../../components/loading/Loading';
import { AuthContext, ContextType } from '../../contexts/AuthProvider';
import { Navigate } from 'react-router-dom';


import styles from './preferences.module.css';

const Preferences = () => {
    const { isAuthorized, isLoading, isPaid } = useContext<ContextType>(AuthContext);

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
        <div>

        </div>
    )
}

export default Preferences
