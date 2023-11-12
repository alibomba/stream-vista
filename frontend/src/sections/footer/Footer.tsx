import { Link } from 'react-router-dom';


import styles from './footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__top}>
                <img className={styles.footer__img} src="/img/logo-icon.png" alt="logo Stream Vista" />
                <form className={styles.footer__form}>
                    <input placeholder='E-mail' aria-label='E-mail' type="email" className={styles.footer__input} maxLength={70} required />
                    <button className={styles.footer__button}>Wyślij</button>
                </form>
                <nav className={styles.footer__nav}>
                    <Link to='#' className={styles.footer__navLink}>Regulamin</Link>
                    <Link to='#' className={styles.footer__navLink}>Polityka prywatności</Link>
                </nav>
            </div>
            <p className={styles.footer__copyright}>Stream Vista &copy; 2023 Wszystkie prawa zastrzeżone</p>
        </footer>
    )
}

export default Footer
