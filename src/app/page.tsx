"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import './globals.css'; // Ou outro arquivo onde estão os estilos globais

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
  }, [router]);

  return null;
}
