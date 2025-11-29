import React, { createContext, useReducer, useEffect } from 'react';
import { toast } from 'sonner';
import api from '../services/api';

const getInitialState = () => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : {
        items: [],
        total: 0,
        isCartOpen: false,
    };
};

export const CartContext = createContext(getInitialState());

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CART':
            return {
                ...state,
                items: action.payload.items,
                total: action.payload.total,
            };

        case 'ADD_ITEM':
            const existingItem = state.items.find(item => item._id === action.payload._id);
            let newState;
            if (existingItem) {
                newState = {
                    ...state,
                    items: state.items.map(item =>
                        item._id === action.payload._id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                    total: state.total + action.payload.price,
                };
            } else {
                newState = {
                    ...state,
                    items: [...state.items, { ...action.payload, quantity: 1 }],
                    total: state.total + action.payload.price,
                    isCartOpen: true,
                };
            }
            return newState;

        case 'DECREMENT_ITEM':
            const itemToDecrement = state.items.find(item => item._id === action.payload);
            if (itemToDecrement && itemToDecrement.quantity > 1) {
                return {
                    ...state,
                    items: state.items.map(item =>
                        item._id === action.payload
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    ),
                    total: state.total - itemToDecrement.price,
                };
            }
            return state;

        case 'REMOVE_ITEM':
            const itemToRemove = state.items.find(item => item._id === action.payload);
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload),
                total: state.total - (itemToRemove ? itemToRemove.price * itemToRemove.quantity : 0),
            };

        case 'CLEAR_CART':
            return {
                items: [],
                total: 0,
                isCartOpen: false,
            };

        case 'TOGGLE_CART':
            return { ...state, isCartOpen: action.payload };

        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, getInitialState());
    const token = localStorage.getItem('token');

    // Fetch cart from backend on mount if logged in
    useEffect(() => {
        const fetchCart = async () => {
            if (token) {
                try {
                    const { data } = await api.get('/cart');
                    dispatch({ type: 'SET_CART', payload: data });
                } catch (error) {
                    console.error('Failed to fetch cart:', error);
                }
            }
        };
        fetchCart();
    }, [token]);

    // Persist to localStorage whenever state changes (backup)
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state));
    }, [state]);

    const addToCart = async (product) => {
        // Optimistic update
        dispatch({ type: 'ADD_ITEM', payload: product });
        toast.success('Added to cart');

        if (token) {
            try {
                await api.post('/cart', { productId: product._id, quantity: 1 });
            } catch (error) {
                console.error('Failed to sync cart:', error);
                toast.error('Failed to save to account');
            }
        }
    };

    const updateQuantity = async (productId, action) => {
        // Optimistic update
        if (action === 'increment') {
            const item = state.items.find(i => i._id === productId);
            if (item) dispatch({ type: 'ADD_ITEM', payload: item });
        } else if (action === 'decrement') {
            dispatch({ type: 'DECREMENT_ITEM', payload: productId });
        }

        if (token) {
            try {
                const item = state.items.find(i => i._id === productId);
                const newQuantity = action === 'increment' ? item.quantity + 1 : item.quantity - 1;
                await api.put(`/cart/${productId}`, { quantity: newQuantity });
            } catch (error) {
                console.error('Failed to sync cart:', error);
            }
        }
    };

    const removeFromCart = async (productId) => {
        dispatch({ type: 'REMOVE_ITEM', payload: productId });
        toast.success('Removed from cart');

        if (token) {
            try {
                await api.delete(`/cart/${productId}`);
            } catch (error) {
                console.error('Failed to sync cart:', error);
            }
        }
    };

    const clearCart = async () => {
        dispatch({ type: 'CLEAR_CART' });

        if (token) {
            try {
                await api.delete('/cart');
            } catch (error) {
                console.error('Failed to sync cart:', error);
            }
        }
    };

    const openCart = () => dispatch({ type: 'TOGGLE_CART', payload: true });
    const closeCart = () => dispatch({ type: 'TOGGLE_CART', payload: false });

    return (
        <CartContext.Provider value={{ ...state, cart: state.items, addToCart, updateQuantity, removeFromCart, clearCart, openCart, closeCart }}>
            {children}
        </CartContext.Provider>
    );
};
