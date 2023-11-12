import { LandingHeader, LandingHero, LandingCategories, LandingHow, LandingPlans, LandingContact, LandingFAQ, Footer } from '../../sections';


const LandingPage = () => {
    return (
        <>
            <LandingHeader />
            <LandingHero />
            <main>
                <LandingCategories />
                <LandingHow />
                <LandingPlans />
                <LandingContact />
                <LandingFAQ />
            </main>
            <Footer />
        </>
    )
}

export default LandingPage
