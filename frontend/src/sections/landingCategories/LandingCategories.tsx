import { GiPistolGun, GiWitchFace, GiGhost, GiMaterialsScience } from 'react-icons/gi';
import { FaFaceLaughSquint } from 'react-icons/fa6';
import { IoThunderstormSharp } from 'react-icons/io5'
import { PiAlienFill } from 'react-icons/pi';
import { MdFamilyRestroom } from 'react-icons/md'


import LandingCategory from '../../components/landingCategory/LandingCategory';
import styles from './landingCategories.module.css';

const LandingCategories = () => {
    return (
        <section className={styles.categories}>
            <h2 className={styles.categories__heading}>Kategorie treści</h2>
            <div className={styles.categories__grid}>
                <LandingCategory name='Akcja'>
                    <GiPistolGun title='pistolet' />
                </LandingCategory>
                <LandingCategory name='Komedia'>
                    <FaFaceLaughSquint title='śmiech' />
                </LandingCategory>
                <LandingCategory name='Dramat'>
                    <IoThunderstormSharp title='burza' />
                </LandingCategory>
                <LandingCategory name='Fantasy'>
                    <GiWitchFace title='wiedźma' />
                </LandingCategory>
                <LandingCategory name='Sci-Fi'>
                    <PiAlienFill title='kosmita' />
                </LandingCategory>
                <LandingCategory name='Horror'>
                    <GiGhost title='duch' />
                </LandingCategory>
                <LandingCategory name='Rodzinne'>
                    <MdFamilyRestroom title='rodzina' />
                </LandingCategory>
                <LandingCategory name='Naukowe'>
                    <GiMaterialsScience title='atom' />
                </LandingCategory>
            </div>
            <p className={styles.categories__text}>i wiele więcej...</p>
        </section>
    )
}

export default LandingCategories
