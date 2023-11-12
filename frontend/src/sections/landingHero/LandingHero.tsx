


import styles from './landingHero.module.css';

const LandingHero = () => {

    function scrollToPlans() {
        const plans = document.querySelector('#plans');
        plans?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <section style={{ backgroundImage: `url('${import.meta.env.VITE_BACKEND_URL}/storage/hero-img.jpg')` }} className={styles.hero}>
            <h2 className={styles.hero__heading}>Kino<br />w Twoim domu</h2>
            <p className={styles.hero__text}>Odkryj nieskończoną rozrywkę w zaciszu swojego domu. Przeglądaj najlepsze filmy i seriale, by cieszyć się kinem na wyciągnięcie ręki. Rozpocznij przygodę już teraz!</p>
            <button onClick={scrollToPlans} className={styles.hero__button}>Zobacz plany</button>
        </section>
    )
}

export default LandingHero
