import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdMovie } from 'react-icons/md';
import { BsFillImageFill } from 'react-icons/bs';
import Error from '../../components/error/Error';
import Popup from '../../components/popup/Popup';
import Input from '../../components/input/Input';
import EpisodeForm from '../../components/episodeForm/EpisodeForm';
import axiosClient from '../../axiosClient';
import axios from 'axios';

import styles from './serial.module.css';

interface SeriesForm {
    title: string,
    description: string,
    trailerUrl: string,
    thumbnailUrl: string,
    warnings: string[],
    actors: string[],
    creators: string[],
    categories: string[],
    seasons: number | string,
    year: number | string
}

const Serial = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [seriesData, setSeriesData] = useState<SeriesForm>({ title: '', description: '', trailerUrl: '', thumbnailUrl: '', warnings: [], actors: [], creators: [], categories: [], seasons: '', year: '' });
    const [categories, setCategories] = useState<Category[]>([]);
    const [episodesAmount, setEpisodesAmount] = useState<number>(1);
    const [popup, setPopup] = useState<Popup>({ content: null, active: false, type: 'good' });
    const [validationError, setValidationError] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        async function fetchData() {
            try {
                const { data } = await axiosClient({
                    method: 'get',
                    url: '/categories',
                    cancelToken: source.token
                });
                setCategories(data);
            } catch (err) {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }

            if (id) {
                try {
                    const { data } = await axiosClient({
                        method: 'get',
                        url: `/series/${id}`,
                        cancelToken: source.token
                    });
                    setSeriesData(data);
                } catch (err: any) {
                    if (err?.response?.status === 404) {
                        navigate('/404');
                    }
                    else {
                        setError('Coś poszło nie tak, spróbuj ponownie później...');
                    }
                }
            }
        }

        fetchData();

        return () => {
            source.cancel();
        }

    }, [id]);

    function changeData(e: React.ChangeEvent) {
        const input = e.target as HTMLInputElement | HTMLSelectElement;
        const ariaLabel = input.ariaLabel;
        const value = input.value;

        switch (ariaLabel) {
            case 'Tytuł':
                setSeriesData(prev => { return { ...prev, title: value } });
                break;
            case 'Opis':
                setSeriesData(prev => { return { ...prev, description: value } });
                break;
            case 'Ostrzeżenia (po przecinku)':
                setSeriesData(prev => { return { ...prev, warnings: value.split(',') } });
                break;
            case 'Obsada (po przecinku)':
                setSeriesData(prev => { return { ...prev, actors: value.split(',') } });
                break;
            case 'Twórcy (po przecinku)':
                setSeriesData(prev => { return { ...prev, creators: value.split(',') } });
                break;
            case 'Sezonów':
                setSeriesData(prev => { return { ...prev, seasons: parseInt(value) } });
                break;
            case 'Rok':
                setSeriesData(prev => { return { ...prev, year: parseInt(value) } });
                break;
        }
    }

    function changeFileNames(e: React.ChangeEvent) {
        const input = e.target as HTMLInputElement;
        const file = input.files?.[0];
        if (file) {
            const fileName = file.name;
            if (input.id === 'trailer') {
                setSeriesData(prev => { return { ...prev, trailerUrl: fileName } });
            } else if (input.id === 'thumbnail') {
                setSeriesData(prev => { return { ...prev, thumbnailUrl: fileName } });
            }
        }
    }

    function handleCategoryChange(e: React.ChangeEvent) {
        const checkbox = e.target as HTMLInputElement;
        const categoryName = checkbox.nextElementSibling?.innerHTML;
        const checked = seriesData.categories.filter(item => item === categoryName).length > 0;

        if (checked) {
            setSeriesData(prev => {
                const newCategories = prev.categories.filter(item => item !== categoryName);
                return { ...prev, categories: newCategories };
            });
        } else {
            setSeriesData(prev => {
                const newValue = { ...prev };
                newValue.categories.push(categoryName!);
                return newValue;
            });
        }
    }

    async function updateSeries(e: React.FormEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const thumbnail = form.querySelector('#thumbnail') as HTMLInputElement;
        const thumbnailFile = thumbnail.files?.[0];
        const trailer = form.querySelector('#trailer') as HTMLInputElement;
        const trailerFile = trailer.files?.[0];
        const formData = new FormData();
        formData.append('title', seriesData.title);
        formData.append('description', seriesData.description);
        formData.append('trailer', trailerFile ? trailerFile : '');
        formData.append('thumbnail', thumbnailFile ? thumbnailFile : '');
        formData.append('warnings', JSON.stringify(seriesData.warnings));
        formData.append('actors', JSON.stringify(seriesData.actors));
        formData.append('creators', JSON.stringify(seriesData.creators));
        formData.append('categories', JSON.stringify(seriesData.categories));
        formData.append('seasons', seriesData.seasons.toString());
        formData.append('year', seriesData.year.toString());

        try {
            await axiosClient({
                method: 'put',
                url: `/series/${id}`,
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total && progressEvent.loaded) {
                        const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        if (percentage < 100) {
                            setUploadProgress(percentage);
                        } else {
                            setUploadProgress(null);
                        }
                    }
                }
            });
            setPopup({ content: 'Zaktualizowano serial', active: true, type: 'good' });
            setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
        } catch (err: any) {
            console.log(err);
            if (err?.response?.status === 422) {
                setValidationError(err?.response?.data?.message);
            } else {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }
    }

    async function createSeries(e: React.FormEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <form encType='multipart/form-data' onSubmit={id ? updateSeries : createSeries} className={styles.form}>
            <Input
                label='Tytuł'
                type='text'
                maxLength={150}
                value={seriesData.title}
                onChange={changeData}
            />
            <textarea value={seriesData.description} onChange={changeData} className={styles.form__textarea} id='description' aria-label='Opis' placeholder='Opis' maxLength={700} cols={30} rows={10}></textarea>
            <div className={styles.form__column}>
                <p className={styles.form__label}>Zwiastun</p>
                <label htmlFor="trailer" className={styles.form__fileLabel}>
                    {
                        seriesData.trailerUrl ? <p className={styles.form__fileLabel__text}>{seriesData.trailerUrl}</p> : <MdMovie className={styles.form__fileLabel__icon} />
                    }
                </label>
                <input onChange={changeFileNames} type="file" id='trailer' style={{ display: 'none' }} />
            </div>
            <div className={styles.form__column}>
                <p className={styles.form__label}>Miniatura</p>
                <label htmlFor="thumbnail" className={styles.form__fileLabel}>
                    {
                        seriesData.thumbnailUrl ? <p className={styles.form__fileLabel__text}>{seriesData.thumbnailUrl}</p> : <BsFillImageFill className={styles.form__fileLabel__icon} />
                    }
                </label>
                <input onChange={changeFileNames} type="file" id='thumbnail' style={{ display: 'none' }} />
            </div>
            <textarea value={seriesData.warnings} onChange={changeData} className={styles.form__textarea} id='warnings' aria-label='Ostrzeżenia (po przecinku)' placeholder='Ostrzeżenia (po przecinku)' maxLength={300} cols={30} rows={5}></textarea>
            <textarea value={seriesData.actors} onChange={changeData} className={styles.form__textarea} id='actors' aria-label='Obsada (po przecinku)' placeholder='Obsada (po przecinku)' maxLength={300} cols={30} rows={5}></textarea>
            <textarea value={seriesData.creators} onChange={changeData} className={styles.form__textarea} id='creators' aria-label='Twórcy (po przecinku)' placeholder='Twórcy (po przecinku)' maxLength={300} cols={30} rows={5}></textarea>
            <div className={styles.form__column}>
                <p className={styles.form__label}>Kategorie</p>
                <div className={styles.form__grid}>
                    {
                        categories.map(category => {
                            const checked = seriesData.categories.filter(item => item === category.name).length > 0;
                            return (
                                <div key={category.id} className={styles.form__field}>
                                    <input onChange={handleCategoryChange} checked={checked} id={category.id} className={styles.form__checkbox} type="checkbox" />
                                    <label className={styles.form__checkboxLabel} htmlFor={category.id}>{category.name}</label>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <Input
                label='Sezonów'
                type='number'
                value={seriesData.seasons}
                onChange={changeData}
            />
            <Input
                label='Rok'
                type='number'
                value={seriesData.year}
                onChange={changeData}
            />
            {
                !id &&
                <>
                    <p className={styles.form__sectionHeading}>Odcinki</p>
                    {
                        Array.from({ length: episodesAmount }, (_, index) => {
                            return (
                                <EpisodeForm key={index} />
                            )
                        })
                    }
                </>
            }
            {
                validationError && <p role='alert' aria-live='assertive' className={styles.form__error}>{validationError}</p>
            }
            {
                uploadProgress !== null && <p role='alert' aria-live='assertive' className={styles.form__progress}>Przesyłanie {uploadProgress}%</p>
            }
            <button className={styles.form__button}>Opublikuj</button>
            <Popup active={popup.active} type={popup.type}>{popup.content}</Popup>
        </form>
    )
}

export default Serial
