import React, { useRef, useState } from 'react';
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
    <>
      <style>{`
        .card-slider-wrapper {
          width: 100%;
          position: relative;
          margin: 32px 0;
          padding: 0;
        }

        .card-slider-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          padding: 0 140px;
        }

        .card-slider-title {
          font-size: 28px;
          font-weight: 700;
          color: #1C1D21;
          margin: 0;
        }

        .card-slider-controls {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .card-slider-arrow {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: white;
          border: 2px solid #E5E7EB;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #4B5563;
        }

        .card-slider-arrow:hover {
          border-color: #5B3DB5;
          background: #5B3DB5;
          color: white;
          transform: scale(1.05);
        }

        .card-slider-arrow:active {
          transform: scale(0.95);
        }

        .card-slider-arrow:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          border-color: #E5E7EB;
          background: white;
          color: #9CA3AF;
        }

        .card-slider-arrow:disabled:hover {
          transform: scale(1);
        }

        .card-slider-container {
          width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-behavior: smooth;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 0 140px;
        }

        .card-slider-container::-webkit-scrollbar {
          display: none;
        }

        .card-slider-track {
          display: flex;
          gap: 24px;
          width: max-content;
        }

        .card-slider-card {
          width: 300px;
          min-width: 300px;
          background: white;
          border-radius: 16px;
          padding: 20px;
          border: 1px solid #F3F4F6;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .card-slider-card:hover {
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          transform: translateY(-4px);
          border-color: #E5E7EB;
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .card-logo-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: #F9FAFB;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #F3F4F6;
        }

        .card-logo {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .card-badge {
          font-size: 11px;
          font-weight: 700;
          color: #FF4F00;
          background: #FFF7ED;
          padding: 4px 10px;
          border-radius: 20px;
          border: 1px solid #FFEDD5;
        }

        .card-name {
          font-weight: 700;
          color: #1C1D21;
          font-size: 16px;
          margin: 0 0 4px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-category {
          font-size: 13px;
          color: #6B7280;
          margin: 0 0 16px 0;
        }

        .card-footer {
          padding-top: 16px;
          border-top: 1px solid #F3F4F6;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .card-rating {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .card-rating-value {
          font-weight: 700;
          font-size: 14px;
          color: #1C1D21;
        }

        .card-reviews {
          font-size: 12px;
          color: #6B7280;
          font-weight: 500;
        }

        /* RESPONSIVE */
        @media (max-width: 1280px) {
          .card-slider-header,
          .card-slider-container {
            padding-left: 80px;
            padding-right: 80px;
          }
        }

        @media (max-width: 1100px) {
          .card-slider-header,
          .card-slider-container {
            padding-left: 60px;
            padding-right: 60px;
          }
        }

        @media (max-width: 768px) {
          .card-slider-header,
          .card-slider-container {
            padding-left: 32px;
            padding-right: 32px;
          }

          .card-slider-title {
            font-size: 24px;
          }

          .card-slider-arrow {
            width: 40px;
            height: 40px;
          }

          .card-slider-card {
            width: 280px;
            min-width: 280px;
          }
        }

        @media (max-width: 540px) {
          .card-slider-header,
          .card-slider-container {
            padding-left: 20px;
            padding-right: 20px;
          }

          .card-slider-title {
            font-size: 22px;
          }

          .card-slider-arrow {
            width: 36px;
            height: 36px;
          }

          .card-slider-track {
            gap: 16px;
          }

          .card-slider-card {
            width: 260px;
            min-width: 260px;
          }
        }
      `}</style>

      <div className="card-slider-wrapper">
        {title && (
          <div className="card-slider-header">
            <h3 className="card-slider-title">{title}</h3>
            <div className="card-slider-controls">
              <button
                onClick={() => scroll('left')}
                className="card-slider-arrow"
                aria-label="Previous slide"
                disabled={currentIndex === 0}
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
              </button>
              <button
                onClick={() => scroll('right')}
                className="card-slider-arrow"
                aria-label="Next slide"
                disabled={currentIndex >= items.length - 1}
              >
                <ChevronRight size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        )}

        <div ref={sliderRef} className="card-slider-container">
          <div className="card-slider-track">
            {items.map((card) => (
              <div key={card.id} className="card-slider-card">
                <div>
                  <div className="card-header">
                    <div className="card-logo-wrapper">
                      <img src={card.logo} alt={card.name} className="card-logo" />
                    </div>
                    {card.badge && (
                      <span className="card-badge">{card.badge}</span>
                    )}
                  </div>

                  <h4 className="card-name">{card.name}</h4>
                  <p className="card-category">{card.category}</p>
                </div>

                <div className="card-footer">
                  <div className="card-rating">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="card-rating-value">{card.rating}</span>
                  </div>
                  <span className="card-reviews">({card.reviewsCount} reviews)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
