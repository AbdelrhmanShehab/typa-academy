'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/cn';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

export default function Modal({
  open,
  onClose,
  title,
  children,
  size = 'md',
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      <div
        className={cn(
          'w-full bg-white rounded-2xl shadow-2xl border border-green-100 overflow-hidden',
          sizeClasses[size],
        )}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-green-900">{title}</h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
