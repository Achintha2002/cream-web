import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('raani_token');
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const res = await authAPI.getMe(token);
                if (res.success) {
                    setUser(res.user);
                } else {
                    localStorage.removeItem('raani_token');
                }
            } catch (err) {
                console.error('Auth verification error:', err);
                localStorage.removeItem('raani_token');
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, []);

    const login = async (email, password) => {
        const res = await authAPI.login({ email, password });
        if (res.success) {
            localStorage.setItem('raani_token', res.token);
            setUser(res.user);
        }
        return res;
    };

    const register = async (name, email, password) => {
        const res = await authAPI.register({ name, email, password });
        if (res.success) {
            localStorage.setItem('raani_token', res.token);
            setUser(res.user);
        }
        return res;
    };

    const logout = () => {
        localStorage.removeItem('raani_token');
        setUser(null);
    };

    const updateUser = (userData) => {
        setUser(userData);
    };

    return (
        <AuthContext.Provider value={{
            user, loading, login, register, logout, updateUser, isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
};
