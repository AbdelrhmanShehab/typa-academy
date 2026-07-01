import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import db from '@/firebase/firestore';
import { Student, CreateStudentInput, UpdateStudentInput } from '@/types';

const COLLECTION = 'students';

export async function getStudents(): Promise<Student[]> {
  const q = query(collection(db, COLLECTION), orderBy('arabicName'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Student));
}

export async function getStudentById(id: string): Promise<Student | null> {
  const ref = doc(db, COLLECTION, id);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as Student;
}

export async function createStudent(data: CreateStudentInput): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateStudent(
  id: string,
  data: UpdateStudentInput,
): Promise<void> {
  const ref = doc(db, COLLECTION, id);
  await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
}

export async function deleteStudent(id: string): Promise<void> {
  const ref = doc(db, COLLECTION, id);
  await deleteDoc(ref);
}
