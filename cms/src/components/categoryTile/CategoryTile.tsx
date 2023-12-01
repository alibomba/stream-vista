import { useState } from 'react';
import { MdEdit, MdDelete, MdClose, MdCheck } from 'react-icons/md';
import Error from '../error/Error';
import axiosClient from '../../axiosClient';

import styles from './categoryTile.module.css';

interface Props extends Category {
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
    setPopup: React.Dispatch<React.SetStateAction<Popup>>;
}

const CategoryTile = ({ id, name, setCategories, setPopup }: Props) => {
    const [isEditActive, setIsEditActive] = useState<boolean>(false);
    const [newName, setNewName] = useState<string>(name);
    const [error, setError] = useState<string | null>(null);

    async function deleteCategory() {
        const confirmation = window.confirm('Czy na pewno chcesz na stałe usunąć tę kategorię?');
        if (confirmation) {
            try {
                await axiosClient({
                    method: 'delete',
                    url: `/categories/${id}`
                });
                setCategories(prev => {
                    const newValue = prev.filter(category => category.id !== id);
                    return newValue;
                });
                setPopup({ content: 'Usunięto kategorię', active: true, type: 'good' });
                setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
            } catch (err) {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }
    }

    function changeNameState(e: React.ChangeEvent) {
        const input = e.target as HTMLInputElement;
        setNewName(input.value);
    }

    function toggleEdit() {
        if (isEditActive) {
            setNewName(name);
            setIsEditActive(false);
        }
        else {
            setIsEditActive(true);
        }
    }

    async function editCategory() {
        try {
            await axiosClient({
                method: 'put',
                url: `/categories/${id}`,
                data: {
                    name: newName
                }
            });
            setCategories(prev => {
                const newValue = prev.map(category => {
                    if (category.id === id) {
                        category.name = newName;
                    }
                    return category;
                });
                return newValue;
            });
            setIsEditActive(false);
            setPopup({ content: 'Zapisano kategorię', active: true, type: 'good' });
            setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
        } catch (err: any) {
            if (err?.response?.status === 422) {
                setPopup({ content: err?.response?.data?.message, active: true, type: 'bad' });
                setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
            } else {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <article className={styles.category}>
            {
                isEditActive ? <input className={styles.category__input} onChange={changeNameState} value={newName} type="text" aria-label='Nazwa' placeholder='Nazwa' required maxLength={150} />
                    :
                    <h3 className={styles.category__name}>{name}</h3>
            }
            <div className={styles.category__controls}>
                {
                    isEditActive && <button onClick={editCategory} title='Zapisz' className={`${styles.category__button} ${styles.category__edit}`}>
                        <MdCheck />
                    </button>
                }
                <button onClick={toggleEdit} className={`${styles.category__button} ${styles.category__edit}`} title='Edytuj kategorię'>
                    {
                        isEditActive ? <MdClose /> : <MdEdit />
                    }
                </button>
                <button onClick={deleteCategory} className={`${styles.category__button} ${styles.category__delete}`} title='Usuń kategorię'>
                    <MdDelete />
                </button>
            </div>
        </article>
    )
}

export default CategoryTile
