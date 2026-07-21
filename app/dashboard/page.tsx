'use client';

import { useEffect, useState } from 'react';
import {
  Users,
  GraduationCap,
  BookOpen,
  ClipboardList,
  TrendingUp,
  Loader2,
} from 'lucide-react';
import { getTeachers } from '@/services/teacher.service';
import { getStudents } from '@/services/student.service';
import { getCourses } from '@/services/course.service';
import { getEnrollments } from '@/services/enrollment.service';
import { Enrollment, Student, Course } from '@/types';

interface ActivityItem {
  id: string;
  studentName: string;
  courseTitle: string;
  enrolledAt: string;
  status: string;
}

export default function DashboardHomePage() {
  const [stats, setStats] = useState({
    teachers: 0,
    students: 0,
    courses: 0,
    enrollments: 0,
  });
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [teachers, students, courses, enrollments] = await Promise.all([
          getTeachers(),
          getStudents(),
          getCourses(),
          getEnrollments(),
        ]);

        setStats({
          teachers: teachers.length,
          students: students.length,
          courses: courses.length,
          enrollments: enrollments.length,
        });

        // Resolve recent 5 enrollments activity
        const recentEnrollments = enrollments.slice(0, 5);
        const resolvedActivities = await Promise.all(
          recentEnrollments.map(async (enr) => {
            const student = students.find((s) => s.id === enr.studentId);
            const course = courses.find((c) => c.id === enr.courseId);
            return {
              id: enr.id,
              studentName: student?.arabicName || 'طالب غير معروف',
              courseTitle: course?.arabicTitle || 'دورة غير معروفة',
              enrolledAt: enr.enrolledAt,
              status: enr.status,
            };
          }),
        );
        setActivities(resolvedActivities);
      } catch (err) {
        console.error('Error loading dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const statCards = [
    {
      label: 'إجمالي الشيوخ',
      value: stats.teachers,
      icon: <Users size={20} />,
      color: 'text-green-600 bg-green-100',
    },
    {
      label: 'إجمالي الطلاب',
      value: stats.students,
      icon: <GraduationCap size={20} />,
      color: 'text-blue-600 bg-blue-100',
    },
    {
      label: 'إجمالي الدورات',
      value: stats.courses,
      icon: <BookOpen size={20} />,
      color: 'text-gold-600 bg-gold-100',
    },
    {
      label: 'إجمالي التسجيلات',
      value: stats.enrollments,
      icon: <ClipboardList size={20} />,
      color: 'text-purple-600 bg-purple-100',
    },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-2">
        <Loader2 className="animate-spin text-green-600" size={32} />
        <p className="text-slate-500 text-sm">جاري تحميل بيانات لوحة التحكم...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-green-900">مرحباً بك في لوحة التحكم</h2>
        <p className="text-slate-500 text-sm mt-1">إليك ملخص بيانات المنصة الحالية</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl border border-green-100 p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-green-900">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="bg-white rounded-2xl border border-green-100 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={18} className="text-green-600" />
          <h3 className="font-semibold text-green-900">النشاط الأخير</h3>
        </div>

        {activities.length === 0 ? (
          <p className="text-slate-400 text-sm py-4">
            لا توجد تسجيلات حديثة لعرضها حالياً.
          </p>
        ) : (
          <div className="divide-y divide-slate-100">
            {activities.map((activity) => (
              <div key={activity.id} className="py-3 flex items-center justify-between text-sm">
                <div>
                  <span className="font-medium text-green-950">{activity.studentName}</span>
                  <span className="text-slate-500 mx-1">سجل في دورة</span>
                  <span className="font-medium text-green-700">{activity.courseTitle}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      activity.status === 'active'
                        ? 'bg-green-50 text-green-700'
                        : activity.status === 'completed'
                        ? 'bg-blue-50 text-blue-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {activity.status === 'active'
                      ? 'نشط'
                      : activity.status === 'completed'
                      ? 'مكتمل'
                      : 'معلق'}
                  </span>
                  {activity.enrolledAt && (
                    <span className="text-xs text-slate-400">
                      {new Date(activity.enrolledAt).toLocaleDateString('ar-EG', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
