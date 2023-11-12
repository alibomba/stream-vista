import { useState } from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import axiosClient from '../../axiosClient';
import Error from '../error/Error';


import styles from './plan.module.css';

interface Props {
    period: string;
    price: number;
    discountPerMonth?: number;
    priceId?: string;
}

const Plan = ({ period, price, discountPerMonth, priceId }: Props) => {
    const [error, setError] = useState<string | null>(null);

    async function checkout() {
        try {
            const res = await axiosClient({
                method: 'post',
                url: '/subscribe',
                data: {
                    priceId
                }
            });
            window.location = res.data.url;
        } catch (err: any) {
            setError(err?.response?.data?.message);
        }
    }

    if (error) {
        return <Error>{error}</Error>
    }

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
            {
                priceId && <button onClick={checkout} className={styles.plan__button}>Wybierz</button>
            }
        </article>
    )
}

export default Plan
