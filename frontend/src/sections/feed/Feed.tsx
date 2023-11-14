


import styles from './feed.module.css';

interface Props {
    heading: string;
    children: React.ReactNode;
}

const Feed = ({ heading, children }: Props) => {
    return (
        <section className={styles.section}>
            <h2 className={styles.section__heading}>{heading}</h2>
            <div className={styles.section__content}>
                {children}
            </div>
        </section>
    )
}

export default Feed
