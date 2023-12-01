import { useState, useContext } from 'react';
import { AuthContext, ContextType } from '../../contexts/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import Error from '../error/Error';
import axiosClient from '../../axiosClient';

import styles from './header.module.css';

const Header = () => {
    const { setIsAuthorized } = useContext<ContextType>(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    async function logout() {
        try {
            await axiosClient({
                method: 'delete',
                url: '/logout',
                data: {
                    token: localStorage.getItem('adminRefreshToken')
                }
            });
            localStorage.removeItem('adminAccessToken');
            localStorage.removeItem('adminRefreshToken');
            setIsAuthorized(false);
            navigate('/login');
        } catch (err) {
            setError('Coś poszło nie tak, spróbuj ponownie później...');
        }
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <header className={styles.header}>
            <nav className={styles.header__nav}>
                <Link to='/seriale' className={styles.header__navLink}>Seriale</Link>
                <Link to='/filmy' className={styles.header__navLink}>Filmy</Link>
                <Link to='/kategorie' className={styles.header__navLink}>Kategorie</Link>
            </nav>
            <button title='Wyloguj się' onClick={logout} className={styles.header__button}>
                <MdLogout />
            </button>
        </header>
    )
}

export default Header
