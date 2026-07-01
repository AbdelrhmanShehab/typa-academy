'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/constants';

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-green-50 hover:text-green-700"
        aria-label="القائمة"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <div className="md:hidden absolute top-16 right-0 left-0 bg-white border-b border-green-100 shadow-lg z-40">
          <nav className="flex flex-col p-4 gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:text-green-700 hover:bg-green-50"
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-2 border-green-100" />
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-sm text-slate-500">اللغة / Language</span>
              <button className="px-3 py-1 text-xs font-semibold border border-slate-200 rounded-md text-slate-700 hover:bg-green-50">
                English (EN)
              </button>
            </div>
            <hr className="my-2 border-green-100" />
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="px-3 py-2 text-sm font-medium text-green-700"
            >
              تسجيل الدخول
            </Link>
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg text-center hover:bg-green-700"
            >
              إنشاء حساب
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
