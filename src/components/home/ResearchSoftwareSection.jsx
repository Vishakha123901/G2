import React, { useState } from "react";

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

  // Mobile accordion state
  const [openCategories, setOpenCategories] = useState({});

  const toggleCategory = (category) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <>
      <section className="research-section">
        <div className="research-container">

          {/* TITLE */}
          <h2 className="research-title">
            Research popular software<br />&amp; services.
          </h2>

          {/* DESKTOP GRID */}
          <div className="research-desktop-grid">
            {columns.map((column, columnIndex) => (
              <div
                className="research-column"
                key={columnIndex}
              >
                {column.map((category) => (
                  <div
                    className="research-category"
                    key={category}
                  >
                    <h3 className="research-category-title">
                      {category}
                    </h3>

                    <div className="research-links">
                      {softwareCategories[category].map((item, index) => (
                        <a
                          href={item.url}
                          className="research-link"
                          key={index}
                        >
                          <span>{item.name}</span>
                          <span className="research-arrow">›</span>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}

                {columnIndex === 3 && (
                  <div className="research-all-software">
                    <a href="#" className="research-all-link">
                      All Software
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* MOBILE ACCORDION */}
          <div className="research-mobile-accordion">

            {Object.entries(softwareCategories).map(
              ([category, links]) => {
                const isOpen = !!openCategories[category];

                return (
                  <div
                    className={`mobile-category ${isOpen ? "mobile-category-open" : ""
                      }`}
                    key={category}
                  >

                    {/* CATEGORY HEADER */}
                    <button
                      type="button"
                      className="mobile-category-button"
                      onClick={() => toggleCategory(category)}
                      aria-expanded={isOpen}
                    >
                      <span className="mobile-category-title">
                        {category}
                      </span>

                      <span
                        className={`mobile-chevron ${isOpen ? "mobile-chevron-open" : ""
                          }`}
                      >
                        <span></span>
                      </span>
                    </button>

                    {/* CATEGORY LINKS */}
                    <div
                      className={`mobile-category-content ${isOpen ? "mobile-content-open" : ""
                        }`}
                    >
                      <div className="mobile-links">
                        {links.map((item, index) => (
                          <a
                            href={item.url}
                            className="mobile-link"
                            key={index}
                          >
                            <span>{item.name}</span>
                            <span className="mobile-link-arrow">
                              ›
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
            )}

            {/* ALL SOFTWARE */}
            <div className="mobile-all-software">
              <a href="#" className="mobile-all-link">
                All Software
              </a>
            </div>

          </div>
        </div>
      </section>

      <style>{`

        /* =====================================================
           MAIN SECTION
        ===================================================== */

        .research-section {
          width: 100%;
          background: #ffffff;
          padding: 40px 0 45px;
          box-sizing: border-box;
        }

        .research-container {
          width: 100%;
          max-width: 1340px;
          margin: 0 auto;
          padding: 0 50px;
          box-sizing: border-box;
        }


        /* =====================================================
           TITLE
        ===================================================== */

        .research-title {
          margin: 0 0 17px 0;
          padding: 0;

          color: #252530;

          font-family:
            Figtree,
            sans-serif;

          font-size: 28px;
          line-height: 1.25;
          font-weight: 700;

          letter-spacing: -0.4px;
        }


        /* =====================================================
           DESKTOP GRID
        ===================================================== */

        .research-desktop-grid {
          width: 100%;

          display: grid;

          grid-template-columns:
            repeat(4, minmax(0, 1fr));

          column-gap: 12px;

          align-items: start;
        }

        .research-column {
          min-width: 0;

          display: flex;
          flex-direction: column;

          margin: 0;
          padding: 0;
        }


        /* =====================================================
           DESKTOP CATEGORY
        ===================================================== */

        .research-category {
          margin: 0 0 8px 0;
          padding: 0;
        }


        /* =====================================================
           CATEGORY TITLE
        ===================================================== */

        .research-category-title {
          margin: 0 0 3px 0;
          padding: 0;

          color: #5A39A2;

          font-family:
            Figtree,
            sans-serif;

          font-size: 16px;
          line-height: 1.35;

          font-weight: 600;
        }


        /* =====================================================
           DESKTOP LINKS
        ===================================================== */

        .research-links {
          display: flex;
          flex-direction: column;

          gap: 0;
          margin: 0;
          padding: 0;
        }

        .research-link {
          width: fit-content;
          max-width: 100%;

          display: flex;
          align-items: baseline;

          margin: 0;
          padding: 1px 4px;

          border-radius: 4px;

          color: #202124;

          text-decoration: none;

          font-family:
            Figtree,
            sans-serif;

          font-size: 15px;
          line-height: 1.5;

          font-weight: 400;

          transition:
            background-color 0.18s ease,
            color 0.18s ease;
        }

        /*
          Soft/light hover effect
        */
        .research-link:hover {
          background: rgba(92, 59, 178, 0.07);
          color: #202124;
        }

        .research-link span:first-child {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .research-arrow {
          flex-shrink: 0;

          margin-left: 3px;

          color: #202124;

          font-size: 17px;
          line-height: 1;

          position: relative;
          top: 1px;
        }


        /* =====================================================
           ALL SOFTWARE - DESKTOP
        ===================================================== */

        .research-all-software {
          margin: -1px 0 0;
          padding: 0;
        }

        .research-all-link {
          display: inline-block;

          margin: 0;
          padding: 1px 4px;

          border-radius: 4px;

          color: #5A39A2;

          text-decoration: none;

          font-size: 16px;
          line-height: 1.35;

          font-weight: 600;

          transition: background-color 0.18s ease;
        }

        .research-all-link:hover {
          background: rgba(90, 57, 162, 0.07);
        }


        /* =====================================================
           MOBILE ACCORDION
        ===================================================== */

        .research-mobile-accordion {
          display: none;
        }


        /* =====================================================
           LARGE DESKTOP
        ===================================================== */

        @media (min-width: 1500px) {

          .research-section {
            padding-left: 30px;
            padding-right: 30px;
          }

          .research-container {
            max-width: 1340px;
            padding: 0 50px;
          }
        }


        /* =====================================================
           TABLET / SMALL DESKTOP
        ===================================================== */

        @media (max-width: 1100px) {

          .research-section {
            padding: 45px 0 60px;
          }

          .research-title {
            font-size: 28px;
            margin-bottom: 42px;
          }

          .research-desktop-grid {
            column-gap: 30px;
          }

          .research-link {
            font-size: 15px;
          }

          .research-category-title {
            font-size: 16px;
          }
        }


        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 767px) {

          .research-section {
            padding: 35px 24px 40px;
          }

          .research-container {
            width: 100%;
            max-width: 100%;
            margin: 0 auto;
            padding: 0;
          }


          /* -----------------------------------------------
             MOBILE TITLE
          ------------------------------------------------ */

          .research-title {
            margin: 0 0 38px 0;

            padding: 0;

            font-size: 22px;
            line-height: 1.2;

            font-weight: 700;

            letter-spacing: -0.4px;

            color: #252530;
            
            text-align: left;
          }


          /* -----------------------------------------------
             HIDE DESKTOP
          ------------------------------------------------ */

          .research-desktop-grid {
            display: none;
          }


          /* -----------------------------------------------
             SHOW MOBILE
          ------------------------------------------------ */

          .research-mobile-accordion {
            display: block;

            width: 100%;
          }


          /* -----------------------------------------------
             CATEGORY ROW
          ------------------------------------------------ */

          .mobile-category {
            width: 100%;

            margin: 0;
            padding: 0;

            border-top: 1px solid #d1d1d1;
          }

          .mobile-category:last-of-type {
            border-bottom: 1px solid #d1d1d1;
          }


          /* -----------------------------------------------
             CATEGORY BUTTON
          ------------------------------------------------ */

          .mobile-category-button {
            width: 100%;

            min-height: 46px;

            display: flex;

            align-items: center;
            justify-content: space-between;

            gap: 12px;

            margin: 0;
            padding: 6px 0;

            border: none;
            outline: none;

            background: transparent;

            cursor: pointer;

            text-align: left;

            -webkit-tap-highlight-color: transparent;
          }


          /* -----------------------------------------------
             CATEGORY TITLE
          ------------------------------------------------ */

          .mobile-category-title {
            flex: 1;

            min-width: 0;

            color: #5A39A2;

            font-family:
              Figtree,
              sans-serif;

            font-size: 14px;
            line-height: 1.3;

            font-weight: 600;

            letter-spacing: -0.2px;
            
            overflow-wrap: break-word;
            word-wrap: break-word;
            hyphens: auto;
          }


          /* -----------------------------------------------
             GREY DROPDOWN SQUARE
          ------------------------------------------------ */

          .mobile-chevron {
            width: 25px;
            height: 25px;

            flex-shrink: 0;

            display: flex;

            align-items: center;
            justify-content: center;

            border-radius: 6px;

            background: #99999f;

            transition:
              background-color 0.2s ease,
              transform 0.25s ease;
          }


          /* White chevron */
          .mobile-chevron span {
            width: 7px;
            height: 7px;

            display: block;

            border-right: 2px solid #ffffff;
            border-bottom: 2px solid #ffffff;

            transform:
              rotate(45deg)
              translateY(-2px);

            transition: transform 0.25s ease;
          }


          /* Open state */
          .mobile-chevron-open {
            background: #77777d;
          }

          .mobile-chevron-open span {
            transform:
              rotate(225deg)
              translateY(-1px);
          }


          /* -----------------------------------------------
             MOBILE CONTENT
          ------------------------------------------------ */

          .mobile-category-content {
            display: grid;

            grid-template-rows: 0fr;

            opacity: 0;

            transition:
              grid-template-rows 0.28s ease,
              opacity 0.2s ease;
          }

          .mobile-category-content > .mobile-links {
            overflow: hidden;
          }

          .mobile-content-open {
            grid-template-rows: 1fr;
            opacity: 1;
          }


          /* -----------------------------------------------
             MOBILE LINKS
          ------------------------------------------------ */

          .mobile-links {
            width: 100%;

            padding:
              2px
              0
              8px;
          }

          .mobile-link {
            width: 100%;

            display: flex;

            align-items: center;
            justify-content: space-between;

            gap: 10px;

            margin: 0;
            padding: 4px 5px;

            border-radius: 5px;

            box-sizing: border-box;

            color: #202124;

            text-decoration: none;

            font-family:
              Figtree,
              sans-serif;

            font-size: 14px;
            line-height: 1.35;

            font-weight: 400;

            transition:
              background-color 0.18s ease,
              color 0.18s ease;
          }


          /* Light hover/touch area */
          .mobile-link:hover,
          .mobile-link:focus-visible {
            background: rgba(92, 59, 178, 0.07);
            color: #202124;
            outline: none;
          }

          .mobile-link > span:first-child {
            min-width: 0;

            overflow: hidden;

            text-overflow: ellipsis;
          }

          .mobile-link-arrow {
            flex-shrink: 0;

            font-size: 17px;
            line-height: 1;

            color: #202124;
          }


          /* -----------------------------------------------
             ALL SOFTWARE
          ------------------------------------------------ */

          .mobile-all-software {
            width: 100%;

            border-bottom: 1px solid #d1d1d1;
          }

          .mobile-all-link {
            min-height: 44px;

            display: flex;
            align-items: center;

            padding: 6px 0;

            box-sizing: border-box;

            color: #5A39A2;

            text-decoration: none;

            font-family:
              Figtree,
              sans-serif;

            font-size: 15px;
            line-height: 1.3;

            font-weight: 600;

            transition:
              background-color 0.18s ease;
          }

          .mobile-all-link:hover {
            background: rgba(90, 57, 162, 0.07);
          }
        }


        /* =====================================================
           SMALL MOBILE
        ===================================================== */

        @media (max-width: 480px) {

          .research-section {
            padding: 35px 24px 45px;
          }

          .research-title {
            font-size: 22px;
            line-height: 1.15;

            margin-bottom: 40px;
          }

          .mobile-category-button {
            min-height: 48px;
            padding: 8px 0;
          }

          .mobile-category-title {
            font-size: 14px;
            line-height: 1.3;
          }

          .mobile-link {
            font-size: 13px;
            padding: 4px 5px;
          }

          .mobile-chevron {
            width: 24px;
            height: 24px;
          }
        }


        /* =====================================================
           VERY SMALL PHONES
        ===================================================== */

        @media (max-width: 360px) {

          .research-section {
            padding-left: 20px;
            padding-right: 20px;
          }

          .research-title {
            font-size: 20px;
          }

          .mobile-category-title {
            font-size: 13px;
            line-height: 1.3;
          }

          .mobile-link {
            font-size: 13px;
          }

          .mobile-chevron {
            width: 22px;
            height: 22px;
          }
        }

      `}</style>
    </>
  );
}