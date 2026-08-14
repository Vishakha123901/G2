import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// G2 Footer Component - Full Version with Mobile Accordion
export default function Footer() {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (sectionId) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const footerData = {
    g2: {
      title: 'G2',
      links: [
        { text: 'G2 Deals', url: 'https://www.g2.com/deals' },
        { text: 'TechBlend', url: 'https://www.g2.com/techblend' },
        { text: 'Learning Hub', url: 'https://learn.g2.com' },
        { text: 'Software Reviews', url: 'https://www.g2.com/categories' },
        { text: 'Add Your Product/Service', url: 'https://www.g2.com/products/new' },
        { text: 'Research Hub', url: 'https://research.g2.com' },
        { text: 'Research Agenda', url: 'https://research.g2.com/research-agenda' },
        { text: 'Compare Software', url: 'https://www.g2.com/compare' },
        { text: 'Technology Glossary', url: 'https://www.g2.com/glossary' },
        { text: 'Best Software Companies', url: 'https://www.g2.com/best' },
        { text: 'Seller Info', url: 'https://sell.g2.com' },
        { text: 'AI/LLM Information Page', url: 'https://www.g2.com/llm-info' }
      ]
    },
    topCategories: {
      title: 'Top Categories',
      links: [
        { text: 'AI Chatbots Software', url: 'https://www.g2.com/categories/ai-chatbots' },
        { text: 'CRM Software', url: 'https://www.g2.com/categories/crm' },
        { text: 'Project Management Software', url: 'https://www.g2.com/categories/project-management' },
        { text: 'Expense Management Software', url: 'https://www.g2.com/categories/expense-management' },
        { text: 'Video Conferencing Software', url: 'https://www.g2.com/categories/video-conferencing' },
        { text: 'Online Backup Software', url: 'https://www.g2.com/categories/online-backup' },
        { text: 'E-Commerce Platforms', url: 'https://www.g2.com/categories/e-commerce-platforms' },
        { text: 'Accounting Software', url: 'https://www.g2.com/categories/accounting' },
        { text: 'ERP Systems', url: 'https://www.g2.com/categories/erp-systems' },
        { text: 'Marketing Automation Software', url: 'https://www.g2.com/categories/marketing-automation' },
        { text: 'All Categories', url: 'https://www.g2.com/categories' }
      ]
    },
    company: {
      title: 'Company',
      links: [
        { text: 'About', url: 'https://company.g2.com/about' },
        { text: 'Customer Support portal', url: 'https://support.g2.com/s/' },
        { text: 'G2 Gives', url: 'https://company.g2.com/gives' },
        { text: 'Careers', url: 'https://company.g2.com/careers' },
        { text: 'Teams', url: 'https://company.g2.com/teams' },
        { text: 'News', url: 'https://news.g2.com' },
        { text: 'Contact', url: 'https://company.g2.com/contact' }
      ],
      address: {
        name: 'G2',
        street: '100 S Wacker Dr',
        suite: 'STE 600',
        city: 'Chicago',
        state: 'IL',
        zip: '60606'
      }
    },
    policies: {
      title: 'Policies',
      links: [
        { text: 'Community Guidelines', url: 'https://legal.g2.com/community-guidelines' },
        { text: 'G2 Scoring Methodologies', url: 'https://research.g2.com/methodology/scoring' },
        { text: 'Terms of Use', url: 'https://legal.g2.com/terms-of-use' },
        { text: 'Privacy Policy', url: 'https://legal.g2.com/privacy-policy' },
        { text: 'Your Privacy Choices', url: 'https://www.g2.com/user_consents/opt_out_form' },
        { text: 'Legal', url: 'https://legal.g2.com' },
        { text: 'Trust & Security', url: 'https://trust.g2.com' },
        { text: 'Cookie Preferences', url: '#' }
      ]
    }
  };

  return (
    <footer className="w-full bg-[#252530] text-white">
      
      {/* Desktop & Tablet View */}
      <div className="hidden md:block">
        <div className="max-w-[1300px] mx-auto px-6 lg:px-20 py-10 lg:py-12">
          
          {/* Footer Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8">
            
            {/* G2 Column */}
            <div className="flex flex-col">
              <h3 className="text-[15px] font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-[#FF492C]" viewBox="0 0 100 86.6" fill="currentColor">
                  <path d="M100 86.6V28.8L50 0 0 28.9v57.7l50-28.9z"/>
                </svg>
                {footerData.g2.title}
              </h3>
              <div className="flex flex-col gap-2.5">
                {footerData.g2.links.map((link, index) => (
                  <a key={index} href={link.url} className="text-[13px] text-[#C8CCD4] hover:text-white transition-colors">{link.text}</a>
                ))}
              </div>
            </div>

            {/* Top Categories Column */}
            <div className="flex flex-col">
              <h3 className="text-[15px] font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-[#FF492C]" viewBox="0 0 100 86.6" fill="currentColor">
                  <path d="M100 86.6V28.8L50 0 0 28.9v57.7l50-28.9z"/>
                </svg>
                {footerData.topCategories.title}
              </h3>
              <div className="flex flex-col gap-2.5">
                {footerData.topCategories.links.map((link, index) => (
                  <a key={index} href={link.url} className="text-[13px] text-[#C8CCD4] hover:text-white transition-colors">{link.text}</a>
                ))}
              </div>
            </div>

            {/* Company Column */}
            <div className="flex flex-col">
              <h3 className="text-[15px] font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-[#FF492C]" viewBox="0 0 100 86.6" fill="currentColor">
                  <path d="M100 86.6V28.8L50 0 0 28.9v57.7l50-28.9z"/>
                </svg>
                {footerData.company.title}
              </h3>
              <div className="flex flex-col gap-2.5">
                {footerData.company.links.map((link, index) => (
                  <a key={index} href={link.url} className="text-[13px] text-[#C8CCD4] hover:text-white transition-colors">{link.text}</a>
                ))}
                <div className="text-[13px] text-[#C8CCD4] mt-2">
                  <div>{footerData.company.address.name}</div>
                  <div>{footerData.company.address.street}</div>
                  <div>{footerData.company.address.suite}</div>
                  <div>{footerData.company.address.city}, {footerData.company.address.state} {footerData.company.address.zip}</div>
                </div>
                <div className="flex gap-3 mt-3">
                  <a href="https://twitter.com/g2dotcom" className="text-[#B8BCC4] hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href="https://www.facebook.com/g2dotcom" className="text-[#B8BCC4] hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 3.667h-3.533v7.98H9.101z"/>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/company/g2dotcom" className="text-[#B8BCC4] hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Policies Column */}
            <div className="flex flex-col">
              <h3 className="text-[15px] font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-[#FF492C]" viewBox="0 0 100 86.6" fill="currentColor">
                  <path d="M100 86.6V28.8L50 0 0 28.9v57.7l50-28.9z"/>
                </svg>
                {footerData.policies.title}
              </h3>
              <div className="flex flex-col gap-2.5">
                {footerData.policies.links.map((link, index) => (
                  <a key={index} href={link.url} className="text-[13px] text-[#C8CCD4] hover:text-white transition-colors">{link.text}</a>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-6 border-t border-white/10">
            
            {/* Language Selector */}
            <div className="flex items-center gap-2 text-[#B8BCC4]">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              <span className="text-[13px] font-semibold">EN</span>
            </div>

            {/* Copyright */}
            <p className="text-[12px] text-[#B8BCC4]">© 2026 G2.com, Inc. All rights reserved.</p>

          </div>

        </div>
      </div>

      {/* Mobile Accordion View */}
      <div className="block md:hidden">
        <div className="px-5 py-8">
          
          {/* G2 Section */}
          <div className="border-b border-white/10">
            <button
              onClick={() => toggleSection('g2')}
              className="w-full flex items-center justify-between py-4 text-left"
            >
              <div className="flex items-center gap-2">
                <svg className="w-3 h-3 text-[#FF492C]" viewBox="0 0 100 86.6" fill="currentColor">
                  <path d="M100 86.6V28.8L50 0 0 28.9v57.7l50-28.9z"/>
                </svg>
                <span className="text-[14px] font-bold">{footerData.g2.title}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-white transition-transform ${openSections.g2 ? 'rotate-180' : ''}`} />
            </button>
            {openSections.g2 && (
              <div className="pb-4 pl-5 flex flex-col gap-3">
                {footerData.g2.links.map((link, index) => (
                  <a key={index} href={link.url} className="text-[13px] text-[#C8CCD4]">{link.text}</a>
                ))}
              </div>
            )}
          </div>

          {/* Top Categories Section */}
          <div className="border-b border-white/10">
            <button
              onClick={() => toggleSection('topCategories')}
              className="w-full flex items-center justify-between py-4 text-left"
            >
              <div className="flex items-center gap-2">
                <svg className="w-3 h-3 text-[#FF492C]" viewBox="0 0 100 86.6" fill="currentColor">
                  <path d="M100 86.6V28.8L50 0 0 28.9v57.7l50-28.9z"/>
                </svg>
                <span className="text-[14px] font-bold">{footerData.topCategories.title}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-white transition-transform ${openSections.topCategories ? 'rotate-180' : ''}`} />
            </button>
            {openSections.topCategories && (
              <div className="pb-4 pl-5 flex flex-col gap-3">
                {footerData.topCategories.links.map((link, index) => (
                  <a key={index} href={link.url} className="text-[13px] text-[#C8CCD4]">{link.text}</a>
                ))}
              </div>
            )}
          </div>

          {/* Company Section */}
          <div className="border-b border-white/10">
            <button
              onClick={() => toggleSection('company')}
              className="w-full flex items-center justify-between py-4 text-left"
            >
              <div className="flex items-center gap-2">
                <svg className="w-3 h-3 text-[#FF492C]" viewBox="0 0 100 86.6" fill="currentColor">
                  <path d="M100 86.6V28.8L50 0 0 28.9v57.7l50-28.9z"/>
                </svg>
                <span className="text-[14px] font-bold">{footerData.company.title}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-white transition-transform ${openSections.company ? 'rotate-180' : ''}`} />
            </button>
            {openSections.company && (
              <div className="pb-4 pl-5 flex flex-col gap-3">
                {footerData.company.links.map((link, index) => (
                  <a key={index} href={link.url} className="text-[13px] text-[#C8CCD4]">{link.text}</a>
                ))}
                <div className="text-[13px] text-[#C8CCD4] mt-2">
                  <div>{footerData.company.address.name}</div>
                  <div>{footerData.company.address.street}</div>
                  <div>{footerData.company.address.suite}</div>
                  <div>{footerData.company.address.city}, {footerData.company.address.state} {footerData.company.address.zip}</div>
                </div>
                <div className="flex gap-3 mt-3">
                  <a href="https://twitter.com/g2dotcom" className="text-[#B8BCC4]" target="_blank" rel="noopener noreferrer">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href="https://www.facebook.com/g2dotcom" className="text-[#B8BCC4]" target="_blank" rel="noopener noreferrer">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 3.667h-3.533v7.98H9.101z"/>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/company/g2dotcom" className="text-[#B8BCC4]" target="_blank" rel="noopener noreferrer">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Policies Section */}
          <div className="border-b border-white/10">
            <button
              onClick={() => toggleSection('policies')}
              className="w-full flex items-center justify-between py-4 text-left"
            >
              <div className="flex items-center gap-2">
                <svg className="w-3 h-3 text-[#FF492C]" viewBox="0 0 100 86.6" fill="currentColor">
                  <path d="M100 86.6V28.8L50 0 0 28.9v57.7l50-28.9z"/>
                </svg>
                <span className="text-[14px] font-bold">{footerData.policies.title}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-white transition-transform ${openSections.policies ? 'rotate-180' : ''}`} />
            </button>
            {openSections.policies && (
              <div className="pb-4 pl-5 flex flex-col gap-3">
                {footerData.policies.links.map((link, index) => (
                  <a key={index} href={link.url} className="text-[13px] text-[#C8CCD4]">{link.text}</a>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Bottom */}
          <div className="flex flex-col gap-4 pt-6">
            <div className="flex items-center gap-2 text-[#B8BCC4]">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              <span className="text-[13px] font-semibold">EN</span>
            </div>
            <p className="text-[12px] text-[#B8BCC4]">© 2026 G2.com, Inc. All rights reserved.</p>
          </div>

        </div>
      </div>

    </footer>
  );
}
