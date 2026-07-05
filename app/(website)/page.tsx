import type { Metadata } from 'next';
import HomeHero from '@/components/home/HomeHero';
import MessageSection from '@/components/home/MessageSection';
import AboutSection from '@/components/home/AboutSection';
import MeetSheikhSection from '@/components/home/MeetSheikhSection';
import CoursesSection from '@/components/home/CoursesSection';
import MethodologySection from '@/components/home/MethodologySection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ArticlesSection from '@/components/home/ArticlesSection';
import FAQSection from '@/components/home/FAQSection';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'الرئيسية',
  description: 'أكاديمية طيبة - منصة إسلامية تعليمية متخصصة في تعليم العلوم الشرعية تحت إشراف فضيلة الشيخ أحمد منصور',
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section introducing the Academy */}
      <HomeHero />
      
      {/* 2. Scientific Programs (البرامج العلمية) */}
      <CoursesSection />
      
      {/* 3. Message From The Sheikh (HTML5 Video & welcome text) */}
      <MessageSection />
      
      {/* 4. Meet The Sheikh (Premium biography & timeline) */}
      <MeetSheikhSection />
      
      {/* 5. About Typa Academy (Story, Mission, Vision) */}
      <AboutSection />
      
      {/* 6. Educational Methodology (4 Pillars) */}
      <MethodologySection />
      
      {/* 7. Student Testimonials (Quotes) */}
      <TestimonialsSection />
      
      {/* 8. Latest Articles by Sheikh Ahmed Mansour */}
      <ArticlesSection />
      
      {/* 9. FAQ Section (Accordion) */}
      <FAQSection />
      
      {/* 10. Final CTA Section (Hadith) */}
      <CTASection />
    </>
  );
}
