import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle, AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
import Error from '../error/Error';
import Popup from '../popup/Popup';
import axiosClient from '../../axiosClient';
import axios from 'axios';

interface Props {
    id: string,
    thumbnailUrl: string,
    trailerUrl: string,
    title: string,
    description: string,
    warnings: string[],
    isMovie: boolean
}

import styles from './productionTile.module.css';

const ProductionTile = ({ id, thumbnailUrl, trailerUrl, title, description, warnings, isMovie }: Props) => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isOnWatchList, setIsOnWatchList] = useState<boolean>(false);
    const [track, setTrack] = useState<string | null>(null);
    const [popup, setPopup] = useState<Popup>({ content: null, active: false, type: 'good' });
    const [error, setError] = useState<string | null>(null);
    const trailerRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        async function fetchData() {
            try {
                const res = await axiosClient({
                    method: 'get',
                    url: `/${isMovie ? 'movie' : 'series'}-track-string/${id}`,
                    cancelToken: source.token
                });
                if (res.data.message) {
                    setTrack(res.data.message);
                }
            } catch (err) {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }

            try {
                const res = await axiosClient({
                    method: 'get',
                    url: `/is-on-${isMovie ? 'movie' : 'series'
                        }-watchlist/${id}`,
                    cancelToken: source.token
                });
                if (res.data.isOnWatchList) {
                    setIsOnWatchList(true);
                }
            } catch (err) {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }

        fetchData();

        return () => {
            source.cancel();
        }

    }, []);

    function handleHover() {
        setIsActive(true);
        setTimeout(() => trailerRef.current?.play(), 500);
    }

    function handleUnhover() {
        trailerRef.current!.pause();
        trailerRef.current!.currentTime = 0;
        setIsActive(false);
    }

    function disableHoverMobile() {
        if ('ontouchstart' in window ||
            navigator.maxTouchPoints > 0) {
            setIsActive(false);
        }
    }

    async function addToList() {
        try {
            const res = await axiosClient({
                method: 'post',
                url: `/toggle-on-${isMovie ? 'movie' : 'series'}-watchlist/${id}`
            });
            if (res.status === 201) {
                setIsOnWatchList(true);
                setPopup({ content: 'Dodano do listy', active: true, type: 'good' });
            }
            else if (res.status === 204) {
                setIsOnWatchList(false);
                setPopup({ content: 'Usunięto z listy', active: true, type: 'good' });
            }
            setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
        } catch (err) {
            setError('Coś poszło nie tak, spróbuj ponownie później...');
        }
    }

    async function deleteTrack() {
        try {
            if (isMovie) {
                await axiosClient({
                    method: 'delete',
                    url: '/delete-track',
                    data: {
                        movieId: id
                    }
                });
            } else {
                await axiosClient({
                    method: 'delete',
                    url: '/delete-track',
                    data: {
                        seriesId: id
                    }
                });
            }
            setPopup({ content: 'Odśwież stronę', active: true, type: 'good' });
            setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
        } catch (err) {
            setError('Coś poszło nie tak, spróbuj ponownie później...');
        }
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <>
            <article style={{ zIndex: isActive ? '100' : '1' }} onMouseEnter={handleHover} onMouseLeave={handleUnhover} className={`${styles.production} ${isActive && styles.production_active}`}>
                {
                    isActive ? <video onClick={disableHoverMobile} ref={trailerRef} loop className={styles.production__thumbnail} src={trailerUrl}></video> :
                        <img className={styles.production__thumbnail} src={thumbnailUrl} alt={`miniatura ${isMovie ? 'filmu' : 'serialu'} `} />
                }

                <div className={`${styles.production__info} ${track && styles.production__info_withTrack}`}>
                    <div className={styles.info__top}>
                        <h3 className={styles.info__title}>{title}</h3>
                        <div className={styles.info__buttons}>
                            <Link title='Odtwórz' to={`/${isMovie ? 'film' : 'serial'}/${id}`} className={styles.info__button}>
                                < FaPlay />
                            </Link >
                            <button onClick={addToList} title={isOnWatchList ? 'Usuń z listy' : 'Dodaj do listy'} className={styles.info__button}>
                                {
                                    isOnWatchList ? <AiOutlineMinus /> : <AiOutlinePlus />
                                }
                            </button>
                            <Link title='Więcej informacji' to={`/${isMovie ? 'film' : 'serial'}-info/${id}`} className={styles.info__button}>
                                <AiOutlineInfoCircle />
                            </Link>
                        </div >
                    </div >
                    {
                        warnings.length > 0 && <p className={styles.info__warnings}>
                            {
                                warnings.map((warning, index, array) => {
                                    if (index === array.length - 1) {
                                        return warning;
                                    } else {
                                        return `${warning}, `;
                                    }
                                })
                            }
                        </p>
                    }
                    < p className={styles.info__description}>{description}</p>
                    {
                        track && <p className={styles.info__progress}><button onClick={deleteTrack} className={styles.info__button} title='Usuń ze strony głównej'><IoMdClose /></button>{track}</p>
                    }
                </div >
            </article >
            <Popup active={popup.active} type={popup.type}>{popup.content}</Popup>
        </>
    )
}

export default ProductionTile
