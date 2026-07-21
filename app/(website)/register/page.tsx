'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Students sign up automatically via Google OAuth.
// This page just redirects them to the login page.
export default function RegisterPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/login');
  }, [router]);
  return null;
}
