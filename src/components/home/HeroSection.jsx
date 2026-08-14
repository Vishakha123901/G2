import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Trophy, TrendingUp } from 'lucide-react';
import GeometricShapes from '../common/GeometricShapes';
import { heroContent } from '../../data/heroData';
import { categoriesData } from '../../data/categoriesData';

export default function HeroSection({ onScrollDown }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      
      const matchedCategory = categoriesData.find(cat => 
        cat.name.toLowerCase().includes(query) ||
        cat.id.toLowerCase().includes(query)
      );

      if (matchedCategory) {
        navigate(`/category/${matchedCategory.id}`);
        setSearchQuery('');
        return;
      }

      for (const category of categoriesData) {
        const matchedProduct = category.products?.find(product =>
          product.name.toLowerCase().includes(query)
        );
        
        if (matchedProduct) {
          navigate(`/product/${matchedProduct.id}`);
          setSearchQuery('');
          return;
        }
      }

      alert(`Search results for "${searchQuery}" - Feature coming soon!`);
    }
  };

  return (
    <div className="relative w-full flex-1 flex flex-col justify-center items-center px-0 sm:px-9 lg:px-12 py-4 sm:py-8 md:py-4 mt-0 md:mt-[10%]">
      <GeometricShapes onScrollDown={onScrollDown} />

      <div className="relative z-10 w-full mx-0 text-center flex flex-col items-center justify-center my-auto px-0">
        <h1 
          className="font-bold text-[#252530] tracking-tighter sm:tracking-tight sm:leading-[1.05] leading-[1.05] mb-4 sm:mb-5 md:mb-20 w-full max-w-none"
          style={{
            fontSize: '42px',
            lineHeight: '1.05',
            padding: '0',
            margin: '0 0 1rem 0',
            letterSpacing: '0.005em'
          }}
        >
          <style>{`
            @media (min-width: 640px) {
              h1 { font-size: 48px !important; margin-bottom: 1.25rem !important; }
            }
            @media (min-width: 768px) {
              h1 { font-size: 58px !important; margin-bottom: 5rem !important; }
            }
            @media (min-width: 1024px) {
              h1 { font-size: 73px !important; }
            }
          `}</style>
          Where you go<br className="sm:hidden" /> for software.
        </h1>

        <p 
          className="text-[#505059] font-medium mb-6 sm:mb-7 md:mb-9 sm:max-w-full mx-auto"
          style={{
            fontSize: '19px',
            lineHeight: '1.4',
            padding: '0 1rem'
          }}
        >
          Find the right software and services based<br />on <span className="text-[#FF4F00] font-bold mx-1">{heroContent.reviewCount}</span> real reviews.
        </p>

        <form onSubmit={handleSearchSubmit} className="w-full max-w-3xl mx-auto mb-5 sm:mb-7 md:mb-9">
          <div className="relative flex items-center bg-white rounded-full border border-gray-300/90 shadow-[0_4px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_30px_rgba(0,0,0,0.08)] focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100 transition-all p-2 pl-5 sm:pl-6 md:pl-7">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={heroContent.searchPlaceholder}
              className="w-full text-[17px] sm:text-base md:text-lg text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none pr-2 sm:pr-3 md:pr-4"
            />
            <button
              type="submit"
              className="w-11 h-11 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-[#F3F4F6] hover:bg-[#E5E7EB] flex items-center justify-center text-slate-700 transition-colors flex-shrink-0"
              aria-label="Search"
            >
              <Search className="w-5 h-5 sm:w-4 sm:h-4 md:w-5 md:h-5 stroke-[2.2]" />
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center gap-4 sm:gap-10 md:gap-12 text-[14px] sm:text-[15px] text-[#4B5563]">
          <a
            href={heroContent.chips[0].link}
            className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 hover:text-[#FF4F00] transition-colors py-3 px-5 sm:py-1 sm:px-2 bg-[#FFF5F2] sm:bg-transparent rounded-xl sm:rounded-none"
          >
            <Trophy className="w-[20px] h-[20px] text-[#52525B] stroke-[1.7]" />
            <span className="text-[#4B5563] font-medium text-[15px] sm:text-[15px] tracking-normal text-center">
              {heroContent.chips[0].label}
            </span>
          </a>

          <a
            href={heroContent.chips[1].link}
            className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 hover:text-[#FF4F00] transition-colors py-3 px-5 sm:py-1 sm:px-2 bg-[#FFF5F2] sm:bg-transparent rounded-xl sm:rounded-none"
          >
            <TrendingUp className="w-[20px] h-[20px] text-[#52525B] stroke-[1.7]" />
            <span className="text-[#4B5563] font-medium text-[15px] sm:text-[15px] tracking-normal text-center">
              {heroContent.chips[1].label}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}