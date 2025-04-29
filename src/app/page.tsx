import Image from 'next/image';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Coach whizz</h1>
      <p>
        AI-powered soft skills training platform built for interns and early career professionals to
        take their human skills to the next level.
      </p>
    </div>
  );
}
