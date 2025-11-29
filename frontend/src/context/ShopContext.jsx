import React, { createContext, useReducer, useEffect } from 'react';
import api from '../services/api';

const initialState = {
    products: [],
    loading: false,
    error: null,
};

export const ShopContext = createContext(initialState);

const shopReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_PRODUCTS_START':
            return { ...state, loading: true, error: null };
        case 'FETCH_PRODUCTS_SUCCESS':
            return { ...state, loading: false, products: action.payload };
        case 'FETCH_PRODUCTS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const ShopProvider = ({ children }) => {
    const [state, dispatch] = useReducer(shopReducer, initialState);

    const fetchProducts = async () => {
        dispatch({ type: 'FETCH_PRODUCTS_START' });
        try {
            const { data } = await api.get('/products');
            dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: data });
        } catch (error) {
            dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message });
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ShopContext.Provider value={{ ...state, fetchProducts }}>
            {children}
        </ShopContext.Provider>
    );
};
