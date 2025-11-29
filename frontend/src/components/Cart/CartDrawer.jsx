import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import Button from '../Common/Button';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
    const { isCartOpen, closeCart, cart, total, removeFromCart, updateQuantity } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        closeCart();
        navigate('/checkout');
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
                    >
                        <div className="p-6 flex items-center justify-between border-b border-stone-100">
                            <h2 className="text-xl font-sans font-bold">Shopping Cart ({cart.length})</h2>
                            <button onClick={closeCart} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cart.length === 0 ? (
                                <div className="text-center text-soft-text-secondary mt-20">
                                    <p>Your cart is empty.</p>
                                    <button onClick={closeCart} className="text-primary font-medium mt-4 hover:underline">
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={item._id} className="flex gap-4">
                                        <div className="w-20 h-20 bg-stone-100 rounded-xl overflow-hidden">
                                            {item.images && item.images[0] && (
                                                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-soft-text-primary">{item.name}</h3>
                                            <p className="text-sm text-soft-text-secondary">${item.price}</p>
                                            <div className="flex items-center gap-3 mt-2">
                                                <div className="flex items-center border border-stone-200 rounded-lg">
                                                    <button
                                                        className="p-1 hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed"
                                                        onClick={() => updateQuantity(item._id, 'decrement')}
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="text-sm font-medium px-2">{item.quantity}</span>
                                                    <button
                                                        className="p-1 hover:bg-stone-100"
                                                        onClick={() => updateQuantity(item._id, 'increment')}
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <button onClick={() => removeFromCart(item._id)} className="text-error hover:text-red-600">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="p-6 border-t border-stone-100 bg-soft-bg">
                                <div className="flex justify-between mb-4 text-lg font-bold">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <Button onClick={handleCheckout} className="w-full">
                                    Proceed to Checkout
                                </Button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
