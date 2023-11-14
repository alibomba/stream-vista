
import ProductionTile from '../../components/productionTile/ProductionTile';
import { HomeHero, Feed } from '../../sections';

import styles from './homepage.module.css';

const Homepage = () => {
    return (
        <>
            <HomeHero />
            <Feed heading='Wybrane dla Ciebie'>
                <ProductionTile />
            </Feed>

        </>
    )
}

export default Homepage
