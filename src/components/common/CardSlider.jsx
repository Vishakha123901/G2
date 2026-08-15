import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

// Reusable responsive card slider with arrow controls
export default function CardSlider({ items = [], title = "" }) {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const containerWidth = sliderRef.current.offsetWidth;
      const scrollAmount = direction === 'left' ? -containerWidth : containerWidth;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      
      // Update index
      if (direction === 'left') {
        setCurrentIndex(prev => Math.max(0, prev - 1));
      } else {
        setCurrentIndex(prev => Math.min(items.length - 1, prev + 1));
      }
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="w-full relative my-8">
      {title && (
        <div className="flex items-center justify-between mb-6 px-5 sm:px-8 md:px-[60px] lg:px-[80px] xl:px-[140px]">
          <h3 
            className="text-[22px] sm:text-2xl md:text-[28px] font-bold m-0"
            style={{ fontFamily: 'Figtree, sans-serif', color: '#1C1D21' }}
          >
            {title}
          </h3>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-white border-2 border-[#E5E7EB] flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-[#5B3DB5] hover:bg-[#5B3DB5] hover:text-white hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:border-[#E5E7EB] disabled:bg-white disabled:text-[#9CA3AF] disabled:hover:scale-100"
              style={{ color: '#4B5563' }}
              aria-label="Previous slide"
              disabled={currentIndex === 0}
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-white border-2 border-[#E5E7EB] flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-[#5B3DB5] hover:bg-[#5B3DB5] hover:text-white hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:border-[#E5E7EB] disabled:bg-white disabled:text-[#9CA3AF] disabled:hover:scale-100"
              style={{ color: '#4B5563' }}
              aria-label="Next slide"
              disabled={currentIndex >= items.length - 1}
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      )}

      <div 
        ref={sliderRef} 
        className="w-full overflow-x-auto overflow-y-hidden scroll-smooth px-5 sm:px-8 md:px-[60px] lg:px-[80px] xl:px-[140px]"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`
          .slider-container::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div className="slider-container flex gap-4 sm:gap-6 w-max">
          {items.map((card) => (
            <div 
              key={card.id} 
              className="w-[260px] min-w-[260px] sm:w-[280px] sm:min-w-[280px] md:w-[300px] md:min-w-[300px] bg-white rounded-2xl p-5 border border-[#F3F4F6] shadow-sm transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 hover:border-[#E5E7EB]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F9FAFB] p-2 flex items-center justify-center border border-[#F3F4F6]">
                    <img src={card.logo} alt={card.name} className="w-full h-full object-contain" />
                  </div>
                  {card.badge && (
                    <span 
                      className="text-[11px] font-bold px-[10px] py-1 rounded-full border"
                      style={{ 
                        fontFamily: 'Figtree, sans-serif',
                        color: '#FF4F00', 
                        background: '#FFF7ED', 
                        borderColor: '#FFEDD5' 
                      }}
                    >
                      {card.badge}
                    </span>
                  )}
                </div>

                <h4 
                  className="font-bold text-base m-0 mb-1 whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{ fontFamily: 'Figtree, sans-serif', color: '#1C1D21' }}
                >
                  {card.name}
                </h4>
                <p 
                  className="text-[13px] m-0 mb-4"
                  style={{ fontFamily: 'Figtree, sans-serif', color: '#6B7280' }}
                >
                  {card.category}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F3F4F6] flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span 
                    className="font-bold text-sm"
                    style={{ fontFamily: 'Figtree, sans-serif', color: '#1C1D21' }}
                  >
                    {card.rating}
                  </span>
                </div>
                <span 
                  className="text-xs font-medium"
                  style={{ fontFamily: 'Figtree, sans-serif', color: '#6B7280' }}
                >
                  ({card.reviewsCount} reviews)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
