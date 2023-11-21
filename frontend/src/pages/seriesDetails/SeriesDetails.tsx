import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import Popup from '../../components/popup/Popup';
import axiosClient from '../../axiosClient';
import axios from 'axios';

import styles from './seriesDetails.module.css';
import { EpisodeList, SimilarProductions } from '../../sections';

const SeriesDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [series, setSeries] = useState<Series | null>(null);
    const [isOnWatchList, setIsOnWatchList] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [popup, setPopup] = useState<Popup>({ content: null, active: false, type: 'good' });

    useEffect(() => {
        const source = axios.CancelToken.source();

        async function fetchData() {
            try {
                const { data } = await axiosClient({
                    method: 'get',
                    url: `/series-details/${id}`,
                    cancelToken: source.token
                });
                setSeries(data);
            } catch (err: any) {
                if (err?.response?.status === 404) {
                    navigate('/404');
                } else {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                }
            }

            try {
                const { data } = await axiosClient({
                    method: 'get',
                    url: `/is-on-series-watchlist/${id}`,
                    cancelToken: source.token
                });
                if (data.isOnWatchList) {
                    setIsOnWatchList(true);
                }
            } catch (err) {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }

            setIsLoading(false);
        }

        fetchData();

        return () => {
            source.cancel();
        }

    }, [id]);

    async function addToList() {
        try {
            const res = await axiosClient({
                method: 'post',
                url: `/toggle-on-series-watchlist/${id}`
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

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <>
            {
                series &&
                <>
                    <video loop autoPlay src={series.trailerUrl} className={styles.trailer}></video>
                    <main className={styles.main}>
                        <h1 className={styles.title}>{series.title}</h1>
                        <div className={styles.row}>
                            <p className={styles.subtitle}>{series.year}</p>
                            <p className={styles.subtitle}>Sezony: {series.seasons}</p>
                        </div>
                        <div className={styles.row}>
                            <Link to={`/serial/${id}`} className={styles.topButton}>
                                <FaPlay />Odtwórz
                            </Link>
                            <button onClick={addToList} className={styles.topButton}>
                                {isOnWatchList ? <AiOutlineMinus /> : <AiOutlinePlus />}
                                {isOnWatchList ? 'Usuń z listy' : 'Dodaj do listy'}
                            </button>
                        </div>
                        <p className={styles.description}>{series.description}</p>
                        {
                            series.warnings.length > 0 &&
                            <div className={styles.column}>
                                <p className={styles.column__heading}>Ostrzeżenia:</p>
                                <p className={styles.column__content}>{
                                    series.warnings.map((warning, index, array) => {
                                        if (index === array.length - 1) {
                                            return warning;
                                        }
                                        else {
                                            return `${warning}, `
                                        }
                                    })
                                }</p>
                            </div>
                        }
                        <div className={styles.column}>
                            <p className={styles.column__heading}>Kategorie:</p>
                            <p className={styles.column__content}>
                                {
                                    series.categories.map((category, index, array) => {
                                        if (index === array.length - 1) {
                                            return category;
                                        }
                                        else {
                                            return `${category}, `
                                        }
                                    })
                                }
                            </p>
                        </div>
                        <div className={styles.column}>
                            <p className={styles.column__heading}>Obsada:</p>
                            <p className={styles.column__content}>{
                                series.actors.map((actor, index, array) => {
                                    if (index === array.length - 1) {
                                        return <span key={index} className={styles.capital__span}>{actor}</span>
                                    } else {
                                        return <span key={index} className={styles.capital__span}>{`${actor}, `}</span>
                                    }
                                })
                            }</p>
                        </div>
                        <div className={styles.column}>
                            <p className={styles.column__heading}>Twórcy:</p>
                            <p className={styles.column__content}>{
                                series.creators.map((creator, index, array) => {
                                    if (index === array.length - 1) {
                                        return <span key={index} className={styles.capital__span}>{creator}</span>
                                    } else {
                                        return <span key={index} className={styles.capital__span}>{`${creator}, `}</span>
                                    }
                                })
                            }</p>
                        </div>
                        <EpisodeList id={series.id} howManySeasons={series.seasons} />
                        <SimilarProductions categories={series.categories} />
                        <Popup type={popup.type} active={popup.active}>{popup.content}</Popup>
                    </main>
                </>
            }
        </>
    )
}

export default SeriesDetails
