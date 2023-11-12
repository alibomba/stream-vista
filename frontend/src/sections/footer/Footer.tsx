import { useState } from 'react';
import { Link } from 'react-router-dom';
import Popup from '../../components/popup/Popup';
import Error from '../../components/error/Error';
import axiosClient from '../../axiosClient';

import styles from './footer.module.css';

const Footer = () => {
    const [popup, setPopup] = useState<Popup>({ content: null, active: false, type: 'good' });
    const [error, setError] = useState<string | null>(null);

    async function newsletter(e: React.FormEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const email = form.querySelector('input') as HTMLInputElement;
        try {
            await axiosClient({
                method: 'post',
                url: '/newsletter',
                data: {
                    email: email.value
                }
            });
            form.reset();
            setPopup({ content: 'Dziękujemy', active: true, type: 'good' });
            setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
        } catch (err: any) {
            if (err?.response?.status === 422) {
                setPopup({ content: err?.response?.data?.message, active: true, type: 'bad' });
                setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
            } else {
                setError('')
            }
        }
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <footer className={styles.footer}>
            <div className={styles.footer__top}>
                <img className={styles.footer__img} src="/img/logo-icon.png" alt="logo Stream Vista" />
                <form onSubmit={newsletter} className={styles.footer__form}>
                    <input placeholder='E-mail' aria-label='E-mail' type="email" className={styles.footer__input} maxLength={70} required />
                    <button className={styles.footer__button}>Wyślij</button>
                </form>
                <nav className={styles.footer__nav}>
                    <Link to='#' className={styles.footer__navLink}>Regulamin</Link>
                    <Link to='#' className={styles.footer__navLink}>Polityka prywatności</Link>
                </nav>
            </div>
            <p className={styles.footer__copyright}>Stream Vista &copy; 2023 Wszystkie prawa zastrzeżone</p>
            <Popup active={popup.active} type={popup.type}>{popup.content}</Popup>
        </footer>
    )
}

export default Footer
