import React from 'react';

// "Selling software? Reach more buyers." Section - Reversed Layout
export default function ClaimProfileSection() {
  return (
    <section className="bg-white w-full">
      <div className="max-w-[1300px] mx-auto px-5 sm:px-8 md:px-[140px] py-12 sm:py-14 md:py-[60px]">
        <div className="grid grid-cols-1 md:grid-cols-[44%_56%] items-center gap-8 sm:gap-12 md:gap-[70px]">
          
          {/* LEFT CONTENT */}
          <div className="flex flex-col justify-center text-center md:text-left max-w-full md:max-w-[600px] mx-auto md:mx-0">
            <h2 
              className="font-bold mb-0 text-[25px] sm:text-[32px] md:text-[38px] lg:text-[42px] leading-[1.15]"
              style={{ 
                fontFamily: 'Figtree, sans-serif', 
                color: '#5A39A2',
              }}
            >
              Selling software?
            </h2>
            <h3 
              className="font-bold mb-4 md:mb-6 text-[25px] sm:text-[28px] md:text-[34px] lg:text-[38px] leading-[1.15]"
              style={{ 
                fontFamily: 'Figtree, sans-serif', 
                color: '#252530',
              }}
            >
              Reach more buyers.
            </h3>
            <p 
              className="text-base sm:text-lg md:text-xl font-normal leading-[1.5] mb-6 md:mb-8"
              style={{ fontFamily: 'Figtree, sans-serif', color: '#505059' }}
            >
              Your future customers are researching their next purchase on G2. Make sure they can find you.
            </p>
            <a
              href="#"
              className="flex items-center justify-center w-full md:w-full h-12 md:h-14 rounded-[40px] bg-white border-2 transition-all duration-300 hover:shadow-lg mx-auto md:mx-0"
              style={{ 
                fontFamily: 'Figtree, sans-serif',
                borderColor: '#5A39A2',
                color: '#5A39A2',
                fontSize: '17px',
                fontWeight: 600,
                maxWidth: 'fit-content',
                padding: '0 24px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#5A39A2';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.color = '#5A39A2';
              }}
            >
              Claim Your G2 Profile
            </a>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative w-full min-h-[280px] sm:min-h-[320px] md:min-h-[450px]">
            <img 
              src="https://www.g2.com/assets/profile_screenshots-a84b3e5b2d744fbcaafb601feb1762582fb2cd5bdbaaa3d3a32b8dd4196c5b1b.png" 
              alt="G2 Profile Screenshots" 
              className="w-full h-auto min-h-[280px] sm:min-h-[320px] md:min-h-[450px] object-cover rounded-none md:rounded-lg"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
