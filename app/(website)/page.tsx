import type { Metadata } from 'next';
import HomeHero from '@/components/home/HomeHero';
import AboutSection from '@/components/home/AboutSection';
import StatisticsSection from '@/components/home/StatisticsSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import WhySection from '@/components/home/WhySection';
import ScholarsSection from '@/components/home/ScholarsSection';
import CoursesSection from '@/components/home/CoursesSection';
import JourneySection from '@/components/home/JourneySection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'الرئيسية',
  description: 'أكاديمية طيبة - منصة إسلامية تعليمية متخصصة في تعليم العلوم الشرعية على أيدي كبار العلماء والمشايخ',
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <AboutSection />
      <StatisticsSection />
      <CategoriesSection />
      <WhySection />
      <ScholarsSection />
      <CoursesSection />
      <JourneySection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
