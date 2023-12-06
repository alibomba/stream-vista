
import { MdMovie } from 'react-icons/md';
import Input from '../input/Input';

import styles from './episodeForm.module.css';

interface Props {
    index: number,
    episodes: EpisodeData[],
    setEpisodes: React.Dispatch<React.SetStateAction<EpisodeData[]>>
}

const EpisodeForm = ({ index, episodes, setEpisodes }: Props) => {

    function changeData(e: React.ChangeEvent) {
        const input = e.target as HTMLInputElement | HTMLTextAreaElement;
        const ariaLabel = input.ariaLabel;

        switch (ariaLabel) {
            case 'Tytuł':
                setEpisodes(prev => {
                    const newValue = [...prev];
                    newValue[index].title = input.value;
                    return newValue;
                });
                break;
            case 'Opis':
                setEpisodes(prev => {
                    const newValue = [...prev];
                    newValue[index].description = input.value;
                    return newValue;
                });
                break;
            case 'Sezon':
                setEpisodes(prev => {
                    const newValue = [...prev];
                    newValue[index].season = parseInt(input.value);
                    return newValue;
                });
                break;
            case 'Numer odcinka':
                setEpisodes(prev => {
                    const newValue = [...prev];
                    newValue[index].episodeNumber = parseInt(input.value);
                    return newValue;
                });
                break;
        }
    }

    function changeFile(e: React.ChangeEvent) {
        const input = e.target as HTMLInputElement;
        const file = input.files?.[0];
        if (file) {
            setEpisodes(prev => {
                const newValue = [...prev];
                newValue[index].source = file;
                return newValue;
            });
        }
    }

    return (
        <section className={styles.form}>
            <Input
                label='Tytuł'
                type='text'
                maxLength={150}
                value={episodes[index].title}
                onChange={changeData}
            />
            <textarea placeholder='Opis' aria-label='Opis' maxLength={700} value={episodes[index].description} onChange={changeData} cols={30} rows={10} className={styles.form__textarea}></textarea>
            <div className={styles.form__column}>
                <p className={styles.form__label}>Treść</p>
                <label htmlFor={`source${index}`} className={styles.form__fileLabel}>
                    {
                        episodes[index].source ? <p className={styles.form__fileLabel__text}>{episodes[index].source?.name}</p> : <MdMovie className={styles.form__fileLabel__icon} />
                    }
                </label>
                <input onChange={changeFile} type="file" id={`source${index}`} style={{ display: 'none' }} />
            </div>
            <Input
                label='Sezon'
                type='number'
                value={episodes[index].season}
                onChange={changeData}
            />
            <Input
                label='Numer odcinka'
                type='number'
                value={episodes[index].episodeNumber}
                onChange={changeData}
            />
        </section>
    )
}

export default EpisodeForm
