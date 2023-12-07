import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import axiosClient from '../../axiosClient';
import axios from 'axios';
import VideoPlayer from '../../components/videoPlayer/VideoPlayer';
import { SimilarProductions } from '../../sections';
import styles from './movie.module.css';

interface MoviePage {
    movieId: string,
    url: string,
    title: string,
    timestamp: number,
    categories: string[]
}

const Movie = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState<MoviePage | null>(null);
    const [requestCooldown, setRequestCooldown] = useState<number>(20);
    const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
    const [subtitleLanguage, setSubtitleLanguage] = useState<string>('Brak');
    const [activeSubtitles, setActiveSubtitles] = useState<Subtitle[]>([]);
    const [currentSubtitle, setCurrentSubtitle] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        async function fetchData() {
            try {
                const { data } = await axiosClient({
                    method: 'get',
                    url: `/movie/${id}`,
                    cancelToken: source.token
                });
                setMovie(data);
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
                    url: `/movie-subtitles/${id}`,
                    cancelToken: source.token
                });
                setSubtitles(data);
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

    useEffect(() => {
        const newLanguageSubtitles = subtitles.filter(item => item.language === subtitleLanguage);
        setActiveSubtitles(newLanguageSubtitles);
    }, [subtitleLanguage]);

    async function handleProgress(e: React.SyntheticEvent<HTMLVideoElement, Event>): Promise<void> {
        await updateTrack(e);
        await handleCurrentSubtitles(e);
    }

    async function updateTrack(e: React.SyntheticEvent<HTMLVideoElement, Event>) {
        if (requestCooldown === 0) {
            if (movie) {
                const video = e.target as HTMLVideoElement;
                const currentTime = video.currentTime / 60;
                if (currentTime !== 0) {
                    try {
                        await axiosClient({
                            method: 'post',
                            url: `/update-movie-track/${id}`,
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
        } else {
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
                movie &&
                <>
                    <VideoPlayer currentSubtitle={currentSubtitle} videoSource={movie.url} currentTime={movie.timestamp} handleProgress={handleProgress} />
                    <main className={styles.main}>
                        <h1 className={styles.main__title}>{movie.title}</h1>
                        <p className={styles.main__text}>Napisy</p>
                        <select onChange={changeLanguage} className={styles.main__select} aria-label='Napisy'>
                            <option value="Brak">Brak</option>
                            <option value="Polski">Polski</option>
                            <option value="Angielski">Angielski</option>
                        </select>
                        <SimilarProductions categories={movie.categories} />
                    </main>
                </>
            }
        </>
    )
}

export default Movie
