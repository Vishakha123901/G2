import React, { useRef } from 'react';
import Header from '../components/common/Header';
import HeroSection from '../components/home/HeroSection';
import PopularCategoriesSection from '../components/home/PopularCategoriesSection';
import CardSlider from '../components/common/CardSlider';
import LeaveReviewSection from '../components/home/LeaveReviewSection';
import G2ProfileSection from '../components/home/G2ProfileSection';
import TestimonialSection from '../components/home/TestimonialSection';
import ClaimProfileSection from '../components/home/ClaimProfileSection';
import ResearchSoftwareSection from '../components/home/ResearchSoftwareSection';
import Footer from '../components/common/Footer';
import { trendingSoftwareCards } from '../data/productData';


// Home Page main container
export default function Home() {
  const nextSectionRef = useRef(null);

  const handleScrollDown = () => {
    if (nextSectionRef.current) {
      nextSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F5] overflow-x-hidden flex flex-col">
      {/* Viewport Frame 1: Header + Full Hero Content */}
      <div className="min-h-screen h-screen flex flex-col justify-between relative overflow-hidden">
        <Header />
        <HeroSection onScrollDown={handleScrollDown} />
      </div>

      {/* Viewport Frame 2: Most Popular Software Categories Section */}
      <div ref={nextSectionRef}>
        <PopularCategoriesSection />
      </div>

      {/* Leave a Review Section */}
      <LeaveReviewSection />

      {/* G2 Profile Section with Interactive Dots */}
      <G2ProfileSection />

      {/* Testimonial Section */}
      <TestimonialSection />

      {/* Claim Profile Section */}
      <ClaimProfileSection />

      {/* Research Software Section */}
      <ResearchSoftwareSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
