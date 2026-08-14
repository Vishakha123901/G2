import { useState } from 'react';

// G2 Profile Section with Interactive Dots Navigation
export default function G2ProfileSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Content data for all 5 slides
  const slides = [
    {
      id: 0,
      tagline: "There's a G2 Profile with",
      headline: "your name on it.",
      description: "Now claiming is instant. Fill in a few details and start engaging your buyers today.",
      buttonText: "Claim your profile",
      buttonColor: "#5A39A2",
      imageUrl: "https://images.g2crowd.com/uploads/cms_content/image/102/homepage_AutomaticApprovalofProductProfile.png"
    },
    {
      id: 1,
      tagline: "Foxit and G2 drives",
      headline: "authority and AI visibility",
      description: "When Evan Reiss became VP, Head of Marketing at Foxit, he brought more than just a fresh perspective — he brought a playbook for the future.",
      buttonText: "Know more",
      buttonColor: "#5A39A2",
      imageUrl: "https://images.g2crowd.com/uploads/cms_content/image/2/homepage_Foxit-logo-Evan.png"
    },
    {
      id: 2,
      tagline: "The 2025 G2 Buyer",
      headline: "Behavior Report",
      description: "AI is disrupting the software buying journey—it's steering budgets and redefining who calls the shots. AI is now always included, and buyers aren't playing by the old rules.",
      buttonText: "Download the report",
      buttonColor: "#5A39A2",
      imageUrl: "https://images.g2crowd.com/uploads/cms_content/image/36/homepage_BBR-2025_Blog.png"
    },
    {
      id: 3,
      tagline: "Unlocking Customer-Led",
      headline: "Growth with Reviews",
      description: "Winning in SaaS isn't only about building great products—you've got to make sure you're listening to your customers.",
      buttonText: "Grab the guide",
      buttonColor: "#5A39A2",
      imageUrl: "https://images.g2crowd.com/uploads/cms_content/image/3/homepage_unlocking-customer-led-growth-thumbnail.webp"
    },
    {
      id: 4,
      tagline: "4x MQLs and 81% larger",
      headline: "deals. G2 proves ROI",
      description: "Learn how B2B software and services providers are driving growth with G2 Marketing Solutions in this analyst-validated ROI analysis from GTM Partners.",
      buttonText: "Grab your copy",
      buttonColor: "#5A39A2",
      imageUrl: "https://images.g2crowd.com/uploads/cms_content/image/1/homepage_gtm-roi-study-featured.png"
    }
  ];

  const currentSlide = slides[activeSlide];

  return (
    <section className="bg-[#FAF7F5] w-full border-t border-[#e5e5e5] relative">
      <div className="max-w-full mx-auto py-[60px] flex flex-col justify-center">
        <div className="max-w-[1300px] mx-auto px-5 sm:px-[60px] md:px-[80px] lg:px-[140px] w-full">
          <div className="grid grid-cols-1 md:grid-cols-[45%_55%] items-center gap-8 sm:gap-12 md:gap-[80px]">
            
            {/* LEFT CONTENT */}
            <div 
              className="flex flex-col justify-center max-w-full md:max-w-[520px] text-center md:text-left mx-auto md:mx-0"
              style={{ animation: 'slideIn 0.5s ease' }}
              key={activeSlide}
            >
              <h2 
                className="text-[1.375rem] sm:text-[28px] md:text-4xl font-bold leading-[1.2] md:leading-[1.15] mb-0"
                style={{ fontFamily: 'Figtree, sans-serif', color: '#252530', fontWeight: 700, marginBottom: '0.75rem' }}
              >
                {currentSlide.tagline}
              </h2>
              <h2 
                className="text-[1.375rem] sm:text-[28px] md:text-4xl font-bold leading-[1.2] md:leading-[1.15] mb-3 md:mb-4"
                style={{ fontFamily: 'Figtree, sans-serif', color: '#252530', fontWeight: 700, marginBottom: '0.75rem' }}
              >
                {currentSlide.headline}
              </h2>
              <p 
                className="text-sm sm:text-base md:text-[17px] font-normal leading-[1.5] md:leading-[1.55] mb-5 md:mb-7"
                style={{ fontFamily: 'Figtree, sans-serif', color: '#505059' }}
              >
                {currentSlide.description}
              </p>
              <button 
                className="inline-flex items-center justify-center px-5 py-[11px] sm:px-7 sm:py-3 md:px-8 md:py-[14px] rounded-[40px] text-sm sm:text-[15px] md:text-base font-semibold text-white border-none cursor-pointer transition-all duration-300 hover:shadow-lg self-center md:self-start"
                style={{ 
                  fontFamily: 'Figtree, sans-serif',
                  backgroundColor: currentSlide.buttonColor,
                  boxShadow: '0 2px 8px rgba(91, 61, 181, 0.25)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(91, 61, 181, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(91, 61, 181, 0.25)';
                }}
                onClick={() => console.log(`${currentSlide.buttonText} clicked`)}
              >
                {currentSlide.buttonText}
              </button>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative flex items-center justify-center mx-auto md:mx-0">
              {/* Colorful decorative shapes */}
              <div 
                className="absolute top-[-10px] left-[-15px] sm:top-[-20px] sm:left-[-30px] w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] rounded-xl transform rotate-[15deg] -z-10"
                style={{ background: '#FFD700' }}
              />
              <div 
                className="absolute bottom-[-10px] left-[-10px] sm:bottom-[-25px] sm:left-[-25px] w-[60px] h-[60px] sm:w-[90px] sm:h-[90px] rounded-lg transform -rotate-[20deg] -z-10"
                style={{ background: '#FF4F00' }}
              />
              <div 
                className="absolute top-[-15px] right-[40px] sm:right-[80px] w-[70px] h-[35px] sm:w-[100px] sm:h-[50px] rounded-lg transform rotate-[25deg] -z-10"
                style={{ background: '#1877F2' }}
              />
              <div 
                className="absolute bottom-[30px] right-[-15px] sm:right-[-30px] w-[70px] h-[70px] sm:w-[110px] sm:h-[110px] rounded-full -z-10"
                style={{ background: '#00CBA7' }}
              />

              <div 
                className="relative w-full max-w-full md:max-w-[650px] aspect-video rounded-md md:rounded-lg overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.12)]"
                style={{ animation: 'slideIn 0.5s ease' }}
                key={`img-${activeSlide}`}
              >
                <div 
                  className="absolute -top-[6px] -left-[6px] -right-[6px] -bottom-[6px] rounded-xl -z-10 opacity-25"
                  style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FF4F00 25%, #5B3DB5 50%, #00CBA7 75%, #1877F2 100%)' }}
                />
                <img 
                  src={currentSlide.imageUrl} 
                  alt="G2 Profile Preview" 
                  className="w-full h-full object-cover block"
                />
              </div>
            </div>

          </div>
        </div>

        {/* NAVIGATION CONTROLS - Dots only */}
        <div className="w-full flex justify-center items-center mt-5 pt-5 sm:mt-6 sm:pt-6 md:mt-8 md:pt-8 gap-4 sm:gap-6">
          {/* Dots Navigation */}
          <div className="flex gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                className={`w-[6px] h-[6px] sm:w-2 sm:h-2 rounded-full border-none cursor-pointer transition-all duration-300 p-0 ${
                  activeSlide === index 
                    ? 'bg-[#FF4F00] scale-140' 
                    : 'bg-[#D1D5DB] hover:bg-[#9CA3AF] hover:scale-120'
                }`}
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { 
            opacity: 0; 
            transform: translateX(20px);
          }
          to { 
            opacity: 1; 
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
