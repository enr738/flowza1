import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  gradientBorder?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, gradientBorder, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'glass rounded-2xl overflow-hidden',
          gradientBorder && 'relative before:absolute before:inset-0 before:p-[1px] before:bg-gradient-primary before:-z-10 before:rounded-2xl',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

export { Card };
