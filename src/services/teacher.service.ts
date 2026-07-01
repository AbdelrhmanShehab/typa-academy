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
import { Teacher, CreateTeacherInput, UpdateTeacherInput } from '@/types';

const COLLECTION = 'teachers';

export async function getTeachers(): Promise<Teacher[]> {
  const q = query(collection(db, COLLECTION), orderBy('arabicName'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Teacher));
}

export async function getTeacherById(id: string): Promise<Teacher | null> {
  const ref = doc(db, COLLECTION, id);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as Teacher;
}

export async function getActiveTeachers(): Promise<Teacher[]> {
  const q = query(
    collection(db, COLLECTION),
    where('status', '==', 'active'),
    orderBy('arabicName'),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Teacher));
}

export async function createTeacher(data: CreateTeacherInput): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateTeacher(
  id: string,
  data: UpdateTeacherInput,
): Promise<void> {
  const ref = doc(db, COLLECTION, id);
  await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
}

export async function deleteTeacher(id: string): Promise<void> {
  const ref = doc(db, COLLECTION, id);
  await deleteDoc(ref);
}
