import React from 'react';

export default function TestimonialSection() {
  return (
    <>
      <style>{`
        .testimonial-section {
          background: linear-gradient(135deg, #0B2540 0%, #1A3A5C 100%);
          width: 100%;
          padding: 35px 0;
          position: relative;
          overflow: hidden;
        }
        
        .testimonial-container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 140px;
          display: grid;
          grid-template-columns: 55% 45%;
          align-items: center;
          gap: 80px;
        }

        .testimonial-quote-wrapper {
          position: relative;
          z-index: 2;
        }
        
        .testimonial-quote {
          font-size: 34px;
          font-weight: 400;
          color: #ffffff;
          line-height: 1.35;
          margin: 0 0 32px;
        }
        
        .testimonial-highlight-orange {
          color: #FF6B4A;
          font-weight: 600;
        }
        
        .testimonial-author {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
          margin: 0 0 4px;
        }
        
        .testimonial-role {
          font-size: 14px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
        }
        
        .testimonial-author-wrapper {
          display: none;
        }

        .testimonial-image-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }
        
        .testimonial-image-circle {
          position: relative;
          width: 480px;
          height: 480px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .testimonial-profile-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .testimonial-accent-shape {
          position: absolute;
          top: 15%;
          right: 8%;
          width: 60px;
          height: 60px;
          background: #00CBA7;
          border-radius: 12px;
          transform: rotate(25deg);
          z-index: 3;
        }

        @media (max-width: 1280px) {
          .testimonial-container { 
            padding: 0 80px; 
            gap: 60px;
          }
          .testimonial-quote { font-size: 30px; line-height: 1.35; }
          .testimonial-image-circle { width: 420px; height: 420px; }
        }

        @media (max-width: 1100px) {
          .testimonial-section { padding: 35px 0; }
          .testimonial-container { 
            padding: 0 60px;
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .testimonial-quote-wrapper { text-align: center; }
          .testimonial-quote { 
            font-size: 26px; 
            line-height: 1.4;
            margin-bottom: 26px; 
          }
          .testimonial-image-circle { 
            width: 380px; 
            height: 380px; 
            margin: 0 auto;
          }
        }

        @media (max-width: 768px) {
          .testimonial-section { padding: 32px 20px; }
          .testimonial-container { 
            padding: 0 20px; 
            gap: 30px; 
          }
          .testimonial-quote { 
            font-size: 20px; 
            line-height: 1.5;
            margin-bottom: 20px;
          }
          .testimonial-author { font-size: 15px; }
          .testimonial-role { font-size: 13px; }
          .testimonial-image-circle { 
            width: 300px; 
            height: 300px; 
          }
          .testimonial-accent-shape { 
            width: 45px; 
            height: 45px;
            top: 10%;
            right: 5%;
          }
        }

        @media (max-width: 540px) {
          .testimonial-section { padding: 28px 16px; }
          .testimonial-container { 
            padding: 0 18px;
            gap: 20px;
            display: flex;
            flex-direction: column;
          }
          .testimonial-quote-wrapper {
            order: 1;
          }
          .testimonial-quote { 
            font-size: 18px;
            line-height: 1.5;
            margin-bottom: 0;
          }
          .testimonial-image-wrapper {
            order: 2;
          }
          .testimonial-author-wrapper {
            display: block;
            order: 3;
            text-align: center;
          }
          .testimonial-author { 
            font-size: 14px;
            margin-bottom: 4px;
          }
          .testimonial-role { 
            font-size: 12px;
            margin-bottom: 2px;
          }
          .testimonial-image-circle { 
            width: 140px; 
            height: 140px; 
          }
          .testimonial-accent-shape { 
            width: 27px; 
            height: 27px;
            top: 8%;
            right: 4%;
          }
        }

        @media (max-width: 400px) {
          .testimonial-section { padding: 24px 16px; }
          .testimonial-container { padding: 0 16px; gap: 22px; }
          .testimonial-quote { 
            font-size: 16px;
            line-height: 1.55;
            margin-bottom: 16px;
          }
          .testimonial-author { font-size: 13px; }
          .testimonial-role { font-size: 11px; }
          .testimonial-image-circle { 
            width: 140px; 
            height: 140px; 
          }
          .testimonial-accent-shape { 
            width: 32px; 
            height: 32px;
          }
        }
      `}</style>

      <section className="testimonial-section">
        <div className="testimonial-container">
          <div className="testimonial-quote-wrapper">
            <blockquote className="testimonial-quote">
              "G2 has been a great place for me to both{' '}
              <span className="testimonial-highlight-orange">find</span> and{' '}
              <span className="testimonial-highlight-orange">review</span>{' '}
              software... it's actually been fun to see my reviews go up, get marked helpful..."
            </blockquote>
          </div>

          <div className="testimonial-image-wrapper">
            <div className="testimonial-image-circle">
              <img 
                src="https://www.g2.com/assets/reviewer_image1-63f003a2437fdab1c5ab51e13f673b4f46f2493fc82db0564490403a72c4ea60.png" 
                alt="Matthew Gardner"
                className="testimonial-profile-img"
              />
            </div>
          </div>
          
          <div className="testimonial-author-wrapper">
            <p className="testimonial-author">Matthew Gardner</p>
            <p className="testimonial-role">Co-founder, RouteThis</p>
            <p className="testimonial-role">G2 Reviewer</p>
          </div>
        </div>
      </section>
    </>
  );
}
