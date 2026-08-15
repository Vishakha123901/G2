import { useState } from "react";

export default function ResearchSoftwareSection() {
  const softwareCategories = {
    "Accounting & Finance Software": [
      { name: "Expense Management Software", url: "#" },
      { name: "Accounts Payable Automation Software", url: "#" },
      { name: "Accounts Receivable Software", url: "#" },
      { name: "Sales Tax and VAT Compliance Software", url: "#" },
    ],

    "Artificial Intelligence Software": [
      { name: "AI Chatbots Software", url: "#" },
      { name: "Natural Language Processing (NLP) Soft...", url: "#" },
      { name: "Large Language Models (LLMs) Software", url: "#" },
      { name: "AI Image Generators Software", url: "#" },
      { name: "Text to Speech Software", url: "#" },
      { name: "Vector Database Software", url: "#" },
    ],

    "Collaboration & Productivity Software": [
      { name: "VoIP Providers", url: "#" },
      { name: "Board Management Software", url: "#" },
      { name: "Digital Adoption Platforms", url: "#" },
      { name: "Survey Software", url: "#" },
      { name: "Video Conferencing Software", url: "#" },
    ],

    "Customer Service Software": [
      { name: "Help Desk Software", url: "#" },
      { name: "Field Service Management Software", url: "#" },
      { name: "Customer Success Software", url: "#" },
      { name: "Live Chat Software", url: "#" },
      { name: "Experience Management Software", url: "#" },
      { name: "Customer Communications Managemen...", url: "#" },
      { name: "Customer Service Automation Software", url: "#" },
    ],

    "Governance, Risk & Compliance Software": [
      { name: "Enterprise Risk Management (ERM) Soft...", url: "#" },
      { name: "Security Compliance Software", url: "#" },
      { name: "Third Party & Supplier Risk Management ...", url: "#" },
      { name: "Audit Management Software", url: "#" },
      { name: "Anti-Money Laundering Software", url: "#" },
      { name: "Business Continuity Management Softwa...", url: "#" },
      { name: "Operational Risk Management Software", url: "#" },
    ],

    "HR Software": [
      { name: "Core HR Software", url: "#" },
      { name: "Payroll Software", url: "#" },
      { name: "HCM Software", url: "#" },
      { name: "Global Payroll Software", url: "#" },
      { name: "Time Tracking Software", url: "#" },
      { name: "Workforce Management Software", url: "#" },
    ],

    "Marketing Software": [
      { name: "Marketing Automation Software", url: "#" },
      { name: "Customer Data Platforms (CDP)", url: "#" },
      { name: "Email Marketing Software", url: "#" },
      { name: "Mobile Marketing Software", url: "#" },
      { name: "Online Reputation Management Software", url: "#" },
      { name: "SEO Tools", url: "#" },
      { name: "SMS Marketing Software", url: "#" },
      { name: "Marketing Analytics Software", url: "#" },
      { name: "Inbound Call Tracking Software", url: "#" },
      { name: "Online Community Management Software", url: "#" },
      { name: "Digital Signage Software", url: "#" },
      { name: "User Research Tools", url: "#" },
      { name: "Webinar Platforms", url: "#" },
      { name: "Affiliate Marketing Software", url: "#" },
    ],

    "Sales Acceleration Software": [
      { name: "Sales Engagement Software", url: "#" },
      { name: "Sales Enablement Software", url: "#" },
      { name: "Conversation Intelligence Software", url: "#" },
      { name: "Sales Performance Management Software", url: "#" },
      { name: "Sales Training and Onboarding Software", url: "#" },
    ],

    "Sales Software": [
      { name: "Sales Intelligence Software", url: "#" },
      { name: "Contract Management Software", url: "#" },
      { name: "Sales Compensation Software", url: "#" },
      { name: "Contract Lifecycle Management (CLM) S...", url: "#" },
      { name: "Auto Dialer Software", url: "#" },
      { name: "AI Sales Assistant Software", url: "#" },
    ],
  };

  const columns = [
    [
      "Accounting & Finance Software",
      "Artificial Intelligence Software",
      "Collaboration & Productivity Software",
    ],
    [
      "Customer Service Software",
      "Governance, Risk & Compliance Software",
    ],
    [
      "HR Software",
      "Marketing Software",
    ],
    [
      "Sales Acceleration Software",
      "Sales Software",
    ],
  ];

  const [openCategories, setOpenCategories] = useState({});

  const toggleCategory = (category) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <section className="w-full bg-white py-[35px] sm:py-10 md:py-[45px] px-0 sm:px-6 md:px-[50px]">
      <div className="w-full max-w-[1340px] mx-auto px-6 sm:px-0">

        {/* TITLE */}
        <h2
          className="text-[22px] md:text-[28px] font-bold leading-tight mb-[38px] md:mb-[42px] lg:mb-[17px] text-left"
          style={{ color: '#252530', letterSpacing: '-0.4px' }}
        >
          Research popular software<br />& services.
        </h2>

        {/* DESKTOP GRID */}
        <div className="hidden md:grid grid-cols-4 gap-3 items-start">
          {columns.map((column, columnIndex) => (
            <div className="min-w-0 flex flex-col" key={columnIndex}>
              {column.map((category) => (
                <div className="mb-2" key={category}>
                  <h3
                    className="mb-[3px] text-base font-semibold leading-[1.35]"
                    style={{ color: '#5A39A2' }}
                  >
                    {category}
                  </h3>

                  <div className="flex flex-col gap-0">
                    {softwareCategories[category].map((item, index) => (
                      <a
                        href={item.url}
                        className="w-fit max-w-full flex items-baseline px-1 py-[1px] rounded text-[15px] leading-[1.5] font-normal no-underline transition-all duration-150 hover:bg-[rgba(92,59,178,0.07)]"
                        style={{ color: '#202124' }}
                        key={index}
                      >
                        <span className="whitespace-nowrap overflow-hidden text-ellipsis">{item.name}</span>
                        <span className="flex-shrink-0 ml-[3px] text-[17px] leading-none relative top-[1px]" style={{ color: '#202124' }}>›</span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}

              {columnIndex === 3 && (
                <div className="-mt-[1px]">
                  <a
                    href="#"
                    className="inline-block px-1 py-[1px] rounded text-base leading-[1.35] font-semibold no-underline transition-colors duration-150 hover:bg-[rgba(90,57,162,0.07)]"
                    style={{ color: '#5A39A2' }}
                  >
                    All Software
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* MOBILE ACCORDION */}
        <div className="block md:hidden w-full">
          {Object.entries(softwareCategories).map(([category, links]) => {
            const isOpen = !!openCategories[category];

            return (
              <div className="w-full border-t border-[#d1d1d1] last:border-b last:border-b-[#d1d1d1]" key={category}>
                {/* CATEGORY BUTTON */}
                <button
                  type="button"
                  className="w-full min-h-[46px] flex items-center justify-between gap-3 py-[6px] sm:py-2 border-none outline-none bg-transparent cursor-pointer text-left"
                  onClick={() => toggleCategory(category)}
                  aria-expanded={isOpen}
                >
                  <span
                    className="flex-1 min-w-0 text-sm font-semibold leading-[1.3] break-words"
                    style={{ color: '#5A39A2', letterSpacing: '-0.2px' }}
                  >
                    {category}
                  </span>

                  <span
                    className={`w-[25px] h-[25px] flex-shrink-0 flex items-center justify-center rounded-md transition-all duration-200 ${
                      isOpen ? 'bg-[#77777d]' : 'bg-[#99999f]'
                    }`}
                  >
                    <span
                      className={`w-[7px] h-[7px] block border-r-2 border-b-2 border-white transition-transform duration-250 ${
                        isOpen ? 'rotate-[225deg] -translate-y-[1px]' : 'rotate-45 -translate-y-[2px]'
                      }`}
                    />
                  </span>
                </button>

                {/* CATEGORY LINKS */}
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="w-full pt-[2px] pb-2">
                      {links.map((item, index) => (
                        <a
                          href={item.url}
                          className="w-full flex items-center justify-between gap-[10px] px-[5px] py-1 rounded-[5px] text-sm leading-[1.35] font-normal no-underline transition-all duration-150 hover:bg-[rgba(92,59,178,0.07)]"
                          style={{ color: '#202124' }}
                          key={index}
                        >
                          <span className="min-w-0 overflow-hidden text-ellipsis">{item.name}</span>
                          <span className="flex-shrink-0 text-[17px] leading-none" style={{ color: '#202124' }}>›</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* ALL SOFTWARE */}
          <div className="w-full border-b border-[#d1d1d1]">
            <a
              href="#"
              className="min-h-[44px] flex items-center py-[6px] text-[15px] leading-[1.3] font-semibold no-underline transition-colors duration-150 hover:bg-[rgba(90,57,162,0.07)]"
              style={{ color: '#5A39A2' }}
            >
              All Software
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
