import { useState, useEffect } from 'react';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import Input from '../../components/input/Input';
import Popup from '../../components/popup/Popup';
import CategoryTile from '../../components/categoryTile/CategoryTile';
import axiosClient from '../../axiosClient';
import axios from 'axios';

import styles from './kategorie.module.css';

const Kategorie = () => {
    const [newCategory, setNewCategory] = useState<string>('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [popup, setPopup] = useState<Popup>({ content: null, active: false, type: 'good' });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: '/categories',
            cancelToken: source.token
        })
            .then(res => {
                setCategories(res.data);
            })
            .catch(() => setError('Coś poszło nie tak, spróbuj ponownie później...'))
            .finally(() => setIsLoading(false));

        return () => {
            source.cancel();
        }

    }, []);

    function changeNewCategory(e: React.ChangeEvent) {
        const input = e.target as HTMLInputElement;
        setNewCategory(input.value);
    }

    async function addCategory(e: React.FormEvent) {
        e.preventDefault();
        try {
            const { data } = await axiosClient({
                method: 'post',
                url: '/categories',
                data: {
                    name: newCategory
                }
            });
            setCategories(prev => {
                prev.unshift(data);
                return prev;
            });
            setNewCategory('');
            setPopup({ content: 'Dodano kategorię', active: true, type: 'good' });
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

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <main className={styles.main}>
            <form onSubmit={addCategory} className={styles.main__form}>
                <Input
                    type='text'
                    label='Nazwa'
                    value={newCategory}
                    onChange={changeNewCategory}
                    maxLength={150}
                />
                <button className={styles.form__button}>Dodaj</button>
            </form>
            <div className={styles.main__list}>
                {
                    categories.map(category => {
                        return (
                            <CategoryTile
                                key={category.id}
                                id={category.id}
                                name={category.name}
                                setCategories={setCategories}
                                setPopup={setPopup}
                            />
                        )
                    })
                }
            </div>
            <Popup active={popup.active} type={popup.type}>{popup.content}</Popup>
        </main>
    )
}

export default Kategorie
