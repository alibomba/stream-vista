import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Error from '../../components/error/Error';
import Loading from '../../components/loading/Loading';
import axiosClient from '../../axiosClient';
import axios from 'axios';


import styles from './episodeList.module.css';
import EpisodeTile from '../../components/episodeTile/EpisodeTile';

interface Props {
    id: string;
    howManySeasons: number;
}

const EpisodeList = ({ id, howManySeasons }: Props) => {
    const navigate = useNavigate();
    const [currentSeason, setCurrentSeason] = useState<number>(1);
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: `/episodes/${id}?season=${currentSeason}`,
            cancelToken: source.token
        })
            .then(res => {
                setEpisodes(res.data);
            })
            .catch((err) => {
                if (err?.response?.status === 404) {
                    navigate('/404');
                }
                else {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                }
            })
            .finally(() => setIsLoading(false));

        return () => {
            source.cancel();
        }

    }, [currentSeason, id]);

    function renderOptions() {
        const options = [];
        for (let i = 1; i <= howManySeasons; i++) {
            options.push(<option value={i} key={i}>Sezon {i}</option>)
        }
        return options;
    }

    function changeSeason(e: React.ChangeEvent) {
        const select = e.target as HTMLSelectElement;
        setCurrentSeason(parseInt(select.value));
    }

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <section className={styles.episodes}>
            <select onChange={changeSeason} className={styles.episodes__select}>
                {renderOptions()}
            </select>
            <div className={styles.episodes__list}>
                {
                    episodes.map(episode => {
                        return (
                            <EpisodeTile
                                key={episode.id}
                                number={episode.episodeNumber}
                                title={episode.title}
                                description={episode.description}
                                length={episode.minutes}
                                thumbnail={episode.thumbnailUrl}
                            />
                        )
                    })
                }
            </div>
        </section>
    )
}

export default EpisodeList
