import React from 'react';
import { cn } from '../../utils/cn';

const Input = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <input
            ref={ref}
            className={cn(
                "bg-stone-50 border-transparent focus:border-primary focus:ring-0 rounded-xl p-4 w-full outline-none transition-all duration-200 placeholder:text-soft-text-secondary/50",
                className
            )}
            {...props}
        />
    );
});

Input.displayName = "Input";

export default Input;
