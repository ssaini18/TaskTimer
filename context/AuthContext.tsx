import { router } from "expo-router";
import { ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import { createContext } from "react";
import * as SecureStore from 'expo-secure-store';
import { AuthContextType } from "@/constants/interfaces";

const AuthContext = createContext<AuthContextType>({
    loading: false,
    isAuthenticated: false,
    signIn: () => null,
    signOut: () => null
});

export const AuthProvider = ({children}: {children: ReactNode}): ReactNode => {
    const [loading, setLoading] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async () => {
        try {
            let token = await SecureStore.getItemAsync('token');
            if(token) {
                setIsAuthenticated(true);
            }
        } catch(error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const signIn = useCallback(() => {
        setIsAuthenticated(true);
        router.replace('/');
    }, []);

    const signOut = useCallback(async () => {
        await Promise.all([
            SecureStore.deleteItemAsync('token'),
            SecureStore.deleteItemAsync('refreshToken')
        ]);
        setIsAuthenticated(false);
        router.replace('/login');
    }, []);

    return <AuthContext.Provider value={{loading, signIn, signOut, isAuthenticated}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext);
}