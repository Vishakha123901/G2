import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Footer from '../components/common/Footer';
import { trendingSoftware, recentlyReviewed } from '../data/reviewData';
import { useAuthModal } from '../context/AuthModalContext';

export default function LeaveReviewPage() {
  const navigate = useNavigate();
  const { openLoginModal } = useAuthModal();
  const [searchQuery, setSearchQuery] = useState('');
  const [trendingIndex, setTrendingIndex] = useState(0);
  const [recentIndex, setRecentIndex] = useState(0);

  // Check if user is logged in (set to false until login page is created)
  const isLoggedIn = false;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      // Redirect to login page if not logged in
      navigate('/login');
    } else {
      // Search functionality will work after login is implemented
      console.log('Searching for:', searchQuery);
    }
  };

  const scrollTrending = (direction) => {
    if (direction === 'left') {
      setTrendingIndex(prev => Math.max(0, prev - 1));
    } else {
      setTrendingIndex(prev => Math.min(Math.ceil(trendingSoftware.length / 4) - 1, prev + 1));
    }
  };

  const scrollRecent = (direction) => {
    if (direction === 'left') {
      setRecentIndex(prev => Math.max(0, prev - 1));
    } else {
      setRecentIndex(prev => Math.min(Math.ceil(recentlyReviewed.length / 4) - 1, prev + 1));
    }
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        
        .leave-review-page {
          min-height: 100vh;
          background: #ffffff;
          width: 100%;
          overflow-x: hidden;
        }

        /* NAVBAR */
        .review-navbar {
          width: 100%;
          background: white;
          border-bottom: 1px solid #E5E7EB;
          padding: 16px 0;
        }

        .nav-container {
          max-width: 100%;
          margin: 0 auto;
          padding: 0 140px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-logo {
          width: 48px;
          height: 48px;
        }

        .nav-btn {
          background: white;
          color: #5A39A2;
          font-size: 15px;
          font-weight: 600;
          padding: 10px 24px;
          border-radius: 24px;
          border: 1px solid #E5E7EB;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .nav-btn:hover {
          border-color: #5A39A2;
          background: #F9FAFB;
        }

        /* HEADER */
        .review-header {
          width: 100%;
          padding: 60px 0 50px;
          background: linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%);
        }

        .header-wrap {
          max-width: 100%;
          margin: 0 auto;
          padding: 0 140px;
        }

        .header-title {
          font-size: 42px;
          font-weight: 700;
          color: #201F23;
          margin: 0 0 12px 0;
          text-align: center;
        }

        .header-subtitle {
          font-size: 20px;
          color: #6B7280;
          margin: 0 0 40px 0;
          text-align: center;
        }

        .search-wrap {
          max-width: 700px;
          margin: 0 auto;
          position: relative;
        }

        .search-input {
          width: 100%;
          padding: 16px 60px 16px 24px;
          font-size: 16px;
          border: 2px solid #E5E7EB;
          border-radius: 50px;
          outline: none;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          border-color: #5A39A2;
          box-shadow: 0 0 0 3px rgba(94, 66, 192, 0.1);
        }

        .search-btn {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          background: #5A39A2;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .search-btn:hover {
          background: #493088;
        }

        /* CAROUSEL */
        .carousel-section {
          width: 100%;
          padding: 60px 0;
        }

        .carousel-wrap {
          max-width: 100%;
          margin: 0 auto;
          padding: 0 140px;
        }

        .carousel-header {
          font-size: 20px;
          font-weight: 700;
          color: #201F23;
          margin-bottom: 48px;
        }

        .carousel-controls-wrap {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .carousel-arrow {
          width: 32px;
          height: 32px;
          flex-shrink: 0;
          border-radius: 50%;
          background: white;
          border: 1px solid #E5E7EB;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s ease;
          color: #4B5563;
        }

        .carousel-arrow:hover:not(:disabled) {
          box-shadow: 0 2px 8px 2px rgba(32,31,35,0.149), 0 0 0 1px #5A39A2;
          border-color: transparent;
        }

        .carousel-arrow:disabled {
          background: #F3F4F6;
          border: 0;
          color: #DFDEE1;
          cursor: not-allowed;
        }

        .cards-grid {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px 16px;
          row-gap: 48px;
        }

        @media (min-width: 768px) {
          .cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1280px) {
          .cards-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* CARDS */
        .product-card {
          background: white;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          padding: 16px;
          padding-top: 40px;
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .card-img-wrap {
          position: absolute;
          left: 50%;
          top: 0;
          transform: translate(-50%, -50%);
          width: 64px;
          height: 64px;
          background: white;
          border: 1px solid #E5E7EB;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .card-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 4px;
        }

        .card-name {
          font-size: 18px;
          font-weight: 600;
          color: #201F23;
          margin: 8px 0 0 0;
          text-align: center;
        }

        @media (min-width: 1024px) {
          .card-name {
            text-align: left;
          }
        }

        .card-rating {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          margin-top: 4px;
        }

        @media (min-width: 1024px) {
          .card-rating {
            flex-direction: row;
            gap: 4px;
          }
        }

        .stars {
          display: flex;
          gap: 1px;
        }

        .star {
          color: #FFC800;
          font-size: 14px;
        }

        .star.empty {
          color: #E5E7EB;
        }

        .rating-txt {
          font-size: 14px;
          color: #71717A;
        }

        .card-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: auto;
          padding-top: 12px;
        }

        .review-btn {
          flex: 1;
          background: white;
          color: #5A39A2;
          border: 1px solid #5A39A2;
          font-size: 14px;
          font-weight: 600;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.15s ease;
          text-align: center;
        }

        .review-btn:hover {
          background: #F9FAFB;
        }

        .card-heart {
          width: 24px;
          height: 24px;
          flex-shrink: 0;
          cursor: pointer;
          color: #9CA3AF;
        }

        /* WHY SECTION */
        .why-section {
          width: 100%;
          padding: 80px 0;
          background: #F9FAFB;
        }

        .why-wrap {
          max-width: 100%;
          margin: 0 auto;
          padding: 0 140px;
        }

        .why-title {
          font-size: 36px;
          font-weight: 700;
          color: #201F23;
          text-align: center;
          margin: 0 0 60px 0;
        }

        .why-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 48px;
        }

        .why-card {
          text-align: center;
        }

        .why-icon {
          width: 72px;
          height: 72px;
          margin: 0 auto 24px;
        }

        .why-card-title {
          font-size: 22px;
          font-weight: 700;
          color: #201F23;
          margin: 0 0 12px 0;
        }

        .why-desc {
          font-size: 16px;
          color: #6B7280;
          line-height: 1.6;
        }

        /* RESPONSIVE */
        @media (max-width: 1280px) {
          .nav-container, .header-wrap, .carousel-wrap, .why-wrap {
            padding-left: 80px;
            padding-right: 80px;
          }
        }

        @media (max-width: 1100px) {
          .nav-container, .header-wrap, .carousel-wrap, .why-wrap {
            padding-left: 60px;
            padding-right: 60px;
          }
          .why-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          .nav-container, .header-wrap, .carousel-wrap, .why-wrap {
            padding-left: 32px;
            padding-right: 32px;
          }
          .header-title { font-size: 32px; }
          .carousel-header { font-size: 18px; margin-bottom: 32px; }
          .card-name { font-size: 16px; }
        }

        @media (max-width: 540px) {
          .nav-container, .header-wrap, .carousel-wrap, .why-wrap {
            padding-left: 20px;
            padding-right: 20px;
          }
          .header-title { font-size: 28px; }
          .carousel-header { font-size: 16px; }
        }
      `}</style>

      <div className="leave-review-page">
        {/* Navbar */}
        <nav className="review-navbar">
          <div className="nav-container">
            <Link
              to="/"
              className="flex items-center group focus:outline-none flex-shrink-0"
              aria-label="G2 Home"
            >
              <div className="w-12 h-12 bg-[#FF4F00] rounded-full flex items-center justify-center text-white font-black text-2xl shadow-sm transition-transform group-hover:scale-105">
                <span>G</span>
                <sup className="text-[13px] font-bold -ml-0.5 -mt-2">2</sup>
              </div>
            </Link>
            <button className="nav-btn" onClick={() => openLoginModal()}>
              Join or Log In
            </button>
          </div>
        </nav>

        {/* Header */}
        <section className="review-header">
          <div className="header-wrap">
            <h1 className="header-title">Leave a Review on G2</h1>
            <p className="header-subtitle">
              Share your experience and help others make informed decisions
            </p>
            <form onSubmit={handleSearchSubmit} className="search-wrap">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for software or services to review..."
                className="search-input"
              />
              <button type="submit" className="search-btn">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.9375 17L10.9583 12.0208C10.5417 12.3264 10.0848 12.566 9.58767 12.7396C9.09056 12.9132 8.56158 13 8.00073 13C6.61135 13 5.43056 12.5139 4.45833 11.5417C3.48611 10.5694 3 9.38889 3 8C3 6.61111 3.48611 5.43056 4.45833 4.45833C5.43056 3.48611 6.61111 3 8 3C9.38889 3 10.5694 3.48611 11.5417 4.45833C12.5139 5.43056 13 6.61135 13 8.00073C13 8.56158 12.9132 9.09056 12.7396 9.58767C12.566 10.0848 12.3264 10.5417 12.0208 10.9583L17 15.9375L15.9375 17ZM8 11.5C8.97222 11.5 9.79861 11.1597 10.4792 10.4792C11.1597 9.79861 11.5 8.97222 11.5 8C11.5 7.02778 11.1597 6.20139 10.4792 5.52083C9.79861 4.84028 8.97222 4.5 8 4.5C7.02778 4.5 6.20139 4.84028 5.52083 5.52083C4.84028 6.20139 4.5 7.02778 4.5 8C4.5 8.97222 4.84028 9.79861 5.52083 10.4792C6.20139 11.1597 7.02778 11.5 8 11.5Z" fill="white"/>
                </svg>
              </button>
            </form>
          </div>
        </section>

        {/* Trending Software */}
        <section className="carousel-section">
          <div className="carousel-wrap">
            <h3 className="carousel-header">Trending Software</h3>
            <div className="carousel-controls-wrap">
              <button
                className="carousel-arrow"
                onClick={() => scrollTrending('left')}
                disabled={trendingIndex === 0}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M6.875 10.75L11.0625 14.9375L10 16L4 10L10 4L11.0625 5.0625L6.875 9.25H16V10.75H6.875Z" fill="currentColor"/>
                </svg>
              </button>
              <div className="cards-grid">
                {trendingSoftware.slice(trendingIndex * 4, trendingIndex * 4 + 4).map((p) => (
                  <div key={p.id} className="product-card">
                    <div className="card-img-wrap">
                      <img src={p.image} alt={p.name} className="card-img" />
                    </div>
                    <h3 className="card-name">{p.name}</h3>
                    <div className="card-rating">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < Math.floor(p.rating) ? "star" : "star empty"}>★</span>
                        ))}
                      </div>
                      <span className="rating-txt">({p.reviews})</span>
                    </div>
                    <div className="card-actions">
                      <button className="review-btn" onClick={() => navigate('/login')}>
                        Review
                      </button>
                      <div className="card-heart" onClick={() => navigate('/login')}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 17.5L8.825 16.4375C5.5 13.4375 3.25 11.4062 3.25 8.9375C3.25 7.21875 4.59375 5.875 6.3125 5.875C7.30625 5.875 8.26562 6.34062 8.875 7.075C9.48438 6.34062 10.4438 5.875 11.4375 5.875C13.1562 5.875 14.5 7.21875 14.5 8.9375C14.5 11.4062 12.25 13.4375 8.925 16.4438L10 17.5Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="carousel-arrow"
                onClick={() => scrollTrending('right')}
                disabled={trendingIndex >= Math.ceil(trendingSoftware.length / 4) - 1}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M13.125 10.75H4V9.25H13.125L8.9375 5.0625L10 4L16 10L10 16L8.9375 14.9375L13.125 10.75Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Recently Reviewed */}
        <section className="carousel-section" style={{ background: '#F9FAFB' }}>
          <div className="carousel-wrap">
            <h3 className="carousel-header">Recently Reviewed</h3>
            <div className="carousel-controls-wrap">
              <button
                className="carousel-arrow"
                onClick={() => scrollRecent('left')}
                disabled={recentIndex === 0}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M6.875 10.75L11.0625 14.9375L10 16L4 10L10 4L11.0625 5.0625L6.875 9.25H16V10.75H6.875Z" fill="currentColor"/>
                </svg>
              </button>
              <div className="cards-grid">
                {recentlyReviewed.slice(recentIndex * 4, recentIndex * 4 + 4).map((p) => (
                  <div key={p.id} className="product-card">
                    <div className="card-img-wrap">
                      <img src={p.image} alt={p.name} className="card-img" />
                    </div>
                    <h3 className="card-name">{p.name}</h3>
                    <div className="card-rating">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < Math.floor(p.rating) ? "star" : "star empty"}>★</span>
                        ))}
                      </div>
                      <span className="rating-txt">({p.reviews})</span>
                    </div>
                    <div className="card-actions">
                      <button className="review-btn" onClick={() => navigate('/login')}>
                        Review
                      </button>
                      <div className="card-heart" onClick={() => navigate('/login')}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 17.5L8.825 16.4375C5.5 13.4375 3.25 11.4062 3.25 8.9375C3.25 7.21875 4.59375 5.875 6.3125 5.875C7.30625 5.875 8.26562 6.34062 8.875 7.075C9.48438 6.34062 10.4438 5.875 11.4375 5.875C13.1562 5.875 14.5 7.21875 14.5 8.9375C14.5 11.4062 12.25 13.4375 8.925 16.4438L10 17.5Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="carousel-arrow"
                onClick={() => scrollRecent('right')}
                disabled={recentIndex >= Math.ceil(recentlyReviewed.length / 4) - 1}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M13.125 10.75H4V9.25H13.125L8.9375 5.0625L10 4L16 10L10 16L8.9375 14.9375L13.125 10.75Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Why Section */}
        <section className="why-section">
          <div className="why-wrap">
            <h2 className="why-title">Why write a review on G2?</h2>
            <div className="why-grid">
              <div className="why-card">
                <svg className="why-icon" viewBox="0 0 72 72" fill="none">
                  <circle cx="36" cy="36" r="36" fill="#E0E7FF"/>
                  <path d="M36 18C26 18 18 26 18 36C18 46 26 54 36 54C46 54 54 46 54 36C54 26 46 18 36 18ZM36 30C39.3 30 42 32.7 42 36C42 39.3 39.3 42 36 42C32.7 42 30 39.3 30 36C30 32.7 32.7 30 36 30Z" fill="#5A39A2"/>
                </svg>
                <h3 className="why-card-title">Help your peers</h3>
                <p className="why-desc">
                  Share feedback to help others make better purchasing decisions.
                </p>
              </div>
              <div className="why-card">
                <svg className="why-icon" viewBox="0 0 72 72" fill="none">
                  <circle cx="36" cy="36" r="36" fill="#FEF3C7"/>
                  <path d="M36 18L40.5 31.5L54 33L43.5 42L46.5 54L36 48L25.5 54L28.5 42L18 33L31.5 31.5L36 18Z" fill="#FFC800"/>
                </svg>
                <h3 className="why-card-title">Earn recognition</h3>
                <p className="why-desc">
                  Position yourself as an expert with detailed reviews.
                </p>
              </div>
              <div className="why-card">
                <svg className="why-icon" viewBox="0 0 72 72" fill="none">
                  <circle cx="36" cy="36" r="36" fill="#DBEAFE"/>
                  <path d="M24 24H48V30H24V24ZM24 33H48V39H24V33ZM24 42H42V48H24V42Z" fill="#3B82F6"/>
                </svg>
                <h3 className="why-card-title">Share feedback</h3>
                <p className="why-desc">
                  Make your voice heard about solutions you use daily.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
