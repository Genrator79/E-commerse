import React from 'react';
import { cn } from '../../utils/cn';

const Button = ({ children, variant = 'primary', className, ...props }) => {
    const baseStyles = "rounded-full px-8 py-3 transition-all duration-300 transform hover:-translate-y-1 font-medium disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-primary text-white shadow-lg hover:shadow-soft-hover hover:scale-105 active:scale-95",
        secondary: "bg-white text-primary border-2 border-primary hover:bg-primary/10",
        outline: "border-2 border-soft-text-secondary text-soft-text-secondary hover:border-primary hover:text-primary"
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], className)}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
