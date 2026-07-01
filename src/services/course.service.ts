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
import { Course, CreateCourseInput, UpdateCourseInput } from '@/types';

const COLLECTION = 'courses';

export async function getCourses(): Promise<Course[]> {
  const q = query(collection(db, COLLECTION), orderBy('title'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Course));
}

export async function getCourseById(id: string): Promise<Course | null> {
  const ref = doc(db, COLLECTION, id);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as Course;
}

export async function getPublishedCourses(): Promise<Course[]> {
  const q = query(
    collection(db, COLLECTION),
    where('status', '==', 'published'),
    orderBy('title'),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Course));
}

export async function getCoursesByTeacher(teacherId: string): Promise<Course[]> {
  const q = query(
    collection(db, COLLECTION),
    where('teacherId', '==', teacherId),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Course));
}

export async function createCourse(data: CreateCourseInput): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateCourse(
  id: string,
  data: UpdateCourseInput,
): Promise<void> {
  const ref = doc(db, COLLECTION, id);
  await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
}

export async function deleteCourse(id: string): Promise<void> {
  const ref = doc(db, COLLECTION, id);
  await deleteDoc(ref);
}
