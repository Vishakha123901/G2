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
    <div className="fixed inset-0 z-[99998] flex items-center justify-center p-4 bg-black/50 backdrop-blur-[2px] animate-fadeIn">
      {/* Modal Container - Width adjusted for 1-line description */}
      <div 
        className="relative w-full max-w-[840px] md:max-w-[880px] bg-white rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.28)] p-6 sm:p-10 md:py-12 md:px-12 text-center border border-gray-100 animate-slideUp overflow-hidden min-h-[300px] flex flex-col justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button with border box */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-1.5 rounded-md border border-gray-200 hover:border-gray-400 text-gray-500 hover:text-gray-900 transition-colors focus:outline-none"
          aria-label="Close"
        >
          <X className="w-4 h-4 stroke-[2.2]" />
        </button>

        {/* Heading - Bold & Eye-catching */}
        <h2 className="text-[28px] sm:text-[34px] md:text-[38px] font-bold text-[#1C1D21] tracking-tight mb-3 sm:mb-4 leading-tight">
          Welcome to G2!
        </h2>

        {/* Subtitle / Description - Single line */}
        <p className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-[15.5px] text-[#4B5563] font-normal leading-relaxed mb-6 sm:mb-8 whitespace-normal md:whitespace-nowrap px-1">
          Log in to get personalized software recommendations, compare tools faster, and save your favorites, all in one place.
        </p>

        {/* Primary Action CTA */}
        <div className="flex flex-col items-center gap-3 w-full max-w-[340px] sm:max-w-none mx-auto">
          <button
            onClick={handleLoginClick}
            className="w-full sm:w-auto min-w-0 sm:min-w-[290px] bg-[#5A39A2] hover:bg-[#493088] text-white font-semibold text-[15px] sm:text-[16px] py-3.5 px-8 rounded-full shadow-[0_4px_16px_rgba(90,57,162,0.35)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-center"
          >
            Log in or create a free account
          </button>

          {/* Secondary Link: Stay logged out */}
          <button
            onClick={handleDismiss}
            className="text-[13.5px] sm:text-[14px] font-medium text-[#6B7280] hover:text-[#111827] transition-colors py-1 mt-1 focus:outline-none"
          >
            Stay logged out
          </button>
        </div>
      </div>
    </div>
  );
}

