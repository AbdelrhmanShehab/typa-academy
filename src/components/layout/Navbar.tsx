import Link from 'next/link';
import { NAV_LINKS } from '@/constants';
import MobileMenu from './MobileMenu';
import Image from "next/image";
import logo from "../../../public/logo.svg"
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/96 backdrop-blur-md border-b border-green-100/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[70px]">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
            <Image
              src={logo}
              alt="logo"
              width={70}
              height={35}
              priority

            />
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 text-sm font-semibold text-slate-600 rounded-lg hover:text-green-700 hover:bg-green-50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Actions ── */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              className="px-2.5 py-1 rounded-lg text-slate-400 hover:bg-green-50 hover:text-green-700 text-xs font-semibold border border-slate-200"
              title="تغيير اللغة"
            >
              EN
            </button>
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-semibold text-green-700 border border-green-200 rounded-xl hover:bg-green-50"
            >
              تسجيل الدخول
            </Link>
            <Link
              href="/register"
              className="px-5 py-2 text-sm font-semibold text-white bg-green-600 rounded-xl hover:bg-green-700 shadow-sm shadow-green-900/20"
            >
              ابدأ الآن
            </Link>
          </div>

          {/* ── Mobile Menu ── */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
