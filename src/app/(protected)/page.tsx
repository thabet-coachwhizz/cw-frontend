'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-xl font-bold">HOME</h1>
      <Link href="/">Home</Link>
      <Link href="/#dashboard?d=1">Dashboard</Link>
      <Link href="/#dashboard?d=2">About</Link>
      <Link href="/#dashboard?d=3">Link</Link>
    </main>
  );
}
