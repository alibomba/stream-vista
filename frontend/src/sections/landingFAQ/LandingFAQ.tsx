import FaqQuestion from '../../components/faqQuestion/FaqQuestion'


import styles from './landingFAQ.module.css';

const LandingFAQ = () => {
    return (
        <section className={styles.section}>
            <h2 className={styles.section__heading}>FAQ</h2>
            <div className={styles.section__questions}>
                <FaqQuestion
                    question='Jakie rodzaje płatności akceptujecie?'
                >
                    Akceptujemy płatności kartą kredytową, debetową i PayPal. Nasze systemy płatności są bezpieczne i zgodne z najwyższymi standardami bezpieczeństwa.
                </FaqQuestion>
                <FaqQuestion
                    question='Czy mogę anulować subskrypcję w dowolnym momencie?'
                >
                    Tak, subskrybenci miesięcznego planu mogą anulować subskrypcję w dowolnym momencie bez konieczności długoterminowych zobowiązań.
                </FaqQuestion>
                <FaqQuestion
                    question='Jakie urządzenia obsługują Waszą platformę?'
                >
                    Nasza platforma jest dostępna na smartfonach, tabletach, laptopach i telewizorach. Wspieramy różne systemy operacyjne i przeglądarki.
                </FaqQuestion>
                <FaqQuestion
                    question='Czy treści są dostępne z napisami?'
                >
                    Tak, wiele naszych treści jest dostępnych w różnych językach, a także z opcjami napisów w wielu językach.
                </FaqQuestion>
                <FaqQuestion
                    question='Czy oferujecie treści dla dzieci?'
                >
                    Tak, mamy dedykowaną kategorię dla dzieci z treściami przyjaznymi dla najmłodszych.
                </FaqQuestion>
            </div>
        </section>
    )
}

export default LandingFAQ
