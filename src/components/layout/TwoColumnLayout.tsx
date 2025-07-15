// components/layouts/TwoColumnLayout.tsx

'use client';

import React from 'react';

interface TwoColumnLayoutProps {
  children: React.ReactNode; // Main content (left column)
  rightTop?: React.ReactNode; // Optional top section in right column
  rightBottom?: React.ReactNode; // Optional bottom section in right column
  leftMaxWidth?: string; // Optional: override max-width for left column
  rightWidth?: string; // Optional: override right column width
  rightBg?: string; // Optional: override right column background color
  className?: string; // Optional: wrapper custom class
}

export default function TwoColumnLayout({
  children,
  rightTop,
  rightBottom,
  leftMaxWidth = '973px',
  rightWidth = '467px',
  rightBg = '#2A2D37',
  className = '',
}: TwoColumnLayoutProps) {
  return (
    <div className={`flex flex-1 overflow-hidden ${className}`}>
      {/* Left column */}
      <div className="flex-1 flex justify-center px-4 py-12 lg:p-20">
        <div className={`w-full max-w-[${leftMaxWidth}]`}>{children}</div>
      </div>

      {/* Right column: hidden on small screens */}
      <aside
        className={`hidden lg:flex flex-col justify-between  p-20`}
        style={{ width: rightWidth, backgroundColor: rightBg }}
      >
        <div>{rightTop}</div>
        <div>{rightBottom}</div>
      </aside>
    </div>
  );
}
