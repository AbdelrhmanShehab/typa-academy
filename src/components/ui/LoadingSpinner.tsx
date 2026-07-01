import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: number;
  text?: string;
}

export default function LoadingSpinner({
  size = 24,
  text,
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <Loader2
        size={size}
        className="text-green-500 animate-spin"
      />
      {text && <p className="text-sm text-slate-500">{text}</p>}
    </div>
  );
}
