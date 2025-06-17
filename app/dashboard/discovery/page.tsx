'use client';
import { useEffect } from 'react';

export default function Discovery() {
  useEffect(() => {
    window.location.replace('/dashboard/flow');
  }, []);

  return null;
}