import { createContext, useState, useEffect } from 'react';
import axiosClient from '../axiosClient';
import axios from 'axios';

interface ContextType {
    isLoading: boolean;
    isAuthorized: boolean;
    setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
    isPaid: boolean;
}

interface Props {
    children: React.ReactNode;
}

const AuthContext = createContext<ContextType>({
    isLoading: true,
    isAuthorized: false,
    setIsAuthorized: () => false,
    isPaid: false
});

const AuthProvider = ({ children }: Props) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [isPaid, setIsPaid] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: '/auth',
            cancelToken: source.token
        })
            .then(res => {
                setIsAuthorized(true);
                const { isPaidRes } = res.data;
                setIsPaid(isPaidRes);
            })
            .catch(() => {
                setIsAuthorized(false);
            })
            .finally(() => setIsLoading(false));

        return () => {
            source.cancel();
        }

    }, []);

    const initialValue: ContextType = {
        isLoading,
        isAuthorized,
        setIsAuthorized,
        isPaid
    };

    return (
        <AuthContext.Provider value={initialValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
