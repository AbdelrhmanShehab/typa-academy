import { TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/cn';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, hint, className, id, ...props },
  ref,
) {
  const textareaId = id || label?.replace(/\s+/g, '-').toLowerCase();

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={textareaId} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        rows={4}
        className={cn(
          'w-full px-3 py-2.5 text-sm rounded-lg border bg-white resize-y',
          'placeholder:text-slate-400 focus:outline-none focus:ring-2',
          error
            ? 'border-red-300 focus:ring-red-200 focus:border-red-400'
            : 'border-slate-200 focus:ring-green-200 focus:border-green-400',
          className,
        )}
        {...props}
      />
      {hint && !error && <p className="text-xs text-slate-400">{hint}</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
});

export default Textarea;
