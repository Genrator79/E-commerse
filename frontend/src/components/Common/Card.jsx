import React from 'react';
import { cn } from '../../utils/cn';

const Card = ({ children, className, ...props }) => {
    return (
        <div
            className={cn(
                "bg-soft-surface rounded-2xl shadow-soft p-6",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
