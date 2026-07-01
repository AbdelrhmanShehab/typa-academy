import { Lesson } from '@/types';
import { PlayCircle, Clock, Paperclip } from 'lucide-react';

interface LessonCardProps {
  lesson: Lesson;
  onClick?: () => void;
}

export default function LessonCard({ lesson, onClick }: LessonCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-right flex items-center gap-4 p-4 bg-white rounded-xl border border-green-100 hover:border-green-300 hover:bg-green-50 group"
    >
      <div className="shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 text-green-600">
        <PlayCircle size={20} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-slate-800 font-medium text-sm truncate">
          {lesson.order}. {lesson.title}
        </p>
        <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {lesson.duration}
          </span>
          {lesson.attachments.length > 0 && (
            <span className="flex items-center gap-1">
              <Paperclip size={11} />
              {lesson.attachments.length} مرفق
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
