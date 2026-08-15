import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { categoriesData } from '../data/categoriesData';

export default function PinnedItemsPage() {
  const [pinnedIds, setPinnedIds] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('g2_pinned_items');
      if (saved) setPinnedIds(JSON.parse(saved));
    } catch (e) { }
  }, []);

  const allProducts = categoriesData.flatMap(c => c.products || []);
  const pinnedProducts = pinnedIds
    .map(id => allProducts.find(p => p.id === id))
    .filter(Boolean);

  const removePin = (id) => {
    const updated = pinnedIds.filter(x => x !== id);
    setPinnedIds(updated);
    try {
      localStorage.setItem('g2_pinned_items', JSON.stringify(updated));
    } catch (e) { }
  };

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <span key={i} style={{ color: i < Math.floor(rating) ? '#FF4F00' : '#D1D5DB', fontSize: 14 }}>★</span>
    ));

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section
        className="flex flex-col lg:flex-row lg:items-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #f3f1ff 0%, #fff0fb 100%)' }}
      >
        {/* Left Content */}
        <div
          className="flex flex-col justify-center w-full px-4 sm:px-6 md:px-16 py-12 sm:py-14 md:py-16 lg:py-24 lg:w-auto flex-shrink-0"
          style={{ maxWidth: '560px' }}
        >
          <h1 className="font-bold text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-tight text-[#1C1D21] mb-4">
            Stop buying software in spreadsheets.
          </h1>

          <p className="text-[15px] sm:text-[16px] text-[#52525B] mb-6 sm:mb-8 leading-relaxed">
            Compare tools side-by-side, define what matters most, gather team input, and get AI-powered recommendations—all in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
            <button className="bg-[#5A39A2] hover:bg-[#493088] text-white font-bold text-[15px] sm:text-[16px] px-6 sm:px-7 py-3 sm:py-3.5 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2 whitespace-nowrap">
              <span>Create your free account</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="fill-current flex-shrink-0">
                <path d="M13.125 10.75H4V9.25H13.125L8.9375 5.0625L10 4L16 10L10 16L8.9375 14.9375L13.125 10.75Z"></path>
              </svg>
            </button>

            <a href="#how-it-works" className="text-[#5A39A2] font-semibold text-[15px] sm:text-[16px] hover:underline underline-offset-4">
              See how it works
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 sm:gap-8">
            <div>
              <div className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold text-[#1C1D21]">3.5M+</div>
              <div className="text-[13px] sm:text-[14px] text-[#71717A] font-medium">Verified reviews</div>
            </div>
            <div>
              <div className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold text-[#1C1D21]">200K+</div>
              <div className="text-[13px] sm:text-[14px] text-[#71717A] font-medium">Products listed</div>
            </div>
            <div>
              <div className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold text-[#1C1D21]">4.8M+</div>
              <div className="text-[13px] sm:text-[14px] text-[#71717A] font-medium">Buyers / month</div>
            </div>
          </div>
        </div>

        {/* Right Image - Enlarged Hero Image Width */}
        <div className="flex-1 flex items-center justify-center lg:justify-start relative min-h-[350px] sm:min-h-[450px] lg:min-h-[550px] p-4 lg:p-0">
          <img
            src="https://www.g2.com/assets/research_board/BoardMockup-cf2be2193981999b862bec70360a589f0f87c0f12b12c9e6ba57ab991414db0b.svg"
            alt="Project Management Board"
            className="w-full h-auto max-w-[95%] sm:max-w-[90%] lg:max-w-[850px] xl:max-w-[1050px] transition-transform duration-300 drop-shadow-xl"
          />
        </div>
      </section>


      {/* How It Works Section */}
      <section className="bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6" id="how-it-works">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-10 sm:gap-12 lg:gap-16">

            {/* Left Content */}
            <div className="flex flex-col flex-1 w-full">
              <h2 className="font-bold text-[24px] sm:text-[28px] lg:text-[32px] leading-tight text-[#1C1D21] mb-3 sm:mb-4">
                Tell G2 what matters most to your team.
              </h2>

              <p className="text-[15px] sm:text-[16px] text-[#52525B] mb-6 sm:mb-8 leading-relaxed">
                Research Assistant helps you define requirements, identify tradeoffs, and turn thousands of reviews into personalized recommendations based on what matters most to your team.
              </p>

              <div className="flex flex-col gap-3">
                <div className="inline-flex items-center rounded-full px-4 sm:px-5 py-2.5 sm:py-3 self-start border border-[#5A39A2] text-[#5A39A2] hover:bg-purple-50 transition-colors cursor-pointer">
                  <span className="text-[14px] sm:text-[16px] font-medium">Help me define my requirements</span>
                </div>

                <div className="inline-flex items-center rounded-full px-4 sm:px-5 py-2.5 sm:py-3 self-start border border-[#5A39A2] text-[#5A39A2] hover:bg-purple-50 transition-colors cursor-pointer">
                  <span className="text-[14px] sm:text-[16px] font-medium">Rank these tools by best fit</span>
                </div>

                <div className="inline-flex items-center rounded-full px-4 sm:px-5 py-2.5 sm:py-3 self-start border border-[#5A39A2] text-[#5A39A2] hover:bg-purple-50 transition-colors cursor-pointer">
                  <span className="text-[14px] sm:text-[16px] font-medium">Summarize strengths and weaknesses</span>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex flex-1 items-center justify-center w-full">
              <img
                alt="Research Assistant panel"
                className="w-full h-auto max-w-[500px] lg:max-w-full"
                src="https://www.g2.com/assets/research_board/ResearchPanel-3e9f4d74b4bcfd1aff8ceb4fa3b1fcf3993a332cf89e7fbf6be603ed9d11df67.svg"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Compare Tools Section */}
      <section
        className="py-12 sm:py-14 lg:py-16 px-4 sm:px-6"
        style={{ background: 'linear-gradient(171deg, #d0f6f1 0%, #fff6f5 100%)' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8">

            <h2 className="font-bold text-[22px] sm:text-[26px] lg:text-[32px] leading-tight text-[#1C1D21] lg:w-1/2">
              Compare tools based on what matters most.
            </h2>

            <p className="text-[15px] sm:text-[16px] text-[#52525B] leading-relaxed lg:w-1/2">
              Replace scattered spreadsheets with a living comparison that evolves as your team learns more.
            </p>

          </div>
        </div>
      </section>

      {/* Keep Everyone Aligned Section */}
      <section className="bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-10 sm:gap-12 lg:gap-16">

            {/* Left Content */}
            <div className="flex flex-col flex-1 w-full">
              <h2 className="font-bold text-[24px] sm:text-[28px] lg:text-[32px] leading-tight text-[#1C1D21] mb-3 sm:mb-4">
                Keep everyone aligned without digging through Slack threads.
              </h2>

              <p className="text-[15px] sm:text-[16px] text-[#52525B] mb-6 sm:mb-8 leading-relaxed">
                Bring stakeholders into the comparison itself. Gather feedback, track decisions, and surface disagreements before they become blockers.
              </p>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-purple-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="fill-[#5A39A2]">
                      <path d="M7.5 15C7.08333 15 6.72917 14.8542 6.4375 14.5625C6.14583 14.2708 6 13.9167 6 13.5V12.5H15.5V6H16.5C16.9167 6 17.2708 6.14583 17.5625 6.4375C17.8542 6.72917 18 7.08333 18 7.5V18L15 15H7.5ZM2 14V3.5C2 3.08333 2.14583 2.72917 2.4375 2.4375C2.72917 2.14583 3.08333 2 3.5 2H12.5C12.9167 2 13.2708 2.14583 13.5625 2.4375C13.8542 2.72917 14 3.08333 14 3.5V9.5C14 9.91667 13.8542 10.2708 13.5625 10.5625C13.2708 10.8542 12.9167 11 12.5 11H5L2 14Z"></path>
                    </svg>
                  </div>
                  <span className="text-[15px] sm:text-[16px] text-[#52525B]">Inline comments on any tool</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-purple-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="fill-[#5A39A2]">
                      <path d="M6.40039 8.79883C7.13358 8.79886 7.83669 8.89318 8.50879 9.08203C9.18089 9.27092 9.81709 9.54392 10.417 9.89941C10.6611 10.0437 10.8524 10.2351 10.9912 10.4736C11.1301 10.7125 11.2002 10.9768 11.2002 11.2656V12.7988H1.59961V11.2656C1.59962 10.9768 1.66972 10.7125 1.80859 10.4736C1.94746 10.2349 2.13948 10.0438 2.38379 9.89941C2.98374 9.54391 3.61983 9.2709 4.29199 9.08203C4.9641 8.89321 5.6672 8.79883 6.40039 8.79883ZM11.2002 8.98242C11.6334 9.07129 12.0526 9.19089 12.458 9.34082C12.8635 9.4908 13.2496 9.67723 13.6162 9.89941C13.8605 10.0438 14.0525 10.2349 14.1914 10.4736C14.3303 10.7125 14.4004 10.9768 14.4004 11.2656V12.7988H12.4004V11.2656C12.4004 10.7991 12.2918 10.3658 12.0752 9.96582C11.8586 9.56588 11.5668 9.23796 11.2002 8.98242ZM6.40039 3.19922C7.06689 3.19931 7.63303 3.43284 8.09961 3.89941C8.56618 4.36599 8.79971 4.93214 8.7998 5.59863C8.7998 6.2653 8.56628 6.83216 8.09961 7.29883C7.63305 7.76534 7.06684 7.99893 6.40039 7.99902C5.73372 7.99902 5.16686 7.76549 4.7002 7.29883C4.23353 6.83216 4 6.2653 4 5.59863C4.00009 4.93218 4.23368 4.36597 4.7002 3.89941C5.16686 3.43275 5.73372 3.19922 6.40039 3.19922ZM9.59961 3.19922C10.2663 3.19922 10.8331 3.43275 11.2998 3.89941C11.7663 4.36597 11.9999 4.93218 12 5.59863C12 6.2653 11.7665 6.83216 11.2998 7.29883C10.8331 7.76549 10.2663 7.99902 9.59961 7.99902C9.51087 7.99902 9.42727 7.99578 9.34961 7.99023C9.27195 7.98466 9.18834 7.9714 9.09961 7.94922C9.37739 7.627 9.59768 7.26847 9.75879 6.87402C9.91986 6.47962 10 6.05413 10 5.59863C9.99995 5.14335 9.91977 4.71846 9.75879 4.32422C9.59768 3.92977 9.37739 3.57125 9.09961 3.24902C9.18836 3.22684 9.27194 3.2126 9.34961 3.20703C9.42727 3.20148 9.51087 3.19923 9.59961 3.19922Z"></path>
                    </svg>
                  </div>
                  <span className="text-[15px] sm:text-[16px] text-[#52525B]">Tag teammates with @mentions</span>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex flex-1 items-center justify-center w-full">
              <img
                alt="Comments panel"
                className="w-full h-auto max-w-[500px] lg:max-w-full"
                src="https://www.g2.com/assets/research_board/CommentsPanel-ffb23e0b40fae76ac08e2287de620dbb3ffb0cdd14a16dc9701dfd612f241027.svg"
              />
            </div>

          </div>
        </div>
      </section>

      {/* From Comparison to Confidence Section */}
      <section
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6"
        style={{ background: 'linear-gradient(135deg, #f3f1ff 0%, #fff0fb 100%)' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-10 sm:gap-12 lg:gap-16">

            {/* Left Content */}
            <div className="flex flex-col flex-1 w-full">
              <h2 className="font-bold text-[24px] sm:text-[28px] lg:text-[32px] leading-tight text-[#1C1D21] mb-3 sm:mb-4">
                From comparison to confidence.
              </h2>

              <p className="text-[15px] sm:text-[16px] text-[#52525B] mb-5 sm:mb-6 leading-relaxed">
                Everything your team needs to evaluate software—without spreadsheets, scattered notes, or endless alignment meetings.
              </p>

              <div className="flex flex-col gap-4 mb-6 sm:mb-8">
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="fill-[#5A39A2] flex-shrink-0">
                    <path d="M8.10417 14.4375L4.0625 10.4167L5.125 9.33333L8.10417 12.3125L14.875 5.5625L15.9375 6.625L8.10417 14.4375Z"></path>
                  </svg>
                  <span className="text-[15px] sm:text-[16px] text-[#52525B]">Compare tools side-by-side</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="fill-[#5A39A2] flex-shrink-0">
                    <path d="M8.10417 14.4375L4.0625 10.4167L5.125 9.33333L8.10417 12.3125L14.875 5.5625L15.9375 6.625L8.10417 14.4375Z"></path>
                  </svg>
                  <span className="text-[15px] sm:text-[16px] text-[#52525B]">Gather stakeholder feedback</span>
                </div>
              </div>

              <button className="bg-[#5A39A2] hover:bg-[#493088] text-white font-bold text-[15px] sm:text-[16px] px-6 sm:px-7 py-3 sm:py-3.5 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2 self-start">
                <span>Create your free account</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="fill-current flex-shrink-0">
                  <path d="M13.125 10.75H4V9.25H13.125L8.9375 5.0625L10 4L16 10L10 16L8.9375 14.9375L13.125 10.75Z"></path>
                </svg>
              </button>
            </div>

            {/* Right Image */}
            <div className="flex flex-1 items-center justify-center self-stretch w-full">
              <img
                alt="Product comparison results"
                className="w-full h-auto my-auto max-w-[500px] lg:max-w-full"
                src="https://www.g2.com/assets/research_board/Confidence_Compare-300ebe69dea4732eedc88536b5019198a086518ca73b8cc481428cfe58edceb6.svg"
              />
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
