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

  const isLoggedIn = false;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      navigate('/login');
    } else {
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
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      {/* Navbar */}
      <nav className="w-full bg-white border-b border-gray-200 py-4">
        <div className="max-w-full mx-auto px-5 md:px-8 lg:px-20 xl:px-[140px] flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center group focus:outline-none flex-shrink-0"
            aria-label="G2 Home"
          >
            <div className="w-12 h-12 bg-[#FF492C] rounded-full flex items-center justify-center text-white font-black text-2xl shadow-sm transition-transform group-hover:scale-105">
              <span>G</span>
              <sup className="text-[13px] font-bold -ml-0.5 -mt-2">2</sup>
            </div>
          </Link>
          <button 
            onClick={() => openLoginModal()}
            className="bg-white text-brand-purple text-[15px] font-semibold py-2.5 px-6 rounded-full border border-gray-200 hover:border-brand-purple hover:bg-gray-50 transition-all duration-300"
          >
            Join or Log In
          </button>
        </div>
      </nav>

      {/* Header */}
      <section className="w-full py-[60px] pb-[50px] bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-full mx-auto px-5 md:px-8 lg:px-20 xl:px-[140px]">
          <h1 className="text-[42px] md:text-[42px] sm:text-[32px] font-bold text-[#201F23] mb-3 text-center">
            Leave a Review on G2
          </h1>
          <p className="text-xl text-gray-500 mb-10 text-center">
            Share your experience and help others make informed decisions
          </p>
          <form onSubmit={handleSearchSubmit} className="max-w-[700px] mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for software or services to review..."
              className="w-full py-4 pl-6 pr-[60px] text-base border-2 border-gray-200 rounded-full outline-none transition-all duration-300 focus:border-brand-purple focus:shadow-[0_0_0_3px_rgba(94,66,192,0.1)]"
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-brand-purple hover:bg-[#493088] border-0 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.9375 17L10.9583 12.0208C10.5417 12.3264 10.0848 12.566 9.58767 12.7396C9.09056 12.9132 8.56158 13 8.00073 13C6.61135 13 5.43056 12.5139 4.45833 11.5417C3.48611 10.5694 3 9.38889 3 8C3 6.61111 3.48611 5.43056 4.45833 4.45833C5.43056 3.48611 6.61111 3 8 3C9.38889 3 10.5694 3.48611 11.5417 4.45833C12.5139 5.43056 13 6.61135 13 8.00073C13 8.56158 12.9132 9.09056 12.7396 9.58767C12.566 10.0848 12.3264 10.5417 12.0208 10.9583L17 15.9375L15.9375 17ZM8 11.5C8.97222 11.5 9.79861 11.1597 10.4792 10.4792C11.1597 9.79861 11.5 8.97222 11.5 8C11.5 7.02778 11.1597 6.20139 10.4792 5.52083C9.79861 4.84028 8.97222 4.5 8 4.5C7.02778 4.5 6.20139 4.84028 5.52083 5.52083C4.84028 6.20139 4.5 7.02778 4.5 8C4.5 8.97222 4.84028 9.79861 5.52083 10.4792C6.20139 11.1597 7.02778 11.5 8 11.5Z" fill="white"/>
              </svg>
            </button>
          </form>
        </div>
      </section>

      {/* Trending Software */}
      <section className="w-full py-[60px]">
        <div className="max-w-full mx-auto px-5 md:px-8 lg:px-20 xl:px-[140px]">
          <h3 className="text-xl md:text-lg font-bold text-[#201F23] mb-12 md:mb-8">Trending Software</h3>
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollTrending('left')}
              disabled={trendingIndex === 0}
              className="w-8 h-8 flex-shrink-0 rounded-full bg-white border border-gray-200 flex items-center justify-center cursor-pointer transition-all duration-150 text-gray-600 hover:shadow-[0_2px_8px_2px_rgba(32,31,35,0.149),0_0_0_1px_#5A39A2] hover:border-transparent disabled:bg-gray-100 disabled:border-0 disabled:text-gray-300 disabled:cursor-not-allowed"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M6.875 10.75L11.0625 14.9375L10 16L4 10L10 4L11.0625 5.0625L6.875 9.25H16V10.75H6.875Z" fill="currentColor"/>
              </svg>
            </button>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 gap-y-12">
              {trendingSoftware.slice(trendingIndex * 4, trendingIndex * 4 + 4).map((p) => (
                <div key={p.id} className="bg-white border border-gray-200 rounded-lg p-4 pt-10 relative flex flex-col h-full">
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white border border-gray-200 rounded flex items-center justify-center overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-contain p-1" />
                  </div>
                  <h3 className="text-lg md:text-base font-semibold text-[#201F23] mt-2 mb-0 text-center lg:text-left">{p.name}</h3>
                  <div className="flex flex-col md:flex-row lg:flex-row items-center gap-1 mt-1">
                    <div className="flex gap-px">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-sm ${i < Math.floor(p.rating) ? 'text-[#FFC800]' : 'text-gray-200'}`}>★</span>
                      ))}
                    </div>
                    <span className="text-sm text-zinc-500">({p.reviews})</span>
                  </div>
                  <div className="flex items-center gap-3 mt-auto pt-3">
                    <button 
                      onClick={() => navigate('/login')}
                      className="flex-1 bg-white text-brand-purple border border-brand-purple text-sm font-semibold py-2 px-4 rounded-md cursor-pointer transition-all duration-150 text-center hover:bg-gray-50"
                    >
                      Review
                    </button>
                    <div 
                      onClick={() => navigate('/login')}
                      className="w-6 h-6 flex-shrink-0 cursor-pointer text-gray-400"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 17.5L8.825 16.4375C5.5 13.4375 3.25 11.4062 3.25 8.9375C3.25 7.21875 4.59375 5.875 6.3125 5.875C7.30625 5.875 8.26562 6.34062 8.875 7.075C9.48438 6.34062 10.4438 5.875 11.4375 5.875C13.1562 5.875 14.5 7.21875 14.5 8.9375C14.5 11.4062 12.25 13.4375 8.925 16.4438L10 17.5Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => scrollTrending('right')}
              disabled={trendingIndex >= Math.ceil(trendingSoftware.length / 4) - 1}
              className="w-8 h-8 flex-shrink-0 rounded-full bg-white border border-gray-200 flex items-center justify-center cursor-pointer transition-all duration-150 text-gray-600 hover:shadow-[0_2px_8px_2px_rgba(32,31,35,0.149),0_0_0_1px_#5A39A2] hover:border-transparent disabled:bg-gray-100 disabled:border-0 disabled:text-gray-300 disabled:cursor-not-allowed"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M13.125 10.75H4V9.25H13.125L8.9375 5.0625L10 4L16 10L10 16L8.9375 14.9375L13.125 10.75Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Recently Reviewed */}
      <section className="w-full py-[60px] bg-gray-50">
        <div className="max-w-full mx-auto px-5 md:px-8 lg:px-20 xl:px-[140px]">
          <h3 className="text-xl md:text-lg font-bold text-[#201F23] mb-12 md:mb-8">Recently Reviewed</h3>
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollRecent('left')}
              disabled={recentIndex === 0}
              className="w-8 h-8 flex-shrink-0 rounded-full bg-white border border-gray-200 flex items-center justify-center cursor-pointer transition-all duration-150 text-gray-600 hover:shadow-[0_2px_8px_2px_rgba(32,31,35,0.149),0_0_0_1px_#5A39A2] hover:border-transparent disabled:bg-gray-100 disabled:border-0 disabled:text-gray-300 disabled:cursor-not-allowed"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M6.875 10.75L11.0625 14.9375L10 16L4 10L10 4L11.0625 5.0625L6.875 9.25H16V10.75H6.875Z" fill="currentColor"/>
              </svg>
            </button>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 gap-y-12">
              {recentlyReviewed.slice(recentIndex * 4, recentIndex * 4 + 4).map((p) => (
                <div key={p.id} className="bg-white border border-gray-200 rounded-lg p-4 pt-10 relative flex flex-col h-full">
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white border border-gray-200 rounded flex items-center justify-center overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-contain p-1" />
                  </div>
                  <h3 className="text-lg md:text-base font-semibold text-[#201F23] mt-2 mb-0 text-center lg:text-left">{p.name}</h3>
                  <div className="flex flex-col md:flex-row lg:flex-row items-center gap-1 mt-1">
                    <div className="flex gap-px">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-sm ${i < Math.floor(p.rating) ? 'text-[#FFC800]' : 'text-gray-200'}`}>★</span>
                      ))}
                    </div>
                    <span className="text-sm text-zinc-500">({p.reviews})</span>
                  </div>
                  <div className="flex items-center gap-3 mt-auto pt-3">
                    <button 
                      onClick={() => navigate('/login')}
                      className="flex-1 bg-white text-brand-purple border border-brand-purple text-sm font-semibold py-2 px-4 rounded-md cursor-pointer transition-all duration-150 text-center hover:bg-gray-50"
                    >
                      Review
                    </button>
                    <div 
                      onClick={() => navigate('/login')}
                      className="w-6 h-6 flex-shrink-0 cursor-pointer text-gray-400"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 17.5L8.825 16.4375C5.5 13.4375 3.25 11.4062 3.25 8.9375C3.25 7.21875 4.59375 5.875 6.3125 5.875C7.30625 5.875 8.26562 6.34062 8.875 7.075C9.48438 6.34062 10.4438 5.875 11.4375 5.875C13.1562 5.875 14.5 7.21875 14.5 8.9375C14.5 11.4062 12.25 13.4375 8.925 16.4438L10 17.5Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => scrollRecent('right')}
              disabled={recentIndex >= Math.ceil(recentlyReviewed.length / 4) - 1}
              className="w-8 h-8 flex-shrink-0 rounded-full bg-white border border-gray-200 flex items-center justify-center cursor-pointer transition-all duration-150 text-gray-600 hover:shadow-[0_2px_8px_2px_rgba(32,31,35,0.149),0_0_0_1px_#5A39A2] hover:border-transparent disabled:bg-gray-100 disabled:border-0 disabled:text-gray-300 disabled:cursor-not-allowed"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M13.125 10.75H4V9.25H13.125L8.9375 5.0625L10 4L16 10L10 16L8.9375 14.9375L13.125 10.75Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      </section>


      {/* Why Section */}
      <section className="w-full py-20 bg-gray-50">
        <div className="max-w-full mx-auto px-5 md:px-8 lg:px-20 xl:px-[140px]">
          <h2 className="text-4xl md:text-3xl font-bold text-[#201F23] text-center mb-15">
            Why write a review on G2?
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-12">
            <div className="text-center">
              <svg className="w-[72px] h-[72px] mx-auto mb-6" viewBox="0 0 72 72" fill="none">
                <circle cx="36" cy="36" r="36" fill="#E0E7FF"/>
                <path d="M36 18C26 18 18 26 18 36C18 46 26 54 36 54C46 54 54 46 54 36C54 26 46 18 36 18ZM36 30C39.3 30 42 32.7 42 36C42 39.3 39.3 42 36 42C32.7 42 30 39.3 30 36C30 32.7 32.7 30 36 30Z" fill="#5A39A2"/>
              </svg>
              <h3 className="text-[22px] font-bold text-[#201F23] mb-3">Help your peers</h3>
              <p className="text-base text-gray-500 leading-relaxed">
                Share feedback to help others make better purchasing decisions.
              </p>
            </div>
            <div className="text-center">
              <svg className="w-[72px] h-[72px] mx-auto mb-6" viewBox="0 0 72 72" fill="none">
                <circle cx="36" cy="36" r="36" fill="#FEF3C7"/>
                <path d="M36 18L40.5 31.5L54 33L43.5 42L46.5 54L36 48L25.5 54L28.5 42L18 33L31.5 31.5L36 18Z" fill="#FFC800"/>
              </svg>
              <h3 className="text-[22px] font-bold text-[#201F23] mb-3">Earn recognition</h3>
              <p className="text-base text-gray-500 leading-relaxed">
                Position yourself as an expert with detailed reviews.
              </p>
            </div>
            <div className="text-center">
              <svg className="w-[72px] h-[72px] mx-auto mb-6" viewBox="0 0 72 72" fill="none">
                <circle cx="36" cy="36" r="36" fill="#DBEAFE"/>
                <path d="M24 24H48V30H24V24ZM24 33H48V39H24V33ZM24 42H42V48H24V42Z" fill="#3B82F6"/>
              </svg>
              <h3 className="text-[22px] font-bold text-[#201F23] mb-3">Share feedback</h3>
              <p className="text-base text-gray-500 leading-relaxed">
                Make your voice heard about solutions you use daily.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
