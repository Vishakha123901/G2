import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Star } from 'lucide-react';
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
    categoriesData.find((cat) => cat.id === activeCategoryId) || categoriesData[0];

  const handleCardClick = (url) => {
    if (url) {
      navigate(url);
    }
  };

  // 6 products on mobile (2 cols x 3 rows), all on desktop (3 cols x 3 rows)
  const productsToShow = isMobile
    ? (activeCategory?.products || []).slice(0, 6)
    : (activeCategory?.products || []);

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

  // Mobile categories (4 items)
  const mobileCategories = [
    'project-management',
    'video-conferencing',
    'e-commerce-platforms',
    'marketing-automation'
  ];

  const categoriesToShow = categoryListNames.filter((cat) =>
    isMobile ? mobileCategories.includes(cat.id) : specificCategories.includes(cat.id)
  );

  return (
    <section className="w-full bg-white py-10 sm:py-12 md:py-14 lg:py-16 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
      <div className="w-full max-w-[1260px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[360px_1fr] lg:grid-cols-[390px_1fr] xl:grid-cols-[410px_1fr] gap-8 md:gap-10 lg:gap-14 xl:gap-16 items-start">
          
          {/* Left Column: Heading + Category Navigation Tabs */}
          <div className="w-full pt-3 md:pt-7 lg:pt-9">
            <h2 className="text-[22px] sm:text-[25px] md:text-[28px] lg:text-[31px] font-bold text-[#252530] leading-[1.2] mb-6 tracking-tight">
              <span className="block whitespace-nowrap">Most Popular Software</span>
              <span className="block">Categories</span>
            </h2>

            <nav className="flex flex-col gap-1 w-full max-w-[290px]" aria-label="Software Categories">
              {categoriesToShow.map((category) => {
                const isActive = activeCategoryId === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActiveCategoryId(category.id)}
                    className={`w-full min-h-[38px] px-3.5 py-2 text-[14px] sm:text-[15px] text-left rounded-md transition-colors duration-150 ${
                      isActive
                        ? 'text-[#FF4F00] font-semibold bg-white border-[1.5px] border-[#FF4F00]'
                        : 'text-[#24344D] font-normal bg-transparent border-[1.5px] border-transparent hover:text-[#252530] hover:bg-gray-50'
                    }`}
                  >
                    {category.name}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Column: See All Link + Cards Grid */}
          <div className="w-full max-w-[720px] lg:max-w-[740px] xl:max-w-[760px]">
            {/* Top Right Link */}
            <div className="hidden md:flex justify-end mb-3 md:mb-4 min-h-[26px]">
              <Link
                to={activeCategory?.seeAllLink || `/category/${activeCategory?.id}`}
                className="text-[13px] sm:text-sm font-semibold text-[#FF4F00] hover:underline transition-opacity"
              >
                {activeCategory?.seeAllText || `See all ${activeCategory?.name} Software`}
              </Link>
            </div>

            {/* Product Cards Grid with compact width */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3.5 md:gap-3.5 lg:gap-4">
              {productsToShow.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleCardClick(product.url)}
                  className="bg-white border border-gray-200 rounded-[6px] p-2.5 sm:p-3.5 md:p-3.5 lg:p-4 flex flex-col justify-between min-h-[120px] sm:h-[135px] md:h-[150px] lg:h-[160px] xl:h-[165px] cursor-pointer hover:border-gray-300 hover:shadow-sm transition-all duration-200 group"
                >
                  {/* Top: Product Name & Stars Rating */}
                  <div className="flex flex-col gap-0.5 sm:gap-1 min-w-0">
                    <h3 className="text-[12px] sm:text-[13.5px] md:text-[14px] lg:text-[15px] font-bold text-[#252530] leading-tight truncate">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap min-w-0">
                      <div className="flex items-center gap-[1px] sm:gap-0.5 flex-shrink-0">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-[#FF4F00] text-[#FF4F00]"
                          />
                        ))}
                      </div>
                      <span className="text-[9.5px] sm:text-xs text-gray-500 font-normal truncate">
                        ({product.reviewCount})
                      </span>
                    </div>
                  </div>

                  {/* Center/Bottom: Logo */}
                  <div className="flex-1 flex items-center justify-center p-1 md:p-2">
                    <img
                      src={product.logo}
                      alt={`${product.name} logo`}
                      className="max-w-full max-h-[34px] sm:max-h-[40px] md:max-h-[50px] lg:max-h-[56px] xl:max-h-[60px] w-auto h-auto object-contain transition-transform duration-200 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = `https://via.placeholder.com/120x80/5B3DB5/ffffff?text=${product.name}`;
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Bottom Link */}
            <div className="block md:hidden text-center mt-5">
              <Link
                to={activeCategory?.seeAllLink || `/category/${activeCategory?.id}`}
                className="text-sm font-semibold text-[#FF4F00] hover:underline"
              >
                {activeCategory?.seeAllText || `See all ${activeCategory?.name} Software`}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
