import { useContext } from 'react';
import Loading from '../../components/loading/Loading';
import { AuthContext, ContextType } from '../../contexts/AuthProvider';
import { Navigate } from 'react-router-dom';
import Plan from '../../components/plan/Plan';


import styles from './plans.module.css';

const Plans = () => {
    const { isAuthorized, isLoading, isPaid } = useContext<ContextType>(AuthContext);

    if (isLoading) {
        return <Loading />
    }

    if (!isLoading && !isAuthorized) {
        return <Navigate to='/logowanie' />
    }

    if (!isLoading && isAuthorized && isPaid) {
        return <Navigate to='/homepage' />
    }

    return (
        <main className={styles.main}>
            <Plan period='Miesiąc' price={35} priceId='price_1OBgbnFWgA2bhoVfQcqfZczF' />
            <Plan period='3 miesiące' price={90} discountPerMonth={14} priceId='price_1OBgfJFWgA2bhoVfXpBNjAzc' />
            <Plan period='Rok' price={276} discountPerMonth={34} priceId='price_1OBgfbFWgA2bhoVfi6Xqcez9' />
        </main>
    )
}

export default Plans
