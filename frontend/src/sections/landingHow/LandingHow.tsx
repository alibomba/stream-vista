


import styles from './landingHow.module.css';

const LandingHow = () => {
    return (
        <section className={styles.section}>
            <h2 className={styles.section__heading}>Jak to działa?</h2>
            <div className={styles.section__row}>
                <img className={styles.section__img} src={`${import.meta.env.VITE_BACKEND_URL}/storage/jak-to-dziala.jpg`} alt="grupa ludzi na sali kinowej" />
                <p className={styles.section__text}>Zrozumienie naszej platformy jest proste. Po wybraniu abonamentu, możesz przeglądać i wybierać z szerokiej gamy filmów i seriali dostępnych na naszej platformie. Znajdziesz je podzielone na różnorodne kategorie, co ułatwia znalezienie treści, która Cię interesuje. Po wybraniu filmu lub serialu, wystarczy kliknąć 'Odtwórz', a już jesteś gotowy, aby rozpocząć niesamowitą podróż w świat rozrywki, dostępną w zaciszu własnego domu.</p>
            </div>
        </section>
    )
}

export default LandingHow
