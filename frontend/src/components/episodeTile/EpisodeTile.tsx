


import styles from './episodeTile.module.css';

interface Props {
    number: number,
    thumbnail: string,
    title: string,
    length: number,
    description: string
}

const EpisodeTile = ({ number, thumbnail, title, length, description }: Props) => {
    return (
        <article className={styles.episode}>
            <p className={styles.episode__number}>{number}</p>
            <img className={styles.episode__thumbnail} src={thumbnail} alt="miniatura odcinka" />
            <div className={styles.episode__text}>
                <div className={styles.episode__text__top}>
                    <h3 className={styles.episode__title}>{title}</h3>
                    <p className={styles.episode__length}>{length} minut</p>
                </div>
                <p className={styles.episode__description}>{description}</p>
            </div>
        </article>
    )
}

export default EpisodeTile
