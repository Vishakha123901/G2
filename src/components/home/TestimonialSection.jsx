export default function TestimonialSection() {
  return (
    <section 
      className="w-full py-[35px] sm:py-8 md:py-9 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0B2540 0%, #1A3A5C 100%)' }}
    >
      <div className="max-w-[1300px] mx-auto px-4 sm:px-5 md:px-[60px] lg:px-[80px] xl:px-[140px] grid grid-cols-1 md:grid-cols-[55%_45%] items-center gap-5 sm:gap-[30px] md:gap-10 lg:gap-[60px] xl:gap-[80px]">
        
        {/* QUOTE WRAPPER */}
        <div className="relative z-[2] text-center md:text-left order-1">
          <blockquote 
            className="text-lg sm:text-xl md:text-2xl lg:text-[30px] xl:text-[34px] font-normal text-white leading-[1.5] md:leading-[1.4] lg:leading-[1.35] mb-0 sm:mb-0 md:mb-5 lg:mb-[26px] xl:mb-8"
            style={{ fontFamily: 'Figtree, sans-serif' }}
          >
            "G2 has been a great place for me to both{' '}
            <span className="font-semibold" style={{ color: '#FF6B4A' }}>find</span> and{' '}
            <span className="font-semibold" style={{ color: '#FF6B4A' }}>review</span>{' '}
            software... it's actually been fun to see my reviews go up, get marked helpful..."
          </blockquote>
        </div>

        {/* IMAGE WRAPPER */}
        <div className="relative flex items-center justify-center z-[2] order-2">
          <div className="relative w-[140px] h-[140px] sm:w-[300px] sm:h-[300px] md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px] xl:w-[480px] xl:h-[480px] flex items-center justify-center">
            <img 
              src="https://www.g2.com/assets/reviewer_image1-63f003a2437fdab1c5ab51e13f673b4f46f2493fc82db0564490403a72c4ea60.png" 
              alt="Matthew Gardner"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        
        {/* AUTHOR WRAPPER - Mobile Only */}
        <div className="block md:hidden text-center order-3">
          <p 
            className="text-sm sm:text-[15px] font-semibold text-white mb-1"
            style={{ fontFamily: 'Figtree, sans-serif' }}
          >
            Matthew Gardner
          </p>
          <p 
            className="text-xs sm:text-[13px] font-normal mb-[2px]"
            style={{ fontFamily: 'Figtree, sans-serif', color: 'rgba(255, 255, 255, 0.8)' }}
          >
            Co-founder, RouteThis
          </p>
          <p 
            className="text-xs sm:text-[13px] font-normal"
            style={{ fontFamily: 'Figtree, sans-serif', color: 'rgba(255, 255, 255, 0.8)' }}
          >
            G2 Reviewer
          </p>
        </div>
      </div>
    </section>
  );
}
