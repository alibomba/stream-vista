import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';

import styles from './landingHeader.module.css';

const LandingHeader = () => {
    const [isNavActive, setIsNavActive] = useState<boolean>(false);

    return (
        <>
            <header className={styles.header}>
                <img className={styles.header__img} src="/img/logo.png" alt="logo Stream Vista" />
                <nav className={styles.header__nav}>
                    <Link to='/logowanie' className={`${styles.header__button} ${styles.header__button_primary}`}>Zaloguj się</Link>
                    <Link to='/rejestracja' className={`${styles.header__button} ${styles.header__button_secondary}`}>Załóż konto</Link>
                </nav>
            </header>
            <header className={styles.header_mobile}>
                <div className={styles.header_mobile__top}>
                    <img className={styles.header__img} src="/img/logo-icon.png" alt="logo Stream Vista" />
                    <button onClick={() => setIsNavActive(prev => !prev)} title='Zmień widoczność menu' className={`${styles.header__hamburger} ${isNavActive && styles.header__hamburger_active}`}>
                        <GiHamburgerMenu />
                    </button>
                </div>
                <nav className={`${styles.header__nav} ${isNavActive && styles.header__nav_active}`}>
                    <Link to='/logowanie' className={`${styles.header__button} ${styles.header__button_primary}`}>Zaloguj się</Link>
                    <Link to='/rejestracja' className={`${styles.header__button} ${styles.header__button_secondary}`}>Załóż konto</Link>
                </nav>
            </header>
        </>

    )
}

export default LandingHeader
