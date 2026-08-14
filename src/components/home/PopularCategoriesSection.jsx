import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { categoriesData, categoryListNames } from '../../data/categoriesData';

export default function PopularCategoriesSection() {
  const navigate = useNavigate();
  const [activeCategoryId, setActiveCategoryId] = useState('project-management');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 760);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const activeCategory =
    categoriesData.find(cat => cat.id === activeCategoryId) ||
    categoriesData[0];

  const handleCardClick = (url) => {
    if (url) {
      navigate(url);
    }
  };

  // Get products to display - 6 on mobile (2 cols x 3 rows), all on desktop
  const productsToShow = isMobile
    ? (activeCategory.products || []).slice(0, 6)
    : (activeCategory.products || []);

  // Desktop categories (10 items)
  const specificCategories = [
    'project-management',
    'video-conferencing',
    'e-commerce-platforms',
    'marketing-automation',
    'accounting',
    'crm',
    'expense-management',
    'erp',
    'online-backup',
    'ai-chatbots'
  ];

  // Mobile categories (strictly 4 items as in reference)
  const mobileCategories = [
    'project-management',
    'video-conferencing',
    'e-commerce-platforms',
    'marketing-automation'
  ];

  const categoriesToShow = categoryListNames.filter(cat => 
    isMobile 
      ? mobileCategories.includes(cat.id)
      : specificCategories.includes(cat.id)
  );

  // Render star rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex items-center gap-[2px]">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return (
              <svg
                key={i}
                className="w-4 h-4 sm:w-[13px] sm:h-[13px] md:w-4 md:h-4 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="#FF492C"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            );
          }

          if (i === fullStars && hasHalfStar) {
            return (
              <svg
                key={i}
                className="w-4 h-4 sm:w-[13px] sm:h-[13px] md:w-4 md:h-4 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
              >
                <defs>
                  <linearGradient id={`half-${i}`}>
                    <stop offset="50%" stopColor="#FF492C" />
                    <stop offset="50%" stopColor="#E5E7EB" />
                  </linearGradient>
                </defs>

                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  fill={`url(#half-${i})`}
                />
              </svg>
            );
          }

          return (
            <svg
              key={i}
              className="w-4 h-4 sm:w-[13px] sm:h-[13px] md:w-4 md:h-4 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="#E5E7EB"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          );
        })}
      </div>
    );
  };

  return (
    <section className="w-full bg-white py-9 sm:py-[36px] md:py-[60px] lg:py-[65px] px-3 sm:px-6 md:px-10 lg:px-[30px] relative overflow-x-hidden">
      <div className="w-full max-w-[1340px] mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-[300px_minmax(0,1fr)] lg:grid-cols-[470px_minmax(0,1fr)] xl:grid-cols-[550px_minmax(0,1fr)] gap-5 sm:gap-[20px] md:gap-[35px] lg:gap-[55px] xl:gap-[90px] items-start">
          
          {/* LEFT SIDE */}
          <div className="w-full pt-0 md:pt-7 lg:pt-10">
            <h2 
              className="text-2xl sm:text-[23px] md:text-[32px] lg:text-[38px] xl:text-[40px] font-bold leading-tight text-center md:text-left mb-4 md:mb-6 whitespace-nowrap"
              style={{ fontFamily: 'Figtree, sans-serif', color: '#252530', letterSpacing: '-0.5px' }}
            >
              Most Popular Software<br className="sm:hidden" /> Categories
            </h2>

            <div className="w-full max-w-[320px] sm:max-w-none mx-auto flex flex-col gap-0 md:gap-0">
              {categoriesToShow.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={`
                    w-fit sm:w-full mx-auto md:mx-0 min-h-[36px] px-4 sm:px-[16px] md:px-[14px] py-2 sm:py-[10px] md:py-2
                    text-[14px] sm:text-[15px] md:text-[15px] lg:text-[17px] xl:text-base font-normal text-left
                    bg-transparent border border-transparent rounded-md sm:rounded-md md:rounded-sm
                    cursor-pointer transition-all duration-200
                    ${activeCategoryId === category.id
                      ? 'text-[#FF492C] bg-white border-2 border-[#FF492C] font-normal'
                      : 'text-[#24344D] hover:bg-white/80 hover:text-[#252530]'
                    }
                  `}
                  style={{ fontFamily: 'Figtree, sans-serif' }}
                  onClick={() => setActiveCategoryId(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full">
            {/* Header */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-center md:justify-start gap-0 sm:gap-4 mb-3 md:mb-4">
              <h3 
                className="text-[17px] sm:text-[17px] md:text-lg lg:text-[22px] font-bold text-center md:text-left"
                style={{ fontFamily: 'Figtree, sans-serif', color: '#252530' }}
              >
                {activeCategory.name}
              </h3>
              <div className="hidden md:flex items-center flex-shrink-0">
                <Link
                  to={activeCategory.seeAllLink || '/category/' + activeCategory.id}
                  className="text-[13px] sm:text-sm md:text-[15px] font-medium text-[#FF492C] no-underline whitespace-nowrap hover:opacity-75 hover:underline transition-opacity duration-200"
                  style={{ fontFamily: 'Figtree, sans-serif' }}
                >
                  {activeCategory.seeAllText || `See all ${activeCategory.name} →`}
                </Link>
              </div>
            </div>

            {/* Cards Grid */}
            <div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-[10px] md:gap-2 lg:gap-[10px]">
              {productsToShow.map((product) => (
                <div
                  key={product.id}
                  className="w-full bg-white border-[1.5px] border-[#E5E7EB] sm:border-[#E8E8E8] md:border-[#E5E7EB] rounded-lg sm:rounded-lg md:rounded-md p-2 sm:p-[10px] md:p-[10px] flex flex-col gap-1 sm:gap-1 md:gap-1 min-h-[115px] h-[115px] sm:h-[125px] md:h-[135px] lg:h-[140px] xl:h-[145px] cursor-pointer transition-all duration-200 hover:border-[#D1D5DB]"
                  onClick={() => handleCardClick(product.url)}
                >
                  <div className="w-full flex flex-col gap-[3px] sm:gap-1 md:gap-[6px] flex-shrink-0">
                    <h3 
                      className="w-full text-[12.5px] sm:text-[13.5px] md:text-[15px] font-bold leading-tight overflow-hidden text-ellipsis whitespace-nowrap"
                      style={{ fontFamily: 'Figtree, sans-serif', color: '#252530' }}
                    >
                      {product.name}
                    </h3>

                    <div className="w-full flex items-center gap-1 sm:gap-1 md:gap-[6px]">
                      {renderStars(product.rating)}
                      <p 
                        className="text-[10.5px] sm:text-[11.5px] md:text-xs lg:text-sm font-normal whitespace-nowrap"
                        style={{ fontFamily: 'Figtree, sans-serif', color: '#5A6C7D' }}
                      >
                        ({product.reviewCount})
                      </p>
                    </div>
                  </div>

                  <div className="w-full flex-1 flex items-center justify-center p-[2px] sm:p-1 md:p-1">
                    <img
                      src={product.logo}
                      alt={`${product.name} logo`}
                      className="max-w-full max-h-[38px] sm:max-h-[42px] md:max-h-[52px] lg:max-h-[52px] w-auto h-auto object-contain"
                      onError={(e) => {
                        e.currentTarget.src = `https://via.placeholder.com/120x80/5B3DB5/ffffff?text=${product.name}`;
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile See All Link */}
            <div className="block md:hidden text-center mt-4">
              <Link
                to={activeCategory.seeAllLink || '/category/' + activeCategory.id}
                className="text-sm font-semibold text-[#FF492C] no-underline hover:underline"
                style={{ fontFamily: 'Figtree, sans-serif' }}
              >
                {activeCategory.seeAllText || `See all ${activeCategory.name} →`}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
