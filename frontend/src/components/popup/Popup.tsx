import styles from './popup.module.css';

interface Props {
    active: boolean,
    type: 'good' | 'bad',
    children: string | null
}

const Popup = ({ active, type, children }: Props) => {
    return (
        <p role='alert' aria-live='assertive' className={`${styles.popup} ${active && styles.popup_active}`} style={{ backgroundColor: type === 'good' ? 'rgba(0,255,0,.85)' : 'rgba(255,0,0,.85)' }}>{children}</p>
    )
}

export default Popup