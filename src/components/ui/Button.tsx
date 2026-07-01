import { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-green-600 text-white hover:bg-green-700 shadow-sm disabled:bg-green-300',
  secondary:
    'bg-green-100 text-green-800 hover:bg-green-200 disabled:bg-green-50',
  outline:
    'border border-green-300 text-green-700 hover:bg-green-50 disabled:opacity-50',
  ghost: 'text-green-700 hover:bg-green-50 disabled:opacity-50',
  danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm disabled:bg-red-300',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-4 py-2 text-sm rounded-lg',
  lg: 'px-6 py-3 text-base rounded-xl',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className,
      )}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  );
}
