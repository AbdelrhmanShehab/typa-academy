'use client';

import { motion } from 'framer-motion';
import { Users, GraduationCap, BookOpen, Award } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: number;
}

function StatCard({ icon, value, label, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-2xl border border-green-100 p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md hover:border-green-200 transition-all"
    >
      <div className="w-12 h-12 rounded-full bg-green-50 text-green-700 flex items-center justify-center mb-4">
        {icon}
      </div>
      <p className="text-3xl font-extrabold text-green-900 mb-1">{value}</p>
      <p className="text-sm font-medium text-slate-500">{label}</p>
    </motion.div>
  );
}

export default function StatisticsSection() {
  const stats = [
    {
      icon: <Users size={24} />,
      value: '+٥٠',
      label: 'شيخ وعالم معتمد',
    },
    {
      icon: <GraduationCap size={24} />,
      value: '+٥,٠٠٠',
      label: 'طالب وطالبة',
    },
    {
      icon: <BookOpen size={24} />,
      value: '+١٠٠',
      label: 'دورة علمية',
    },
    {
      icon: <Award size={24} />,
      value: '+١٠',
      label: 'سنوات من العطاء',
    },
  ];

  return (
    <section className="py-16 bg-green-50/30 border-b border-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <StatCard
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              delay={idx * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
