import { useState, useEffect } from 'react';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import axiosClient from '../../axiosClient';
import axios from 'axios';
import ProductionTile from '../../components/productionTile/ProductionTile';
import { Link } from 'react-router-dom';

import styles from './filmy.module.css';

const Filmy = () => {
    const [movies, setMovies] = useState<ProductionOverview[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: '/movies',
            cancelToken: source.token
        })
            .then(res => {
                setMovies(res.data);
            })
            .catch(() => setError('Coś poszło nie tak, spróbuj ponownie później...'))
            .finally(() => setIsLoading(false));

        return () => {
            source.cancel();
        }

    }, []);

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <main className={styles.main}>
            <Link to='/film/dodaj' className={styles.main__button}>Dodaj</Link>
            <div className={styles.main__list}>
                {
                    movies.map(movie => {
                        return (
                            <ProductionTile
                                key={movie.id}
                                id={movie.id}
                                title={movie.title}
                                thumbnail={movie.thumbnailUrl}
                                isMovie={true}
                                setArray={setMovies}
                            />
                        )
                    })
                }
            </div>
        </main>
    )
}

export default Filmy
