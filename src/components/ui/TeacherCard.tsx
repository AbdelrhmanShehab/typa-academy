import { Teacher } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Globe, BookOpen } from 'lucide-react';

interface TeacherCardProps {
  teacher: Teacher;
}

export default function TeacherCard({ teacher }: TeacherCardProps) {
  return (
    <Link
      href={`/teachers/${teacher.id}`}
      className="group block bg-white rounded-2xl border border-green-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 hover:border-green-200"
    >
      {/* Photo */}
      <div className="relative h-56 bg-green-50">
        {teacher.photo ? (
          <Image
            src={teacher.photo}
            alt={teacher.arabicName}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-green-300">
            <span className="text-5xl font-bold">{teacher.arabicName.charAt(0)}</span>
          </div>
        )}
        {/* Gold accent bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-400 to-gold-300" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-green-900 font-bold text-lg mb-1 group-hover:text-green-700">
          {teacher.arabicName}
        </h3>
        <p className="text-green-600 text-sm font-medium mb-3">
          {teacher.specialization}
        </p>
        <p className="text-slate-500 text-sm line-clamp-2 mb-4">
          {teacher.biography}
        </p>

        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Globe size={13} />
            {teacher.nationality}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen size={13} />
            {teacher.books.length} كتاب
          </span>
        </div>
      </div>
    </Link>
  );
}
