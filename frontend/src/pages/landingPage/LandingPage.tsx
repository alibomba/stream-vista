import { LandingHeader, LandingHero, LandingCategories, LandingHow, LandingPlans, LandingContact, LandingFAQ, Footer } from '../../sections';
import { useContext } from 'react';
import { AuthContext, ContextType } from '../../contexts/AuthProvider';
import Loading from '../../components/loading/Loading';
import { Navigate } from 'react-router-dom';


const LandingPage = () => {
    const { isLoading, isAuthorized } = useContext<ContextType>(AuthContext);

    if (isLoading) {
        return <Loading />
    }

    if (!isLoading && isAuthorized) {
        return <Navigate to='/homepage' />
    }

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
