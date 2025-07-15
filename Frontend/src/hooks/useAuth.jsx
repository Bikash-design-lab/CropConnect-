import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const BASE_API = import.meta.env.VITE_BASE_API_URL
const BASE_URL = `${BASE_API}/user`


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userLoaded, setUserLoaded] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('cropconnect_token');
        const userData = localStorage.getItem('cropconnect_user');
        if (token && userData) {
            setUser(JSON.parse(userData));
        }
        setUserLoaded(true);
    }, []);

    const signup = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${BASE_URL}/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Registration failed');
            return { success: true, message: data.message };
        } catch (err) {
            setError(err.message);
            return { success: false, message: err.message };
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${BASE_URL}/signin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Login failed');
            
            localStorage.setItem('cropconnect_token', data.token);
            localStorage.setItem('cropconnect_user', JSON.stringify(data.user));
            setUser(data.user);
            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, message: err.message };
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('cropconnect_token');
            await fetch(`${BASE_URL}/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            localStorage.removeItem('cropconnect_token');
            localStorage.removeItem('cropconnect_user');
            setUser(null);
            setLoading(false);
        }
    };

    const requestPasswordReset = async (email) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${BASE_URL}/forgetPassword`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Password reset request failed');
            return { success: true, message: data.message };
        } catch (err) {
            setError(err.message);
            return { success: false, message: err.message };
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (token, newPassword) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${BASE_URL}/resetPassword`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Password reset failed');
            return { success: true, message: data.message };
        } catch (err) {
            setError(err.message);
            return { success: false, message: err.message };
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            loading, 
            error, 
            login, 
            logout, 
            signup, 
            requestPasswordReset, 
            resetPassword 
        }}>
            {userLoaded ? children : <div className="text-center py-8">Loading...</div>}
        </AuthContext.Provider>
    );
};

// If you are using hooks or context with JSX, the file should be named .jsx or .tsx
// Rename this file to useAuth.jsx for Vite/React to parse JSX correctly
export const useAuth = () => useContext(AuthContext);
