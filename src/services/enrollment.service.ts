import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import db from '@/firebase/firestore';
import {
  Enrollment,
  CreateEnrollmentInput,
  UpdateEnrollmentInput,
} from '@/types';

const COLLECTION = 'enrollments';

export async function getEnrollments(): Promise<Enrollment[]> {
  const q = query(
    collection(db, COLLECTION),
    orderBy('enrolledAt', 'desc'),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Enrollment));
}

export async function getEnrollmentsByStudent(
  studentId: string,
): Promise<Enrollment[]> {
  const q = query(
    collection(db, COLLECTION),
    where('studentId', '==', studentId),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Enrollment));
}

export async function getEnrollmentsByCourse(
  courseId: string,
): Promise<Enrollment[]> {
  const q = query(
    collection(db, COLLECTION),
    where('courseId', '==', courseId),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Enrollment));
}

export async function createEnrollment(
  data: CreateEnrollmentInput,
): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateEnrollment(
  id: string,
  data: UpdateEnrollmentInput,
): Promise<void> {
  const ref = doc(db, COLLECTION, id);
  await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
}
