import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    
    const variants = {
      primary: 'bg-gradient-to-r from-[#4DA6FF] to-[#7C3AED] text-white font-bold hover:opacity-90 hover:scale-[1.02] shadow-lg shadow-purple-500/25',
      secondary: 'border-2 border-white/20 text-white font-semibold hover:border-white/40 hover:bg-white/5',
      outline: 'border border-border text-white hover:bg-white/5',
      ghost: 'hover:bg-white/5 text-[#C4BFD8] hover:text-white',
      glass: 'glass hover:bg-white/10 text-white',
    };

    const sizes = {
      sm: 'h-8 px-4 text-sm',
      md: 'h-10 px-6',
      lg: 'h-12 px-8 text-lg',
      icon: 'h-10 w-10',
    };

    return (
      <button
        ref={ref}
        disabled={isLoading || props.disabled}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
