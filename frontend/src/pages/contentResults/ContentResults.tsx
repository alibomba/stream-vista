import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import { Feed } from '../../sections';
import ProductionTile from '../../components/productionTile/ProductionTile';
import axiosClient from '../../axiosClient';
import axios from 'axios';

import styles from './contentResults.module.css';

interface Props {
    variant: 'seriale' | 'filmy' | 'wyszukiwanie';
}

const ContentResults = ({ variant }: Props) => {
    const { phrase } = useParams();
    const [productions, setProductions] = useState<Production[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        let url;

        switch (variant) {
            case 'filmy':
                url = '/movie-feed';
                break;
            case 'seriale':
                url = '/series-feed';
                break;
            case 'wyszukiwanie':
                url = `/search?phrase=${phrase}`
                break;
        }

        axiosClient({
            method: 'get',
            url,
            cancelToken: source.token
        })
            .then(res => {
                setProductions(res.data);
            })
            .catch(() => {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            })
            .finally(() => setIsLoading(false));

        return () => {
            source.cancel();
        }

    }, [variant, phrase]);

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <>
            {
                productions.length === 0 ? <p className={styles.noResults}>Brak wyników</p> :
                    <Feed heading={variant === 'wyszukiwanie' ? 'Wyniki wyszukiwania' : 'Wybrane dla Ciebie'}>
                        {
                            productions.map(production => {
                                return (
                                    <ProductionTile
                                        key={production.id}
                                        id={production.id}
                                        title={production.title}
                                        description={production.description}
                                        thumbnailUrl={production.thumbnailUrl}
                                        trailerUrl={production.trailerUrl}
                                        warnings={production.warnings}
                                        isMovie={production.sourceUrl ? true : false}
                                    />
                                )
                            })
                        }
                    </Feed>
            }
        </>
    )
}

export default ContentResults
