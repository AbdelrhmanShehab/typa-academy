'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import AcademyLogo from '@/components/ui/AcademyLogo';
import { NAV_LINKS } from '@/constants';
import { Mail, Phone, MapPin, ExternalLink, PlayCircle, Share2 } from 'lucide-react';

const quickLinks = NAV_LINKS.slice(0, 5);

const courses = [
  { label: 'تعليم القرآن الكريم',       href: '/courses' },
  { label: 'أحكام التجويد',             href: '/courses' },
  { label: 'حفظ القرآن وتثبيته',       href: '/courses' },
  { label: 'التفسير وعلوم القرآن',      href: '/courses' },
  { label: 'العقيدة والفقه الشرعي',    href: '/courses' },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0d2119 0%, #1b4332 100%)' }}
    >
      {/* Pattern */}
      <div className="absolute inset-0 arch-pattern opacity-50 pointer-events-none" />

      {/* Gold top border */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: 'linear-gradient(90deg, transparent, #c9a227 30%, #c9a227 70%, transparent)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand Column */}
          <div className="lg:col-span-1 flex flex-col gap-5 text-right">
            <AcademyLogo size={52} onDark textSize="text-xl" subTextSize="text-[11px]" />
            <p className="text-green-300/70 text-sm leading-relaxed">
              منصة رائدة لتعليم القرآن الكريم والعلوم الشرعية على يد كبار العلماء والمشايخ الحاملين للأسانيد المتصلة.
            </p>
            {/* Social */}
            <div className="flex gap-3 justify-end">
              {[
                { icon: <PlayCircle size={16} />, href: '#', label: 'يوتيوب' },
                { icon: <Share2 size={16} />,     href: '#', label: 'تويتر' },
                { icon: <ExternalLink size={16} />, href: '#', label: 'فيسبوك' },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
                  style={{ background: 'rgba(45,106,79,0.3)', color: '#a8d5bf', border: '1px solid rgba(78,146,120,0.2)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,162,39,0.2)'; (e.currentTarget as HTMLElement).style.color = '#c9a227'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(45,106,79,0.3)'; (e.currentTarget as HTMLElement).style.color = '#a8d5bf'; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-right">
            <h3 className="text-white font-bold mb-5 text-sm tracking-wide">روابط سريعة</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-green-300/70 hover:text-gold-400 text-sm transition-colors flex items-center gap-2 justify-end"
                  >
                    {link.label}
                    <span className="w-1 h-1 rounded-full bg-gold-600 inline-block" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div className="text-right">
            <h3 className="text-white font-bold mb-5 text-sm tracking-wide">برامجنا التعليمية</h3>
            <ul className="space-y-3">
              {courses.map((c) => (
                <li key={c.label}>
                  <Link
                    href={c.href}
                    className="text-green-300/70 hover:text-gold-400 text-sm transition-colors flex items-center gap-2 justify-end"
                  >
                    {c.label}
                    <span className="w-1 h-1 rounded-full bg-gold-600 inline-block" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-right">
            <h3 className="text-white font-bold mb-5 text-sm tracking-wide">تواصل معنا</h3>
            <ul className="space-y-4">
              {[
                { icon: <Mail size={15} />, text: 'info@typa-academy.com' },
                { icon: <Phone size={15} />, text: '+966 50 000 0000' },
                { icon: <MapPin size={15} />, text: 'المملكة العربية السعودية' },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 justify-end">
                  <span className="text-green-300/70 text-sm">{item.text}</span>
                  <div className="p-1.5 rounded-lg shrink-0" style={{ background: 'rgba(45,106,79,0.3)', color: '#c9a227' }}>
                    {item.icon}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center"
          style={{ borderTop: '1px solid rgba(45,106,79,0.3)' }}
        >
          <p className="text-green-500/60 text-xs">
            جميع الحقوق محفوظة © {new Date().getFullYear()} — أكاديمية طيبة للدراسات القرآنية
          </p>
          <div className="flex gap-5">
            {['سياسة الخصوصية', 'الشروط والأحكام'].map((t) => (
              <Link key={t} href="#" className="text-green-500/60 hover:text-gold-400 text-xs transition-colors">
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
