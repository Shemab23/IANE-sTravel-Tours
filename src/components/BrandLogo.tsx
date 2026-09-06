import React from 'react';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showSlogan?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  size = 'md',
  showSlogan = true,
}) => {
  const isDarkText = variant === 'dark';

  return (
    <div className="flex items-center gap-2.5 select-none text-left">
      {/* Official styled compass-plane emblem */}
      <div className="relative flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B2A4A] to-[#12395E] shadow-sm border border-[#3FA9DD]/30">
        <svg
          viewBox="0 0 40 40"
          className="w-7 h-7 text-white"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Globe latitude / longitude subtle lines */}
          <circle cx="20" cy="20" r="14" stroke="#7EC8E3" strokeWidth="1" strokeOpacity="0.4" />
          <ellipse cx="20" cy="20" rx="14" ry="6" stroke="#7EC8E3" strokeWidth="0.8" strokeOpacity="0.3" />
          {/* Airplane ascending symbol */}
          <path
            d="M13 23L17 21L21 27L23 26L20 18L27 15C28.5 14.3 29.5 13 29 12C28.5 11 27 11.5 25.5 12.2L12 17.5L10 16L9 17L11 19L10 21L11.5 21.5L13 23Z"
            fill="#7EC8E3"
          />
          {/* Rwanda Golden sunbeam spark */}
          <circle cx="27" cy="12" r="1.5" fill="#C7A15A" />
        </svg>
      </div>

      <div>
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-extrabold tracking-tight font-heading ${
              size === 'sm' ? 'text-base' : size === 'lg' ? 'text-xl' : 'text-lg'
            } ${isDarkText ? 'text-[#0B2A4A]' : 'text-white'}`}
          >
            IAN'S
          </span>
          <span
            className={`font-semibold tracking-wide ${
              size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-sm' : 'text-xs'
            } text-[#3FA9DD]`}
          >
            TRAVEL & TOURS
          </span>
        </div>
        {showSlogan && (
          <p
            className={`text-[10px] font-medium tracking-wide mt-0.5 ${
              isDarkText ? 'text-[#556B4A]' : 'text-slate-300'
            }`}
          >
            Conquer the world with us!
          </p>
        )}
      </div>
    </div>
  );
};
