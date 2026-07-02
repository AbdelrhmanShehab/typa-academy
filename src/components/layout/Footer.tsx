'use client';

import Link from 'next/link';
import AcademyLogo from '@/components/ui/AcademyLogo';
import { NAV_LINKS } from '@/constants';
import { Mail, Phone, MapPin, ArrowLeft } from 'lucide-react';

const quickLinks = NAV_LINKS.slice(0, 5);

const courses = [
  { label: 'تعليم القرآن الكريم', href: '/courses' },
  { label: 'أحكام التجويد', href: '/courses' },
  { label: 'حفظ القرآن وتثبيته', href: '/courses' },
  { label: 'التفسير وعلوم القرآن', href: '/courses' },
  { label: 'العقيدة والفقه الشرعي', href: '/courses' },
];

export default function Footer() {
  return (
    <footer className="relative bg-green-900 border-t border-gold-500/20 text-right overflow-hidden">
      
      {/* Gold top border line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold-500/40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-5 text-right">
            <AcademyLogo size={52} onDark textSize="text-xl" subTextSize="text-[11px]" />
            <p className="text-white/60 text-sm leading-relaxed">
              منصة تعليمية إسلامية رائدة تُعنى بتدريس القرآن الكريم بالقراءات المتواترة والعلوم الشرعية على أيدي مشايخ مسندين مؤهلين.
            </p>
            {/* Social Links */}
            <div className="flex gap-3 justify-end mt-2">
              <a
                href="https://youtube.com"
                className="w-9 h-9 rounded bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-gold-500 hover:border-gold-500 transition-all"
                title="يوتيوب"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C22 8.68 22 12 22 12s0 3.32-.42 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.494.42-4.812.42-4.812.42s-3.32 0-4.814-.42a2.504 2.504 0 0 1-1.768-1.768C8 15.32 8 12 8 12s0-3.32.42-4.814a2.504 2.504 0 0 1 1.768-1.768c1.494-.42 4.812-.42 4.812-.42s3.32 0 4.814.42zm-8.812 9.248l5.2-2.662-5.2-2.662v5.324z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                className="w-9 h-9 rounded bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-gold-500 hover:border-gold-500 transition-all"
                title="فيسبوك"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-right">
            <h3 className="text-white font-bold mb-5 text-sm tracking-wide border-r-2 border-gold-500 pr-3">
              روابط سريعة
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-gold-500 text-sm transition-colors flex items-center gap-2 justify-end"
                  >
                    {link.label}
                    <ArrowLeft size={12} className="text-gold-500/50" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses / Programs */}
          <div className="text-right">
            <h3 className="text-white font-bold mb-5 text-sm tracking-wide border-r-2 border-gold-500 pr-3">
              البرامج العلمية
            </h3>
            <ul className="space-y-3">
              {courses.map((c) => (
                <li key={c.label}>
                  <Link
                    href={c.href}
                    className="text-white/60 hover:text-gold-500 text-sm transition-colors flex items-center gap-2 justify-end"
                  >
                    {c.label}
                    <ArrowLeft size={12} className="text-gold-500/50" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-right">
            <h3 className="text-white font-bold mb-5 text-sm tracking-wide border-r-2 border-gold-500 pr-3">
              تواصل معنا
            </h3>
            <ul className="space-y-4">
              {[
                { icon: <Mail size={15} />, text: 'info@typa-academy.com' },
                { icon: <Phone size={15} />, text: '01287419214' },
                { icon: <MapPin size={15} />, text: 'الدراسة، القاهرة، مصر' },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 justify-end">
                  <span className="text-white/60 text-sm">{item.text}</span>
                  <div className="p-1.5 rounded bg-white/5 border border-white/10 text-gold-500 shrink-0">
                    {item.icon}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right"
          style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}
        >
          <p className="text-white/40 text-xs">
            جميع الحقوق محفوظة © {new Date().getFullYear()} — أكاديمية طيبة للدراسات القرآنية
          </p>
          <div className="flex gap-5">
            {['سياسة الخصوصية', 'الشروط والأحكام'].map((t) => (
              <Link key={t} href="#" className="text-white/40 hover:text-gold-500 text-xs transition-colors">
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
