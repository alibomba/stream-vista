import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MdMovie } from 'react-icons/md';
import { BsFillImageFill } from 'react-icons/bs';
import Error from '../../components/error/Error';
import Input from '../../components/input/Input';
import Popup from '../../components/popup/Popup';
import axiosClient from '../../axiosClient';
import axios from 'axios';


import styles from './film.module.css';

const Film = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [movieData, setMovieData] = useState<MovieData>({ title: '', description: '', trailer: null, thumbnail: null, source: null, warnings: [], actors: [], creators: [], categories: [], year: '' });
    const [categories, setCategories] = useState<Category[]>([]);
    const [uploadProgress, setUploadProgress] = useState<string | null>(null);
    const [popup, setPopup] = useState<Popup>({ content: null, active: false, type: 'good' });
    const [validationError, setValidationError] = useState<string | null>(null);
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
                        url: `/movie/${id}`,
                        cancelToken: source.token
                    });
                    setMovieData({ title: data.title, description: data.description, trailer: null, thumbnail: null, source: null, warnings: data.warnings, actors: data.actors, creators: data.creators, categories: data.categories, year: data.year });
                } catch (err: any) {
                    if (err?.response?.status === 404) {
                        navigate('/404');
                    } else {
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
        const input = e.target as HTMLInputElement | HTMLTextAreaElement;
        const ariaLabel = input.ariaLabel;

        switch (ariaLabel) {
            case 'Tytuł':
                setMovieData(prev => { return { ...prev, title: input.value } });
                break;
            case 'Opis':
                setMovieData(prev => { return { ...prev, description: input.value } });
                break;
            case 'Ostrzeżenia (po przecinku)':
                setMovieData(prev => { return { ...prev, warnings: input.value.split(',') } });
                break;
            case 'Obsada (po przecinku)':
                setMovieData(prev => { return { ...prev, actors: input.value.split(',') } });
                break;
            case 'Twórcy (po przecinku)':
                setMovieData(prev => { return { ...prev, creators: input.value.split(',') } });
                break;
            case 'Rok':
                setMovieData(prev => { return { ...prev, year: parseInt(input.value) } });
                break;
        }
    }

    function changeFile(e: React.ChangeEvent) {
        const input = e.target as HTMLInputElement;
        const file = input.files?.[0];
        if (file) {
            switch (input.id) {
                case 'trailer':
                    setMovieData(prev => { return { ...prev, trailer: file } })
                    break;
                case 'thumbnail':
                    setMovieData(prev => { return { ...prev, thumbnail: file } });
                    break;
                case 'source':
                    setMovieData(prev => { return { ...prev, source: file } });
                    break;
            }
        }
    }

    function handleCategoryChange(e: React.ChangeEvent) {
        const checkbox = e.target as HTMLInputElement;
        const categoryName = checkbox.nextElementSibling?.innerHTML;
        const checked = movieData.categories.filter(item => item === categoryName).length > 0;

        if (checked) {
            setMovieData(prev => {
                const newCategories = prev.categories.filter(item => item !== categoryName);
                return { ...prev, categories: newCategories };
            });
        } else {
            setMovieData(prev => {
                const newValue = { ...prev };
                newValue.categories.push(categoryName!);
                return newValue;
            });
        }
    }

    async function createMovie(e: React.FormEvent) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', movieData.title);
        formData.append('description', movieData.description);
        formData.append('trailer', movieData.trailer || '');
        formData.append('thumbnail', movieData.thumbnail || '');
        formData.append('source', movieData.source || '');
        formData.append('warnings', JSON.stringify(movieData.warnings));
        formData.append('actors', JSON.stringify(movieData.actors));
        formData.append('creators', JSON.stringify(movieData.creators));
        formData.append('categories', JSON.stringify(movieData.categories));
        formData.append('year', movieData.year.toString());

        try {
            await axiosClient({
                method: 'post',
                url: '/movies',
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
            setPopup({ content: 'Utworzono film', active: true, type: 'good' });
            setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
        } catch (err: any) {
            if (err?.response?.status === 422) {
                setValidationError(err?.response?.data?.message);
            } else {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }
    }

    async function updateMovie(e: React.FormEvent) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', movieData.title);
        formData.append('description', movieData.description);
        formData.append('trailer', movieData.trailer || '');
        formData.append('thumbnail', movieData.thumbnail || '');
        formData.append('source', movieData.source || '');
        formData.append('warnings', JSON.stringify(movieData.warnings));
        formData.append('actors', JSON.stringify(movieData.actors));
        formData.append('creators', JSON.stringify(movieData.creators));
        formData.append('categories', JSON.stringify(movieData.categories));
        formData.append('year', movieData.year.toString());

        try {
            await axiosClient({
                method: 'put',
                url: `/movies/${id}`,
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
            setPopup({ content: 'Zaktualizowano film', active: true, type: 'good' });
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
        <form onSubmit={id ? updateMovie : createMovie} encType='multipart/form-data' className={styles.form}>
            <Input
                label='Tytuł'
                type='text'
                value={movieData.title}
                onChange={changeData}
                maxLength={150}
            />
            <textarea aria-label='Opis' placeholder='Opis' maxLength={700} value={movieData.description} onChange={changeData} cols={30} rows={10} className={styles.form__textarea}></textarea>
            <div className={styles.form__column}>
                <p className={styles.form__label}>Zwiastun</p>
                <label className={styles.form__fileLabel} htmlFor="trailer">
                    {
                        movieData.trailer ? <p className={styles.form__fileLabel__text}>{movieData.trailer.name}</p> : <MdMovie aria-label='Zwiastun' className={styles.form__fileLabel__icon} />
                    }
                </label>
                <input onChange={changeFile} type="file" id='trailer' style={{ display: 'none' }} />
            </div>
            <div className={styles.form__column}>
                <p className={styles.form__label}>Miniatura</p>
                <label className={styles.form__fileLabel} htmlFor="thumbnail">
                    {
                        movieData.thumbnail ? <p className={styles.form__fileLabel__text}>{movieData.thumbnail.name}</p> : <BsFillImageFill aria-label='Miniatura' className={styles.form__fileLabel__icon} />
                    }
                </label>
                <input onChange={changeFile} type="file" id='thumbnail' style={{ display: 'none' }} />
            </div>
            <div className={styles.form__column}>
                <p className={styles.form__label}>Treść</p>
                <label className={styles.form__fileLabel} htmlFor="source">
                    {
                        movieData.source ? <p className={styles.form__fileLabel__text}>{movieData.source.name}</p> : <MdMovie aria-label='Treść' className={styles.form__fileLabel__icon} />
                    }
                </label>
                <input onChange={changeFile} type="file" id='source' style={{ display: 'none' }} />
            </div>
            <textarea aria-label='Ostrzeżenia (po przecinku)' placeholder='Ostrzeżenia (po przecinku)' maxLength={300} value={movieData.warnings} onChange={changeData} cols={30} rows={5} className={styles.form__textarea}></textarea>
            <textarea aria-label='Obsada (po przecinku)' placeholder='Obsada (po przecinku)' maxLength={300} value={movieData.actors} onChange={changeData} cols={30} rows={5} className={styles.form__textarea}></textarea>
            <textarea aria-label='Twórcy (po przecinku)' placeholder='Twórcy (po przecinku)' maxLength={300} value={movieData.creators} onChange={changeData} cols={30} rows={5} className={styles.form__textarea}></textarea>
            <div className={styles.form__column}>
                <p className={styles.form__label}>Kategorie</p>
                <div className={styles.form__grid}>
                    {
                        categories.map(category => {
                            const checked = movieData.categories.filter(item => item === category.name).length > 0;
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
                label='Rok'
                type='number'
                value={movieData.year}
                onChange={changeData}
            />
            {
                id && <Link to={`/napisy/film/${id}`} className={styles.form__button}>Napisy</Link>
            }
            {
                validationError && <p role='alert' aria-live='assertive' className={styles.form__error}>{validationError}</p>
            }
            {
                uploadProgress && <p role='alert' aria-live='assertive' className={styles.form__progress}>{uploadProgress}</p>
            }
            <button className={styles.form__button}>Opublikuj</button>
            <Popup active={popup.active} type={popup.type}>{popup.content}</Popup>
        </form>
    )
}

export default Film
