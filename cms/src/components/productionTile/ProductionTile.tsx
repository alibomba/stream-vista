import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdEdit, MdDelete } from 'react-icons/md';
import axiosClient from '../../axiosClient';
import Error from '../error/Error';
import Popup from '../popup/Popup';

import styles from './productionTile.module.css';

interface Props {
    id: string;
    thumbnail: string;
    title: string;
    isMovie: boolean;
    setArray: React.Dispatch<React.SetStateAction<any[]>>;
}

const ProductionTile = ({ id, thumbnail, title, isMovie, setArray }: Props) => {
    const [error, setError] = useState<string | null>(null);
    const [popup, setPopup] = useState<Popup>({ content: null, active: false, type: 'good' });

    async function deleteProduction() {
        const confirmation = window.confirm(`Czy na pewno chcesz na stałe usunąć ten ${isMovie ? 'film' : 'serial'}?`);
        if (confirmation) {
            try {
                await axiosClient({
                    method: 'delete',
                    url: `/${isMovie ? 'movies' : 'series'}/${id}`
                });
                setArray(prev => {
                    const newValue = prev.filter(production => production.id !== id);
                    return newValue;
                });
                setPopup({ content: `Usunięto ${isMovie ? 'film' : 'serial'}`, active: true, type: 'good' });
                setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
            } catch (err) {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <article className={styles.production}>
            <div className={styles.production__info}>
                <img className={styles.production__img} src={thumbnail} alt={`miniatura ${isMovie ? 'filmu' : 'serialu'}`} />
                <h3 className={styles.production__title}>{title}</h3>
            </div>
            <div className={styles.production__controls}>
                <Link title={`Edytuj ${isMovie ? 'film' : 'serial'}`} className={`${styles.production__button} ${styles.production__edit}`} to={`/${isMovie ? 'film' : 'serial'}/${id}`}>
                    <MdEdit />
                </Link>
                <button onClick={deleteProduction} title={`Usuń ${isMovie ? 'film' : 'serial'}`} className={`${styles.production__button} ${styles.production__delete}`}>
                    <MdDelete />
                </button>
            </div>
            <Popup type={popup.type} active={popup.active}>{popup.content}</Popup>
        </article>
    )
}

export default ProductionTile
