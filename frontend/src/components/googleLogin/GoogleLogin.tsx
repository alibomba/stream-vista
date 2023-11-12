import { useState, useEffect, useContext } from 'react';
import { ContextType, AuthContext } from '../../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import Popup from '../popup/Popup';
import Error from '../error/Error';
import axiosClient from '../../axiosClient';


import styles from './googleLogin.module.css';

const GoogleLogin = () => {
    const navigate = useNavigate();
    const { setIsAuthorized } = useContext<ContextType>(AuthContext);
    const [popup, setPopup] = useState<Popup>({ content: null, active: false, type: 'bad' });
    const [error, setError] = useState<string | null>(null);

    async function handleCallbackResponse(response: any) {
        const token = response.credential;
        try {
            const res = await axiosClient({
                method: 'post',
                url: '/google-login',
                data: {
                    token
                }
            });
            const { accessToken, refreshToken } = res.data;
            setIsAuthorized(true);
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            navigate('/homepage');
        } catch (err: any) {
            if (err?.response?.status === 422 || err?.response?.status === 401) {
                setPopup({ content: err?.response?.data?.message, active: true, type: 'bad' });
                setTimeout(() => setPopup(prev => { return { ...prev, active: false } }), 4000);
            } else {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }
    }

    useEffect(() => {
        window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: handleCallbackResponse
        });

        function createFakeGoogleWrapper() {
            const googleLoginWrapper = document.querySelector('#googleLoginButton') as HTMLDivElement;
            googleLoginWrapper.style.display = 'none';
            window.google.accounts.id.renderButton(
                googleLoginWrapper,
                { type: 'icon', width: "200" }
            );
            const googleLoginWrapperButton = googleLoginWrapper.querySelector('div[role="button"]') as HTMLDivElement;
            return {
                click: () => {
                    googleLoginWrapperButton.click();
                }
            }
        }

        const googleButtonWrapper = createFakeGoogleWrapper();
        window.handleGoogleLogin = () => {
            googleButtonWrapper.click();
        }
    }, []);

    if (error) {
        return <Error>{error}</Error>
    }
    return (
        <>
            <div id='googleLoginButton'></div>
            <button type='button' onClick={window.handleGoogleLogin} className={styles.button}><FcGoogle /> Zaloguj się przez Google</button>
            <Popup active={popup.active} type={popup.type}>{popup.content}</Popup>
        </>
    )
}

export default GoogleLogin
