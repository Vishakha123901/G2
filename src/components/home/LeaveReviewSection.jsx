import React from 'react';
import { reviewSectionData } from '../../data/reviewData';

export default function LeaveReviewSection() {
  const { right } = reviewSectionData;

  return (
    <section className="bg-white w-full">
      <div className="max-w-[1300px] mx-auto px-5 sm:px-8 md:px-[140px] py-12 sm:py-14 md:py-[60px]">
        <div className="grid grid-cols-1 md:grid-cols-[56%_44%] items-center gap-8 sm:gap-12 md:gap-[70px]">
          {/* Text Content - Mobile First */}
          <div className="order-1 md:order-2 flex flex-col justify-center text-center md:text-left md:pl-5 max-w-full md:max-w-[600px] mx-auto md:mx-0">
            <h2 
              className="font-bold mb-0"
              style={{ 
                fontFamily: 'Figtree, sans-serif', 
                color: '#5A39A2',
                fontSize: '2.625rem',
                lineHeight: '1.15',
                fontWeight: 700
              }}
            >
              Using<br />software?
            </h2>
            <h3 
              className="font-bold"
              style={{ 
                fontFamily: 'Figtree, sans-serif', 
                color: '#252530',
                fontSize: '1.375rem',
                fontWeight: 700,
                marginBottom: '0.75rem'
              }}
            >
              Leave a review.
            </h3>
            <p 
              className="text-base sm:text-lg md:text-xl font-normal leading-[1.5] mb-6 md:mb-8 max-w-[320px] sm:max-w-full mx-auto md:mx-0"
              style={{ fontFamily: 'Figtree, sans-serif', color: '#505059' }}
            >
              Help over 5 million monthly Buyers on G2 make<br className="hidden sm:inline" /> the right choice for their business.
            </p>
            <a 
              href={right.ctaLink}
              className="flex items-center justify-center w-full max-w-[280px] sm:max-w-full md:max-w-full h-[52px] md:h-14 rounded-[40px] bg-white border-2 transition-all duration-300 hover:shadow-lg mx-auto md:mx-0"
              style={{ 
                fontFamily: 'Figtree, sans-serif',
                borderColor: '#5A39A2',
                color: '#5A39A2',
                fontSize: '16px',
                fontWeight: 600
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
              {right.ctaLabel}
            </a>
          </div>

          {/* Image */}
          <div className="order-2 md:order-1 relative w-full min-h-[400px] sm:min-h-[365px] md:min-h-[495px]">
            <img 
              src="https://www.g2.com/assets/homepage_reviews_screenshot-e3f43d8a1b2de15981f59a92585bcd620a0235fbaef6d746e9c9ca792980ebc7.png" 
              alt="G2 Reviews Screenshot" 
              className="w-full h-auto min-h-[400px] sm:min-h-[365px] md:min-h-[495px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
