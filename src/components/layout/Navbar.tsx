import Link from 'next/link';
import { NAV_LINKS } from '@/constants';
import MobileMenu from './MobileMenu';
import Image from "next/image";
import logo from "../../../public/logo.svg";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#F7F3EA] border-b border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[75px]">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center hover:opacity-95 transition-opacity">
            <Image
              src={logo}
              alt="شعار أكاديمية طيبة"
              width={72}
              height={36}
              priority
            />
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-semibold text-green-800 rounded-md hover:text-gold-600 hover:bg-gold-500/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Actions ── */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Switcher */}
            <button
              className="px-3 py-1.5 text-xs font-bold text-green-800 border border-green-800/20 rounded-md hover:bg-gold-500/5 hover:text-gold-600 transition-all cursor-pointer"
              title="Change Language"
            >
              English
            </button>
            {/* Login */}
            <Link
              href="/login"
              className="px-5 py-2 text-sm font-bold text-white bg-green-500 hover:bg-green-600 rounded-md shadow-sm transition-all"
            >
              تسجيل الدخول
            </Link>
          </div>

          {/* ── Mobile Menu ── */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
