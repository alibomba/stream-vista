import { useState, useEffect } from 'react';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import { Feed } from '..';
import ProductionTile from '../../components/productionTile/ProductionTile';
import axiosClient from '../../axiosClient';
import axios from 'axios';

interface Props {
    categories: string[]
}

const SimilarProductions = ({ categories }: Props) => {
    const [productions, setProductions] = useState<Production[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: `/similar-productions?categories=${JSON.stringify(categories)}`,
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

    }, [categories]);

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <>
            {
                productions.length > 0 &&
                <Feed heading='Podobne'>
                    {
                        productions.map(production => {
                            return (
                                <ProductionTile
                                    key={production.id}
                                    id={production.id}
                                    title={production.title}
                                    description={production.description}
                                    trailerUrl={production.trailerUrl}
                                    thumbnailUrl={production.thumbnailUrl}
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

export default SimilarProductions
