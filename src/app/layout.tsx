import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Coachwhizz',
  description:
    'AI-powered soft skills training platform built for interns and early career professionals to take their human skills to the next level.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cairo.className} antialiased min-h-screen flex flex-col`}>
        <Toaster position="top-center" />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
