import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../components/input/Input';
import Error from '../../components/error/Error';
import Popup from '../../components/popup/Popup';
import Loading from '../../components/loading/Loading';
import axiosClient from '../../axiosClient';
import axios from 'axios';

import styles from './napisy.module.css';

interface SubtitleFormData {
    fromSecond: number | string,
    toSecond: number | string,
    language: string,
    content: string
}

const Napisy = () => {
    const { type, id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<SubtitleFormData>({ fromSecond: '', toSecond: '', language: '', content: '' });
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [popup, setPopup] = useState<Popup>({ content: null, active: false, type: 'good' });
    const [validationError, setValidationError] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: `/${type === 'odcinek' ? 'episode' : 'movie'}-source/${id}`,
            cancelToken: source.token
        })
            .then(res => {
                setVideoUrl(res.data.url);
            })
            .catch(err => {
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

    }, [id, type]);

    function changeData(e: React.ChangeEvent) {
        const input = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        const ariaLabel = input.ariaLabel;

        switch (ariaLabel) {
            case 'Od sekundy':
                setFormData(prev => { return { ...prev, fromSecond: parseInt(input.value) } });
                break;
            case 'Do sekundy':
                setFormData(prev => { return { ...prev, toSecond: parseInt(input.value) } });
                break;
            case 'Język':
                setFormData(prev => { return { ...prev, language: input.value } });
                break;
            case 'Treść':
                setFormData(prev => { return { ...prev, content: input.value } });
                break;
        }
    }

    async function submitSubtitles(e: React.FormEvent) {
        e.preventDefault();
        try {
            await axiosClient({
                method: 'post',
                url: `/${type === 'odcinek' ? 'episode' : 'movie'}-subtitles/${id}`,
                data: {
                    fromSecond: formData.fromSecond,
                    toSecond: formData.toSecond,
                    language: formData.language,
                    content: formData.content
                }
            });
            setFormData({ fromSecond: '', toSecond: '', language: '', content: '' });
            setValidationError(null);
            setPopup({ content: 'Dodano napis', active: true, type: 'good' });
            setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
        } catch (err: any) {
            if (err?.response?.status === 422) {
                setValidationError(err?.response?.data?.message);
            } else {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }
    }

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <form onSubmit={submitSubtitles} className={styles.form}>
            <video controls className={styles.form__video} src={videoUrl!}></video>
            <div className={styles.form__row}>
                <Input
                    label='Od sekundy'
                    type='number'
                    value={formData.fromSecond}
                    onChange={changeData}
                />
                <Input
                    label='Do sekundy'
                    type='number'
                    value={formData.toSecond}
                    onChange={changeData}
                />
                <select value={formData.language} onChange={changeData} aria-label='Język' className={styles.form__select}>
                    <option value="">Język</option>
                    <option value="Polski">Polski</option>
                    <option value="Angielski">Angielski</option>
                </select>
            </div>
            <textarea aria-label='Treść' placeholder='Treść' maxLength={255} value={formData.content} onChange={changeData} className={styles.form__textarea} cols={30} rows={4}></textarea>
            {
                validationError && <p role='alert' aria-live='assertive' className={styles.form__error}>{validationError}</p>
            }
            <button className={styles.form__button}>Zapisz</button>
            <Popup active={popup.active} type={popup.type}>{popup.content}</Popup>
        </form>
    )
}

export default Napisy
