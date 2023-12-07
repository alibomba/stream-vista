import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Error from '../../components/error/Error';
import Input from '../../components/input/Input';
import Popup from '../../components/popup/Popup';
import axiosClient from '../../axiosClient';
import axios from 'axios';
import { MdMovie } from 'react-icons/md';

import styles from './odcinek.module.css';

const Odcinek = () => {
    const navigate = useNavigate();
    const { id, idSerialu } = useParams();
    const [episodeData, setEpisodeData] = useState<EpisodeData>({ title: '', description: '', source: null, season: '', episodeNumber: '' });
    const [uploadProgress, setUploadProgress] = useState<string | null>(null);
    const [popup, setPopup] = useState<Popup>({ content: null, active: false, type: 'good' });
    const [validationError, setValidationError] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id && !idSerialu) {
            const source = axios.CancelToken.source();

            async function fetchData() {
                try {
                    const { data } = await axiosClient({
                        method: 'get',
                        url: `/episode/${id}`,
                        cancelToken: source.token
                    });
                    setEpisodeData({ title: data.title, description: data.description, season: data.season, episodeNumber: data.episodeNumber, source: null });
                } catch (err: any) {
                    if (err?.response?.status === 404) {
                        navigate('/404');
                    } else {
                        setError('Coś poszło nie tak, spróbuj ponownie później...');
                    }
                }
            }

            fetchData();

            return () => {
                source.cancel();
            }
        }
    }, [id, idSerialu]);

    function changeData(e: React.ChangeEvent) {
        const input = e.target as HTMLInputElement | HTMLTextAreaElement;
        const ariaLabel = input.ariaLabel;

        switch (ariaLabel) {
            case 'Tytuł':
                setEpisodeData(prev => { return { ...prev, title: input.value } });
                break;
            case 'Opis':
                setEpisodeData(prev => { return { ...prev, description: input.value } });
                break;
            case 'Sezon':
                setEpisodeData(prev => { return { ...prev, season: parseInt(input.value) } });
                break;
            case 'Numer odcinka':
                setEpisodeData(prev => { return { ...prev, episodeNumber: parseInt(input.value) } });
                break;
        }
    }

    function changeFile(e: React.ChangeEvent) {
        const input = e.target as HTMLInputElement;
        const file = input.files?.[0];
        if (file) {
            setEpisodeData(prev => { return { ...prev, source: file } });
        }
    }

    async function createEpisode(e: React.FormEvent) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', episodeData.title);
        formData.append('description', episodeData.description);
        formData.append('source', episodeData.source || '');
        formData.append('season', episodeData.season.toString());
        formData.append('episodeNumber', episodeData.episodeNumber.toString());

        try {
            await axiosClient({
                method: 'post',
                url: `/episode/${idSerialu}`,
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total && progressEvent.loaded) {
                        const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        if (percentage < 100) {
                            setUploadProgress(`Przesyłanie ${percentage}%`);
                        } else {
                            setUploadProgress('Przetwarzanie... (może potrwać parę minut)');
                        }
                    }
                }
            });
            setValidationError(null);
            setUploadProgress(null);
            setPopup({ content: 'Utworzono odcinek', active: true, type: 'good' });
            setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
        } catch (err: any) {
            if (err?.response?.status === 422) {
                setValidationError(err?.response?.data?.message);
            } else {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }
    }

    async function updateEpisode(e: React.FormEvent) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', episodeData.title);
        formData.append('description', episodeData.description);
        formData.append('source', episodeData.source || '');
        formData.append('season', episodeData.season.toString());
        formData.append('episodeNumber', episodeData.episodeNumber.toString());

        try {
            await axiosClient({
                method: 'put',
                url: `/episode/${id}`,
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total && progressEvent.loaded) {
                        const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        if (percentage < 100) {
                            setUploadProgress(`Przesyłanie ${percentage}%`);
                        } else {
                            setUploadProgress('Przetwarzanie... (może potrwać parę minut)');
                        }
                    }
                }
            });
            setValidationError(null);
            setUploadProgress(null);
            setPopup({ content: 'Zaktualizowano odcinek', active: true, type: 'good' });
            setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
        } catch (err: any) {
            if (err?.response?.status === 422) {
                setValidationError(err?.response?.data?.message);
            } else {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <form onSubmit={id ? updateEpisode : createEpisode} encType='multipart/form-data' className={styles.form}>
            <Input
                label='Tytuł'
                type='text'
                maxLength={150}
                value={episodeData.title}
                onChange={changeData}
            />
            <textarea aria-label='Opis' placeholder='Opis' maxLength={700} value={episodeData.description} onChange={changeData} cols={30} rows={10} className={styles.form__textarea}></textarea>'
            <div className={styles.form__column}>
                <p className={styles.form__label}>Treść</p>
                <label htmlFor="source" className={styles.form__fileLabel}>
                    {
                        episodeData.source ? <p className={styles.form__fileLabel__text}>{episodeData.source.name}</p> : <MdMovie className={styles.form__fileLabel__icon} aria-label='Źródło odcinka' />
                    }
                </label>
                <input onChange={changeFile} type="file" id='source' style={{ display: 'none' }} />
            </div>
            <Input
                label='Sezon'
                type='number'
                value={episodeData.season}
                onChange={changeData}
            />
            <Input
                label='Numer odcinka'
                type='number'
                value={episodeData.episodeNumber}
                onChange={changeData}
            />
            {
                validationError && <p role='alert' aria-live='assertive' className={styles.form__error}>{validationError}</p>
            }
            {
                id && <Link to={`/napisy/odcinek/${id}`} className={styles.form__button}>Napisy</Link>
            }
            {
                uploadProgress && <p role='alert' aria-live='assertive' className={styles.form__progress}>{uploadProgress}</p>
            }
            <button className={styles.form__button}>Opublikuj</button>
            <Popup active={popup.active} type={popup.type}>{popup.content}</Popup>
        </form>
    )
}

export default Odcinek
