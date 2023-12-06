

import styles from './input.module.css';

interface Props {
    type: string;
    label: string;
    maxLength?: number;
    onChange?: (e: React.ChangeEvent) => void;
    value?: string | number;
}

const Input = ({ type, label, maxLength, onChange, value }: Props) => {
    return (
        <input required value={value} className={styles.input} type={type} aria-label={label} placeholder={label} maxLength={maxLength} onChange={onChange} autoComplete={type === 'password' ? 'password' : undefined} />
    )
}

export default Input
