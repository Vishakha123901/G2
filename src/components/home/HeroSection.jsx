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
    <div className="relative w-full flex-1 flex flex-col justify-center items-center px-6 sm:px-9 lg:px-12 py-8 sm:py-8 md:py-4">
      <GeometricShapes onScrollDown={onScrollDown} />

      <div className="relative z-10 w-full max-w-5xl mx-auto text-center flex flex-col items-center justify-center my-auto">
        <h1 className="text-[32px] leading-tight sm:text-5xl md:text-6xl lg:text-[76px] font-black text-[#1C1D21] tracking-tight sm:leading-[1.05] leading-[1.1] mb-4 sm:mb-5 md:mb-6 px-2">
          {heroContent.title}
        </h1>

        <p className="text-[15px] leading-snug sm:text-lg md:text-[21px] text-gray-700 font-medium mb-6 sm:mb-7 md:mb-9 whitespace-normal sm:whitespace-nowrap overflow-hidden text-ellipsis px-2 max-w-full">
          {heroContent.subtitlePrefix}
          <span className="text-[#FF4F00] font-bold mx-1">{heroContent.reviewCount}</span>
          {heroContent.subtitleSuffix}
        </p>

        <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl mx-auto mb-5 sm:mb-7 md:mb-9 px-2">
          <div className="relative flex items-center bg-white rounded-full border border-gray-300/90 shadow-[0_4px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_30px_rgba(0,0,0,0.08)] focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100 transition-all p-1.5 pl-4 sm:pl-6 md:pl-7">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={heroContent.searchPlaceholder}
              className="w-full text-sm sm:text-base md:text-lg text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none pr-2 sm:pr-3 md:pr-4"
            />
            <button
              type="submit"
              className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-[#F3F4F6] hover:bg-[#E5E7EB] flex items-center justify-center text-slate-700 transition-colors flex-shrink-0"
              aria-label="Search"
            >
              <Search className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 stroke-[2.2]" />
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center gap-4 sm:gap-10 md:gap-12 text-[14px] sm:text-[15px] text-[#4B5563]">
          <a
            href={heroContent.chips[0].link}
            className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 hover:text-[#FF4F00] transition-colors py-3 px-5 sm:py-1 sm:px-2 bg-[#F3F4F6] sm:bg-transparent rounded-xl sm:rounded-none"
          >
            <Trophy className="hidden sm:block w-[17px] h-[17px] text-[#52525B] stroke-[1.7]" />
            <span className="text-[#4B5563] font-normal text-[13px] sm:text-[15px] tracking-normal text-center">
              {heroContent.chips[0].label}
            </span>
          </a>

          <a
            href={heroContent.chips[1].link}
            className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 hover:text-[#FF4F00] transition-colors py-3 px-5 sm:py-1 sm:px-2 bg-[#F3F4F6] sm:bg-transparent rounded-xl sm:rounded-none"
          >
            <TrendingUp className="hidden sm:block w-[17px] h-[17px] text-[#52525B] stroke-[1.7]" />
            <span className="text-[#4B5563] font-normal text-[13px] sm:text-[15px] tracking-normal text-center">
              {heroContent.chips[1].label}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}