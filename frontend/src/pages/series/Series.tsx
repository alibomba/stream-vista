import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoIosSkipBackward, IoIosSkipForward } from 'react-icons/io';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import Popup from '../../components/popup/Popup';
import { SimilarProductions } from '../../sections';
import axiosClient from '../../axiosClient';
import axios from 'axios';

import styles from './series.module.css';
import VideoPlayer from '../../components/videoPlayer/VideoPlayer';

interface SeriesPage {
    episodeId: string,
    url: string,
    title: string,
    episodeNumber: number,
    season: number,
    timestamp: number,
    categories: string[]
}

const Series = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [series, setSeries] = useState<SeriesPage | null>(null);
    const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
    const [subtitleLanguage, setSubtitleLanguage] = useState<string>('Brak');
    const [activeSubtitles, setActiveSubtitles] = useState<Subtitle[]>([]);
    const [currentSubtitle, setCurrentSubtitle] = useState<string | null>(null);
    const [requestCooldown, setRequestCooldown] = useState<number>(20);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [popup, setPopup] = useState<Popup>({ content: null, active: false, type: 'good' });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        async function fetchData() {
            let episodeId;
            try {
                const { data } = await axiosClient({
                    method: 'get',
                    url: `/series/${id}`,
                    cancelToken: source.token
                });
                setSeries(data);
                episodeId = data.episodeId;
            } catch (err: any) {
                if (err?.response?.status === 404) {
                    navigate('/404');
                } else {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                }
            }

            if (episodeId) {
                try {
                    const { data } = await axiosClient({
                        method: 'get',
                        url: `/episode-subtitles/${episodeId}`,
                        cancelToken: source.token
                    });
                    setSubtitles(data);
                } catch (err) {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                }
            }

            setIsLoading(false);
        }

        fetchData();

        return () => {
            source.cancel();
        }

    }, [id]);

    useEffect(() => {
        const newLanguageSubtitles = subtitles.filter(item => item.language === subtitleLanguage);
        setActiveSubtitles(newLanguageSubtitles);
    }, [subtitleLanguage]);

    async function handleProgress(e: React.SyntheticEvent<HTMLVideoElement, Event>): Promise<void> {
        await updateTrack(e);
        await handleCurrentSubtitles(e);
    }

    async function updateTrack(e: React.SyntheticEvent<HTMLVideoElement, Event>): Promise<void> {
        if (requestCooldown === 0) {
            if (series) {
                const video = e.target as HTMLVideoElement;
                const currentTime = video.currentTime / 60;
                if (currentTime !== 0) {
                    try {
                        await axiosClient({
                            method: 'post',
                            url: `/update-series-track/${series.episodeId}`,
                            data: {
                                timestamp: currentTime
                            }
                        });
                        setRequestCooldown(20);
                    } catch (err) {
                        setError('Coś poszło nie tak, spróbuj ponownie później...');
                    }
                }
            }
        }
        else {
            setRequestCooldown(prev => prev - 1);
        }
    }

    async function handleCurrentSubtitles(e: React.SyntheticEvent<HTMLVideoElement, Event>): Promise<void> {
        const video = e.target as HTMLVideoElement;
        const currentTime = video.currentTime;
        const currentSubtitles = activeSubtitles.filter(item => {
            if (currentTime >= item.startSecond && currentTime <= item.endSecond) {
                return true;
            } else return false;
        });
        if (currentSubtitles.length !== 0) {
            setCurrentSubtitle(currentSubtitles[0].text);
        }
        else {
            setCurrentSubtitle(null);
        }
    }

    async function previousEpisode() {
        if (series) {
            try {
                const { data } = await axiosClient({
                    method: 'get',
                    url: `/previous-episode/${series.episodeId}`
                });
                setSeries(data);
            } catch (err: any) {
                if (err?.response?.status === 404) {
                    setPopup({ content: err?.response?.data?.message, active: true, type: 'bad' });
                    setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
                } else {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                }
            }
        }
    }

    async function nextEpisode() {
        if (series) {
            try {
                const { data } = await axiosClient({
                    method: 'get',
                    url: `/next-episode/${series.episodeId}`
                });
                setSeries(data);
            } catch (err: any) {
                if (err?.response?.status === 404) {
                    setPopup({ content: err?.response?.data?.message, active: true, type: 'bad' });
                    setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
                } else {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                }
            }
        }
    }

    function changeLanguage(e: React.ChangeEvent) {
        const select = e.target as HTMLSelectElement;
        setSubtitleLanguage(select.value);
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
                    <VideoPlayer currentSubtitle={currentSubtitle} handleProgress={handleProgress} videoSource={series.url} currentTime={series.timestamp} />
                    <main className={styles.main}>
                        <div className={styles.main__controls}>
                            <button onClick={previousEpisode} title='Poprzedni odcinek' className={styles.main__button}>
                                <IoIosSkipBackward />
                            </button>
                            <h1 className={styles.main__title}>{series.title} <span className={styles.title__episode}>S{series.season}:O{series.episodeNumber}</span></h1>
                            <button onClick={nextEpisode} title='Następny odcinek' className={styles.main__button}>
                                <IoIosSkipForward />
                            </button>
                        </div>
                        <p className={styles.main__text}>Napisy</p>
                        <select onChange={changeLanguage} className={styles.main__select} aria-label='Napisy'>
                            <option value="Brak">Brak</option>
                            <option value="Polski">Polski</option>
                            <option value="Angielski">Angielski</option>
                        </select>
                        <SimilarProductions categories={series.categories} />
                    </main>
                    <Popup type={popup.type} active={popup.active}>{popup.content}</Popup>
                </>
            }
        </>
    )
}

export default Series
