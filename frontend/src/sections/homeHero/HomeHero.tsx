import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import Error from '../../components/error/Error';
import axiosClient from '../../axiosClient';
import axios from 'axios';

import styles from './homeHero.module.css';

const HomeHero = () => {
    const [isMovie, setIsMovie] = useState<boolean>(false);
    const [movie, setMovie] = useState<Movie | null>(null);
    const [series, setSeries] = useState<Series | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    function togglePlay(e: React.MouseEvent) {
        const video = e.target as HTMLVideoElement;

        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: '/feed?single=true',
            cancelToken: source.token
        })
            .then(res => {
                const data = res.data;
                if (data[0].sourceUrl) {
                    setIsMovie(true);
                    setMovie(data[0]);
                } else {
                    setIsMovie(false);
                    setSeries(data[0]);
                }
            })
            .catch(() => {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            })
            .finally(() => setIsLoading(false));

        return () => {
            source.cancel();
        }

    }, []);

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <>
            {
                !isLoading &&
                <section className={styles.hero}>
                    <video ref={videoRef} onClick={togglePlay} className={styles.hero__video} loop>
                        <source src={isMovie ? movie!.trailerUrl : series!.trailerUrl} />
                    </video>
                    <div className={styles.hero__details}>
                        <h2 className={styles.hero__heading}>{
                            isMovie ? movie!.title : series!.title
                        }</h2>
                        <div className={styles.hero__buttons}>
                            <Link className={`${styles.hero__button} ${styles.hero__button_primary}`} to={isMovie ? `/film/${movie!.id}` : `/serial/${series!.id}`}>
                                <FaPlay /> Odtwórz
                            </Link>
                            <Link className={`${styles.hero__button} ${styles.hero__button_secondary}`} to={isMovie ? `/film-info/${movie!.id}` : `/serial-info/${series!.id}`}>
                                <AiOutlineInfoCircle /> Więcej
                            </Link>
                        </div>
                    </div>
                </section>
            }
        </>

    )
}

export default HomeHero
