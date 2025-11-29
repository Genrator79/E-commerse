import React, { createContext, useReducer } from 'react';
import api from '../services/api';
import { toast } from 'sonner';

const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
};

export const AuthContext = createContext(initialState);

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
        case 'REGISTER_START':
            return { ...state, loading: true, error: null };
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                token: action.payload.token
            };
        case 'LOGIN_FAILURE':
        case 'REGISTER_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'LOGOUT':
            return { ...state, user: null, token: null };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = async (email, password) => {
        dispatch({ type: 'LOGIN_START' });
        try {
            const { data } = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data));
            dispatch({ type: 'LOGIN_SUCCESS', payload: { user: data, token: data.token } });
            toast.success('Logged in successfully');
            return data;
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed';
            dispatch({ type: 'LOGIN_FAILURE', payload: message });
            toast.error(message);
            throw error;
        }
    };

    const register = async (name, email, password) => {
        dispatch({ type: 'REGISTER_START' });
        try {
            const { data } = await api.post('/auth/register', { name, email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data));
            dispatch({ type: 'REGISTER_SUCCESS', payload: { user: data, token: data.token } });
            toast.success('Registered successfully');
            return data;
        } catch (error) {
            const message = error.response?.data?.message || 'Registration failed';
            dispatch({ type: 'REGISTER_FAILURE', payload: message });
            toast.error(message);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
        toast.info('Logged out');
    };

    return (
        <AuthContext.Provider value={{ ...state, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
