import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronRight, Pin, Menu, X, Trophy, TrendingUp, ArrowLeft, Search } from 'lucide-react';
import { navMenuItems, userActionLinks } from '../../data/navigationData';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthModal } from '../../context/AuthModalContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeTabIds, setActiveTabIds] = useState({
    software: 'artificial-intelligence',
    services: 'ecosystem-service-providers'
  });
  const { openLoginModal } = useAuthModal();


  // Mobile Submenu view ('main' | 'topCategories' | 'softwareCategories' | 'serviceCategories')
  const [mobileSubmenu, setMobileSubmenu] = useState('main');

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if current page is NOT home page
  const isNotHomePage = location.pathname !== '/';

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const softwareItem = navMenuItems.find((item) => item.id === 'software');
  const servicesItem = navMenuItems.find((item) => item.id === 'services');

  const topCategoriesList = [
    { label: 'AI Chatbots Software', link: '/category/artificial-intelligence' },
    { label: 'CRM Software', link: '/category/sales-tools' },
    { label: 'Project Management Software', link: '/category/project-management' },
    { label: 'Expense Management Software', link: '/category/erp' },
    { label: 'Video Conferencing Software', link: '/category/collaboration' },
    { label: 'Online Backup Software', link: '/category/hosting' },
    { label: 'E-Commerce Platforms', link: '/category/e-commerce-platforms' },
    { label: 'Accounting Software', link: '/category/erp' },
    { label: 'ERP Systems', link: '/category/erp' },
    { label: 'Marketing Automation Software', link: '/category/marketing' }
  ];

  return (
    <>
      <style>{`
        /* Custom scrollbar for Left Category Sidebar */
        .g2-mega-sidebar::-webkit-scrollbar {
          width: 8px;
        }
        .g2-mega-sidebar::-webkit-scrollbar-track {
          background: #EEF0F4;
          border-radius: 4px;
        }
        .g2-mega-sidebar::-webkit-scrollbar-thumb {
          background: #B0BAC9;
          border-radius: 4px;
        }
        .g2-mega-sidebar::-webkit-scrollbar-thumb:hover {
          background: #8A98AC;
        }

        /* Custom scrollbar for Right Content Area */
        .g2-mega-content::-webkit-scrollbar {
          width: 8px;
        }
        .g2-mega-content::-webkit-scrollbar-track {
          background: #F7FAFC;
          border-radius: 4px;
        }
        .g2-mega-content::-webkit-scrollbar-thumb {
          background: #CBD5E0;
          border-radius: 4px;
        }

        /* Mobile drawer scrollbar */
        .g2-mobile-drawer::-webkit-scrollbar {
          width: 4px;
        }
        .g2-mobile-drawer::-webkit-scrollbar-thumb {
          background: #CBD5E0;
          border-radius: 2px;
        }

        /* Slide in from Right animation */
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slideInRight {
          animation: slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <header className="relative z-40 w-full bg-transparent px-4 sm:px-8 md:px-20 xl:px-32 2xl:px-40 py-2.5 sm:py-3" ref={dropdownRef}>
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          
          {/* =====================================================
              DESKTOP TOP NAVBAR (lg and up) — Exact match to screenshot
          ===================================================== */}
          <div className="hidden lg:flex items-center justify-between w-full">
            
            {/* Left Group: Logo + Search "Ask a question..." */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Link
                to="/"
                className="flex items-center group focus:outline-none flex-shrink-0"
                aria-label="G2 Home"
              >
                <div className="w-14 h-14 bg-[#FF4F00] rounded-full flex items-center justify-center text-white font-black text-3xl shadow-sm transition-transform group-hover:scale-105">
                  <span>G</span>
                  <sup className="text-[14px] font-bold -ml-0.5 -mt-2.5">2</sup>
                </div>
              </Link>

              {/* Search Bar - Pill with "Ask a question..." (Only on non-home pages) */}
              {isNotHomePage && (
                <div className="relative w-[300px] xl:w-[340px]">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 stroke-[2.2]" />
                  <input
                    type="text"
                    placeholder="Ask a question..."
                    className="w-full h-[44px] pl-10 pr-4 text-[14px] text-gray-800 placeholder-gray-500 border border-gray-300 rounded-full bg-white focus:outline-none focus:border-[#5E42C0] transition-all font-normal"
                  />
                </div>
              )}
            </div>

            {/* Right Group: Nav Links + Action Buttons */}
            <div className="flex items-center gap-2 xl:gap-3">
              {/* Navigation Links */}
              <nav className="flex items-center gap-3 xl:gap-4 relative">
                {navMenuItems.map((item) => {
                  const isOpen = activeDropdown === item.id;

                  return (
                    <div
                      key={item.id}
                      className="relative"
                      onMouseEnter={() => {
                        if (item.hasDropdown) {
                          setActiveDropdown(item.id);
                        }
                      }}
                    >
                      <button
                        onClick={() => {
                          if (item.hasDropdown) {
                            setActiveDropdown(isOpen ? null : item.id);
                          } else if (item.id === 'ai-agents') {
                            navigate('/category/artificial-intelligence');
                          } else if (item.id === 'deals') {
                            navigate('/deals');
                          }
                        }}
                        className={`flex items-center gap-1 text-[13.5px] font-medium transition-colors whitespace-nowrap py-1 ${
                          isOpen
                            ? 'text-[#5E42C0]'
                            : 'text-[#374151] hover:text-[#1C1D21]'
                        }`}
                      >
                        <span>{item.label}</span>
                        {item.hasDropdown && (
                          <ChevronDown
                            className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${
                              isOpen ? 'rotate-180 text-[#5E42C0]' : ''
                            }`}
                          />
                        )}
                      </button>

                      {/* Mega Menu Dropdown Modal (Wider & Centered Horizontally) */}
                      {item.megaMenu && isOpen && (
                        <div
                          className="fixed left-1/2 -translate-x-1/2 top-[60px] w-[1140px] xl:w-[1240px] max-w-[95vw] bg-white rounded-2xl shadow-[0_16px_50px_rgba(0,0,0,0.16)] border border-gray-200/90 z-50 overflow-hidden animate-fadeIn"
                          onMouseLeave={() => setActiveDropdown(null)}
                        >
                          {/* Main Mega Menu Container */}
                          <div className="flex h-[450px]">
                            {/* Left Sidebar: Category List */}
                            <div className="w-[265px] flex-shrink-0 bg-[#F4F5F8] border-r border-gray-200/80 p-2.5 overflow-y-auto g2-mega-sidebar">
                              <div className="space-y-0.5">
                                {item.tabs.map((tab) => {
                                  const currentActiveTabId = activeTabIds[item.id] || item.tabs[0]?.id;
                                  const isSelected = currentActiveTabId === tab.id;
                                  return (
                                    <button
                                      key={tab.id}
                                      onMouseEnter={() => setActiveTabIds(prev => ({...prev, [item.id]: tab.id}))}
                                      className={`w-full text-left px-4 py-2.5 rounded-md text-[14px] transition-all block truncate ${
                                        isSelected
                                          ? 'bg-[#5E42C0] text-white font-semibold'
                                          : 'text-[#24344D] font-normal hover:bg-[#5E42C0] hover:text-white'
                                      }`}
                                    >
                                      {tab.label}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Right Content Area: 3 Columns of Subcategory Items */}
                            <div className="flex-1 bg-white p-8 overflow-y-auto g2-mega-content flex flex-col justify-between">
                              <div>
                                {/* 3 Columns Grid */}
                                <div className="grid grid-cols-3 gap-x-10 gap-y-8">
                                  {(() => {
                                    const currentActiveTabId = activeTabIds[item.id] || item.tabs[0]?.id;
                                    const activeTab = item.tabs?.find((t) => t.id === currentActiveTabId) || item.tabs?.[0];
                                    return activeTab?.columns?.map((column, colIdx) => (
                                      <div key={colIdx} className="space-y-3">
                                        {column.title && (
                                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                                            {column.title}
                                          </h4>
                                        )}
                                        {column.items.map((subItem, itemIdx) => {
                                          const label = typeof subItem === 'object' ? subItem.label : subItem;
                                          const slug = typeof subItem === 'object' ? subItem.slug : activeTab?.id;
                                          // Determine if this is a service or software category
                                          const isService = item.id === 'services';
                                          const linkPath = isService ? `/services/${slug}` : `/category/${slug}`;
                                          return (
                                            <Link
                                              key={itemIdx}
                                              to={linkPath}
                                              onClick={() => setActiveDropdown(null)}
                                              className="block text-[14px] text-[#24344D] hover:text-[#5E42C0] hover:translate-x-0.5 transition-all py-0.5 font-medium leading-relaxed"
                                            >
                                              {label}
                                            </Link>
                                          );
                                        })}
                                      </div>
                                    ));
                                  })()}
                                </div>
                              </div>

                              {/* Bottom Mega Menu Footer */}
                              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                                <span>Showing top solutions and categories verified by real users</span>
                                <Link
                                  to="/category/all"
                                  onClick={() => setActiveDropdown(null)}
                                  className="text-[#5E42C0] font-bold hover:underline"
                                >
                                  View all categories →
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Dropdown Menu for non-mega menus (Sell on G2) */}
                      {!item.megaMenu && item.hasDropdown && isOpen && (
                        <div
                          className="absolute top-[calc(100%+8px)] left-0 w-52 bg-white rounded-lg shadow-2xl border border-gray-200 p-4 z-50 animate-fadeIn"
                          onMouseLeave={() => setActiveDropdown(null)}
                        >
                          {item.categories.map((cat, idx) => (
                            <div key={idx}>
                              {cat.title && (
                                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                                  {cat.title}
                                </div>
                              )}
                              <ul className="space-y-4">
                                {cat.items.map((sub, sIdx) => (
                                  <li key={sIdx}>
                                    <Link
                                      to="/sell"
                                      onClick={() => setActiveDropdown(null)}
                                      className="block group"
                                    >
                                      {typeof sub === 'object' ? (
                                        <>
                                          <div className="text-[14px] font-semibold text-[#6B7280] mb-1 group-hover:text-[#5E42C0] transition-colors">
                                            {sub.heading}
                                          </div>
                                          <div className="text-[12px] text-[#6B7280] leading-relaxed">
                                            {sub.description}
                                          </div>
                                        </>
                                      ) : (
                                        <span className="text-sm font-medium text-gray-700 group-hover:text-[#5E42C0]">
                                          {sub}
                                        </span>
                                      )}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* Action Buttons: Pin, Leave Review, Join/Login */}
              <div className="flex items-center gap-2 xl:gap-2.5 flex-shrink-0">
                {/* Pin Icon Button */}
                <Link
                  to="/assistant/landing"
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center bg-white hover:border-[#5E42C0] transition-all"
                  title="Pinned items"
                >
                  <Pin className="w-3.5 h-3.5 text-[#5E42C0] fill-[#5E42C0]" />
                </Link>

                {/* Leave a Review Pill */}
                <Link
                  to={userActionLinks.leaveReview.url}
                  className="bg-[#5E42C0] hover:bg-[#4E35A6] text-white font-semibold text-[13.5px] px-4 py-1.5 rounded-full shadow-sm transition-all whitespace-nowrap"
                >
                  {userActionLinks.leaveReview.label}
                </Link>

                {/* Join or Log In Pill */}
                <button
                  onClick={() => openLoginModal()}
                  className="border border-gray-300 hover:border-gray-400 bg-white text-[#5E42C0] font-semibold text-[13.5px] px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap"
                >
                  {userActionLinks.joinOrLogin.label}
                </button>
              </div>
            </div>
          </div>

          {/* =====================================================
              MOBILE NAVBAR
              Logo (left) + Search (middle - on non-home pages) + Pin & Hamburger (right)
          ===================================================== */}
          <div className="flex lg:hidden items-center justify-between w-full gap-2 py-0.5">

            {/* Mobile Logo */}
            <Link
              to="/"
              className="flex items-center group focus:outline-none flex-shrink-0"
              aria-label="G2 Home"
            >
              <div className="w-10 h-10 bg-[#FF4F00] rounded-full flex items-center justify-center text-white font-black text-xl shadow-sm transition-transform group-hover:scale-105">
                <span>G</span>
                <sup className="text-[10px] font-bold -ml-0.5 -mt-1.5">2</sup>
              </div>
            </Link>

            {/* Mobile Search Bar - Visible on all pages EXCEPT Home page */}
            {isNotHomePage && (
              <div className="relative flex-1 min-w-0 mx-1.5">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 stroke-[2.2]" />
                <input
                  type="text"
                  placeholder="Ask a question..."
                  className="w-full h-[38px] pl-9 pr-3 text-[13.5px] text-gray-800 placeholder-gray-500 border border-gray-300 rounded-full bg-white focus:outline-none focus:border-[#5E42C0] transition-all font-normal shadow-sm"
                />
              </div>
            )}

            {/* right-menu-wrapper: Pin + Hamburger */}
            <div className="flex items-center flex-shrink-0 gap-1">

              {/* Pin / Research Boards */}
              <div className="flex items-center">
                <a
                  href="/assistant/landing"
                  role="menuitem"
                  aria-label="Research Boards"
                  className="flex justify-center items-center w-8 h-8 rounded-full border border-gray-300 bg-white hover:border-[#5746B2] hover:shadow-[0_2px_8px_2px_rgba(32,31,35,0.149),_0_0_0_1px_#5746B2] transition-all duration-150"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="w-4 h-4">
                    <path d="M15 12L17 14V15.5H12.75V20.25L12 21L11.25 20.25V15.5H7V14L9 12V6.5H8V5H16V6.5H15V12Z" fill="#5746B2"/>
                  </svg>
                </a>
              </div>

              {/* topnav__item--hamburger */}
              <div className="topnav__item" id="mobile-nav">
                <button
                  className="flex items-center focus:outline-none p-1"
                  onClick={() => {
                    setMobileMenuOpen(true);
                    setMobileSubmenu('main');
                  }}
                  aria-label="Expand/Collapse Menu"
                  aria-expanded={mobileMenuOpen}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6 fill-current text-gray-900" role="img" aria-label="Menu">
                    <path d="M32 96h448v96H32zm0 128h448v96H32zm0 128h448v96H32z"/>
                  </svg>
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Mobile Off-Canvas Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
            
            {/* Backdrop Overlay */}
            <div
              className="fixed inset-0 bg-black/50 transition-opacity animate-fadeIn"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Right Drawer Container */}
            <aside
              className={`relative w-[290px] sm:w-[330px] max-w-[85vw] h-full shadow-2xl flex flex-col justify-between p-5 z-10 overflow-y-auto g2-mobile-drawer animate-slideInRight transition-colors duration-200 ${
                mobileSubmenu !== 'main' ? 'bg-white' : 'bg-[#EDEFF2]'
              }`}
            >
              
              <div className="flex-1 flex flex-col justify-between">
                
                {/* SUBMENU: MAIN VIEW */}
                {mobileSubmenu === 'main' && (
                  <div className="space-y-4 pt-1">
                    
                    {/* Close button inside drawer */}
                    <div className="flex justify-end pb-1">
                      <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-gray-400 hover:text-gray-900 p-1"
                        aria-label="Close Menu"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Top items */}
                    <div className="space-y-2.5 border-b border-gray-300/70 pb-3">
                      <Link
                        to="/"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-[#1A4B75] font-bold text-[17px] hover:text-[#FF4F00] transition"
                      >
                        Home
                      </Link>
                      <Link
                        to="/leave-a-review"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-[#1A4B75] font-bold text-[17px] hover:text-[#FF4F00] transition"
                      >
                        Leave a Review
                      </Link>
                    </div>

                    {/* Section Header: Browse */}
                    <div>
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                        Browse
                      </div>

                      <div className="space-y-2 text-[16px]">
                        
                        {/* Top Categories drilldown trigger */}
                        <button
                          onClick={() => setMobileSubmenu('topCategories')}
                          className="w-full flex items-center justify-between text-[#1A4B75] font-bold py-1.5 hover:text-[#FF4F00] text-left"
                        >
                          <span className="flex items-center gap-1">
                            Top Categories
                            <span className="text-[#FF4F00] font-bold text-xs ml-1">❯</span>
                          </span>
                        </button>

                        {/* All Categories */}
                        <Link
                          to="/category/all"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-[#1A4B75] font-bold py-1.5 hover:text-[#FF4F00]"
                        >
                          All Categories
                        </Link>

                        {/* Software Categories drilldown trigger */}
                        <button
                          onClick={() => setMobileSubmenu('softwareCategories')}
                          className="w-full flex items-center justify-between text-[#1A4B75] font-bold py-1.5 hover:text-[#FF4F00] text-left"
                        >
                          <span>Software Categories</span>
                          <ChevronRight className="w-4 h-4 text-[#1A4B75]" />
                        </button>

                        {/* AI Agents */}
                        <Link
                          to="/category/artificial-intelligence"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-[#1A4B75] font-bold py-1.5 hover:text-[#FF4F00]"
                        >
                          AI Agents
                        </Link>

                        {/* Service Categories drilldown trigger */}
                        <button
                          onClick={() => setMobileSubmenu('serviceCategories')}
                          className="w-full flex items-center justify-between text-[#1A4B75] font-bold py-1.5 hover:text-[#FF4F00] text-left"
                        >
                          <span>Service Categories</span>
                          <ChevronRight className="w-4 h-4 text-[#1A4B75]" />
                        </button>

                        {/* Compare Software */}
                        <Link
                          to="/"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-[#1A4B75] font-bold py-1.5 hover:text-[#FF4F00]"
                        >
                          Compare Software
                        </Link>

                        {/* Deals */}
                        <Link
                          to="/deals"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-[#1A4B75] font-bold py-1.5 hover:text-[#FF4F00]"
                        >
                          Deals
                        </Link>

                      </div>
                    </div>

                    {/* Section Header: My Profile */}
                    <div className="pt-2 border-t border-gray-300/70">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                        My Profile
                      </div>

                      <button
                        onClick={() => {
                          openLoginModal();
                          setMobileMenuOpen(false);
                        }}
                        className="w-full bg-white border border-[#5E42C0] text-[#5E42C0] text-center font-bold text-sm py-2.5 px-4 rounded-full block transition shadow-sm hover:bg-purple-50"
                      >
                        Join or Log In
                      </button>

                      <a
                        href="https://sell.g2.com"
                        target="_blank"
                        rel="noreferrer"
                        className="block text-[#1A4B75] font-bold text-sm mt-3.5 hover:text-[#FF4F00]"
                      >
                        Sell on G2
                      </a>
                    </div>

                  </div>
                )}

                {/* SUBMENU: TOP CATEGORIES DRILLDOWN */}
                {mobileSubmenu === 'topCategories' && (
                  <div className="flex-1 flex flex-col justify-between pt-1 min-h-[calc(100vh-80px)]">
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
                        <button
                          onClick={() => setMobileSubmenu('main')}
                          className="bg-gray-100 hover:bg-gray-200 text-[#5E42C0] px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 font-bold text-xs transition"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" /> Back
                        </button>
                        <button
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-gray-400 hover:text-gray-900 p-1"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="text-xs font-extrabold text-gray-900 uppercase tracking-wider mb-3">
                        Top Categories
                      </div>

                      <div className="space-y-1 text-sm overflow-y-auto max-h-[calc(100vh-200px)]">
                        {topCategoriesList.map((item, idx) => (
                          <Link
                            key={idx}
                            to={item.link}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-2.5 px-3 rounded-lg text-[#1A4B75] font-semibold hover:bg-purple-50 hover:text-[#5E42C0] transition border-b border-gray-50 last:border-0"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 mt-auto">
                      <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full text-center text-xs font-bold text-gray-500 hover:text-gray-900 py-1"
                      >
                        Close Menu
                      </button>
                    </div>
                  </div>
                )}

                {/* SUBMENU: SOFTWARE CATEGORIES DRILLDOWN */}
                {mobileSubmenu === 'softwareCategories' && (
                  <div className="flex-1 flex flex-col justify-between pt-1 min-h-[calc(100vh-80px)]">
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
                        <button
                          onClick={() => setMobileSubmenu('main')}
                          className="bg-gray-100 hover:bg-gray-200 text-[#5E42C0] px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 font-bold text-xs transition"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" /> Back
                        </button>
                        <button
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-gray-400 hover:text-gray-900 p-1"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="text-xs font-extrabold text-gray-900 uppercase tracking-wider mb-3">
                        Software Categories
                      </div>

                      <div className="space-y-1 text-sm overflow-y-auto max-h-[calc(100vh-200px)]">
                        {softwareItem?.tabs?.map((t) => (
                          <Link
                            key={t.id}
                            to={`/category/${t.id}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-2.5 px-3 rounded-lg text-[#1A4B75] font-semibold hover:bg-purple-50 hover:text-[#5E42C0] transition border-b border-gray-50 last:border-0"
                          >
                            {t.label}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 mt-auto">
                      <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full text-center text-xs font-bold text-gray-500 hover:text-gray-900 py-1"
                      >
                        Close Menu
                      </button>
                    </div>
                  </div>
                )}

                {/* SUBMENU: SERVICE CATEGORIES DRILLDOWN */}
                {mobileSubmenu === 'serviceCategories' && (
                  <div className="flex-1 flex flex-col justify-between pt-1 min-h-[calc(100vh-80px)]">
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
                        <button
                          onClick={() => setMobileSubmenu('main')}
                          className="bg-gray-100 hover:bg-gray-200 text-[#5E42C0] px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 font-bold text-xs transition"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" /> Back
                        </button>
                        <button
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-gray-400 hover:text-gray-900 p-1"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="text-xs font-extrabold text-gray-900 uppercase tracking-wider mb-3">
                        Service Categories
                      </div>

                      <div className="space-y-1 text-sm">
                        <Link to="/category/services" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 rounded-lg text-[#1A4B75] font-semibold hover:bg-purple-50 hover:text-[#5E42C0] transition border-b border-gray-50">IT Services</Link>
                        <Link to="/category/services" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 rounded-lg text-[#1A4B75] font-semibold hover:bg-purple-50 hover:text-[#5E42C0] transition border-b border-gray-50">Implementation Services</Link>
                        <Link to="/category/services" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 rounded-lg text-[#1A4B75] font-semibold hover:bg-purple-50 hover:text-[#5E42C0] transition border-b border-gray-50">Consulting Services</Link>
                        <Link to="/category/services" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 rounded-lg text-[#1A4B75] font-semibold hover:bg-purple-50 hover:text-[#5E42C0] transition">Design Agencies</Link>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 mt-auto">
                      <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full text-center text-xs font-bold text-gray-500 hover:text-gray-900 py-1"
                      >
                        Close Menu
                      </button>
                    </div>
                  </div>
                )}

              </div>

            </aside>

          </div>
        )}

      </header>
    </>
  );
}
