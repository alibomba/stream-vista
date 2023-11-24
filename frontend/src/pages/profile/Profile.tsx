import { useState, useEffect } from 'react';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import Popup from '../../components/popup/Popup';
import axiosClient from '../../axiosClient';
import axios from 'axios';

import styles from './profile.module.css';
import formatDate from '../../utils/formatDate';

interface Category {
    id: string;
    name: string;
}

const Profile = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [joinedAt, setJoinedAt] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [oAuth, setOAuth] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [popup, setPopup] = useState<Popup>({ content: null, active: false, type: 'good' });

    useEffect(() => {
        const source = axios.CancelToken.source();

        async function fetchData() {
            try {
                const res = await axiosClient({
                    method: 'get',
                    url: '/categories',
                    cancelToken: source.token
                });
                setCategories(res.data);
            } catch (err) {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }

            try {
                const { data } = await axiosClient({
                    method: 'get',
                    url: '/account-settings',
                    cancelToken: source.token
                });
                setJoinedAt(data.joinedAt);
                setEmail(data.email);
                setOAuth(data.oAuth);
            } catch (err) {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }

            setIsLoading(false);
        }

        fetchData();

        return () => {
            source.cancel();
        }

    }, []);

    function changeEmail(e: React.ChangeEvent) {
        const input = e.target as HTMLInputElement;
        setEmail(input.value);
    }

    async function updateAccountEmail(e: React.FormEvent) {
        e.preventDefault();
        try {
            await axiosClient({
                method: 'put',
                url: '/update-email',
                data: {
                    email
                }
            });
            setPopup({ content: 'Zaktualizowano', active: true, type: 'good' });
            setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
        } catch (err: any) {
            if (err?.response?.status === 422) {
                setPopup({ content: err?.response?.data?.message, active: true, type: 'bad' });
                setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
            }
            else {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }
    }

    async function updatePassword(e: React.FormEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const password = form.querySelector('#password') as HTMLInputElement;
        const passwordConfirmation = form.querySelector('#passwordConfirmation') as HTMLInputElement;

        try {
            await axiosClient({
                method: 'put',
                url: '/update-password',
                data: {
                    password: password.value,
                    passwordConfirmation: passwordConfirmation.value
                }
            });
            setPopup({ content: 'Zaktualizowano', active: true, type: 'good' });
            setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
            form.reset();
        } catch (err: any) {
            if (err?.response?.status === 422) {
                setPopup({ content: err?.response?.data?.message, active: true, type: 'bad' });
                setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
            }
            else {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }
    }

    async function submitCategories(e: React.FormEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const selectedCheckboxes = form.querySelectorAll('input:checked') as NodeListOf<HTMLInputElement>;
        if (selectedCheckboxes.length === 0) {
            setPopup({ content: 'Musisz wybrać kategorie', active: true, type: 'bad' });
            setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
            return;
        }

        try {
            await axiosClient({
                method: 'delete',
                url: '/clear-users-categories'
            });
        } catch (err) {
            return setError('Coś poszło nie tak, spróbuj ponownie później...');
        }

        try {
            await Promise.all([
                selectedCheckboxes.forEach(async (checkbox) => {
                    await axiosClient({
                        method: 'post',
                        url: `/update-users-categories/${checkbox.id}`,
                    });
                })
            ]);
            form.reset();
            setPopup({ content: 'Zaktualizowano kategorie', active: true, type: 'good' });
            setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
        } catch (err) {
            setError('Coś poszło nie tak, spróbuj ponownie później...');
        }
    }

    async function stripeSettings() {
        try {
            const { data } = await axiosClient({
                method: 'post',
                url: '/create-portal-session'
            });
            window.location = data.url;
        } catch (err) {
            setError('Coś poszło nie tak, spróbuj ponownie później...');
        }
    }

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <main className={styles.main}>
            <section className={styles.section}>
                <h2 className={styles.section__heading}>Konto</h2>
                <p className={styles.section__subtext}>od: {formatDate(joinedAt!)}</p>
            </section>
            {
                !oAuth &&
                <section className={styles.section}>
                    <h2 className={styles.section__heading}>Logowanie</h2>
                    <div className={styles.section__column}>
                        <form onSubmit={updateAccountEmail} className={styles.section__row}>
                            <input required onChange={changeEmail} value={email ? email : ''} type="email" className={styles.section__input} placeholder='Nowy e-mail' aria-label='Nowy e-mail' maxLength={70} />
                            <button className={styles.section__button}>Zapisz</button>
                        </form>
                        <form onSubmit={updatePassword} className={styles.section__row}>
                            <input required id='password' autoComplete='#password' type="password" className={styles.section__input} placeholder='Nowe hasło' aria-label='Nowe hasło' minLength={8} maxLength={60} />
                            <input required autoComplete='#passwordConfirmation' id='passwordConfirmation' type="password" className={styles.section__input} placeholder='Powtórz nowe hasło' aria-label='Powtórz nowe hasło' minLength={8} maxLength={60} />
                            <button className={styles.section__button}>Zapisz</button>
                        </form>
                    </div>
                </section>
            }
            <section className={styles.section}>
                <h2 className={styles.section__heading}>Członkostwo</h2>
                <button onClick={stripeSettings} className={styles.section__button}>Ustawienia</button>
            </section>
            <section className={styles.section}>
                <h2 className={styles.section__heading}>Preferencje</h2>
                <form onSubmit={submitCategories} className={styles.section__column}>
                    <div className={styles.section__row}>
                        {
                            categories.map(category => {
                                return (
                                    <div key={category.id} className={styles.form__field}>
                                        <input id={category.id} className={styles.form__checkbox} type="checkbox" />
                                        <label className={styles.form__label} htmlFor={category.id}>{category.name}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button className={styles.section__button}>Zapisz</button>
                </form>
            </section>
            <Popup active={popup.active} type={popup.type}>{popup.content}</Popup>
        </main>
    )
}

export default Profile
