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
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: `/movie/${id}`,
            cancelToken: source.token
        })
            .then(res => {
                setMovie(res.data);
            })
            .catch(err => {
                if (err?.response?.status === 404) {
                    navigate('/404');
                } else {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                }
            })
            .finally(() => setIsLoading(false));

        return () => {
            source.cancel();
        }

    }, [id]);

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
                    <VideoPlayer videoSource={movie.url} currentTime={movie.timestamp} handleProgress={updateTrack} />
                    <h1 className={styles.title}>{movie.title}</h1>
                    <SimilarProductions categories={movie.categories} />
                </>
            }
        </>
    )
}

export default Movie
