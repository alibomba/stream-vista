
import { Link } from 'react-router-dom';

import GoogleLogin from '../../components/googleLogin/GoogleLogin';
import styles from './register.module.css';

const Register = () => {
    return (
        <form className={styles.form}>
            <img className={styles.form__img} src="/img/logo.png" alt="logo Stream Vista" />
            <input required className={styles.form__input} placeholder='E-mail' aria-label='E-mail' id='email' type="email" maxLength={70} />
            <input required className={styles.form__input} placeholder='Hasło' aria-label='Hasło' id='password' type="password" maxLength={60} />
            <input required className={styles.form__input} placeholder='Powtórz hasło' aria-label='Powtórz hasło' id='passwordConfirmation' type="password" maxLength={60} />
            <button className={`${styles.form__button} ${styles.form__button_primary}`}>Załóż konto</button>
            <Link to='/logowanie' className={`${styles.form__button} ${styles.form__button_secondary}`}>Zaloguj się</Link>
            <GoogleLogin />
        </form>
    )
}

export default Register
