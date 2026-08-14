# G2.com Clone - Software Review Platform

A fully responsive clone of G2.com, the leading software review and comparison platform. Built with React, React Router, and Tailwind CSS.

## Project Overview

This project is a modern recreation of G2.com featuring a complete user interface with multiple pages, navigation systems, search functionality, and responsive design that works seamlessly across all devices.

## Technology Stack

- **Frontend Framework:** React 18
- **Routing:** React Router DOM v6
- **Styling:** Tailwind CSS + Custom CSS
- **Icons:** Lucide React
- **Build Tool:** Vite
- **Language:** JavaScript (ES6+)

## Pages Implemented

### 1. Home Page (/)
The main landing page with multiple sections:

**Sections:**
- Hero Section with functional search bar
- Most Popular Software Categories with 10 category tabs
- Leave a Review Section
- G2 Profile Section with interactive dots
- Testimonial Section
- Claim Profile Section
- Research Software Section

**Features:**
- Working search functionality (searches categories and products)
- Category tabs: Project Management, Video Conferencing, E-Commerce, Marketing Automation, Accounting, CRM, Expense Management, ERP, Online Backup, AI Chatbots
- Fully responsive on all screen sizes
- Smooth animations and transitions

### 2. Category Detail Page (/category/:slug)
Displays software products within a specific category.

**Features:**
- Dynamic category pages for all software categories
- Breadcrumb navigation
- 5 Tab System:
  - Overview
  - Highest Rated
  - Easiest To Use
  - Features
  - Resources

**Filtering & Sorting:**
- Left sidebar filters (Segment, Rating, Deals, Pricing)
- Sort options: G2 Score, Popularity, Satisfaction
- Mobile filter drawer with "More Filters" button

**Product Cards:**
- Product logo, name, vendor
- Star ratings and review count
- User testimonials
- Pros and Cons badges
- Add to Compare functionality
- Pin/Save products

**Additional Sections:**
- G2 Grid section showing product rankings
- Learn More section with category topics
- Category description with author information
- Spotlight and Similar Categories

### 3. Service Detail Page (/services/:slug)
Displays professional services and B2B service providers.

**Features:**
- Same tab system as Category Detail Page
- Service provider cards with detailed information
- Dynamic content based on service type (Legal, Finance, IT, Professional Services)
- Intelligent AI-generated content for any service slug
- Custom features and reviews per service category

**Service Categories Supported:**
- Legal Services (IP, Corporate Law, Compliance)
- Finance & Accounting Services
- IT Outsourcing & Managed Services
- Professional Services (Consulting, Engineering)

### 4. Product Detail Page (/product/:id)
Individual product information page.

**Features:**
- Product overview and details
- Reviews and ratings
- Product comparisons
- Pricing information

### 5. Compare Page (/compare)
Side-by-side product comparison.

**Features:**
- Compare up to 4 products simultaneously
- Feature comparison matrix
- Pricing comparison
- User ratings comparison

### 6. Deals Page (/deals)
Software deals and offers.

**Features:**
- Active deals listing
- Deal categories
- Filtering by deal type
- Deal cards with savings information

### 7. Leave Review Page (/leave-review)
Submit product reviews.

**Features:**
- Review form
- Rating system
- Text editor for detailed reviews

### 8. Pinned Items Page (/assistant/landing)
User's saved products.

**Features:**
- Grid view of pinned products
- Quick access to saved items
- Remove from pins functionality

## Components Structure

### Common Components (/src/components/common)
- **Header.jsx** - Main navigation bar with dropdown menus
- **Footer.jsx** - Site footer with links
- **LoginModal.jsx** - User authentication modal
- **FloatingChat.jsx** - AI chat widget
- **CardSlider.jsx** - Product carousel component
- **GeometricShapes.jsx** - Decorative background shapes

### Home Components (/src/components/home)
- **HeroSection.jsx** - Landing hero with search
- **PopularCategoriesSection.jsx** - Category tabs and product cards
- **LeaveReviewSection.jsx** - Review CTA section
- **G2ProfileSection.jsx** - Profile highlights
- **TestimonialSection.jsx** - User testimonials
- **ClaimProfileSection.jsx** - Vendor CTA
- **ResearchSoftwareSection.jsx** - Software categories accordion

## Navigation System

### Desktop Header Navigation
- **Software** - Dropdown with AI categories (12 subcategories)
- **Services** - Dropdown with service types (5 subcategories)
- **Resources** - Dropdown menu
- **Top Categories** - Quick access to popular categories (10 items)

