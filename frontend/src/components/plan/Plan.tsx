import { BsFillCheckCircleFill } from 'react-icons/bs';


import styles from './plan.module.css';

interface Props {
    period: string;
    price: number;
    discountPerMonth?: number;
}

const Plan = ({ period, price, discountPerMonth }: Props) => {
    return (
        <article className={styles.plan}>
            <h3 className={styles.plan__period}>{period}</h3>
            <p className={styles.plan__price}>{price}zł</p>
            {
                discountPerMonth && <p className={styles.plan__discount}>-{discountPerMonth}%/mies.</p>
            }
            <div className={styles.plan__perks}>
                <p className={styles.plan__perk}>
                    <BsFillCheckCircleFill className={styles.perk__icon} />
                    Pełny dostęp do wszystkich filmów i seriali
                </p>
                <p className={styles.plan__perk}>
                    <BsFillCheckCircleFill className={styles.perk__icon} />
                    Wysoka jakość odtwarzania
                </p>
                <p className={styles.plan__perk}>
                    <BsFillCheckCircleFill className={styles.perk__icon} />
                    Brak reklam
                </p>
                <p className={styles.plan__perk}>
                    <BsFillCheckCircleFill className={styles.perk__icon} />
                    Wsparcie dla wielu urządzeń
                </p>
                <p className={styles.plan__perk}>
                    <BsFillCheckCircleFill className={styles.perk__icon} />
                    Wieloplatformowe kontynuowanie odtwarzania
                </p>
                <p className={styles.plan__perk}>
                    <BsFillCheckCircleFill className={styles.perk__icon} />
                    Wsparcie techniczne 24/7
                </p>
            </div>
        </article>
    )
}

export default Plan
