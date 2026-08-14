import React, { useState, useEffect } from 'react';
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
      <div className="mpsc-stars">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return (
              <svg
                key={i}
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
    <>
      <style>{`

        /* =====================================================
           SECTION
        ===================================================== */

        .mpsc-section {
          width: 100%;
          background: #ffffff;
          padding: 65px 0 65px;
          position: relative;
          box-sizing: border-box;
        }


        /* =====================================================
           MAIN CONTAINER
        ===================================================== */

        .mpsc-container {
          width: 100%;
          max-width: 1340px;
          margin: 0 auto;
          padding: 0 30px;
          box-sizing: border-box;
        }


        /* =====================================================
           IMPORTANT:
           LEFT SIDE + RIGHT SIDE
        ===================================================== */

        .mpsc-main-layout {
          display: grid;

          /*
            Reference:
            Left sidebar ≈ 550px
            Right area ≈ 848px
          */
          grid-template-columns: 550px minmax(0, 1fr);

          column-gap: 90px;

          align-items: start;
        }


        /* =====================================================
           LEFT SIDE
        ===================================================== */

        .mpsc-left {
          min-width: 0;
          padding-top: 40px;
        }


        /* =====================================================
           TITLE
        ===================================================== */

        .mpsc-title {
          margin: 0 0 24px;

          color: #1C1D21;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 40px;
          line-height: 1.3;

          font-weight: 700;

          letter-spacing: -0.5px;
        }


        /* =====================================================
           CATEGORY LIST
        ===================================================== */

        .mpsc-categories {
          width: 100%;

          display: flex;
          flex-direction: column;

          gap: 0;

          margin: 0;
          padding: 0;

          background: transparent;
        }


        /* =====================================================
           CATEGORY TAB
        ===================================================== */

        .mpsc-category-tab {
          width: 100%;

          min-height: 36px;

          padding: 8px 14px;

          box-sizing: border-box;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 16px;
          line-height: 1.25;

          font-weight: 400;

          color: #24344D;

          background: transparent;

          border: 1px solid transparent;

          text-align: left;

          cursor: pointer;

          transition:
            background-color 0.2s ease,
            border-color 0.2s ease,
            color 0.2s ease;

          margin: 0;
        }


        /* ACTIVE TAB */

        .mpsc-category-tab.active {
          color: #FF492C;

          background: #ffffff;

          border: 2px solid #FF492C;

          border-radius: 3px;

          font-weight: 400;

          padding:
            7px
            13px;
        }


        /* HOVER */

        .mpsc-category-tab:hover:not(.active) {
          background: rgba(255, 255, 255, 0.8);
          color: #1C1D21;
        }


        /* =====================================================
           RIGHT SIDE
        ===================================================== */

        .mpsc-right {
          min-width: 0;
          width: 100%;
        }


        /* =====================================================
           RIGHT HEADER ROW (Title + See All on same line)
        ===================================================== */

        .mpsc-right-header {
          width: 100%;
          display: flex;
          align-items: baseline;
          justify-content: flex-start;
          gap: 16px;
          margin: 0 0 16px;
          box-sizing: border-box;
        }

        .mpsc-right-title {
          margin: 0;
          padding: 0;
          color: #1C1D21;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 22px;
          line-height: 1.3;
          font-weight: 700;
        }


        /* =====================================================
           SEE ALL
        ===================================================== */

        .mpsc-see-all-wrapper {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          box-sizing: border-box;
        }

        .mpsc-mobile-see-all {
          display: none;
        }


        .mpsc-see-all {
          font-family:
            Arial,
            Helvetica,
            sans-serif;

          font-size: 15px;

          line-height: 1.2;

          font-weight: 500;

          color: #FF492C;

          text-decoration: none;

          white-space: nowrap;

          transition: opacity 0.2s ease;
        }


        .mpsc-see-all:hover {
          opacity: 0.75;
          text-decoration: underline;
        }


        /* =====================================================
           SOFTWARE CARD GRID
        ===================================================== */

        .mpsc-software-grid {
          width: 100%;

          display: grid;

          grid-template-columns: repeat(3, minmax(0, 1fr));

          column-gap: 10px;

          row-gap: 10px;

          align-items: stretch;
        }


        /* =====================================================
           CARD
        ===================================================== */

        .mpsc-card {
          width: 100%;

          box-sizing: border-box;

          background: #ffffff;

          border: 1.5px solid #E5E7EB;

          border-radius: 6px;

          padding: 10px 10px 8px;

          display: flex;

          flex-direction: column;

          gap: 4px;

          min-height: 145px;

          height: 145px;

          cursor: pointer;

          transition:
            box-shadow 0.2s ease,
            transform 0.2s ease,
            border-color 0.2s ease;

          position: relative;
        }


        /* CARD HOVER - No pop-up / lifting */
        .mpsc-card:hover {
          border-color: #D1D5DB;
        }


        /* =====================================================
           CARD CONTENT WRAPPER
        ===================================================== */

        .mpsc-card-content {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }


        /* =====================================================
           CARD HEADER
        ===================================================== */

        .mpsc-card-header {
          width: 100%;

          display: flex;

          flex-direction: column;

          align-items: flex-start;

          gap: 6px;

          margin: 0;

          padding: 0;

          box-sizing: border-box;
        }


        /* =====================================================
           PRODUCT NAME
        ===================================================== */

        .mpsc-card-name {
          width: 100%;

          margin: 0;

          padding: 0;

          color: #1C1D21;

          font-family: Arial, Helvetica, sans-serif;

          font-size: 15px;

          line-height: 1.2;

          font-weight: 700;

          text-align: left;

          overflow: hidden;

          text-overflow: ellipsis;

          white-space: nowrap;
        }


        /* =====================================================
           RATING ROW
        ===================================================== */

        .mpsc-card-rating {
          width: 100%;

          display: flex;

          align-items: center;

          justify-content: flex-start;

          gap: 6px;

          margin: 0;

          padding: 0;
        }


        .mpsc-stars {
          display: flex;

          align-items: center;

          gap: 2px;
        }

        .mpsc-stars svg {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
        }


        .mpsc-card-reviews {
          margin: 0;

          padding: 0;

          color: #5A6C7D;

          font-family: Arial, Helvetica, sans-serif;

          font-size: 14px;

          line-height: 1.2;

          font-weight: 400;

          white-space: nowrap;
        }


        /* =====================================================
           LOGO AREA
        ===================================================== */

        .mpsc-card-logo-wrap {
          width: 100%;

          flex: 1;

          min-height: 0;

          display: flex;

          align-items: center;

          justify-content: center;

          margin: 0;

          padding: 4px 6px;

          box-sizing: border-box;
        }


        .mpsc-card-logo {
          display: block;

          max-width: 110px;

          max-height: 52px;

          width: auto;

          height: auto;

          object-fit: contain;
        }


        

        /* =====================================================
           LARGE DESKTOP
        ===================================================== */

        @media (max-width: 1450px) {

          .mpsc-container {
            max-width: 1240px;
          }

          .mpsc-main-layout {
            grid-template-columns: 520px minmax(0, 1fr);
            column-gap: 70px;
          }

          .mpsc-software-grid {
            column-gap: 8px;
            row-gap: 8px;
          }
        }


        /* =====================================================
           1280
        ===================================================== */

        @media (max-width: 1280px) {

          .mpsc-section {
            padding-left: 40px;
            padding-right: 40px;
          }

          .mpsc-container {
            max-width: 1160px;
          }

          .mpsc-main-layout {
            grid-template-columns: 470px minmax(0, 1fr);
            column-gap: 55px;
          }

          .mpsc-title {
            font-size: 38px;
          }

          .mpsc-category-tab {
            font-size: 17px;
          }

          .mpsc-card {
            height: 140px;
            min-height: 140px;
          }

          .mpsc-card-rating {
            gap: 5px;
          }

          .mpsc-card-reviews {
            font-size: 12px;
          }
        }


        /* =====================================================
           TABLET
        ===================================================== */

        @media (max-width: 1000px) {

          .mpsc-section {
            padding: 60px 35px 70px;
          }

          .mpsc-container {
            max-width: 100%;
          }

          .mpsc-main-layout {
            grid-template-columns: 300px minmax(0, 1fr);

            column-gap: 35px;
          }

          .mpsc-left {
            padding-top: 28px;
          }

          .mpsc-title {
            font-size: 32px;
          }

          .mpsc-category-tab {
            font-size: 15px;
            min-height: 42px;
          }

          .mpsc-software-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));

            column-gap: 8px;

            row-gap: 8px;
          }

          .mpsc-card {
            height: 135px;
            min-height: 135px;
          }

          .mpsc-right-title {
            font-size: 18px;
          }

          .mpsc-see-all {
            font-size: 14px;
          }
        }


        /* =====================================================
           SMALL TABLET / MOBILE (760px and below)
        ===================================================== */

        @media (max-width: 760px) {

          .mpsc-section {
            padding: 36px 12px 50px;
            overflow-x: hidden;
          }

          .mpsc-container {
            padding: 0 8px;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
          }

          .mpsc-main-layout {
            display: flex;
            flex-direction: column;
            width: 100%;
            min-width: 0;
            row-gap: 20px;
          }

          .mpsc-left {
            width: 100%;
            min-width: 0;
            padding-top: 0;
          }

          .mpsc-title {
            font-size: 26px;
            line-height: 1.15;
            margin-bottom: 20px;
            text-align: center;
          }

          /* Categories: Vertical Stack */
          .mpsc-categories {
            width: 100%;
            max-width: 320px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            gap: 2px;
            padding-bottom: 0;
          }

          .mpsc-category-tab {
            width: 100%;
            box-sizing: border-box;
            min-height: auto;
            padding: 10px 16px;
            border: 1px solid transparent;
            border-radius: 6px;
            font-size: 15px;
            text-align: center;
          }

          .mpsc-category-tab.active {
            padding: 9px 15px;
            border: 2px solid #FF492C;
            border-radius: 6px;
            background: #ffffff;
          }

          .mpsc-right {
            width: 100%;
            min-width: 0;
            box-sizing: border-box;
          }

          .mpsc-right-header {
            margin-bottom: 12px;
            justify-content: center;
          }

          .mpsc-right-title {
            font-size: 17px;
            text-align: center;
          }

          .mpsc-see-all {
            font-size: 13px;
          }

          /* 2 Column Grid for Cards - PROPER RESPONSIVE */
          .mpsc-software-grid {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            column-gap: 10px;
            row-gap: 10px;
            padding: 0;
            box-sizing: border-box;
          }

          /* Mobile Card Styling */
          .mpsc-card {
            width: 100%;
            min-width: 0;
            box-sizing: border-box;
            padding: 10px 8px 8px;
            border-radius: 8px;
            min-height: 125px;
            height: 125px;
            gap: 4px;
            border: 1.5px solid #E8E8E8;
            display: flex;
            flex-direction: column;
            overflow: hidden;
          }

          .mpsc-card-content {
            width: 100%;
            min-width: 0;
            gap: 3px;
            flex-shrink: 0;
            box-sizing: border-box;
          }

          .mpsc-card-name {
            width: 100%;
            min-width: 0;
            font-size: 13.5px;
            line-height: 1.2;
            font-weight: 700;
            color: #1C1D21;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .mpsc-card-rating {
            width: 100%;
            min-width: 0;
            gap: 4px;
            display: flex;
            align-items: center;
          }

          .mpsc-stars {
            gap: 1px;
            display: flex;
            align-items: center;
            flex-shrink: 0;
          }

          .mpsc-stars svg {
            width: 13px;
            height: 13px;
          }

          .mpsc-card-reviews {
            font-size: 11.5px;
            color: #6B7280;
            font-weight: 400;
            white-space: nowrap;
          }

          .mpsc-card-logo-wrap {
            width: 100%;
            min-width: 0;
            padding: 2px 4px;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
          }

          .mpsc-card-logo {
            max-width: 100%;
            max-height: 42px;
            width: auto;
            height: auto;
            object-fit: contain;
          }

          /* Mobile See All Link - Center below cards */
          .mpsc-right-header {
            flex-direction: column;
            align-items: center;
            margin-bottom: 12px;
            gap: 0;
          }

          .mpsc-see-all-wrapper {
            display: none;
          }

          .mpsc-mobile-see-all {
            display: block;
            text-align: center;
            margin-top: 16px;
          }

          .mpsc-mobile-see-all a {
            font-size: 14px;
            font-weight: 600;
            color: #FF492C;
            text-decoration: none;
          }

          .mpsc-mobile-see-all a:hover {
            text-decoration: underline;
          }
        }


        /* =====================================================
           VERY SMALL MOBILE (540px and below)
        ===================================================== */

        @media (max-width: 540px) {

          .mpsc-section {
            padding: 30px 10px 45px;
          }

          .mpsc-container {
            padding: 0 6px;
          }

          .mpsc-main-layout {
            row-gap: 16px;
          }

          .mpsc-title {
            font-size: 24px;
            line-height: 1.15;
            margin-bottom: 16px;
          }
          
          .mpsc-category-tab {
            padding: 9px 14px;
            font-size: 14px;
          }
          
          .mpsc-category-tab.active {
            padding: 8px 13px;
          }

          .mpsc-software-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            column-gap: 8px;
            row-gap: 8px;
          }

          .mpsc-card {
            padding: 8px 6px 6px;
            min-height: 120px;
            height: 120px;
          }

          .mpsc-card-name {
            font-size: 12.5px;
          }

          .mpsc-stars svg {
            width: 12px;
            height: 12px;
          }

          .mpsc-card-reviews {
            font-size: 10.5px;
          }

          .mpsc-card-logo-wrap {
            padding: 2px 2px;
            min-height: 40px;
          }

          .mpsc-card-logo {
            max-height: 38px;
          }
        }


        /* =====================================================
           VERY SMALL MOBILE
        ===================================================== */

        @media (max-width: 360px) {

          .mpsc-section {
            padding-left: 8px;
            padding-right: 8px;
          }

          .mpsc-title {
            font-size: 22px;
          }

          .mpsc-card {
            height: 115px;
            min-height: 115px;
            padding: 6px 4px;
          }
        }

      `}</style>


      <section className="mpsc-section">

        <div className="mpsc-container">

          <div className="mpsc-main-layout">

            {/* =================================================
                LEFT SIDE
            ================================================= */}

            <div className="mpsc-left">

              <h2 className="mpsc-title">
                Most Popular Software
                <br />
                Categories
              </h2>


              <div className="mpsc-categories">

                {categoriesToShow.map((category) => (

                  <button
                    key={category.id}
                    type="button"
                    className={`
                      mpsc-category-tab
                      ${activeCategoryId === category.id
                        ? 'active'
                        : ''
                      }
                    `}
                    onClick={() =>
                      setActiveCategoryId(category.id)
                    }
                  >
                    {category.name}
                  </button>

                ))}

              </div>

            </div>


            {/* =================================================
                RIGHT SIDE
            ================================================= */}

            <div className="mpsc-right">

              {/* HEADER ROW: Category Name + See All */}
              <div className="mpsc-right-header">
                <h3 className="mpsc-right-title">
                  {activeCategory.name}
                </h3>
                <div className="mpsc-see-all-wrapper">
                  <Link
                    to={activeCategory.seeAllLink || '/category/' + activeCategory.id}
                    className="mpsc-see-all"
                  >
                    {
                      activeCategory.seeAllText ||
                      `See all ${activeCategory.name} →`
                    }
                  </Link>
                </div>
              </div>

              {/* CARDS */}
              <div className="mpsc-software-grid">

                {productsToShow.map((product) => (

                  <div
                    key={product.id}
                    className="mpsc-card"
                    onClick={() =>
                      handleCardClick(product.url)
                    }
                  >

                    <div className="mpsc-card-content">

                      {/* NAME */}
                      <h3 className="mpsc-card-name">
                        {product.name}
                      </h3>

                      {/* RATING ROW */}
                      <div className="mpsc-card-rating">

                        {renderStars(product.rating)}

                        <p className="mpsc-card-reviews">
                          ({product.reviewCount})
                        </p>

                      </div>

                    </div>


                    {/* LOGO */}
                    <div className="mpsc-card-logo-wrap">

                      <img
                        src={product.logo}
                        alt={`${product.name} logo`}
                        className="mpsc-card-logo"
                        onError={(e) => {
                          e.currentTarget.src =
                            `https://via.placeholder.com/120x80/5B3DB5/ffffff?text=${product.name}`;
                        }}
                      />

                    </div>

                  </div>

                ))}

              </div>

              {/* Mobile See All Link - Below Cards */}
              <div className="mpsc-mobile-see-all">
                <Link
                  to={activeCategory.seeAllLink || '/category/' + activeCategory.id}
                  className="mpsc-see-all"
                >
                  {
                    activeCategory.seeAllText ||
                    `See all ${activeCategory.name} →`
                  }
                </Link>
              </div>

            </div>

          </div>

        </div>

      </section>
    </>
  );
}