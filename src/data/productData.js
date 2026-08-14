// Comprehensive product dataset for G2 detail views
export const productsDatabase = {
  jira: {
    id: 'jira',
    name: 'Jira',
    vendor: 'Atlassian',
    category: 'Project Management',
    categorySlug: 'project-management',
    rating: 4.5,
    reviewCount: '7,934',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Jira_%28Software%29_logo.svg',
    description: 'Jira is the #1 software development tool used by agile teams to plan, track, and release world-class software.',
    badge: 'Leader Summer 2026',
    website: 'https://www.atlassian.com/software/jira',
    pricing: [
      { plan: 'Free', price: '$0', detail: 'Up to 10 users, basic agile boards & backlogs' },
      { plan: 'Standard', price: '$8.15 / user / mo', detail: 'User permissions, 250 GB storage, audit logs' },
      { plan: 'Premium', price: '$16.00 / user / mo', detail: 'Unlimited storage, 24/7 support, advanced roadmaps' }
    ],
    ratingsBreakdown: {
      fiveStar: 65,
      fourStar: 24,
      threeStar: 7,
      twoStar: 3,
      oneStar: 1
    },
    scores: {
      easeOfUse: 4.2,
      qualityOfSupport: 4.4,
      easeOfSetup: 4.0,
      meetsRequirements: 4.6
    },
    reviews: [
      {
        id: 1,
        author: 'Alex M.',
        role: 'Senior Engineering Manager',
        companySize: 'Enterprise (1000+ emp)',
        title: 'Essential for agile team workflows & sprint tracking',
        date: 'Aug 10, 2026',
        rating: 5,
        pros: 'Powerful customization for workflows, seamless integration with GitHub/GitLab, and clear sprint velocity reporting.',
        cons: 'The admin configuration UI can be overwhelming for smaller non-technical teams.'
      },
      {
        id: 2,
        author: 'Sarah K.',
        role: 'Scrum Master',
        companySize: 'Mid-Market (51-1000 emp)',
        title: 'Best-in-class backlog management',
        date: 'Jul 28, 2026',
        rating: 4.5,
        pros: 'Drag-and-drop Kanban boards, sprint estimation tools, and rich automation rules.',
        cons: 'Initial setup takes time to tune custom fields and permission schemes.'
      }
    ]
  },
  shopify: {
    id: 'shopify',
    name: 'Shopify',
    vendor: 'Shopify Inc.',
    category: 'E-Commerce Platforms',
    categorySlug: 'e-commerce-platforms',
    rating: 4.5,
    reviewCount: '5,128',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg',
    description: 'Shopify is a complete e-commerce platform that lets you start, grow, and manage an online business.',
    badge: 'Leader Summer 2026',
    website: 'https://www.shopify.com',
    pricing: [
      { plan: 'Basic', price: '$29 / mo', detail: 'Everything you need to launch a store' },
      { plan: 'Shopify', price: '$79 / mo', detail: 'Professional reports & extra staff accounts' },
      { plan: 'Advanced', price: '$299 / mo', detail: 'Custom report builder & lowest transaction fees' }
    ],
    ratingsBreakdown: {
      fiveStar: 72,
      fourStar: 20,
      threeStar: 5,
      twoStar: 2,
      oneStar: 1
    },
    scores: {
      easeOfUse: 4.7,
      qualityOfSupport: 4.6,
      easeOfSetup: 4.8,
      meetsRequirements: 4.7
    },
    reviews: [
      {
        id: 1,
        author: 'David L.',
        role: 'E-Commerce Director',
        companySize: 'Mid-Market (51-1000 emp)',
        title: 'The gold standard for online store fronts',
        date: 'Aug 04, 2026',
        rating: 5,
        pros: 'Extensive app store marketplace, flawless checkout conversion rates, and great built-in payment gateway.',
        cons: 'Transaction fees if you don’t use Shopify Payments.'
      }
    ]
  }
};

