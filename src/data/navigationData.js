// Navigation menu data for G2 header - Complete with all tabs
export const navMenuItems = [
  {
    id: 'software',
    label: 'Software',
    hasDropdown: true,
    megaMenu: true,
    tabs: [
      {
        id: 'artificial-intelligence',
        label: 'Artificial Intelligence',
        columns: [
          { items: [
            { label: 'Active Learning Tools', slug: 'active-learning-tools' },
            { label: 'AI Writing Assistant', slug: 'ai-writing-assistant' },
            { label: 'Conversational Intelligence', slug: 'conversational-intelligence' },
            { label: 'Chatbots', slug: 'chatbots' },
            { label: 'Data Labeling', slug: 'data-labeling' },
            { label: 'Data Science and Machine Learning Platforms', slug: 'data-science-ml-platforms' },
          ]},
          { items: [
            { label: 'Deep Learning', slug: 'deep-learning' },
            { label: 'Generative AI', slug: 'generative-ai' },
            { label: 'AI Chatbots', slug: 'ai-chatbots' },
            { label: 'Generative AI Infrastructure', slug: 'generative-ai-infrastructure' },
            { label: 'Machine Learning', slug: 'machine-learning' },
            { label: 'MLOps Platforms', slug: 'mlops-platforms' },
          ]},
          { items: [
            { label: 'Synthetic Data', slug: 'synthetic-data' },
            { label: 'Video Surveillance', slug: 'video-surveillance' },
            { label: 'Video Translation', slug: 'video-translation' },
            { label: 'AI Agents For Business Operations', slug: 'ai-agents-business-operations' },
          ]},
        ]
      },
      {
        id: 'sales-tools',
        label: 'Sales Tools',
        columns: [
          { items: [
            { label: 'CRM', slug: 'crm' },
            { label: 'Sales Compensation', slug: 'sales-compensation' },
            { label: 'Contract Management', slug: 'contract-management' },
            { label: 'E-Signature', slug: 'e-signature' },
            { label: 'Sales Coaching', slug: 'sales-coaching' },
          ]},
          { items: [
            { label: 'Sales Enablement', slug: 'sales-enablement' },
            { label: 'Sales Engagement', slug: 'sales-engagement' },
            { label: 'Sales Intelligence', slug: 'sales-intelligence' },
            { label: 'CPQ', slug: 'cpq' },
            { label: 'Revenue Operations', slug: 'revenue-operations' },
          ]},
        ]
      },
      {
        id: 'marketing',
        label: 'Marketing',
        columns: [
          { items: [
            { label: 'Account-Based Marketing', slug: 'account-based-marketing' },
            { label: 'Content Marketing', slug: 'content-marketing' },
            { label: 'Email Marketing', slug: 'email-marketing' },
            { label: 'SEO Tools', slug: 'seo-tools' },
            { label: 'Social Media Marketing', slug: 'social-media-marketing' },
          ]},
          { items: [
            { label: 'Marketing Automation', slug: 'marketing-automation' },
            { label: 'Demand Generation', slug: 'demand-generation' },
            { label: 'Event Management', slug: 'event-management' },
            { label: 'Influencer Marketing', slug: 'influencer-marketing' },
            { label: 'Video Marketing', slug: 'video-marketing' },
          ]},
        ]
      },
      {
        id: 'security',
        label: 'Security',
        columns: [
          { items: [
            { label: 'Cloud Security', slug: 'cloud-security' },
            { label: 'System Security', slug: 'system-security' },
            { label: 'Application Security', slug: 'application-security' },
            { label: 'Identity Management', slug: 'identity-management' },
            { label: 'Network Security', slug: 'network-security' },
          ]},
          { items: [
            { label: 'Endpoint Security', slug: 'endpoint-security' },
            { label: 'SIEM', slug: 'siem' },
            { label: 'Vulnerability Management', slug: 'vulnerability-management' },
            { label: 'Zero Trust Security', slug: 'zero-trust-security' },
            { label: 'Data Security', slug: 'data-security' },
          ]},
        ]
      },
      {
        id: 'analytics-tools',
        label: 'Analytics Tools & Software',
        columns: [
          { items: [
            { label: 'Business Intelligence', slug: 'business-intelligence' },
            { label: 'Data Virtualization', slug: 'data-virtualization' },
            { label: 'Predictive Analytics', slug: 'predictive-analytics' },
            { label: 'Statistical Analysis', slug: 'statistical-analysis' },
            { label: 'Big Data Analytics', slug: 'big-data-analytics' },
          ]},
          { items: [
            { label: 'Data Visualization', slug: 'data-visualization' },
            { label: 'Customer Analytics', slug: 'customer-analytics' },
            { label: 'Product Analytics', slug: 'product-analytics' },
            { label: 'Marketing Analytics', slug: 'marketing-analytics' },
            { label: 'Financial Analytics', slug: 'financial-analytics' },
          ]},
        ]
      },
      { id: 'cad-plm', label: 'CAD & PLM', columns: [{ items: [{ label: 'CAD Software', slug: 'cad-software' }, { label: 'PLM Software', slug: 'plm-software' }] }] },
      { id: 'collaboration-productivity', label: 'Collaboration & Productivity', columns: [{ items: [{ label: 'Project Management', slug: 'project-management' }, { label: 'Team Collaboration', slug: 'collaboration-productivity' }] }] },
      { id: 'commerce', label: 'Commerce', columns: [{ items: [{ label: 'E-Commerce Platforms', slug: 'e-commerce-platforms' }, { label: 'Shopping Cart', slug: 'shopping-cart' }] }] },
      { id: 'content-management', label: 'Content Management', columns: [{ items: [{ label: 'CMS Software', slug: 'cms-software' }, { label: 'Digital Asset Management', slug: 'digital-asset-management' }] }] },
      { id: 'customer-service', label: 'Customer Service', columns: [{ items: [{ label: 'Help Desk Software', slug: 'help-desk' }, { label: 'Live Chat', slug: 'live-chat' }] }] },
    ]
  },

  { id: 'ai-agents', label: 'AI Agents', hasDropdown: false },
  { 
    id: 'services', 
    label: 'Services', 
    hasDropdown: true, 
    megaMenu: true,
    tabs: [
      {
        id: 'ecosystem-service-providers',
        label: 'Ecosystem Service Providers',
        columns: [
          {
            items: [
              { label: 'Adobe Consulting Services', slug: 'adobe-consulting-services' },
              { label: 'AWS Consulting Services', slug: 'aws-consulting-services' },
              { label: 'Braze Consulting Services', slug: 'braze-consulting-services' },
              { label: 'Citrix Consulting Services', slug: 'citrix-consulting-services' },
              { label: 'Dayforce Consulting Services', slug: 'dayforce-consulting-services' },
              { label: 'Deltek Resellers', slug: 'deltek-resellers' },
              { label: 'Genesys Consulting Services', slug: 'genesys-consulting-services' },
              { label: 'Google Consulting Services', slug: 'google-consulting-services' },
            ]
          },
          {
            items: [
              { label: 'HubSpot Consulting Services', slug: 'hubspot-consulting-services' },
              { label: 'IBM Consulting Services', slug: 'ibm-consulting-services' },
              { label: 'Infor Consulting Services', slug: 'infor-consulting-services' },
              { label: 'Oracle Consulting Services', slug: 'oracle-consulting-services' },
              { label: 'Salesforce Consulting Services', slug: 'salesforce-consulting-services' },
              { label: 'SAP Consulting Services', slug: 'sap-consulting-services' },
              { label: 'ServiceNow Consulting Services', slug: 'servicenow-consulting-services' },
              { label: 'Snowflake Consulting Services', slug: 'snowflake-consulting-services' },
            ]
          },
          {
            items: [
              { label: 'UKG Consulting Services', slug: 'ukg-consulting-services' },
              { label: 'Workday Consulting Services', slug: 'workday-consulting-services' },
              { label: 'Microsoft Consulting Services', slug: 'microsoft-consulting-services' },
              { label: 'NetSuite Consulting Services', slug: 'netsuite-consulting-services' },
              { label: 'NetSuite Resellers', slug: 'netsuite-resellers' },
            ]
          },
        ]
      },
      {
        id: 'marketing-services',
        label: 'Marketing Services',
        columns: [
          {
            items: [
              { label: 'Branding Agencies', slug: 'branding-agencies' },
              { label: 'Content Marketing Agencies', slug: 'content-marketing-agencies' },
              { label: 'Digital Marketing Agencies', slug: 'digital-marketing-agencies' },
              { label: 'Event Marketing Agencies', slug: 'event-marketing-agencies' },
              { label: 'Influencer Marketing Agencies', slug: 'influencer-marketing-agencies' },
              { label: 'Marketing Research', slug: 'marketing-research' },
            ]
          },
          {
            items: [
              { label: 'Media Buying Agencies', slug: 'media-buying-agencies' },
              { label: 'Public Relations Agencies', slug: 'public-relations-agencies' },
              { label: 'SEO Agencies', slug: 'seo-agencies' },
              { label: 'Social Media Marketing Agencies', slug: 'social-media-marketing-agencies' },
              { label: 'Video Production', slug: 'video-production' },
              { label: 'Web Design Agencies', slug: 'web-design-agencies' },
            ]
          },
        ]
      },
      {
        id: 'business-services',
        label: 'Business Services',
        columns: [
          {
            items: [
              { label: 'Business Filing and Licensing', slug: 'business-filing-licensing' },
              { label: 'Business Finance', slug: 'business-finance' },
              { label: 'Accounting Firms', slug: 'accounting-firms' },
              { label: 'HR Services', slug: 'hr-services' },
              { label: 'Legal Services', slug: 'legal-services' },
            ]
          },
          {
            items: [
              { label: 'Corporate Law Firms', slug: 'corporate-law-firms' },
              { label: 'Intellectual Property (IP) Law', slug: 'intellectual-property-law' },
              { label: 'Management Consulting', slug: 'management-consulting' },
              { label: 'Sales Consulting', slug: 'sales-consulting' },
              { label: 'Sales Training', slug: 'sales-training' },
            ]
          },
        ]
      },
      {
        id: 'other-services',
        label: 'Other Services',
        columns: [
          {
            items: [
              { label: 'IT Outsourcing', slug: 'it-outsourcing' },
              { label: 'ITSM Tool Implementation, Consulting, and Managed Services', slug: 'itsm-tool-implementation' },
              { label: 'Other B2B Services', slug: 'other-b2b-services' },
            ]
          },
        ]
      },
      {
        id: 'professional-services',
        label: 'Professional Services',
        columns: [
          {
            items: [
              { label: 'Cloud Migration Services', slug: 'cloud-migration-services' },
              { label: 'Development Services', slug: 'development-services' },
              { label: 'Mobile App Development', slug: 'mobile-app-development' },
              { label: 'Software Developer Services', slug: 'software-developer-services' },
              { label: 'Testing and QA', slug: 'testing-qa' },
              { label: 'Web Developers', slug: 'web-developers' },
            ]
          },
          {
            items: [
              { label: 'Implementation Services', slug: 'implementation-services' },
              { label: 'Managed IT Services', slug: 'managed-it-services' },
              { label: 'Managed Services', slug: 'managed-services' },
              { label: 'Solution Consulting', slug: 'solution-consulting' },
              { label: 'Artificial Intelligence Consulting', slug: 'ai-consulting' },
              { label: 'Business Intelligence (BI) Consulting', slug: 'bi-consulting' },
            ]
          },
          {
            items: [
              { label: 'Cloud Consulting', slug: 'cloud-consulting' },
              { label: 'Digital Transformation Consulting', slug: 'digital-transformation-consulting' },
              { label: 'IoT Consulting Services', slug: 'iot-consulting-services' },
              { label: 'IT Infrastructure Consulting', slug: 'it-infrastructure-consulting' },
              { label: 'IT Strategy Consulting', slug: 'it-strategy-consulting' },
              { label: 'Mobility Consulting', slug: 'mobility-consulting' },
              { label: 'Quote-to-Cash Consulting', slug: 'quote-to-cash-consulting' },
            ]
          },
        ]
      },
      {
        id: 'security-and-privacy-services',
        label: 'Security and Privacy Services',
        columns: [
          {
            items: [
              { label: 'Cybersecurity Consulting', slug: 'cybersecurity-consulting' },
              { label: 'Data Privacy Consulting', slug: 'data-privacy-consulting' },
              { label: 'Penetration Testing Services', slug: 'penetration-testing-services' },
              { label: 'Security Awareness Training Services', slug: 'security-awareness-training' },
            ]
          },
        ]
      },
      {
        id: 'staffing-services',
        label: 'Staffing Services',
        columns: [
          {
            items: [
              { label: 'IT Staffing', slug: 'it-staffing' },
              { label: 'Professional Staffing', slug: 'professional-staffing' },
              { label: 'Temporary Staffing', slug: 'temporary-staffing' },
            ]
          },
        ]
      },
      {
        id: 'translation-services',
        label: 'Translation Services',
        columns: [
          {
            items: [
              { label: 'Document Translation Services', slug: 'document-translation-services' },
              { label: 'Interpretation Services', slug: 'interpretation-services' },
              { label: 'Localization Services', slug: 'localization-services' },
            ]
          },
        ]
      },
      {
        id: 'value-added-resellers',
        label: 'Value-Added Resellers (VARs)',
        columns: [
          {
            items: [
              { label: 'Hardware Resellers', slug: 'hardware-resellers' },
              { label: 'Software Resellers', slug: 'software-resellers' },
              { label: 'Telecommunications Resellers', slug: 'telecommunications-resellers' },
            ]
          },
        ]
      },
    ]
  },
  { 
    id: 'sell-on-g2', 
    label: 'Sell on G2', 
    hasDropdown: true, 
    categories: [
      { 
        title: '', 
        items: [
          { heading: 'For Marketers', description: 'Enhance your G2 profile and reach in-market buyers' },
          { heading: 'For Sales', description: 'Find leads and convert in-market buyers' },
          { heading: 'For Services', description: 'Reach companies that need you, when they\'re ready to buy' },
          { heading: 'For Investments', description: 'Get access to real-time software data' },
          { heading: 'For Developers', description: 'Use our Developer Portal to test API data' }
        ]
      }
    ]
  },
  { id: 'deals', label: 'Deals', hasDropdown: false }
];

export const userActionLinks = {
  leaveReview: { label: 'Leave a Review', url: '/review' },
  joinOrLogin: { label: 'Join or Log In', url: '/login' },
  pinnedItems: { label: 'Pinned items', count: 0 }
};
