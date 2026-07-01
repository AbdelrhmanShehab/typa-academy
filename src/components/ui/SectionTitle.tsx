import { cn } from '@/lib/cn';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  centered = false,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn(centered && 'text-center', className)}>
      <h2
        className={cn(
          'text-2xl md:text-3xl font-extrabold mb-3',
          'text-slate-900',
          centered && 'mx-auto'
        )}
      >
        {title}
      </h2>
      {/* Decorative underline */}
      <div className={cn('flex gap-1 mb-4', centered ? 'justify-center' : '')}>
        <div className="h-1 w-14 bg-green-600 rounded-full" />
        <div className="h-1 w-5 bg-amber-400 rounded-full" />
      </div>
      {subtitle && (
        <p className="text-slate-600 text-base leading-relaxed max-w-xl font-medium">
          {subtitle}
        </p>
      )}
    </div>
  );
}
