import { useState, useEffect } from 'react';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import { Link } from 'react-router-dom';
import ProductionTile from '../../components/productionTile/ProductionTile';
import axiosClient from '../../axiosClient';
import axios from 'axios';

import styles from './seriale.module.css';

const Seriale = () => {
    const [series, setSeries] = useState<ProductionOverview[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: '/series',
            cancelToken: source.token
        })
            .then(res => {
                setSeries(res.data);
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
            <Link className={styles.main__button} to='/serial/dodaj'>Dodaj</Link>
            <div className={styles.main__list}>
                {
                    series.map(series => {
                        return (
                            <ProductionTile
                                key={series.id}
                                id={series.id}
                                title={series.title}
                                thumbnail={series.thumbnailUrl}
                                isMovie={false}
                                setArray={setSeries}
                            />
                        )
                    })
                }
            </div>
        </main>
    )
}

export default Seriale
