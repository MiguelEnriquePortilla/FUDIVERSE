'use client';
import { useEffect } from 'react';

export default function Pos() {
  useEffect(() => {
    window.location.replace('/dashboard/mart');
  }, []);

  return null;
}