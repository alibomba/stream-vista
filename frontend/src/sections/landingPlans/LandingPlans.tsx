import { Link } from 'react-router-dom';


import styles from './landingPlans.module.css';
import Plan from '../../components/plan/Plan';

const LandingPlans = () => {
    return (
        <section className={styles.section}>
            <h2 className={styles.section__heading}>Wybierz swój plan</h2>
            <div className={styles.section__row}>
                <Plan period='Miesiąc' price={35} />
                <Plan period='3 miesiące' price={90} discountPerMonth={14} />
                <Plan period='Rok' price={276} discountPerMonth={34} />
            </div>
            <Link to='/rejestracja' className={styles.section__button}>Załóż konto</Link>
        </section>
    )
}

export default LandingPlans
