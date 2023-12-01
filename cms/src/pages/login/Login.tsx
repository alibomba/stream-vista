import { useContext, useState } from 'react';
import { AuthContext, ContextType } from '../../contexts/AuthProvider';
import Loading from '../../components/loading/Loading';
import { Navigate, useNavigate } from 'react-router-dom';
import Input from '../../components/input/Input';
import Error from '../../components/error/Error';
import axiosClient from '../../axiosClient';

import styles from './login.module.css';

interface Credentials {
    login: string,
    password: string
}

const Login = () => {
    const { isLoading, isAuthorized, setIsAuthorized } = useContext<ContextType>(AuthContext);
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState<Credentials>({ login: '', password: '' });
    const [loginError, setLoginError] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    function changeLogin(e: React.ChangeEvent) {
        const input = e.target as HTMLInputElement;
        setCredentials(prev => { return { ...prev, login: input.value } });
    }

    function changePassword(e: React.ChangeEvent) {
        const input = e.target as HTMLInputElement;
        setCredentials(prev => { return { ...prev, password: input.value } });
    }

    async function login(e: React.FormEvent) {
        e.preventDefault();

        try {
            const { data } = await axiosClient({
                method: 'post',
                url: '/login',
                data: {
                    login: credentials.login,
                    password: credentials.password
                }
            });
            localStorage.setItem('adminAccessToken', data.accessToken);
            localStorage.setItem('adminRefreshToken', data.refreshToken);
            setIsAuthorized(true);
            navigate('/seriale');
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

    if (!isLoading && isAuthorized) {
        return <Navigate to='/seriale' />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <form onSubmit={login} className={styles.form}>
            <Input
                type='text'
                label='Login'
                onChange={changeLogin}
                value={credentials.login}
            />
            <Input
                type='password'
                label='Hasło'
                onChange={changePassword}
                value={credentials.password}
            />
            {
                loginError && <p role='alert' aria-live='assertive' className={styles.form__error}>{loginError}</p>
            }
            <button className={styles.form__button}>Zaloguj się</button>
        </form>
    )
}

export default Login
