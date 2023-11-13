import { useState, useRef, useEffect, useContext } from 'react';
import { AuthContext, ContextType } from '../../contexts/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { BsSearch, BsFillPersonFill } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import { LuLogOut } from 'react-icons/lu';
import { GiHamburgerMenu } from 'react-icons/gi';
import axiosClient from '../../axiosClient';
import axios from 'axios';
import Error from '../../components/error/Error';

import styles from './header.module.css';

interface Category {
    id: string;
    name: string;
}

const Header = () => {
    const navigate = useNavigate();
    const { setIsAuthorized } = useContext<ContextType>(AuthContext);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
    const [isNavActive, setIsNavActive] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const searchRef = useRef<HTMLInputElement>(null);
    const mobileSearchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: '/categories',
            cancelToken: source.token
        })
            .then(res => {
                setCategories(res.data);
            })
            .catch(() => {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            });

        return () => {
            source.cancel();
        }

    }, []);


    function toggleSearchInput() {
        if (searchRef.current) {
            const search = searchRef.current;
            if (isSearchActive) {
                setIsSearchActive(false);
                setTimeout(() => search.style.display = 'none', 150);
            }
            else {
                search.style.display = 'inline';
                setTimeout(() => setIsSearchActive(true), 10);
            }
        }
    }

    function mobileToggleSearchInput() {
        if (mobileSearchRef.current) {
            const search = mobileSearchRef.current;
            if (isSearchActive) {
                setIsSearchActive(false);
                setTimeout(() => search.style.display = 'none', 150);
            }
            else {
                search.style.display = 'inline';
                setTimeout(() => setIsSearchActive(true), 10);
            }
        }
    }

    function search() {
        if (searchRef.current) {
            const search = searchRef.current;
            const phrase = search.value;
            if (!phrase) return;
            setIsSearchActive(false);
            setTimeout(() => search.style.display = 'none', 150);
            navigate(`/wyszukaj/${phrase}`);
        }
    }

    function mobileSearch() {
        if (mobileSearchRef.current) {
            const search = mobileSearchRef.current;
            const phrase = search.value;
            if (!phrase) return;
            setIsSearchActive(false);
            setTimeout(() => search.style.display = 'none', 150);
            setIsNavActive(false);
            navigate(`/wyszukaj/${phrase}`);
        }
    }

    function searchCategory(e: React.ChangeEvent) {
        const select = e.target as HTMLInputElement;
        if (!select.value) return;
        const phrase = select.value;
        select.value = '';
        setIsNavActive(false);
        navigate(`/wyszukaj/${phrase}`);
    }

    async function logout() {
        try {
            await axiosClient({
                method: 'delete',
                url: '/logout',
                data: {
                    token: localStorage.getItem('refreshToken')
                }
            });
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            setIsAuthorized(false);
            navigate('/logowanie');
        } catch (err) {
            setError('Coś poszło nie tak, spróbuj ponownie później...');
        }
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <>
            <header className={styles.header}>
                <nav className={styles.header__nav}>
                    <img className={styles.header__img} src="/img/logo-icon.png" alt="logo Stream Vista" />
                    <Link to='/homepage' className={styles.header__navLink}>Home</Link>
                    <Link to='/seriale' className={styles.header__navLink}>Seriale</Link>
                    <Link to='/filmy' className={styles.header__navLink}>Filmy</Link>
                    <select onChange={searchCategory} className={styles.header__navLink}>
                        <option value="">Kategorie</option>
                        {
                            categories.map(category => <option key={category.id} value={category.name}>{category.name}</option>)
                        }
                    </select>
                </nav>
                <nav className={styles.header__buttons}>
                    <button onClick={toggleSearchInput} className={styles.header__button}>
                        {
                            isSearchActive ? <AiFillCloseCircle /> : <BsSearch />
                        }
                    </button>
                    <input style={{ display: 'none' }} ref={searchRef} placeholder='Wyszukaj' aria-label='Wyszukaj' className={`${styles.header__searchInput} ${isSearchActive && styles.header__searchInput_active}`} type="text" />
                    {
                        isSearchActive && <button onClick={search} className={styles.header__button}>
                            <BsSearch />
                        </button>
                    }
                    <Link to='/profil' className={styles.header__button}>
                        <BsFillPersonFill />
                    </Link>
                    <button onClick={logout} className={styles.header__button}>
                        <LuLogOut />
                    </button>
                </nav>
            </header>
            <header className={styles.header_mobile}>
                <div className={styles.header_mobile__top}>
                    <img className={styles.header__img} src="/img/logo-icon.png" alt="logo Stream Vista" />
                    <button onClick={() => setIsNavActive(prev => !prev)} className={`${styles.header__hamburger} ${isNavActive && styles.header__hamburger_active}`}>
                        <GiHamburgerMenu />
                    </button>
                </div>
                <nav className={`${styles.header_mobile__nav} ${isNavActive && styles.header_mobile__nav_active}`}>
                    <Link onClick={() => setIsNavActive(false)} to='/homepage' className={styles.header__navLink}>Home</Link>
                    <Link onClick={() => setIsNavActive(false)} to='/seriale' className={styles.header__navLink}>Seriale</Link>
                    <Link onClick={() => setIsNavActive(false)} to='/filmy' className={styles.header__navLink}>Filmy</Link>
                    <select onChange={searchCategory} className={styles.header__navLink}>
                        <option value="">Kategorie</option>
                        {
                            categories.map(category => <option key={category.id} value={category.name}>{category.name}</option>)
                        }
                    </select>
                    <div className={styles.header_mobile__search}>
                        <button onClick={mobileToggleSearchInput} className={styles.header__button}>
                            {
                                isSearchActive ? <AiFillCloseCircle /> : <BsSearch />
                            }
                        </button>
                        <input style={{ display: 'none' }} ref={mobileSearchRef} placeholder='Wyszukaj' aria-label='Wyszukaj' className={`${styles.header__searchInput} ${isSearchActive && styles.header__searchInput_active}`} type="text" />
                        {
                            isSearchActive && <button onClick={mobileSearch} className={styles.header__button}>
                                <BsSearch />
                            </button>
                        }
                    </div>
                    <Link onClick={() => setIsNavActive(false)} to='/profil' className={styles.header__button}>
                        <BsFillPersonFill />
                    </Link>
                    <button onClick={logout} className={styles.header__button}>
                        <LuLogOut />
                    </button>
                </nav>
            </header>
        </>

    )
}

export default Header
