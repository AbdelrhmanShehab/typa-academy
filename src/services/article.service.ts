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
import { Article, CreateArticleInput, UpdateArticleInput } from '@/types';

const COLLECTION = 'articles';

export async function getArticles(): Promise<Article[]> {
  const q = query(
    collection(db, COLLECTION),
    orderBy('publishDate', 'desc'),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Article));
}

export async function getArticleById(id: string): Promise<Article | null> {
  const ref = doc(db, COLLECTION, id);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as Article;
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const q = query(
    collection(db, COLLECTION),
    where('featured', '==', true),
    orderBy('publishDate', 'desc'),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Article));
}

export async function createArticle(data: CreateArticleInput): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateArticle(
  id: string,
  data: UpdateArticleInput,
): Promise<void> {
  const ref = doc(db, COLLECTION, id);
  await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
}

export async function deleteArticle(id: string): Promise<void> {
  const ref = doc(db, COLLECTION, id);
  await deleteDoc(ref);
}
