import { Course } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users, Star } from 'lucide-react';
import Badge from './Badge';
import { formatPrice } from '@/utils';

interface CourseCardProps {
  course: Course;
}

const LEVEL_LABELS: Record<string, string> = {
  beginner: 'مبتدئ',
  intermediate: 'متوسط',
  advanced: 'متقدم',
};

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group block bg-white rounded-2xl border border-green-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 hover:border-green-200"
    >
      {/* Thumbnail */}
      <div className="relative h-48 bg-green-50">
        {course.thumbnail ? (
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-green-200 text-4xl font-bold">
              {course.title.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge variant={course.isFree ? 'success' : 'default'}>
            {course.isFree ? 'مجاني' : formatPrice(course.price)}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline">{course.category}</Badge>
          <Badge variant="outline">{LEVEL_LABELS[course.level]}</Badge>
        </div>

        <h3 className="text-green-900 font-bold text-base mb-1 group-hover:text-green-700 line-clamp-2">
          {course.arabicTitle}
        </h3>

        <p className="text-slate-500 text-sm line-clamp-2 mb-4">
          {course.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-slate-400 pt-3 border-t border-slate-100">
          <span className="flex items-center gap-1">
            <Clock size={13} />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <Users size={13} />
            {course.enrollmentLimit} طالب
          </span>
          {course.certificate && (
            <span className="flex items-center gap-1 text-gold-600">
              <Star size={13} />
              شهادة
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
