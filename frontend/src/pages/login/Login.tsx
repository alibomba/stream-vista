import { useState, useContext } from 'react';
import { AuthContext, ContextType } from '../../contexts/AuthProvider';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import GoogleLogin from '../../components/googleLogin/GoogleLogin';
import Error from '../../components/error/Error';
import Loading from '../../components/loading/Loading';
import axiosClient from '../../axiosClient';

import styles from './login.module.css';

const Login = () => {
    const navigate = useNavigate();
    const { isAuthorized, setIsAuthorized, isLoading, setIsPaid } = useContext<ContextType>(AuthContext);
    const [loginError, setLoginError] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function login(e: React.FormEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const email = form.querySelector('#email') as HTMLInputElement;
        const password = form.querySelector('#password') as HTMLInputElement;

        try {
            const res = await axiosClient({
                method: 'post',
                url: '/login',
                data: {
                    email: email.value,
                    password: password.value
                }
            });
            const { accessToken, refreshToken } = res.data;
            setIsAuthorized(true);
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            try {
                await axiosClient({
                    method: 'get',
                    url: '/is-subscription-active'
                });
                setIsPaid(true);
            } catch (err) {
                setIsPaid(false);
            }
            navigate('/homepage');
        } catch (err: any) {
            if (err?.response?.status === 401) {
                setLoginError(err?.response?.data?.message);
            } else {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }

    }

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    if (!isLoading && isAuthorized) {
        return <Navigate to='/homepage' />
    }

    return (
        <form onSubmit={login} className={styles.form}>
            <img className={styles.form__img} src="/img/logo.png" alt="logo Stream Vista" />
            <input required className={styles.form__input} placeholder='E-mail' aria-label='E-mail' id='email' type="email" maxLength={70} />
            <input autoComplete='#password' required className={styles.form__input} placeholder='Hasło' aria-label='Hasło' id='password' type="password" maxLength={60} />
            {
                loginError && <p role='alert' aria-live='assertive' className={styles.form__error}>{loginError}</p>
            }
            <button className={`${styles.form__button} ${styles.form__button_primary}`}>Zaloguj się</button>
            <Link to='/rejestracja' className={`${styles.form__button} ${styles.form__button_secondary}`}>Załóż konto</Link>
            <GoogleLogin />
        </form>
    )
}

export default Login
