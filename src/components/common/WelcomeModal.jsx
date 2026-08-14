import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically trigger after 15 seconds (15,000 ms)
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 15 * 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
  };

  const handleLoginClick = () => {
    handleDismiss();
    navigate('/login');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99998] flex items-center justify-center p-3 sm:p-4 bg-black/45 backdrop-blur-[2px] animate-fadeIn">
      {/* Modal Container - Responsive width & padding */}
      <div 
        className="relative w-full max-w-[960px] bg-white rounded-xl sm:rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.25)] p-8 sm:p-10 md:p-12 text-center border border-gray-100 animate-slideUp overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button with border box */}
        <button
          onClick={handleDismiss}
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-1 rounded-md border border-gray-300 hover:border-gray-500 text-gray-600 hover:text-gray-900 transition-colors focus:outline-none"
          aria-label="Close"
        >
          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
        </button>

        {/* Heading */}
        <h2 className="text-3xl sm:text-2xl md:text-[32px] font-black text-[#1C1D21] tracking-tight mb-4 sm:mb-4 leading-tight">
          Welcome to G2!
        </h2>

        {/* Subtitle / Description */}
        <p className="text-[13px] sm:text-[14.5px] md:text-[15.5px] text-[#374151] font-normal leading-relaxed whitespace-normal md:whitespace-nowrap px-1 sm:px-2 mb-5 sm:mb-7">
          Log in to get personalized software recommendations, compare tools faster, and save your favorites, all in one place.
        </p>

        {/* Primary Action CTA - Fully responsive on mobile */}
        <div className="flex flex-col items-center gap-3 w-full max-w-[340px] sm:max-w-none mx-auto">
          <button
            onClick={handleLoginClick}
            className="w-full sm:w-auto min-w-0 sm:min-w-[280px] bg-[#5A39A2] hover:bg-[#493088] text-white font-semibold text-[14px] sm:text-[15.5px] py-3 sm:py-3.5 px-6 sm:px-8 rounded-full shadow-[0_4px_14px_rgba(94,66,192,0.35)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-center"
          >
            Log in or create a free account
          </button>

          {/* Secondary Link: Stay logged out */}
          <button
            onClick={handleDismiss}
            className="text-[13px] sm:text-[14px] font-medium text-[#4B5563] hover:text-[#111827] transition-colors py-1 focus:outline-none"
          >
            Stay logged out
          </button>
        </div>
      </div>
    </div>
  );
}

