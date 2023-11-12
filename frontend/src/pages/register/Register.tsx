import { useState, useContext } from 'react';
import { AuthContext, ContextType } from '../../contexts/AuthProvider';
import { Link, Navigate } from 'react-router-dom';
import Error from '../../components/error/Error';
import Popup from '../../components/popup/Popup';
import GoogleLogin from '../../components/googleLogin/GoogleLogin';
import axiosClient from '../../axiosClient';
import Loading from '../../components/loading/Loading';
import styles from './register.module.css';

const Register = () => {
    const { isLoading, isAuthorized } = useContext<ContextType>(AuthContext);
    const [validationError, setValidationError] = useState<string | null>(null);
    const [popup, setPopup] = useState<Popup>({ content: null, active: false, type: 'good' });
    const [error, setError] = useState<string | null>(null);

    async function register(e: React.FormEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const email = form.querySelector('#email') as HTMLInputElement;
        const password = form.querySelector('#password') as HTMLInputElement;
        const passwordConfirmation = form.querySelector('#passwordConfirmation') as HTMLInputElement;

        try {
            await axiosClient({
                method: 'post',
                url: '/register',
                data: {
                    email: email.value,
                    password: password.value,
                    passwordConfirmation: passwordConfirmation.value
                }
            });
            setValidationError(null);
            form.reset();
            setPopup({ content: 'Założono konto', active: true, type: 'good' });
            setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
        } catch (err: any) {
            if (err?.response?.status === 422) {
                setValidationError(err?.response?.data?.message);
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
        <form onSubmit={register} className={styles.form}>
            <img className={styles.form__img} src="/img/logo.png" alt="logo Stream Vista" />
            <input required className={styles.form__input} placeholder='E-mail' aria-label='E-mail' id='email' type="email" maxLength={70} />
            <input required className={styles.form__input} placeholder='Hasło' aria-label='Hasło' id='password' type="password" maxLength={60} />
            <input required className={styles.form__input} placeholder='Powtórz hasło' aria-label='Powtórz hasło' id='passwordConfirmation' type="password" maxLength={60} />
            {
                validationError && <p role='alert' aria-live='assertive' className={styles.form__error}>{validationError}</p>
            }
            <button className={`${styles.form__button} ${styles.form__button_primary}`}>Zarejestruj się</button>
            <Link to='/logowanie' className={`${styles.form__button} ${styles.form__button_secondary}`}>Zaloguj się</Link>
            <GoogleLogin />
            <Popup active={popup.active} type={popup.type}>{popup.content}</Popup>
        </form>
    )
}

export default Register
