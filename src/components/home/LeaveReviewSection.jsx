import React from 'react';
import { reviewSectionData } from '../../data/reviewData';

export default function LeaveReviewSection() {
  const { right } = reviewSectionData;

  return (
    <>
      <style>{`
        /* Base Section Styles */
        .lrs-section {
          background: #ffffff;
          width: 100%;
        }
        
        .lrs-container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 60px 140px;
        }
        
        .lrs-grid {
          display: grid;
          grid-template-columns: 56% 44%;
          align-items: center;
          gap: 70px;
        }

        /* Image Styles */
        .lrs-image-wrap {
          position: relative;
          width: 100%;
          min-height: 495px;
        }
        
        .lrs-image {
          width: 100%;
          height: auto;
          min-height: 495px;
          display: block;
          object-fit: cover;
        }

        /* Content Styles */
        .lrs-right {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-left: 20px;
          max-width: 600px;
        }
        
        .lrs-tag {
          font-size: 40px;
          font-weight: 700;
          color: #5B3DB5;
          margin: 0;
          line-height: 1.1;
        }
        
        .lrs-head {
          font-size: 40px;
          font-weight: 700;
          color: #1C1D21;
          margin: 0 0 24px;
          line-height: 1.1;
        }
        
        .lrs-para {
          font-size: 20px;
          font-weight: 400;
          color: #4B5563;
          line-height: 1.5;
          margin: 0 0 32px;
        }
        
        .lrs-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 100%;
          height: 56px;
          border-radius: 40px;
          background: #ffffff;
          border: 2px solid #5B3DB5;
          color: #5B3DB5;
          font-size: 17px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .lrs-btn:hover {
          background: #5B3DB5;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(91, 61, 181, 0.25);
        }

        /* Responsive: Tablet Landscape */
        @media (max-width: 1100px) {
          .lrs-container {
            padding: 64px 60px;
          }
          
          .lrs-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          
          .lrs-right {
            padding-left: 0;
            max-width: 100%;
          }
          
          .lrs-tag, .lrs-head {
            font-size: 36px;
          }
          
          .lrs-para {
            font-size: 18px;
          }
          
          .lrs-image-wrap, .lrs-image {
            min-height: 425px;
          }
        }

        /* Responsive: Tablet Portrait */
        @media (max-width: 768px) {
          .lrs-container {
            padding: 56px 32px;
          }
          
          .lrs-tag, .lrs-head {
            font-size: 32px;
          }
          
          .lrs-head {
            margin-bottom: 20px;
          }
          
          .lrs-para {
            font-size: 17px;
            margin-bottom: 28px;
          }
          
          .lrs-btn {
            height: 52px;
            font-size: 16px;
          }
          
          .lrs-image-wrap, .lrs-image {
            min-height: 365px;
          }
        }

        /* Responsive: Mobile */
        @media (max-width: 540px) {
          .lrs-container {
            padding: 48px 20px;
          }
          
          .lrs-tag, .lrs-head {
            font-size: 28px;
          }
          
          .lrs-para {
            font-size: 16px;
          }
          
          .lrs-btn {
            height: 50px;
            font-size: 15px;
          }
          
          .lrs-image-wrap, .lrs-image {
            min-height: 325px;
          }
        }
      `}</style>

      <section className="lrs-section">
        <div className="lrs-container">
          <div className="lrs-grid">
            <div className="lrs-image-wrap">
              <img 
                src="https://www.g2.com/assets/homepage_reviews_screenshot-e3f43d8a1b2de15981f59a92585bcd620a0235fbaef6d746e9c9ca792980ebc7.png" 
                alt="G2 Reviews Screenshot" 
                className="lrs-image"
              />
            </div>

            <div className="lrs-right">
              <p className="lrs-tag">{right.tagline}</p>
              <p className="lrs-head">{right.headline}</p>
              <p className="lrs-para">
                Help over 5 million monthly Buyers on G2 make the right choice for their business.
              </p>
              <a href={right.ctaLink} className="lrs-btn">
                {right.ctaLabel}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
