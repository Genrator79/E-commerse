import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Search } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
    const { cart, openCart } = useCart();
    const { user } = useAuth();

    return (
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-100 shadow-sm">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                <Link to="/" className="text-2xl font-sans font-bold text-soft-text-primary">
                    Luxe<span className="text-primary">.</span>
                </Link>

                <div className="hidden md:flex items-center space-x-8">
                    <Link to="/" className="text-soft-text-secondary hover:text-primary transition-colors">Home</Link>
                    <Link to="/shop" className="text-soft-text-secondary hover:text-primary transition-colors">Shop</Link>
                    <Link to="/about" className="text-soft-text-secondary hover:text-primary transition-colors">About</Link>
                    {user && user.isAdmin && (
                        <Link to="/admin-dashboard" className="text-soft-text-secondary hover:text-primary transition-colors">Admin</Link>
                    )}
                </div>

                <div className="flex items-center space-x-6">
                    <button className="text-soft-text-primary hover:text-primary transition-colors">
                        <Search size={20} />
                    </button>

                    <button onClick={openCart} className="relative text-soft-text-primary hover:text-primary transition-colors">
                        <ShoppingBag size={20} />
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                {cart.length}
                            </span>
                        )}
                    </button>

                    <Link to={user ? "/profile" : "/login"} className="text-soft-text-primary hover:text-primary transition-colors">
                        <User size={20} />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
