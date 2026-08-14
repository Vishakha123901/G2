import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// G2 Profile Section with Interactive Dots Navigation and Arrow Controls
export default function G2ProfileSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Content data for all 5 slides matching the reference images
  const slides = [
    {
      id: 0,
      tagline: "There's a G2 Profile with",
      headline: "your name on it.",
      description: "Now claiming is instant. Fill in a few details and start engaging your buyers today.",
      buttonText: "Claim your profile",
      buttonColor: "#5B3DB5",
      imageUrl: "https://images.g2crowd.com/uploads/cms_content/image/102/homepage_AutomaticApprovalofProductProfile.png"
    },
    {
      id: 1,
      tagline: "Foxit and G2 drives",
      headline: "authority and AI visibility",
      description: "When Evan Reiss became VP, Head of Marketing at Foxit, he brought more than just a fresh perspective — he brought a playbook for the future.",
      buttonText: "Know more",
      buttonColor: "#5B3DB5",
      imageUrl: "https://images.g2crowd.com/uploads/cms_content/image/2/homepage_Foxit-logo-Evan.png"
    },
    {
      id: 2,
      tagline: "The 2025 G2 Buyer",
      headline: "Behavior Report",
      description: "AI is disrupting the software buying journey—it's steering budgets and redefining who calls the shots. AI is now always included, and buyers aren't playing by the old rules.",
      buttonText: "Download the report",
      buttonColor: "#5B3DB5",
      imageUrl: "https://images.g2crowd.com/uploads/cms_content/image/36/homepage_BBR-2025_Blog.png"
    },
    {
      id: 3,
      tagline: "Unlocking Customer-Led",
      headline: "Growth with Reviews",
      description: "Winning in SaaS isn't only about building great products—you've got to make sure you're listening to your customers.",
      buttonText: "Grab the guide",
      buttonColor: "#5B3DB5",
      imageUrl: "https://images.g2crowd.com/uploads/cms_content/image/3/homepage_unlocking-customer-led-growth-thumbnail.webp"
    },
    {
      id: 4,
      tagline: "4x MQLs and 81% larger",
      headline: "deals. G2 proves ROI",
      description: "Learn how B2B software and services providers are driving growth with G2 Marketing Solutions in this analyst-validated ROI analysis from GTM Partners.",
      buttonText: "Grab your copy",
      buttonColor: "#5B3DB5",
      imageUrl: "https://images.g2crowd.com/uploads/cms_content/image/1/homepage_gtm-roi-study-featured.png"
    }
  ];

  const currentSlide = slides[activeSlide];

  const goToNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <>
      <style>{`
        .g2p-section {
          background: #FAF7F5;
          width: 100%;
          padding: 0;
          border-top: 1px solid #e5e5e5;
          position: relative;
        }
        .g2p-container {
          max-width: 100%;
          margin: 0 auto;
          padding: 60px 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .g2p-inner {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 140px;
          width: 100%;
        }
        .g2p-grid {
          display: grid;
          grid-template-columns: 45% 55%;
          align-items: center;
          gap: 80px;
        }

        /* LEFT CONTENT */
        .g2p-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          max-width: 520px;
        }
        .g2p-tagline {
          font-size: 36px;
          font-weight: 400;
          color: #1C1D21;
          margin: 0;
          line-height: 1.15;
        }
        .g2p-headline {
          font-size: 36px;
          font-weight: 700;
          color: #1C1D21;
          margin: 0 0 16px;
          line-height: 1.15;
        }
        .g2p-description {
          font-size: 17px;
          font-weight: 400;
          color: #4B5563;
          line-height: 1.55;
          margin: 0 0 28px;
        }
        .g2p-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 32px;
          border-radius: 40px;
          font-size: 16px;
          font-weight: 600;
          color: white;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          align-self: flex-start;
          box-shadow: 0 2px 8px rgba(91, 61, 181, 0.25);
        }
        .g2p-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(91, 61, 181, 0.35);
        }
        .g2p-button:active {
          transform: translateY(0);
        }

        /* RIGHT IMAGE */
        .g2p-right {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .g2p-image-wrapper {
          position: relative;
          width: 100%;
          max-width: 650px;
          aspect-ratio: 16 / 10;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
        }
        .g2p-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Colorful decorative borders */
        .g2p-image-wrapper::before {
          content: '';
          position: absolute;
          top: -6px;
          left: -6px;
          right: -6px;
          bottom: -6px;
          background: linear-gradient(135deg, #FFD700 0%, #FF4F00 25%, #5B3DB5 50%, #00CBA7 75%, #1877F2 100%);
          border-radius: 12px;
          z-index: -1;
          opacity: 0.25;
        }

        /* NAVIGATION CONTROLS CONTAINER */
        .g2p-controls-container {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 32px;
          padding-top: 32px;
          gap: 24px;
        }

        /* ARROW BUTTONS */
        .g2p-arrow-button {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: white;
          border: 2px solid #D1D5DB;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #4B5563;
        }
        .g2p-arrow-button:hover {
          border-color: #5B3DB5;
          background: #5B3DB5;
          color: white;
          transform: scale(1.1);
        }
        .g2p-arrow-button:active {
          transform: scale(0.95);
        }

        /* DOTS NAVIGATION */
        .g2p-dots {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .g2p-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #D1D5DB;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }
        .g2p-dot.active {
          background: #FF4F00;
          width: 8px;
          height: 8px;
          transform: scale(1.4);
        }
        .g2p-dot:hover:not(.active) {
          background: #9CA3AF;
          transform: scale(1.2);
        }

        /* Colorful geometric accents */
        .g2p-accent-yellow {
          position: absolute;
          top: -20px;
          left: -30px;
          width: 120px;
          height: 120px;
          background: #FFD700;
          border-radius: 12px;
          transform: rotate(15deg);
          z-index: -1;
        }
        .g2p-accent-red {
          position: absolute;
          bottom: -25px;
          left: -25px;
          width: 90px;
          height: 90px;
          background: #FF4F00;
          border-radius: 8px;
          transform: rotate(-20deg);
          z-index: -1;
        }
        .g2p-accent-blue {
          position: absolute;
          top: -15px;
          right: 80px;
          width: 100px;
          height: 50px;
          background: #1877F2;
          border-radius: 8px;
          transform: rotate(25deg);
          z-index: -1;
        }
        .g2p-accent-teal {
          position: absolute;
          bottom: 30px;
          right: -30px;
          width: 110px;
          height: 110px;
          background: #00CBA7;
          border-radius: 50%;
          z-index: -1;
        }

        /* RESPONSIVE */
        @media (max-width: 1280px) {
          .g2p-inner { padding: 0 80px; }
          .g2p-grid { gap: 60px; }
          .g2p-image-wrapper { max-width: 550px; }
        }

        @media (max-width: 1100px) {
          .g2p-inner { padding: 0 60px; }
          .g2p-grid { 
            grid-template-columns: 1fr; 
            gap: 40px; 
          }
          .g2p-left { max-width: 100%; margin: 0 auto; }
          .g2p-right { justify-content: center; margin: 0 auto; }
          .g2p-image-wrapper { max-width: 100%; }
          .g2p-controls-container { margin-top: 28px; padding-top: 28px; }
        }

        @media (max-width: 768px) {
          .g2p-inner { padding: 0 32px; }
          .g2p-tagline { font-size: 28px; }
          .g2p-headline { font-size: 28px; margin-bottom: 14px; }
          .g2p-description { font-size: 16px; margin-bottom: 22px; }
          .g2p-button { padding: 12px 28px; font-size: 15px; }
          .g2p-controls-container { margin-top: 24px; padding-top: 24px; gap: 20px; }
          .g2p-arrow-button { width: 36px; height: 36px; }
        }

        @media (max-width: 540px) {
          .g2p-inner { padding: 0 20px; }
          .g2p-tagline { font-size: 24px; }
          .g2p-headline { font-size: 24px; }
          .g2p-description { font-size: 15px; line-height: 1.5; }
          .g2p-button { 
            width: 100%; 
            padding: 12px 24px;
            justify-content: center;
          }
          .g2p-image-wrapper { 
            border-radius: 6px;
          }
          .g2p-controls-container { margin-top: 20px; padding-top: 20px; gap: 16px; }
          .g2p-arrow-button { width: 32px; height: 32px; }
          .g2p-dot { width: 6px; height: 6px; }
          .g2p-dot.active { width: 6px; height: 6px; }
          .g2p-accent-yellow { width: 80px; height: 80px; top: -10px; left: -15px; }
          .g2p-accent-red { width: 60px; height: 60px; bottom: -10px; left: -10px; }
          .g2p-accent-blue { width: 70px; height: 35px; right: 40px; }
          .g2p-accent-teal { width: 70px; height: 70px; right: -15px; }
        }

        /* Slide transition */
        .g2p-content-wrapper {
          animation: slideIn 0.5s ease;
        }
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

      <section className="g2p-section">
        <div className="g2p-container">
          <div className="g2p-inner">
            <div className="g2p-grid">
              
              {/* LEFT CONTENT */}
              <div className="g2p-left g2p-content-wrapper" key={activeSlide}>
                <h2 className="g2p-tagline">{currentSlide.tagline}</h2>
                <h2 className="g2p-headline">{currentSlide.headline}</h2>
                <p className="g2p-description">{currentSlide.description}</p>
                <button 
                  className="g2p-button" 
                  style={{ backgroundColor: currentSlide.buttonColor }}
                  onClick={() => console.log(`${currentSlide.buttonText} clicked`)}
                >
                  {currentSlide.buttonText}
                </button>
              </div>

              {/* RIGHT IMAGE */}
              <div className="g2p-right">
                {/* Colorful decorative shapes */}
                <div className="g2p-accent-yellow"></div>
                <div className="g2p-accent-red"></div>
                <div className="g2p-accent-blue"></div>
                <div className="g2p-accent-teal"></div>

                <div className="g2p-image-wrapper g2p-content-wrapper" key={`img-${activeSlide}`}>
                  <img 
                    src={currentSlide.imageUrl} 
                    alt="G2 Profile Preview" 
                    className="g2p-image"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* NAVIGATION CONTROLS - Arrows + Dots */}
          <div className="g2p-controls-container">
            {/* Left Arrow */}
            <button 
              className="g2p-arrow-button"
              onClick={goToPrevSlide}
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>

            {/* Dots Navigation */}
            <div className="g2p-dots">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  className={`g2p-dot ${activeSlide === index ? 'active' : ''}`}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Right Arrow */}
            <button 
              className="g2p-arrow-button"
              onClick={goToNextSlide}
              aria-label="Next slide"
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
