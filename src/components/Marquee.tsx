import React from 'react';

interface MarqueeProps {
  items?: string[];
  theme?: 'dark' | 'light' | 'pink';
  separator?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  items = [
    'FRESH DAILY',
    'PRESSED TO ORDER',
    'PURE FLAVOUR',
    'KOLLAM BEACH ROAD',
    'NATURAL CANE',
    'ZERO ADDED SUGAR',
    'COLD PRESSED',
  ],
  theme = 'dark',
  separator = '—',
}) => {
  const bgClass =
    theme === 'dark'
      ? 'bg-[#24131F] text-[#FFF9F5] border-y border-[#38202F]'
      : theme === 'pink'
      ? 'bg-[#E86A78] text-[#FFF9F5] border-y border-[#E86A78]'
      : 'bg-[#FFF9F5] text-[#24131F] border-y border-[#24131F]/10';

  const accentColor = theme === 'pink' ? 'text-[#24131F]' : 'text-[#E86A78]';

  // Duplicate items 4 times to ensure seamless infinite looping marquee
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className={`overflow-hidden py-3 text-xs tracking-[0.25em] uppercase font-semibold ${bgClass}`}>
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {repeated.map((text, i) => (
          <div key={i} className="flex items-center shrink-0">
            <span className="px-4">{text}</span>
            <span className={`px-2 select-none ${accentColor}`}>{separator}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