// Helper function to fetch product details or generate dynamic data for any unknown product ID
export function getProductData(productId) {
  const normalizedId = productId?.toLowerCase() || '';
  if (productsDatabase[normalizedId]) {
    return productsDatabase[normalizedId];
  }

  // Format readable title from id e.g. "salesforce-b2c" -> "Salesforce B2C"
  const formattedName = normalizedId
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    id: normalizedId,
    name: formattedName || 'Software Product',
    vendor: 'Leading Vendor',
    category: 'Business Software',
    categorySlug: 'business-software',
    rating: 4.5,
    reviewCount: '1,420',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg',
    description: `${formattedName} is a market-leading software platform designed to optimize workflow productivity, user engagement, and enterprise efficiency.`,
    badge: 'Leader Summer 2026',
    website: 'https://www.g2.com',
    pricing: [
      { plan: 'Starter', price: '$15 / user / mo', detail: 'Core capabilities for growing teams' },
      { plan: 'Professional', price: '$45 / user / mo', detail: 'Advanced automation, integrations & analytics' }
    ],
    ratingsBreakdown: {
      fiveStar: 68,
      fourStar: 22,
      threeStar: 6,
      twoStar: 3,
      oneStar: 1
    },
    scores: {
      easeOfUse: 4.5,
      qualityOfSupport: 4.4,
      easeOfSetup: 4.3,
      meetsRequirements: 4.6
    },
    reviews: [
      {
        id: 101,
        author: 'Michael R.',
        role: 'Product Lead',
        companySize: 'Mid-Market',
        title: 'Highly reliable and customizable solution',
        date: 'Aug 01, 2026',
        rating: 5,
        pros: 'Intuitive user interface, robust security compliance, and responsive customer support team.',
        cons: 'Requires minor learning curve during onboarding phase.'
      }
    ]
  };
}


// Trending Software Cards for CardSlider
export const trendingSoftwareCards = [
  {
    id: 1,
    name: 'Salesforce Sales Cloud',
    category: 'CRM Software',
    rating: 4.3,
    reviewsCount: 15234,
    logo: 'https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_477db83f729d63210139ec7e73b13694/salesforce-sales-cloud.png',
    badge: 'Leader'
  },
  {
    id: 2,
    name: 'HubSpot Marketing Hub',
    category: 'Marketing Automation',
    rating: 4.4,
    reviewsCount: 9876,
    logo: 'https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_1489610520/hubspot-marketing-hub.png',
    badge: 'Leader'
  },
  {
    id: 3,
    name: 'Slack',
    category: 'Team Collaboration',
    rating: 4.5,
    reviewsCount: 22341,
    logo: 'https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_302471e8ea33d2c0ae4267dda4b9bfd1/slack.png',
    badge: 'Leader'
  },
  {
    id: 4,
    name: 'Zoom',
    category: 'Video Conferencing',
    rating: 4.6,
    reviewsCount: 12456,
    logo: 'https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_5f64e19f5d6ba0a03c1d5d64b8c9e1a5/zoom.jpg',
    badge: 'Leader'
  },
  {
    id: 5,
    name: 'Monday.com',
    category: 'Project Management',
    rating: 4.7,
    reviewsCount: 8234,
    logo: 'https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_9c6fc8b0a3f3f73e7ff6e1d5e5a6f5e5/monday.png'
  },
  {
    id: 6,
    name: 'Asana',
    category: 'Work Management',
    rating: 4.4,
    reviewsCount: 11234,
    logo: 'https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_c04eb4c8f1a2f4f5e6e7f8f9f0f1f2f3/asana.png'
  },
  {
    id: 7,
    name: 'Zendesk',
    category: 'Customer Service',
    rating: 4.3,
    reviewsCount: 5678,
    logo: 'https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_1234567890abcdef/zendesk.png',
    badge: 'High Performer'
  },
  {
    id: 8,
    name: 'Mailchimp',
    category: 'Email Marketing',
    rating: 4.5,
    reviewsCount: 13456,
    logo: 'https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_fedcba0987654321/mailchimp.png'
  },
  {
    id: 9,
    name: 'Notion',
    category: 'Productivity Software',
    rating: 4.8,
    reviewsCount: 6789,
    logo: 'https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_a1b2c3d4e5f6/notion.png',
    badge: 'Leader'
  },
  {
    id: 10,
    name: 'Trello',
    category: 'Task Management',
    rating: 4.4,
    reviewsCount: 14567,
    logo: 'https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_abcdef123456/trello.png'
  }
];
