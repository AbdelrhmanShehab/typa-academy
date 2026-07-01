import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import db from '@/firebase/firestore';
import { Lesson, CreateLessonInput, UpdateLessonInput } from '@/types';

const COLLECTION = 'lessons';

export async function getLessonsByCourse(courseId: string): Promise<Lesson[]> {
  const q = query(
    collection(db, COLLECTION),
    where('courseId', '==', courseId),
    orderBy('order'),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Lesson));
}

export async function getLessonById(id: string): Promise<Lesson | null> {
  const ref = doc(db, COLLECTION, id);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as Lesson;
}

export async function createLesson(data: CreateLessonInput): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateLesson(
  id: string,
  data: UpdateLessonInput,
): Promise<void> {
  const ref = doc(db, COLLECTION, id);
  await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
}

export async function deleteLesson(id: string): Promise<void> {
  const ref = doc(db, COLLECTION, id);
  await deleteDoc(ref);
}
