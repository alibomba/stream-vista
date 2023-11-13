import { useContext, useEffect, useState } from 'react';
import Loading from '../../components/loading/Loading';
import { AuthContext, ContextType } from '../../contexts/AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosClient from '../../axiosClient';
import Error from '../../components/error/Error';


import styles from './preferences.module.css';

interface Category {
    id: string;
    name: string;
}

const Preferences = () => {
    const navigate = useNavigate();
    const { isAuthorized, isLoading, isPaid } = useContext<ContextType>(AuthContext);
    const [categories, setCategories] = useState<Category[]>([]);
    const [userCategories, setUserCategories] = useState<string[]>([]);
    const [pageLoading, setPageLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [validationError, setValidationError] = useState<string | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        async function fetchData() {
            try {
                const res = await axiosClient({
                    method: 'get',
                    url: '/users-categories',
                    cancelToken: source.token
                });
                setUserCategories(res.data);
            } catch (err) {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }

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
            setPageLoading(false);
        }


        if (!isLoading && isAuthorized && isPaid) {
            fetchData();
            return () => {
                source.cancel();
            }
        }
    }, [isLoading]);

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const selectedCheckboxes = form.querySelectorAll('input:checked') as NodeListOf<HTMLInputElement>;
        if (selectedCheckboxes.length === 0) {
            setValidationError('Musisz wybrać kategorie');
            return;
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
            setValidationError(null);
            navigate('/homepage');
        } catch (err) {
            setError('Coś poszło nie tak, spróbuj ponownie później...');
        }
    }

    if (isLoading) {
        return <Loading />
    }

    if (!isLoading && !isAuthorized) {
        return <Navigate to='/logowanie' />
    }

    if (!isLoading && isAuthorized && !isPaid) {
        return <Navigate to='/plany' />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <>
            {
                pageLoading ? <Loading /> :
                    userCategories.length > 0 ? <Navigate to='/homepage' />
                        :
                        <main className={styles.main}>
                            <h1 className={styles.main__heading}>Wybierz preferowane kategorie</h1>
                            <form onSubmit={submit} className={styles.main__form}>
                                <div className={styles.form__grid}>
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
                                {
                                    validationError && <p role='alert' aria-live='assertive' className={styles.form__error}>{validationError}</p>
                                }
                                <button className={styles.form__button}>Dalej</button>
                            </form>
                        </main>
            }
        </>
    )
}

export default Preferences
