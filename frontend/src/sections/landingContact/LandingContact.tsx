import { useState } from 'react';
import axiosClient from '../../axiosClient';
import Error from '../../components/error/Error';
import Popup from '../../components/popup/Popup';


import styles from './landingContact.module.css';

const LandingContact = () => {
    const [validationError, setValidationError] = useState<string | null>(null);
    const [popup, setPopup] = useState<Popup>({ active: false, type: 'good', content: null });
    const [error, setError] = useState<string | null>(null);

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const fullName = form.querySelector('#fullName') as HTMLInputElement;
        const email = form.querySelector('#email') as HTMLInputElement;
        const phoneNumber = form.querySelector('#phoneNumber') as HTMLInputElement;
        const subject = form.querySelector('#subject') as HTMLSelectElement;
        const content = form.querySelector('#content') as HTMLTextAreaElement;

        try {
            await axiosClient({
                method: 'post',
                url: '/contact',
                data: {
                    fullName: fullName.value,
                    email: email.value,
                    phoneNumber: phoneNumber.value,
                    subject: subject.value,
                    content: content.value
                }
            });
            setValidationError(null);
            form.reset();
            setPopup({ content: 'Wiadomość została wysłana', active: true, type: 'good' });
            setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
        } catch (err: any) {
            if (err?.response?.status === 422) {
                setValidationError(err?.response?.data?.message);
            }
            else {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <section className={styles.section}>
            <h2 className={styles.section__heading}>Skontaktuj się z nami</h2>
            <form onSubmit={submit} className={styles.section__form}>
                <div className={styles.form__top}>
                    <input id='fullName' required className={styles.form__input} type="text" placeholder='Imię i nazwisko' aria-label='Imię i nazwisko' maxLength={150} />
                    <input id='email' required className={styles.form__input} type="email" placeholder='E-mail' aria-label='E-mail' maxLength={70} />
                    <input id='phoneNumber' required className={styles.form__input} type="text" placeholder='Numer telefonu' aria-label='Numer telefonu' maxLength={30} />
                    <select className={styles.form__input} required id='subject' aria-label='Temat'>
                        <option value="">Temat</option>
                        <option value="Wsparcie Techniczne">Wsparcie Techniczne</option>
                        <option value="Zapytania dotyczące Abonamentu">Zapytania dotyczące Abonamentu</option>
                        <option value="Propozycje Funkcji">Propozycje Funkcji</option>
                        <option value="Problemy z Treścią">Problemy z Treścią</option>
                        <option value="Współpraca Biznesowa">Współpraca Biznesowa</option>
                        <option value="Pytania dotyczące Ochrony Danych">Pytania dotyczące Ochrony Danych</option>
                        <option value="Reklamacje i Zwroty">Reklamacje i Zwroty</option>
                        <option value="Marketing i Reklama">Marketing i Reklama</option>
                        <option value="Podziękowania i Opinie">Podziękowania i Opinie</option>
                        <option value="Pytania dotyczące Konta">Pytania dotyczące Konta</option>
                    </select>
                </div>
                <textarea id="content" required cols={30} rows={10} className={styles.form__textarea} placeholder='Treść' aria-label='Treść' maxLength={700}></textarea>
                {
                    validationError && <p role='alert' aria-live='assertive' className={styles.form__error}>{validationError}</p>
                }
                <button className={styles.form__button}>Wyślij</button>
            </form>
            <Popup active={popup.active} type={popup.type}>{popup.content}</Popup>
        </section>
    )
}

export default LandingContact
