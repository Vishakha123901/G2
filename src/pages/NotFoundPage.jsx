import React, { useRef } from 'react';
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';
import notFoundAnimation from '../assets/svg/not-found.json';
import Footer from '../components/common/Footer';

export default function NotFoundPage() {
  const lottieRef = useRef(null);
  const currentTime = new Date().toISOString();

  return (
    <div className="min-h-screen bg-[#EAECF0] flex flex-col font-['Inter',sans-serif]">
      {/* ── G2 404 Responsive Header ── */}
      <header className="w-full bg-white border-b border-[#D5D9E0] px-3 sm:px-6 py-2.5 sm:py-3 box-border">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-2 sm:gap-4 md:gap-7 w-full">
          {/* Left: Logo & Search Input */}
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0 max-w-full md:max-w-[980px]">
            {/* Pure Circular G2 Logo */}
            <Link
              to="/"
              className="inline-flex items-center justify-center flex-shrink-0 transition-transform hover:scale-105"
              aria-label="G2 Home"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 bg-[#FF4F00] rounded-full flex items-center justify-center text-white font-black text-xl sm:text-2xl shadow-sm">
                <span>G</span>
                <sup className="text-[10px] sm:text-[12px] font-extrabold -ml-0.5 -mt-1.5 sm:-mt-2">2</sup>
              </div>
            </Link>

            {/* Search Pill Input */}
            <div className="flex-1 min-w-0 max-w-full md:max-w-[840px]">
              <input
                type="text"
                placeholder="Search for Software and Services"
                className="w-full h-[36px] sm:h-[42px] md:h-[44px] px-3 sm:px-5 text-[12px] sm:text-[14px] md:text-[14.5px] text-[#201F23] bg-white border border-[#C4C8D0] rounded-full outline-none transition-all focus:border-[#5A39A2] placeholder:text-gray-400 truncate"
              />
            </div>
          </div>

          {/* Right: Software & Services Links */}
          <div className="flex items-center gap-3 sm:gap-6 md:gap-9 flex-shrink-0">
            <Link
              to="/category/artificial-intelligence"
              className="text-[#505059] hover:text-[#FF4F00] text-[13.5px] sm:text-[15.5px] md:text-[17px] font-semibold transition-colors whitespace-nowrap"
            >
              Software
            </Link>
            <Link
              to="/services/ecosystem-service-providers"
              className="text-[#505059] hover:text-[#FF4F00] text-[13.5px] sm:text-[15.5px] md:text-[17px] font-semibold transition-colors whitespace-nowrap"
            >
              Services
            </Link>
          </div>
        </div>
      </header>

      {/* ── Main Centered White Card Layout ── */}
      <main className="flex-1 flex justify-center items-start px-2 sm:px-5 py-4 sm:py-8 box-border">
        <div className="w-full max-w-[1280px] min-h-[calc(100vh-160px)] bg-white rounded-[4px] shadow-[0_1px_4px_rgba(0,0,0,0.04)] px-4 sm:px-8 md:px-12 py-8 sm:py-12 md:py-14 box-border flex flex-col items-center justify-between relative">
          
          {/* Top & Center 404 Content */}
          <div className="flex flex-col items-center text-center w-full my-auto">
            {/* 404 Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-[58px] font-extrabold text-[#201F23] leading-tight mb-2 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
              404
            </h1>

            {/* Whoopsiedoodles! */}
            <h2 className="text-xl sm:text-2xl md:text-[26px] font-bold text-[#D83B01] mb-3 sm:mb-4 font-['Plus_Jakarta_Sans',sans-serif]">
              Whoopsiedoodles!
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-sm md:text-[15px] text-[#4B5563] max-w-[460px] leading-relaxed mx-auto mb-6 sm:mb-9 text-center px-2">
              We tried really hard but we could not find the page you are trying to reach.
            </p>

            {/* Monty Dog Lottie Animation */}
            <div className="w-full max-w-[220px] sm:max-w-[280px] md:max-w-[340px] mx-auto flex justify-center items-center">
              <Lottie
                lottieRef={lottieRef}
                animationData={notFoundAnimation}
                loop={true}
                autoplay={true}
                initialSegment={[0, 131]}
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
            </div>
          </div>

          {/* Bottom Left Metadata as shown in screenshot */}
          <div className="w-full text-left mt-8 sm:mt-12 text-[11px] sm:text-xs text-[#6B7280] leading-relaxed font-mono">
            <div>Time</div>
            <div className="text-[#4B5563] break-all">{currentTime}</div>
            <div>Page</div>
          </div>
        </div>
      </main>

      {/* ── G2 Footer ── */}
      <Footer />
    </div>
  );
}



