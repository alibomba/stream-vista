


import styles from './landingCategory.module.css';

interface Props {
    name: string;
    children: React.ReactNode;
}

const LandingCategory = ({ name, children }: Props) => {
    return (
        <article className={styles.category}>
            <p className={styles.category__icon}>{children}</p>
            <p className={styles.category__text}>{name}</p>
        </article>
    )
}

export default LandingCategory