### Mobile Navigation
- Hamburger menu
- Collapsible sections
- Touch-optimized interface
- Drawer-style filter panels

## Data Management

### Data Files (/src/data)
- **categoriesData.js** - Software categories and products (500+ products)
- **navigationData.js** - Navigation menu structure
- **heroData.js** - Homepage hero content
- **reviewData.js** - Review section data
- **productData.js** - Product information
- **dealsData.js** - Deal listings
- **dealsListingData.js** - Extended deal information

## Key Features

### 1. Search Functionality
- Real-time search in hero section
- Searches through categories and products
- Auto-navigation to matched results
- Case-insensitive partial matching

### 2. Filtering System
- Multi-level filtering (Segment, Rating, Type)
- Dynamic filter sidebar
- Mobile-optimized filter drawer
- Clear all filters option

### 3. Compare Feature
- Add products to comparison (max 4)
- Persistent comparison bar at bottom
- Visual product slots
- Quick remove functionality

### 4. Pin/Save System
- Save products to personal list
- LocalStorage persistence
- Quick access from any page
- Visual pin indicators

### 5. Responsive Design
Breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Mobile Optimizations:**
- Card heights reduced for better mobile viewing
- Touch-friendly buttons and controls
- Drawer-style modals and filters
- Optimized image sizes
- Hidden decorative elements on mobile

### 6. Tab System
5-tab navigation system across category and service pages:
- Overview - General category information
- Highest Rated - Top-rated products by score
- Easiest To Use - User-friendly products
- Features - Feature-focused view
- Resources - Additional learning materials

## Routing Structure

```
/ - Home Page
/category/:slug - Category listing (e.g., /category/project-management)
/services/:slug - Service providers (e.g., /services/legal-services)
/product/:id - Product details
/compare - Product comparison
/deals - Software deals
/leave-review - Submit review
/assistant/landing - Pinned items
```

## Styling Approach

### CSS Organization
- Component-scoped styles using `<style>` tags
- Tailwind utility classes for layout
- Custom CSS for complex components
- Organized by sections (Base, Layout, Responsive)
- Mobile-first responsive design

### Color Palette
- Primary: #FF4F00 (Orange)
- Secondary: #5E42C0 (Purple)
- Text: #1C1D21 (Dark Gray)
- Background: #FFFFFF (White)
- Accent: #00CBA7 (Teal)

## Installation & Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd G2.com
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## Project Structure

```
G2.com/
├── public/
│   ├── assets/
│   │   └── images/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── LoginModal.jsx
│   │   │   ├── FloatingChat.jsx
│   │   │   ├── CardSlider.jsx
│   │   │   └── GeometricShapes.jsx
│   │   └── home/
│   │       ├── HeroSection.jsx
│   │       ├── PopularCategoriesSection.jsx
│   │       ├── LeaveReviewSection.jsx
│   │       ├── G2ProfileSection.jsx
│   │       ├── TestimonialSection.jsx
│   │       ├── ClaimProfileSection.jsx
│   │       └── ResearchSoftwareSection.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── CategoryDetailPage.jsx
│   │   ├── ServiceDetailPage.jsx
│   │   ├── ProductDetailPage.jsx
│   │   ├── ComparePage.jsx
│   │   ├── DealsPage.jsx
│   │   ├── LeaveReviewPage.jsx
│   │   └── PinnedItemsPage.jsx
│   ├── data/
│   │   ├── categoriesData.js
│   │   ├── navigationData.js
│   │   ├── heroData.js
│   │   ├── reviewData.js
│   │   ├── productData.js
│   │   ├── dealsData.js
│   │   └── dealsListingData.js
│   ├── styles/
│   │   ├── globals.css
│   │   └── LoginModal.css
│   ├── assets/
│   │   ├── hero.png
│   │   └── login/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- Lazy loading for images
- Code splitting by route
- Optimized bundle size
- Efficient re-renders with React hooks
- CSS-in-JS for component scoping
- LocalStorage for persistent data

## Future Enhancements

- User authentication system
- Backend API integration
- Real product data from database
- Advanced search with filters
- User review submission
- Product recommendation engine
- Social sharing features
- Email notifications
- Admin dashboard

## Contributing

This is a portfolio/learning project. Feel free to fork and modify for your own use.

## License

This project is created for educational purposes. G2 and G2.com are trademarks of their respective owners.

## Contact

For questions or feedback about this project, please open an issue in the repository.

---

**Note:** This is a frontend clone for demonstration purposes. It does not include backend functionality or real user data. All product information and reviews are sample data for UI demonstration.
