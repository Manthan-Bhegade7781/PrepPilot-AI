import {useContext, useEffect} from "react";
import {AuthContext} from "../auth.context.jsx";
import {login, register, logout, getCurrentUser,googleLogin} from "../services/auth.api.js";

export const useAuth = () => {
    const {user, setUser, loading, setLoading , logInLoading, setLogInLoading} = useContext(AuthContext);

    const handlelogin = async ({email, password}) => {
        setLogInLoading(true);
        try {
            const response = await login({email, password});
            setUser(response.user);
        } catch (error) {
            throw error;
        } finally {
            setLogInLoading(false);
        }
    }

    const handleRegister = async ({username, email, password}) => {
        setLogInLoading(true);
        try {
            const response = await register({username, email, password});
            setUser(response.user);
        } catch (error) {
            throw error;
        } finally {
            setLogInLoading(false);
        }
    }

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            setUser(null);
        } catch (error) {
            throw error;
        }finally {
            setLoading(false);
        }
    }

    const handleGoogleLogin = async(credential)=>{
        setLogInLoading(true);
        let response= null;
        try {
            response = await googleLogin(credential);
            setUser(response.user);
        } catch (error) {
            throw error;
        } finally {
            setLogInLoading(false);
        }

        return response.user
    }

    useEffect(() => {
            const fetchCurrentUser = async () => {
                try {
                    const currentUser = await getCurrentUser();
                    setUser(currentUser.user);
                } catch (error) {
                    console.error('Error fetching current user:', error);
                } finally {
                    setLoading(false);
                }
            };
    
            fetchCurrentUser();
        }, []);
    
    return { user, loading, handlelogin, handleRegister, handleLogout, logInLoading,handleGoogleLogin };
}