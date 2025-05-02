'use client';

export default function Loader({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
