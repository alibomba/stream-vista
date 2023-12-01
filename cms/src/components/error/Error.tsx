


import styles from './error.module.css';

interface Props {
    children: string | null;
}

const Error = ({ children }: Props) => {
    return (
        <p className={styles.error} role='alert' aria-live='assertive'>{children}</p>
    )
}

export default Error
