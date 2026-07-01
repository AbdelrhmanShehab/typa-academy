import { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type BadgeVariant = 'default' | 'success' | 'gold' | 'outline' | 'danger';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-slate-100 text-slate-700',
  success: 'bg-green-100 text-green-700',
  gold: 'bg-gold-100 text-gold-700',
  outline: 'border border-green-200 text-green-700 bg-transparent',
  danger: 'bg-red-100 text-red-700',
};

export default function Badge({
  children,
  variant = 'default',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
