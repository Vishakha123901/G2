import React from 'react';

// "Selling software? Reach more buyers." Section - Reversed Layout
export default function ClaimProfileSection() {
  return (
    <>
      <style>{`
        .cps-section {
          background: #ffffff;
          width: 100%;
        }
        .cps-container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 60px 140px;
        }
        .cps-grid {
          display: grid;
          grid-template-columns: 44% 56%;
          align-items: center;
          gap: 70px;
        }

        /* LEFT CONTENT */
        .cps-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          max-width: 600px;
        }
        .cps-tag   { font-size: 40px; font-weight: 700; color: #5B3DB5; margin: 0; line-height: 1.1; }
        .cps-head  { font-size: 40px; font-weight: 700; color: #1C1D21; margin: 0 0 24px; line-height: 1.1; }
        .cps-para  { font-size: 20px; font-weight: 400; color: #4B5563; line-height: 1.5; margin: 0 0 32px; }
        .cps-btn {
          display: flex; align-items: center; justify-content: center;
          width: 100%; max-width: 100%; height: 56px;
          border-radius: 40px;
          background: #ffffff;
          border: 2px solid #5B3DB5;
          color: #5B3DB5;
          font-size: 17px; font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .cps-btn:hover {
          background: #5B3DB5;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(91,61,181,0.25);
        }

        /* RIGHT IMAGE */
        .cps-image-wrap {
          position: relative;
          width: 100%;
          min-height: 450px;
        }
        .cps-image {
          width: 100%;
          height: auto;
          min-height: 450px;
          display: block;
          object-fit: cover;
        }

        /* ============ RESPONSIVE ============ */

        /* Tablet landscape (max-width: 1100px) */
        @media (max-width: 1100px) {
          .cps-container { padding: 64px 60px; }
          .cps-grid { grid-template-columns: 1fr; gap: 48px; }
          .cps-left { max-width: 100%; }
          .cps-tag { font-size: 36px; }
          .cps-head { font-size: 36px; }
          .cps-para { font-size: 18px; }
          .cps-image-wrap { min-height: 380px; }
          .cps-image { min-height: 380px; }
        }

        /* Tablet portrait (max-width: 768px) */
        @media (max-width: 768px) {
          .cps-container { padding: 56px 32px; }
          .cps-tag  { font-size: 32px; }
          .cps-head { font-size: 32px; margin-bottom: 20px; }
          .cps-para { font-size: 17px; margin-bottom: 28px; }
          .cps-btn  { height: 52px; font-size: 16px; }
          .cps-image-wrap { min-height: 320px; }
          .cps-image { min-height: 320px; }
        }

        /* Mobile (max-width: 540px) */
        @media (max-width: 540px) {
          .cps-container { padding: 48px 20px; }
          .cps-tag  { font-size: 28px; }
          .cps-head { font-size: 28px; }
          .cps-para { font-size: 16px; }
          .cps-btn  { height: 50px; font-size: 15px; }
          .cps-image-wrap { min-height: 280px; }
          .cps-image { min-height: 280px; }
        }
      `}</style>

      <section className="cps-section">
        <div className="cps-container">
          <div className="cps-grid">

            {/* ====== LEFT: Content ====== */}
            <div className="cps-left">
              <p className="cps-tag">Selling software?</p>
              <p className="cps-head">Reach more buyers.</p>
              <p className="cps-para">
                Your future customers are researching their next purchase on G2. Make sure they can find you.
              </p>
              <a
                href="#"
                className="cps-btn"
              >
                Claim Your G2 Profile
              </a>
            </div>

            {/* ====== RIGHT: Image ====== */}
            <div className="cps-image-wrap">
              <img 
                src="https://www.g2.com/assets/profile_screenshots-a84b3e5b2d744fbcaafb601feb1762582fb2cd5bdbaaa3d3a32b8dd4196c5b1b.png" 
                alt="G2 Profile Screenshots" 
                className="cps-image"
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
