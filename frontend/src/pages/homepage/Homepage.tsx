import { useState, useEffect } from 'react';
import ProductionTile from '../../components/productionTile/ProductionTile';
import { HomeHero, Feed } from '../../sections';
import Error from '../../components/error/Error';
import Loading from '../../components/loading/Loading';
import axiosClient from '../../axiosClient';
import axios from 'axios';


const Homepage = () => {
    const [feed, setFeed] = useState<Production[]>([]);
    const [myTracks, setMyTracks] = useState<Production[]>([]);
    const [myList, setMyList] = useState<Production[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        async function fetchData() {
            try {
                const { data } = await axiosClient({
                    method: 'get',
                    url: '/feed',
                    cancelToken: source.token
                });
                setFeed(data);
            } catch (err) {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }

            try {
                const { data } = await axiosClient({
                    method: 'get',
                    url: '/my-tracks',
                    cancelToken: source.token
                });
                setMyTracks(data);
            } catch (err) {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }

            try {
                const { data } = await axiosClient({
                    method: 'get',
                    url: '/my-list',
                    cancelToken: source.token
                });
                setMyList(data);
            } catch (err) {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }

            setLoading(false);
        }

        fetchData();

        return () => {
            source.cancel();
        }

    }, []);

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <>
            <HomeHero />
            {
                myTracks.length > 0 &&
                <Feed heading='Oglądaj dalej'>
                    {
                        myTracks.map(track => {
                            return (
                                <ProductionTile
                                    key={track.id}
                                    id={track.id}
                                    thumbnailUrl={track.thumbnailUrl}
                                    trailerUrl={track.trailerUrl}
                                    title={track.title}
                                    description={track.description}
                                    warnings={track.warnings}
                                    isMovie={track.sourceUrl ? true : false}
                                />
                            )
                        })
                    }
                </Feed>
            }
            {
                myList.length > 0 &&
                <Feed heading='Moja lista'>
                    {
                        myList.map(item => {
                            return (
                                <ProductionTile
                                    key={item.id}
                                    id={item.id}
                                    thumbnailUrl={item.thumbnailUrl}
                                    trailerUrl={item.trailerUrl}
                                    title={item.title}
                                    description={item.description}
                                    warnings={item.warnings}
                                    isMovie={item.sourceUrl ? true : false}
                                />
                            )
                        })
                    }
                </Feed>
            }
            <Feed heading='Wybrane dla Ciebie'>
                {
                    feed.map(item => {
                        return (
                            <ProductionTile
                                key={item.id}
                                id={item.id}
                                thumbnailUrl={item.thumbnailUrl}
                                trailerUrl={item.trailerUrl}
                                title={item.title}
                                description={item.description}
                                warnings={item.warnings}
                                isMovie={item.sourceUrl ? true : false}
                            />
                        )
                    })
                }
            </Feed>

        </>
    )
}

export default Homepage
