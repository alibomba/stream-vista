import { useState, useEffect, createContext } from 'react';
import axiosClient from '../axiosClient';
import axios from 'axios';

export interface ContextType {
    isLoading: boolean;
    isAuthorized: boolean;
    setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<ContextType>({
    isLoading: true,
    isAuthorized: false,
    setIsAuthorized: () => false
});

interface Props {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: '/auth',
            cancelToken: source.token
        })
            .then(() => setIsAuthorized(true))
            .catch(() => setIsAuthorized(false))
            .finally(() => setIsLoading(false));

        return () => {
            source.cancel();
        }

    }, []);

    const initialValue = {
        isLoading,
        isAuthorized,
        setIsAuthorized
    };

    return (
        <AuthContext.Provider value={initialValue}>
            {children}
        </AuthContext.Provider>
    )
}