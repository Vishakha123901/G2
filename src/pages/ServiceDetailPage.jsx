import { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams, useNavigate } from 'react-router-dom';
import { servicesData, categoryTabs } from '../data/categoriesData';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import {
  Star, CheckCircle, ExternalLink, ThumbsUp, MessageSquare, TrendingUp,
  Award, Users, Globe, HelpCircle, FileText, Gift, Sparkles, Shield,
  BookOpen, Check, ArrowRight, Zap, ChevronDown, ChevronUp, Download, Phone, Calendar, Clock
} from 'lucide-react';
import g2Stars from '../assets/svg/g2-stars.svg';

function resolveServiceData(slug = '') {
  // 1. Direct match in servicesData
  const direct =
    servicesData.find(s => s.id === slug) ||
    servicesData.find(s => s.seeAllLink?.includes(slug)) ||
    servicesData.find(s => s.category?.toLowerCase().replace(/\s+/g, '-') === slug) ||
    servicesData.find(s => s.name?.toLowerCase().replace(/\s+/g, '-') === slug);
  if (direct) return direct;

  // 2. Derive intelligent domain-specific dataset based on slug
  const title = (slug || 'Services')
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  let category = 'Services';
  let customFeatures = [];
  let customReviews = [];
  let providers = [];

  if (slug.includes('law') || slug.includes('legal') || slug.includes('filing') || slug.includes('ip') || slug.includes('property')) {
    category = 'Business Services';
    customFeatures = [
      { title: 'Regulatory Compliance & Statutory Filings', desc: `Expert legal filings and compliance monitoring for ${title}.`, icon: 'Shield', bg: '#EFF6FF', color: '#2563EB' },
      { title: 'Contract Negotiations & Deal Counsel', desc: 'Airtight MSA, SLA, and commercial partnership drafting.', icon: 'CheckCircle', bg: '#F5F3FF', color: '#7C3AED' },
      { title: 'Intellectual Property Protection & Defense', desc: 'Patent prosecution, trademark registration, and copyright safeguards.', icon: 'Award', bg: '#F0FDF4', color: '#16A34A' },
      { title: 'Corporate Governance & Board Advisory', desc: 'Shareholder agreements, board resolutions, and governance structures.', icon: 'TrendingUp', bg: '#FFF7ED', color: '#EA580C' },
      { title: 'Due Diligence & Transaction Structuring', desc: 'Comprehensive legal audit for acquisitions, venture rounds, and buyouts.', icon: 'Globe', bg: '#EEF2FF', color: '#4F46E5' },
      { title: 'Risk Assessment & Dispute Resolution', desc: 'Arbitration, commercial dispute management, and liability mitigation.', icon: 'Zap', bg: '#FEF2F2', color: '#DC2626' },
    ];
    customReviews = [
      { name: 'Arthur Vance', role: 'General Counsel • Enterprise Corp', date: '4 days ago', rating: 5, title: `Outstanding advisory for our ${title}`, pro: 'Clear, concise legal advice and lightning turnaround on complex contract riders.', con: 'Premium hourly rates, but saved our company significant deal risk.' },
      { name: 'Valerie Stone', role: 'Chief Compliance Officer • FinTech', date: '2 weeks ago', rating: 4.9, title: 'Flawless compliance filings and licensing execution', pro: 'Deep knowledge of federal and international regulatory standards.', con: 'Required thorough document submissions upfront.' },
      { name: 'Jonathan Reed', role: 'Managing Partner • Venture Studio', date: '1 month ago', rating: 4.8, title: 'Invaluable transaction counsel during our M&A cycle', pro: 'Identified hidden liabilities early in the review process.', con: 'Fast-moving timeline required active executive availability.' },
    ];
    providers = [
      { id: `${slug}-latham`, name: 'Latham & Watkins LLP', vendor: 'Latham & Watkins', rating: 4.9, reviewCount: 430, logo: '', serviceType: `${title} & Corporate Advisory`, segment: 'Enterprise', description: `Top tier legal and corporate counsel specializing in ${title}.`, userSay: `Unmatched precision and fast deal execution in ${title}.`, pros: [{ label: 'Legal Precision', count: 390, color: '#5A39A2' }, { label: 'Deal Speed', count: 340, color: '#E8E3FF' }], badges: ['Leader', 'Legal Tier 1'] },
      { id: `${slug}-kirkland`, name: 'Kirkland & Ellis LLP', vendor: 'Kirkland & Ellis', rating: 4.8, reviewCount: 510, logo: '', serviceType: `${title} & Transactions`, segment: 'Enterprise', description: `Premier global counsel for high-stakes corporate transactions in ${title}.`, userSay: `Relentless execution speed and comprehensive protection for ${title}.`, pros: [{ label: 'Transaction Speed', count: 470, color: '#5A39A2' }, { label: 'Risk Protection', count: 430, color: '#E8E3FF' }], badges: ['Leader', 'Transaction #1'] },
      { id: `${slug}-baker`, name: 'Baker McKenzie', vendor: 'Baker McKenzie', rating: 4.7, reviewCount: 620, logo: '', serviceType: `Global ${title} Advisory`, segment: 'Enterprise', description: `Global law firm solving complex regulatory and corporate matters in ${title}.`, userSay: `Invaluable multi-jurisdictional compliance and governance in ${title}.`, pros: [{ label: 'Global Compliance', count: 540, color: '#5A39A2' }, { label: 'Tax & Law', count: 490, color: '#E8E3FF' }], badges: ['Global Leader', 'Multi-Jurisdiction'] },
    ];
  } else if (slug.includes('finance') || slug.includes('accounting') || slug.includes('tax') || slug.includes('sales')) {
    category = 'Business Services';
    customFeatures = [
      { title: 'Strategic Revenue & Financial Modeling', desc: `Comprehensive budgeting, financial forecasts, and KPI metrics for ${title}.`, icon: 'TrendingUp', bg: '#EFF6FF', color: '#2563EB' },
      { title: 'Tax Strategy & Compliance Audits', desc: 'State, federal, and international corporate tax structuring.', icon: 'CheckCircle', bg: '#F5F3FF', color: '#7C3AED' },
      { title: 'Revenue Operations & Pipeline Optimization', desc: 'Aligning sales incentives, CRM workflows, and conversion funnels.', icon: 'Zap', bg: '#F0FDF4', color: '#16A34A' },
      { title: 'Executive Coaching & Enablement', desc: 'Structured training programs and performance benchmarking.', icon: 'Users', bg: '#FFF7ED', color: '#EA580C' },
      { title: 'Enterprise Risk & Assurance Governance', desc: 'Internal financial controls, SOX readiness, and audit trails.', icon: 'Shield', bg: '#EEF2FF', color: '#4F46E5' },
      { title: 'Multi-Entity Financial Consolidation', desc: 'Automating multi-currency reporting and month-end closes.', icon: 'Globe', bg: '#FEF2F2', color: '#DC2626' },
    ];
    customReviews = [
      { name: 'Eileen Meyer', role: 'CFO • Enterprise Tech', date: '3 days ago', rating: 5, title: `Transformed our approach to ${title}`, pro: 'Their senior advisors brought unmatched domain expertise and structured execution.', con: 'High intensity sprints, but delivered measurable ROI within 60 days.' },
      { name: 'Bradley Cooper', role: 'VP of Sales & Operations • B2B SaaS', date: '2 weeks ago', rating: 4.9, title: `Streamlined our ${title} pipeline with incredible results`, pro: 'Increased rep quota attainment by 35% across our global sales force.', con: 'Required thorough initial audit of existing CRM data.' },
      { name: 'Kavita Patel', role: 'Director of Finance • Healthcare', date: '1 month ago', rating: 4.8, title: 'Flawless financial auditing and corporate tax planning', pro: 'Saved substantial capital through optimized state and local tax structuring.', con: 'Tight deadlines during year-end close.' },
    ];
    providers = [
      { id: `${slug}-pwc`, name: 'PwC Advisory Services', vendor: 'PwC', rating: 4.8, reviewCount: 1450, logo: '', serviceType: `${title} & Advisory`, segment: 'Enterprise', description: `Industry-focused assurance, tax, and strategy services in ${title}.`, userSay: `PwC combines deep regulatory expertise with actionable financial rigor in ${title}.`, pros: [{ label: 'Strategic Rigor', count: 1120, color: '#5A39A2' }, { label: 'Execution', count: 940, color: '#E8E3FF' }], badges: ['Leader', 'Top Advisory'] },
      { id: `${slug}-kpmg`, name: 'KPMG Business Advisory', vendor: 'KPMG', rating: 4.7, reviewCount: 1150, logo: '', serviceType: `${title} Strategy`, segment: 'Enterprise', description: `Professional services firm providing audit, advisory and optimization in ${title}.`, userSay: `Structured governance and measurable efficiency gains in ${title}.`, pros: [{ label: 'Governance', count: 880, color: '#5A39A2' }, { label: 'Operational Impact', count: 790, color: '#E8E3FF' }], badges: ['Leader', 'Business Authority'] },
      { id: `${slug}-bain`, name: 'Bain & Company', vendor: 'Bain', rating: 4.9, reviewCount: 890, logo: '', serviceType: `${title} & Growth Strategy`, segment: 'Enterprise', description: `Results-driven strategy and execution consultancy for ${title}.`, userSay: `Relentless practical ROI and clear leadership roadmaps for ${title}.`, pros: [{ label: 'Practical ROI', count: 740, color: '#5A39A2' }, { label: 'Execution', count: 680, color: '#E8E3FF' }], badges: ['Leader', 'Satisfaction #1'] },
    ];
  } else if (slug.includes('outsourcing') || slug.includes('itsm') || slug.includes('b2b') || slug.includes('other')) {
    category = 'Other Services';
    customFeatures = [
      { title: 'Global IT Workforce Augmentation', desc: `Dedicated engineering and operational teams tailored for ${title}.`, icon: 'Globe', bg: '#EFF6FF', color: '#2563EB' },
      { title: '24/7 Monitoring & Ticket Escalation', desc: 'Round-the-clock incident response, NOC management, and triage.', icon: 'Shield', bg: '#F5F3FF', color: '#7C3AED' },
      { title: 'ITSM Process Automation (ServiceNow/Jira)', desc: 'Automating change management, self-service portals, and workflows.', icon: 'Zap', bg: '#F0FDF4', color: '#16A34A' },
      { title: 'Contractual SLA & Uptime Guarantees', desc: '99.99% system availability with automated failover protocols.', icon: 'Award', bg: '#FFF7ED', color: '#EA580C' },
      { title: 'Vendor Management & Logistics', desc: 'Consolidated vendor oversight, asset lifecycle, and licensing.', icon: 'CheckCircle', bg: '#EEF2FF', color: '#4F46E5' },
      { title: 'Continuous Quality & Cost Optimization', desc: 'Quarterly efficiency audits, tooling consolidation, and FinOps.', icon: 'TrendingUp', bg: '#FEF2F2', color: '#DC2626' },
    ];
    customReviews = [
      { name: 'David Kim', role: 'Head of Global IT • FinTech Corp', date: '5 days ago', rating: 5, title: `Outstanding managed execution in ${title}`, pro: 'Incident resolution times plummeted by 50%. Superb communication and technical staff.', con: 'Initial onboarding required 3 weeks of knowledge transfer.' },
      { name: 'Sarah Jenkins', role: 'VP of Infrastructure • Healthcare', date: '2 weeks ago', rating: 4.8, title: `Transformed our internal support and operational SLAs for ${title}`, pro: 'Their 24/7 NOC caught network anomalies before users noticed any slowdown.', con: 'Minor adjustments needed in reporting dashboards initially.' },
      { name: 'Michael O\'Brien', role: 'Director of Procurement • Manufacturing', date: '1 month ago', rating: 4.9, title: `Consolidated 15 disconnected vendors into one streamlined service for ${title}`, pro: 'Saved over $1.4M in licensing and maintenance overhead in year one.', con: 'Contract negotiation required detailed custom SLA riders.' },
    ];
    providers = [
      { id: `${slug}-infosys`, name: 'Infosys Global Services', vendor: 'Infosys', rating: 4.8, reviewCount: 1890, logo: '', serviceType: `Global ${title}`, segment: 'Enterprise', description: `Global digital services and managed solutions specializing in ${title}.`, userSay: `Immense global scale, deep domain knowledge, and dependable execution in ${title}.`, pros: [{ label: 'Global Scale', count: 1450, color: '#5A39A2' }, { label: 'Reliability', count: 1280, color: '#E8E3FF' }], badges: ['Leader', 'Scale #1'] },
      { id: `${slug}-tcs`, name: 'Tata Consultancy Services (TCS)', vendor: 'TCS', rating: 4.7, reviewCount: 2140, logo: '', serviceType: `Enterprise ${title}`, segment: 'Enterprise', description: `Enterprise technology consulting and managed operations in ${title}.`, userSay: `Rock-solid uptime, structured ITIL governance, and large-scale delivery for ${title}.`, pros: [{ label: 'Governance', count: 1680, color: '#5A39A2' }, { label: 'Stability', count: 1490, color: '#E8E3FF' }], badges: ['Leader', 'Reliability'] },
      { id: `${slug}-hcl`, name: 'HCLTech Managed Solutions', vendor: 'HCLTech', rating: 4.8, reviewCount: 1210, logo: '', serviceType: `${title} Infrastructure`, segment: 'Enterprise', description: `Supercharged digital and infrastructure capabilities for ${title}.`, userSay: `Flexible contract models and highly responsive technical pods in ${title}.`, pros: [{ label: 'Flexibility', count: 940, color: '#5A39A2' }, { label: 'Technical Depth', count: 890, color: '#E8E3FF' }], badges: ['Leader', 'Flexible Delivery'] },
    ];
  } else {
    // Professional Services default
    category = 'Professional Services';
    customFeatures = [
      { title: `Enterprise ${title} Architecture`, desc: `Architecting scalable, modern systems and workflows tailored for ${title}.`, icon: 'Globe', bg: '#EFF6FF', color: '#2563EB' },
      { title: 'Custom Engineering & AI Model Integration', desc: 'Custom code development, REST/GraphQL APIs, and generative model deployment.', icon: 'Sparkles', bg: '#F5F3FF', color: '#7C3AED' },
      { title: 'Agile DevOps & CI/CD Automated Pipelines', desc: 'Automated testing, Kubernetes deployments, and zero-downtime releases.', icon: 'Zap', bg: '#F0FDF4', color: '#16A34A' },
      { title: 'End-to-End QA Testing & Code Audits', desc: 'Automated test suites (Playwright/Cypress), load testing, and security audits.', icon: 'Shield', bg: '#FFF7ED', color: '#EA580C' },
      { title: 'Legacy Modernization & Cloud Cutover', desc: 'Deconstructing legacy monoliths into high-throughput microservices.', icon: 'TrendingUp', bg: '#EEF2FF', color: '#4F46E5' },
      { title: 'Continuous Hypercare & Post-Launch Support', desc: 'Dedicated solutions architects on call to ensure long-term stability and scaling.', icon: 'CheckCircle', bg: '#FEF2F2', color: '#DC2626' },
    ];
    customReviews = [
      { name: 'Dr. Leonard Scott', role: 'CTO • Cloud Scale Enterprise', date: '3 days ago', rating: 5, title: `Delivered our ${title} implementation 3 weeks ahead of schedule`, pro: 'Their principal engineers wrote clean, bulletproof code that scaled effortlessly to 20M users.', con: 'High velocity sprints required active daily participation from our internal tech leads.' },
      { name: 'Kavita Patel', role: 'VP of Software Engineering • HealthTech', date: '2 weeks ago', rating: 4.9, title: `Exceptional technical talent and architecture in ${title}`, pro: 'Built our custom HIPAA-compliant platform from scratch with 99.99% availability.', con: 'Scope expanded during architecture phase to incorporate added security layers.' },
      { name: 'Brian O\'Connor', role: 'Head of Digital Products • Retail Giant', date: '1 month ago', rating: 4.8, title: `Transformed our digital systems and boosted throughput by 300%`, pro: 'Replaced a slow legacy stack with modern microservices. Page load times dropped below 0.5s.', con: 'Budget was substantial, but Black Friday traffic handled $80M without a glitch.' },
    ];
    providers = [
      { id: `${slug}-deloitte`, name: 'Deloitte Digital & Tech Consulting', vendor: 'Deloitte', rating: 4.9, reviewCount: 1980, logo: '', serviceType: `${title} & Digital Transformation`, segment: 'Enterprise', description: `Transforming enterprise systems, cloud architecture, and operations for ${title}.`, userSay: `Deloitte delivers comprehensive engineering muscle and strategic executive depth in ${title}.`, pros: [{ label: 'Architecture Scale', count: 1540, color: '#5A39A2' }, { label: 'Technical Depth', count: 1390, color: '#E8E3FF' }], badges: ['Leader', 'Enterprise #1'] },
      { id: `${slug}-accenture`, name: 'Accenture Technology Services', vendor: 'Accenture', rating: 4.8, reviewCount: 2450, logo: '', serviceType: `Enterprise ${title}`, segment: 'Enterprise', description: `Powering businesses with innovative solutions across cloud and software in ${title}.`, userSay: `Accenture handles the largest and most complex enterprise transformations in ${title}.`, pros: [{ label: 'Scale Execution', count: 1890, color: '#5A39A2' }, { label: 'Project Governance', count: 1670, color: '#E8E3FF' }], badges: ['Leader', 'Global Scale'] },
      { id: `${slug}-slalom`, name: 'Slalom Consulting', vendor: 'Slalom', rating: 4.9, reviewCount: 870, logo: '', serviceType: `Agile ${title} & Engineering`, segment: 'Mid-Market', description: `Modern strategy, software engineering, and agile transformation for ${title}.`, userSay: `Slalom is the most collaborative and agile technical partner we have ever hired for ${title}.`, pros: [{ label: 'Agile Velocity', count: 760, color: '#5A39A2' }, { label: 'Modern Stack', count: 710, color: '#E8E3FF' }], badges: ['Top CSAT', 'Agile Leader'] },
      { id: `${slug}-thoughtworks`, name: 'Thoughtworks', vendor: 'Thoughtworks', rating: 4.8, reviewCount: 760, logo: '', serviceType: `Custom Engineering in ${title}`, segment: 'Enterprise', description: `Leading global technology consultancy integrating strategy and engineering for ${title}.`, userSay: `Immaculate code quality and evolutionary architecture standards in ${title}.`, pros: [{ label: 'Code Quality', count: 680, color: '#5A39A2' }, { label: 'Architecture', count: 620, color: '#E8E3FF' }], badges: ['Engineering Excellence', 'Pioneer'] },
    ];
  }

  return {
    id: slug,
    name: title,
    type: 'service',
    category,
    listingCount: `${providers.length * 50 + 120}`,
    seeAllText: `See all ${title} Providers`,
    seeAllLink: `/services/${slug}`,
    customFeatures,
    customReviews,
    providers,
  };
}

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  const service = resolveServiceData(slug);

  const [segment, setSegment] = useState('all');
  const [ratingFive, setRatingFive] = useState(false);
  const [ratingFour, setRatingFour] = useState(false);
  const [dealsFilter, setDealsFilter] = useState(false);
  const [pricingFilter, setPricingFilter] = useState(false);
  const [language, setLanguage] = useState('');
  const [solutionType, setSolutionType] = useState('');
  const [compareList, setCompareList] = useState([]);
  const [sortBy, setSortBy] = useState('g2_score');
  const [sortOpen, setSortOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [pinnedList, setPinnedList] = useState(() => {
    try {
      const saved = localStorage.getItem('g2_pinned_items');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const clearAll = () => {
    setSegment('all');
    setRatingFive(false);
    setRatingFour(false);
    setDealsFilter(false);
    setPricingFilter(false);
    setLanguage('');
    setSolutionType('');
  };

  const toggleCompare = (id) =>
    setCompareList(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : prev.length >= 4 ? prev : [...prev, id]
    );

  const togglePin = (id) => {
    setPinnedList(prev => {
      const updated = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      try {
        localStorage.setItem('g2_pinned_items', JSON.stringify(updated));
      } catch (e) { }
      return updated;
    });
    navigate('/assistant/landing');
  };

  const handleTabClick = (tab) => {
    if (tab === 'overview') {
      setSearchParams({});
    } else {
      setSearchParams({ tab });
    }
  };

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => {
      const full = i < Math.floor(rating);
      const half = !full && i < rating;
      return (
        <span key={i} style={{
          color: (full || half) ? '#FF4F00' : '#D1D5DB',
          fontSize: '18px',
          lineHeight: 1,
        }}>
          {half ? '½' : '★'}
        </span>
      );
    });

  const providers = service.providers || [];

  // Filter
  let filtered = [...providers];
  if (segment !== 'all') {
    filtered = filtered.filter(p =>
      (p.segment || '').toLowerCase().includes(segment.toLowerCase())
    );
  }
  if (ratingFive) filtered = filtered.filter(p => p.rating >= 5);
  else if (ratingFour) filtered = filtered.filter(p => p.rating >= 4);
  if (solutionType) {
    filtered = filtered.filter(p =>
      (p.badges || []).some(b => b.toLowerCase().includes(solutionType.toLowerCase()))
    );
  }

  // Sort by tab / dropdown
  if (sortBy === 'popularity') {
    filtered = [...filtered].sort((a, b) => {
      const countA = typeof a.reviewCount === 'number' ? a.reviewCount : parseInt(String(a.reviewCount).replace(/,/g, '')) || 0;
      const countB = typeof b.reviewCount === 'number' ? b.reviewCount : parseInt(String(b.reviewCount).replace(/,/g, '')) || 0;
      return countB - countA;
    });
  } else if (sortBy === 'satisfaction') {
    filtered = [...filtered].sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else {
    // Default G2 Score
    filtered = [...filtered].sort((a, b) => {
      const countA = typeof a.reviewCount === 'number' ? a.reviewCount : parseInt(String(a.reviewCount).replace(/,/g, '')) || 0;
      const countB = typeof b.reviewCount === 'number' ? b.reviewCount : parseInt(String(b.reviewCount).replace(/,/g, '')) || 0;
      const scoreA = (a.rating || 0) * 100 + Math.min(countA, 5000);
      const scoreB = (b.rating || 0) * 100 + Math.min(countB, 5000);
      return scoreB - scoreA;
    });
  }

  if (activeTab === 'highest_rated') {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  }

  const serviceName = service.name || 'Services';
  const listingCount = service.listingCount || `${providers.length}`;
  const serviceCategory = service.category || 'Services';

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <Header />

      {/* ── TABS BAR — sits below navbar, no overlap ── */}
      <div style={{
        background: '#ffffff',
        borderBottom: '1px solid #E5E7EB',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <ul style={{
            display: 'flex',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            gap: 0,
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}>
            {categoryTabs.map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <li key={tab.id} style={{ flexShrink: 0 }}>
                  <button
                    onClick={() => handleTabClick(tab.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      padding: '14px 20px',
                      fontSize: 14,
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? '#201F23' : '#6B7280',
                      background: 'none',
                      border: 'none',
                      borderBottom: isActive ? '2px solid #0066CC' : '2px solid transparent',
                      cursor: 'pointer',
                      transition: 'color 0.15s, border-color 0.15s',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#0066CC'; }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#6B7280'; }}
                  >
                    {tab.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* ── BREADCRUMB ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#6B7280' }}>
          <Link to="/" style={{ color: '#2563EB', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <span style={{ color: '#201F23', fontWeight: 500 }}>Services</span>
          <span>›</span>
          <span style={{ color: '#201F23', fontWeight: 500 }}>{serviceCategory}</span>
          <span>›</span>
          <span style={{ color: '#201F23' }}>{serviceName}</span>
        </div>
      </div>

      {/* ── PAGE TITLE ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '8px 24px 24px' }}>
        <h1 className="page-title-responsive">
          Best {serviceName}
        </h1>
      </div>

      {/* ── TAB CONTENT SECTIONS (for Free and Resources tabs) ── */}
      {(activeTab === 'free' || activeTab === 'resources') && (
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 60px' }}>
          <TabContentSection tab={activeTab} serviceName={serviceName} providers={providers} service={service} />
        </div>
      )}

      {/* ── MAIN LAYOUT: sidebar + listing (for Overview and Highest Rated tabs) ── */}
      {(activeTab === 'overview' || activeTab === 'highest_rated') && (
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 60px', display: 'flex', gap: 24, alignItems: 'flex-start' }}>

          {/* ── LEFT SIDEBAR (Desktop Only) ── */}
          <aside
            className="hidden lg:block"
            style={{
              width: 290,
              flexShrink: 0,
              position: 'sticky',
              top: 20,
              alignSelf: 'flex-start',
              maxHeight: 'calc(100vh - 36px)',
              overflowY: 'auto',
              scrollbarWidth: 'none',
              zIndex: 20,
            }}
          >
            <SidebarFilters
              activeTab={activeTab}
              segment={segment}
              setSegment={setSegment}
              ratingFive={ratingFive}
              setRatingFive={setRatingFive}
              ratingFour={ratingFour}
              setRatingFour={setRatingFour}
              dealsFilter={dealsFilter}
              setDealsFilter={setDealsFilter}
              pricingFilter={pricingFilter}
              setPricingFilter={setPricingFilter}
              language={language}
              setLanguage={setLanguage}
              solutionType={solutionType}
              setSolutionType={setSolutionType}
              clearAll={clearAll}
            />
          </aside>

          {/* ── RIGHT: listing ── */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Listing header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
              <span style={{ fontSize: 14, color: '#201F23' }}>
                <strong>{listingCount} Listings</strong> in {serviceName} Available
              </span>

              {/* Sort By Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setSortOpen(prev => !prev)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    fontSize: 13, fontWeight: 600, color: '#201F23', background: '#fff',
                    border: '1px solid #D1D5DB', borderRadius: 8,
                    padding: '8px 14px', cursor: 'pointer',
                    transition: 'all 0.15s', whiteSpace: 'nowrap',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 15l5 5 5-5M7 9l5-5 5 5" />
                  </svg>
                  Sort By: {
                    sortBy === 'g2_score' ? 'G2 Score' :
                      sortBy === 'popularity' ? 'Popularity' : 'Satisfaction'
                  }
                </button>

                {/* Dropdown Menu */}
                {sortOpen && (
                  <>
                    <div
                      onClick={() => setSortOpen(false)}
                      style={{ position: 'fixed', inset: 0, zIndex: 90 }}
                    />
                    <div style={{
                      position: 'absolute', top: '100%', right: 0, marginTop: 6,
                      zIndex: 100, background: '#ffffff',
                      border: '1px solid #E5E7EB', borderRadius: 12,
                      padding: 6, width: 190,
                      boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                    }}>
                      {/* Option 1: G2 Score */}
                      <div
                        onClick={() => { setSortBy('g2_score'); setSortOpen(false); }}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '8px 12px', borderRadius: 8, cursor: 'pointer',
                          fontSize: 13, fontWeight: sortBy === 'g2_score' ? 600 : 400,
                          background: sortBy === 'g2_score' ? '#F0EEFF' : 'transparent',
                          color: sortBy === 'g2_score' ? '#201F23' : '#201F23',
                          marginBottom: 2,
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => { if (sortBy !== 'g2_score') e.currentTarget.style.background = '#F9FAFB'; }}
                        onMouseLeave={e => { if (sortBy !== 'g2_score') e.currentTarget.style.background = 'transparent'; }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span>G2 Score</span>
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            width: 15, height: 15, borderRadius: '50%',
                            background: '#201F23', color: '#fff', fontSize: 10, fontWeight: 700
                          }}>?</span>
                        </div>
                        {sortBy === 'g2_score' && <span style={{ fontSize: 13, fontWeight: 700 }}>✓</span>}
                      </div>

                      {/* Option 2: Popularity */}
                      <div
                        onClick={() => { setSortBy('popularity'); setSortOpen(false); }}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '8px 12px', borderRadius: 8, cursor: 'pointer',
                          fontSize: 13, fontWeight: sortBy === 'popularity' ? 600 : 400,
                          background: sortBy === 'popularity' ? '#F0EEFF' : 'transparent',
                          color: sortBy === 'popularity' ? '#201F23' : '#201F23',
                          marginBottom: 2,
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => { if (sortBy !== 'popularity') e.currentTarget.style.background = '#F9FAFB'; }}
                        onMouseLeave={e => { if (sortBy !== 'popularity') e.currentTarget.style.background = 'transparent'; }}
                      >
                        <span>Popularity</span>
                        {sortBy === 'popularity' && <span style={{ fontSize: 13, fontWeight: 700 }}>✓</span>}
                      </div>

                      {/* Option 3: Satisfaction */}
                      <div
                        onClick={() => { setSortBy('satisfaction'); setSortOpen(false); }}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '8px 12px', borderRadius: 8, cursor: 'pointer',
                          fontSize: 13, fontWeight: sortBy === 'satisfaction' ? 600 : 400,
                          background: sortBy === 'satisfaction' ? '#F0EEFF' : 'transparent',
                          color: sortBy === 'satisfaction' ? '#201F23' : '#201F23',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => { if (sortBy !== 'satisfaction') e.currentTarget.style.background = '#F9FAFB'; }}
                        onMouseLeave={e => { if (sortBy !== 'satisfaction') e.currentTarget.style.background = 'transparent'; }}
                      >
                        <span>Satisfaction</span>
                        {sortBy === 'satisfaction' && <span style={{ fontSize: 13, fontWeight: 700 }}>✓</span>}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Product cards */}
            {filtered.length === 0 ? (
              <div style={{ padding: '40px 0', textAlign: 'center', color: '#9CA3AF', fontSize: 14 }}>
                No service providers match your filters.
              </div>
            ) : (
              filtered.map((provider, idx) => (
                <ProductCard
                  key={provider.id || idx}
                  prod={provider}
                  idx={idx}
                  activeTab={activeTab}
                  renderStars={renderStars}
                  inCompare={compareList.includes(provider.id)}
                  onToggleCompare={() => toggleCompare(provider.id)}
                  isPinned={pinnedList.includes(provider.id)}
                  onTogglePin={() => togglePin(provider.id)}
                />
              ))
            )}
          </div>
        </div>
      )}

      {/* ── MOBILE FILTER MODAL DRAWER ── */}
      {mobileFilterOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          {/* Backdrop */}
          <div
            onClick={() => setMobileFilterOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 2000 }}
          />

          {/* Drawer Panel */}
          <div style={{
            position: 'relative', zIndex: 2001,
            background: '#fff',
            borderTopLeftRadius: 16, borderTopRightRadius: 16,
            maxHeight: '85vh', display: 'flex', flexDirection: 'column',
            boxShadow: '0 -4px 24px rgba(0,0,0,0.2)',
            overflow: 'hidden',
          }}>
            {/* Header */}
            <div style={{
              padding: '16px 20px', borderBottom: '1px solid #E5E7EB',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: '#fff',
            }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#201F23', margin: 0 }}>Filters</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                style={{
                  background: 'none', border: 'none', fontSize: 20, cursor: 'pointer',
                  color: '#6B7280', padding: 4, lineHeight: 1,
                }}
              >
                ✕
              </button>
            </div>

            {/* Filter Options Content */}
            <div style={{ padding: 20, overflowY: 'auto', flex: 1 }}>
              <SidebarFilters
                activeTab={activeTab}
                segment={segment}
                setSegment={setSegment}
                ratingFive={ratingFive}
                setRatingFive={setRatingFive}
                ratingFour={ratingFour}
                setRatingFour={setRatingFour}
                dealsFilter={dealsFilter}
                setDealsFilter={setDealsFilter}
                pricingFilter={pricingFilter}
                setPricingFilter={setPricingFilter}
                language={language}
                setLanguage={setLanguage}
                solutionType={solutionType}
                setSolutionType={setSolutionType}
                clearAll={clearAll}
              />
            </div>

            {/* Footer Actions */}
            <div style={{
              padding: '12px 20px', borderTop: '1px solid #E5E7EB',
              display: 'flex', gap: 12, background: '#fff',
            }}>
              <button
                onClick={clearAll}
                style={{
                  flex: 1, padding: '11px 16px', borderRadius: 8,
                  border: '1px solid #D1D5DB', background: '#fff',
                  color: '#201F23', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                }}
              >
                Clear All
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                style={{
                  flex: 1, padding: '11px 16px', borderRadius: 8,
                  border: 'none', background: '#5A39A2',
                  color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                }}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── COMPARE BAR ── */}
      {compareList.length > 0 && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000,
          background: '#ffffff',
          borderTop: '1px solid #E5E7EB',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
          padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          height: 64,
          gap: 20,
        }}>
          {/* Remove All */}
          <button
            onClick={() => setCompareList([])}
            style={{
              background: 'none', border: 'none',
              color: '#2563EB', fontSize: 13, fontWeight: 600,
              cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
              textDecoration: 'none',
              padding: '4px 8px',
            }}
            onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
            onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
          >
            Remove All
          </button>

          {/* Product slots */}
          <div style={{ display: 'flex', gap: 8 }}>
            {[0, 1, 2, 3].map(slot => {
              const provId = compareList[slot];
              const prov = provId ? providers.find(p => p.id === provId) : null;
              return (
                <div key={slot} style={{
                  width: 44, height: 44, flexShrink: 0,
                  border: `1px solid ${prov ? '#5A39A2' : '#D1D5DB'}`,
                  borderRadius: 6,
                  background: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative',
                  transition: 'all 0.15s',
                }}>
                  {prov ? (
                    <>
                      <ProviderLogo name={prov.name || prov.vendor} logo={prov.logo} size={30} rounded={4} />
                      {/* Remove X */}
                      <button
                        onClick={() => toggleCompare(provId)}
                        style={{
                          position: 'absolute', top: -6, right: -6,
                          width: 16, height: 16,
                          borderRadius: '50%',
                          background: '#201F23', border: 'none',
                          color: '#fff', fontSize: 9, fontWeight: 700,
                          cursor: 'pointer', lineHeight: 1,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          padding: 0,
                        }}
                      >
                        ✕
                      </button>
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* Compare Now */}
          <button
            onClick={() => {
              const ids = compareList.join(',');
              navigate(`/compare?ids=${ids}`);
            }}
            style={{
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              appearance: 'none',
              backgroundColor: '#5A39A2',
              background: '#5A39A2',
              color: '#fff',
              border: 'none',
              borderRadius: 20,
              fontSize: 14,
              fontWeight: 700,
              padding: '10px 24px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              outline: 'none',
              boxShadow: '0 2px 8px rgba(94,66,192,0.3)',
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#493088'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#5A39A2'; }}
          >
            Compare Now
          </button>
        </div>
      )}

      {/* ── TOP-RATED SERVICE PROVIDERS SUBSCRIPTION SECTION ── */}
      <TopRatedSubscription serviceName={serviceName} />

      {/* ── CATEGORY DESCRIPTION + AUTHOR ── */}
      <CategoryDescriptionSection serviceName={serviceName} serviceCategory={serviceCategory} />

      {/* ── LEARN MORE SECTION ── */}
      <LearnMoreSection serviceName={serviceName} />

      <Footer />
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROVIDER LOGO & BRAND COLOR HELPER
───────────────────────────────────────────── */
function getProviderBrand(name = '') {
  const cleanName = (name || '').toLowerCase();
  if (cleanName.includes('deloitte')) {
    return { bg: '#000000', color: '#86BC25', text: 'D', dot: true, label: 'Deloitte' };
  }
  if (cleanName.includes('mckinsey')) {
    return { bg: 'linear-gradient(135deg, #001A3A 0%, #052962 100%)', color: '#FFFFFF', text: 'M', label: 'McKinsey' };
  }
  if (cleanName.includes('bcg') || cleanName.includes('boston consulting')) {
    return { bg: 'linear-gradient(135deg, #00693E 0%, #004D2C 100%)', color: '#FFFFFF', text: 'BCG', label: 'BCG' };
  }
  if (cleanName.includes('bain')) {
    return { bg: 'linear-gradient(135deg, #CC0000 0%, #990000 100%)', color: '#FFFFFF', text: 'B', label: 'Bain' };
  }
  if (cleanName.includes('pwc')) {
    return { bg: 'linear-gradient(135deg, #D04A02 0%, #EB8C00 100%)', color: '#FFFFFF', text: 'pwc', label: 'PwC' };
  }
  if (cleanName.includes('kpmg')) {
    return { bg: 'linear-gradient(135deg, #00338D 0%, #001F5B 100%)', color: '#FFFFFF', text: 'KPMG', label: 'KPMG' };
  }
  if (cleanName.includes('mercer')) {
    return { bg: 'linear-gradient(135deg, #006699 0%, #003366 100%)', color: '#FFFFFF', text: 'M', label: 'Mercer' };
  }
  if (cleanName.includes('latham')) {
    return { bg: 'linear-gradient(135deg, #1C2833 0%, #0E161C 100%)', color: '#E59866', text: 'LW', label: 'Latham' };
  }
  if (cleanName.includes('infosys')) {
    return { bg: 'linear-gradient(135deg, #007CC3 0%, #005B8E 100%)', color: '#FFFFFF', text: 'i', label: 'Infosys' };
  }
  if (cleanName.includes('tcs') || cleanName.includes('tata')) {
    return { bg: 'linear-gradient(135deg, #002D62 0%, #001A38 100%)', color: '#FFFFFF', text: 'TCS', label: 'TCS' };
  }
  if (cleanName.includes('wipro')) {
    return { bg: 'linear-gradient(135deg, #E65100 0%, #9C27B0 100%)', color: '#FFFFFF', text: 'W', label: 'Wipro' };
  }
  if (cleanName.includes('hcltech') || cleanName.includes('hcl')) {
    return { bg: 'linear-gradient(135deg, #0088CC 0%, #005580 100%)', color: '#FFFFFF', text: 'HCL', label: 'HCL' };
  }
  if (cleanName.includes('genpact')) {
    return { bg: 'linear-gradient(135deg, #FF6600 0%, #CC5200 100%)', color: '#FFFFFF', text: 'G', label: 'Genpact' };
  }
  if (cleanName.includes('cbre')) {
    return { bg: 'linear-gradient(135deg, #003F2D 0%, #006A4E 100%)', color: '#FFFFFF', text: 'CBRE', label: 'CBRE' };
  }
  if (cleanName.includes('thoughtworks')) {
    return { bg: 'linear-gradient(135deg, #F15A24 0%, #C1272D 100%)', color: '#FFFFFF', text: 'TW', label: 'Thoughtworks' };
  }
  if (cleanName.includes('epam')) {
    return { bg: 'linear-gradient(135deg, #39C2D7 0%, #1A8B9D 100%)', color: '#FFFFFF', text: 'EPAM', label: 'EPAM' };
  }
  if (cleanName.includes('accenture')) {
    return { bg: 'linear-gradient(135deg, #A100FF 0%, #7500C0 100%)', color: '#FFFFFF', text: '>', label: 'Accenture' };
  }
  if (cleanName.includes('aws') || cleanName.includes('amazon')) {
    return { bg: '#232F3E', color: '#FF9900', text: 'AWS', label: 'AWS' };
  }
  if (cleanName.includes('slalom')) {
    return { bg: 'linear-gradient(135deg, #0F2C59 0%, #00C897 100%)', color: '#FFFFFF', text: 'S', label: 'Slalom' };
  }
  if (cleanName.includes('perficient')) {
    return { bg: 'linear-gradient(135deg, #D92D20 0%, #B42318 100%)', color: '#FFFFFF', text: 'P', label: 'Perficient' };
  }
  if (cleanName.includes('avanade')) {
    return { bg: 'linear-gradient(135deg, #FF5722 0%, #E64A19 100%)', color: '#FFFFFF', text: 'A', label: 'Avanade' };
  }
  if (cleanName.includes('cognizant')) {
    return { bg: 'linear-gradient(135deg, #10316B 0%, #0B409C 100%)', color: '#00ADB5', text: 'C', label: 'Cognizant' };
  }
  if (cleanName.includes('capgemini')) {
    return { bg: 'linear-gradient(135deg, #0070AD 0%, #004B75 100%)', color: '#FFFFFF', text: '♠', label: 'Capgemini' };
  }
  if (cleanName.includes('merkle')) {
    return { bg: 'linear-gradient(135deg, #00539C 0%, #002B49 100%)', color: '#FFD662', text: 'M', label: 'Merkle' };
  }
  if (cleanName.includes('cloudreach') || cleanName.includes('cloudticity')) {
    return { bg: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)', color: '#FFFFFF', text: '☁', label: 'Cloud' };
  }
  if (cleanName.includes('string')) {
    return { bg: 'linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)', color: '#FFFFFF', text: 'S', label: 'String' };
  }
  if (cleanName.includes('tinuiti')) {
    return { bg: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)', color: '#FFFFFF', text: 'T', label: 'Tinuiti' };
  }
  if (cleanName.includes('phiture')) {
    return { bg: 'linear-gradient(135deg, #E11D48 0%, #BE123C 100%)', color: '#FFFFFF', text: 'P', label: 'Phiture' };
  }
  if (cleanName.includes('softchoice')) {
    return { bg: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)', color: '#FFFFFF', text: 'S', label: 'Softchoice' };
  }
  if (cleanName.includes('presidio')) {
    return { bg: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)', color: '#FFFFFF', text: 'P', label: 'Presidio' };
  }
  if (cleanName.includes('insight')) {
    return { bg: 'linear-gradient(135deg, #4338CA 0%, #3730A3 100%)', color: '#FFFFFF', text: 'I', label: 'Insight' };
  }
  if (cleanName.includes('logicalis')) {
    return { bg: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)', color: '#FFFFFF', text: 'L', label: 'Logicalis' };
  }
  if (cleanName.includes('cdw')) {
    return { bg: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)', color: '#FFFFFF', text: 'CDW', label: 'CDW' };
  }
  if (cleanName.includes('alight')) {
    return { bg: 'linear-gradient(135deg, #BE123C 0%, #9F1239 100%)', color: '#FFFFFF', text: 'A', label: 'Alight' };
  }

  // Deterministic colorful gradient fallback
  const gradients = [
    { bg: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)', color: '#FFFFFF' },
    { bg: 'linear-gradient(135deg, #EC4899 0%, #D946EF 100%)', color: '#FFFFFF' },
    { bg: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', color: '#FFFFFF' },
    { bg: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', color: '#FFFFFF' },
    { bg: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)', color: '#FFFFFF' },
    { bg: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)', color: '#FFFFFF' },
    { bg: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)', color: '#FFFFFF' },
  ];
  let hash = 0;
  for (let i = 0; i < cleanName.length; i++) {
    hash = cleanName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const grad = gradients[Math.abs(hash) % gradients.length];
  const words = (name || 'SP').split(' ').filter(Boolean);
  const initials = words.length > 1
    ? (words[0][0] + words[1][0]).toUpperCase()
    : (name ? name.slice(0, 2).toUpperCase() : 'SP');

  return { bg: grad.bg, color: grad.color, text: initials, label: name };
}

function ProviderLogo({ name = '', logo = '', size = 56, rounded = 8, style = {} }) {
  const [error, setError] = useState(false);
  const brand = getProviderBrand(name);
  const isInvalidUrl = !logo || logo.includes('placeholder') || logo.includes('deloitte.png') || logo.includes('accenture.png') || logo.includes('perficient.png') || logo.includes('avanade.png') || logo.includes('cognizant.png') || logo.includes('merkle.png') || logo.includes('slalom.png') || logo.includes('cloudreach.png') || logo.includes('cloudticity.png') || logo.includes('string.png') || logo.includes('tinuiti.png') || logo.includes('phiture.png') || logo.includes('softchoice.png') || logo.includes('presidio.png') || logo.includes('insight.png') || logo.includes('logicalis.png') || logo.includes('cdw.png') || logo.includes('alight.png');

  if (error || isInvalidUrl) {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: rounded,
          background: brand.bg,
          color: brand.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          fontSize: brand.text.length > 2 ? Math.round(size * 0.28) : Math.round(size * 0.44),
          letterSpacing: '-0.5px',
          boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.25), 0 2px 5px rgba(0,0,0,0.1)',
          position: 'relative',
          userSelect: 'none',
          flexShrink: 0,
          fontFamily: '"Figtree", system-ui, -apple-system, sans-serif',
          ...style,
        }}
        title={name}
      >
        {brand.text}
        {brand.dot && (
          <span style={{
            position: 'absolute',
            bottom: Math.round(size * 0.16),
            right: Math.round(size * 0.18),
            width: Math.max(5, Math.round(size * 0.18)),
            height: Math.max(5, Math.round(size * 0.18)),
            borderRadius: '50%',
            background: '#86BC25',
          }} />
        )}
      </div>
    );
  }

  return (
    <img
      src={logo}
      alt={name}
      onError={() => setError(true)}
      style={{
        width: size,
        height: size,
        borderRadius: rounded,
        objectFit: 'contain',
        background: '#fff',
        flexShrink: 0,
        ...style,
      }}
    />
  );
}

const ICON_MAP = {
  TrendingUp,
  Globe,
  Users,
  Award,
  CheckCircle,
  Shield,
  Sparkles,
  Zap,
  BookOpen,
  FileText,
  HelpCircle,
  Gift,
};

function renderFeatureIcon(iconName) {
  const IconComponent = (typeof iconName === 'string' ? ICON_MAP[iconName] : iconName) || TrendingUp;
  return <IconComponent className="w-6 h-6" />;
}

/* ─────────────────────────────────────────────
   TAB CONTENT SECTION - Dynamic content for each tab
───────────────────────────────────────────── */
function TabContentSection({ tab, serviceName, providers, service }) {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => {
      const full = i < Math.floor(rating);
      const half = !full && i < rating;
      return (
        <Star
          key={i}
          className={`w-[18px] h-[18px] ${full ? 'fill-[#FF492C] text-[#FF492C]' : half ? 'fill-[#FF492C] text-[#FF492C] opacity-50' : 'fill-gray-200 text-gray-200'
            }`}
        />
      );
    });
  };

  // Sample provider for detail view
  const sampleProvider = providers[0] || {
    name: 'Premier Service Provider',
    logo: '',
    rating: 4.8,
    reviewCount: 350,
    description: 'Leading enterprise service provider delivering exceptional strategic and technical results.',
    website: '#'
  };

  // Overview Tab Content
  if (tab === 'overview_detail') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* What is Section */}
          <div style={{
            background: '#fff',
            border: '1px solid #E5E7EB',
            borderRadius: 12,
            padding: 28,
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: '#FFF5F2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF492C' }}>
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#201F23', margin: 0 }}>
                What is {serviceName}?
              </h2>
            </div>
            <p style={{ fontSize: 15, color: '#201F23', lineHeight: 1.7, margin: 0 }}>
              {serviceName} encompasses professional service providers that specialize in delivering
              high-quality solutions for businesses. These services help organizations streamline operations,
              enhance productivity, and achieve their strategic goals through expert consultation and implementation.
            </p>
            <p style={{ fontSize: 15, color: '#201F23', lineHeight: 1.7, marginTop: 12, marginBottom: 0 }}>
              Service providers in this category offer comprehensive support including strategy development,
              technical implementation, ongoing maintenance, and optimization to ensure maximum value delivery
              for their clients.
            </p>
          </div>

          {/* Key Benefits Section */}
          <div style={{
            background: '#fff',
            border: '1px solid #E5E7EB',
            borderRadius: 12,
            padding: 28,
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: '#EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5A39A2' }}>
                <Award className="w-5 h-5" />
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#201F23', margin: 0 }}>
                Key Benefits of {serviceName}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: TrendingUp, title: 'Expert Guidance', desc: 'Access to specialized knowledge and industry best practices', bg: '#EFF6FF', color: '#2563EB' },
                { icon: Users, title: 'Dedicated Support', desc: 'Professional teams committed to your long-term success', bg: '#F5F3FF', color: '#7C3AED' },
                { icon: Globe, title: 'Scalable Solutions', desc: 'Flexible engagement models that grow with your business needs', bg: '#F0FDF4', color: '#16A34A' },
                { icon: CheckCircle, title: 'Proven Results', desc: 'Track record of verified enterprise implementations', bg: '#FFF7ED', color: '#EA580C' },
              ].map((benefit, idx) => (
                <div key={idx} style={{
                  padding: 20,
                  background: '#F9FAFB',
                  borderRadius: 10,
                  border: '1px solid #E5E7EB',
                  display: 'flex',
                  gap: 14,
                  alignItems: 'flex-start',
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: benefit.bg, color: benefit.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <benefit.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: '#201F23', margin: '0 0 4px' }}>
                      {benefit.title}
                    </h3>
                    <p style={{ fontSize: 14, color: '#6B7280', margin: 0, lineHeight: 1.5 }}>
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div style={{
            background: '#fff',
            border: '1px solid #E5E7EB',
            borderRadius: 12,
            padding: 24,
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#201F23', marginBottom: 16 }}>
              Quick Stats
            </h3>
            <div className="space-y-4">
              <div>
                <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 4 }}>Average Rating</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#FF492C' }}>4.8 / 5</div>
              </div>
              <div style={{ height: 1, background: '#E5E7EB' }} />
              <div>
                <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 4 }}>Verified Reviews</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#201F23' }}>{providers.length * 60}+</div>
              </div>
              <div style={{ height: 1, background: '#E5E7EB' }} />
              <div>
                <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 4 }}>Top Providers Available</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#201F23' }}>{providers.length}</div>
              </div>
            </div>
          </div>

          {/* Rating Breakdown */}
          <div style={{
            background: '#fff',
            border: '1px solid #E5E7EB',
            borderRadius: 12,
            padding: 24,
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#201F23', marginBottom: 16 }}>
              Rating Distribution
            </h3>
            <div className="space-y-3">
              {[
                { stars: 5, percent: 74 },
                { stars: 4, percent: 21 },
                { stars: 3, percent: 4 },
                { stars: 2, percent: 1 },
                { stars: 1, percent: 0 },
              ].map((item) => (
                <div key={item.stars} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 13, color: '#201F23', width: 50 }}>{item.stars} star</span>
                  <div style={{ flex: 1, height: 8, background: '#F3F4F6', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${item.percent}%`,
                      background: '#FF492C',
                      borderRadius: 999,
                    }} />
                  </div>
                  <span style={{ fontSize: 13, color: '#6B7280', width: 40, textAlign: 'right' }}>{item.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Features/Capabilities Tab
  if (tab === 'features') {
    const featuresList = service?.customFeatures || [
      {
        title: 'Strategic Consultation & Scoping',
        desc: `Executive advisory and architecture design tailored specifically for ${serviceName}.`,
        icon: 'TrendingUp',
        bg: '#EFF6FF',
        color: '#2563EB',
      },
      {
        title: 'Custom Architecture & Setup',
        desc: `Tailored implementations designed to integrate with existing legacy enterprise systems.`,
        icon: 'Globe',
        bg: '#F5F3FF',
        color: '#7C3AED',
      },
      {
        title: '24/7 Dedicated Support & SLA Monitoring',
        desc: 'Round-the-clock incident response, maintenance, and multi-tier technical escalation.',
        icon: 'Users',
        bg: '#F0FDF4',
        color: '#16A34A',
      },
      {
        title: 'Continuous Optimization & Auditing',
        desc: 'Ongoing performance benchmarking, cost reduction, and security enhancements.',
        icon: 'Award',
        bg: '#FFF7ED',
        color: '#EA580C',
      },
      {
        title: 'Staff Training & Knowledge Transfer',
        desc: 'Empower internal teams with structured workshops, manuals, and hands-on onboarding.',
        icon: 'CheckCircle',
        bg: '#ECFDF5',
        color: '#059669',
      },
      {
        title: 'Enterprise Compliance & Security Safeguards',
        desc: 'SOC2, HIPAA, GDPR, and ISO-certified implementation safeguards and governance.',
        icon: 'Shield',
        bg: '#FEF2F2',
        color: '#DC2626',
      },
    ];

    return (
      <div style={{
        background: '#fff',
        border: '1px solid #E5E7EB',
        borderRadius: 12,
        padding: 32,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: '#FFF5F2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF492C' }}>
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: '#201F23', margin: 0 }}>
              Key Features & Capabilities of {serviceName}
            </h2>
            <p style={{ fontSize: 14, color: '#6B7280', margin: '4px 0 0' }}>
              Comprehensive service capabilities offered by verified {serviceName} partners
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {featuresList.map((feature, idx) => (
            <div key={idx} style={{
              padding: 24,
              background: '#FFFFFF',
              borderRadius: 12,
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: feature.bg || '#EFF6FF',
                color: feature.color || '#2563EB',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 16,
              }}>
                {renderFeatureIcon(feature.icon)}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#201F23', marginBottom: 8 }}>
                {feature.title}
              </h3>
              <p style={{ fontSize: 14, color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Reviews Tab
  if (tab === 'reviews') {
    const reviewsList = service?.customReviews || [
      {
        name: 'David Miller',
        role: 'VP of Infrastructure • Enterprise (5,000+ employees)',
        date: '1 week ago',
        rating: 5,
        title: `Seamless ${serviceName} transition with incredible technical support`,
        pro: `Their consultants integrated seamlessly into our sprint cycles and solved architectural bottlenecks in record time for ${serviceName}.`,
        con: 'Occasional scheduling conflicts due to timezone differences, but their async updates kept us fully on track.'
      },
      {
        name: 'Elena Rostova',
        role: 'Head of Digital Products • Mid-Market',
        date: '3 weeks ago',
        rating: 4.8,
        title: 'Delivered our complex implementation 2 weeks ahead of schedule',
        pro: 'Clear milestone tracking, proactive risk management, and exceptional domain knowledge across the team.',
        con: 'Documentation was brief initially, though they expanded it upon request without hesitation.'
      },
      {
        name: 'Marcus Vance',
        role: 'Chief Technology Officer • FinTech',
        date: '1 month ago',
        rating: 5,
        title: `The gold standard for ${serviceName}`,
        pro: 'High security standards, automated testing pipelines, and post-launch hypercare that prevented any downtime.',
        con: 'Premium pricing tier, but delivered unmatched value that easily exceeded our ROI projections.'
      },
    ];

    return (
      <div style={{
        background: '#fff',
        border: '1px solid #E5E7EB',
        borderRadius: 12,
        padding: 32,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: '#FFF5F2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF492C' }}>
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: '#201F23', margin: 0 }}>
                Verified {serviceName} Reviews
              </h2>
              <p style={{ fontSize: 14, color: '#6B7280', margin: '4px 0 0' }}>
                Unbiased feedback from verified business software buyers on G2
              </p>
            </div>
          </div>
          <Link
            to="/leave-a-review"
            style={{
              padding: '10px 22px',
              background: '#FF492C',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: 24,
              fontSize: 14,
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: '0 2px 6px rgba(255,73,44,0.3)',
            }}
          >
            <Star className="w-4 h-4 fill-white" /> Write a Review
          </Link>
        </div>

        <div className="space-y-6">
          {reviewsList.map((review, idx) => (
            <div key={idx} style={{
              padding: 24,
              background: '#F9FAFB',
              borderRadius: 12,
              border: '1px solid #E5E7EB',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: '50%',
                    background: idx === 0 ? '#6366F1' : idx === 1 ? '#059669' : '#D97706',
                    color: '#fff', fontWeight: 800, fontSize: 16,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {review.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 16, fontWeight: 700, color: '#201F23' }}>
                        {review.name}
                      </span>
                      <span style={{
                        fontSize: 11, background: '#DCFCE7', color: '#166534',
                        padding: '2px 8px', borderRadius: 12, border: '1px solid #BBF7D0',
                        display: 'inline-flex', alignItems: 'center', gap: 4, fontWeight: 600
                      }}>
                        <CheckCircle className="w-3.5 h-3.5" /> Verified Reviewer
                      </span>
                    </div>
                    <div style={{ fontSize: 13, color: '#6B7280', marginTop: 2 }}>{review.role}</div>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: '#9CA3AF' }}>{review.date}</div>
              </div>

              <div style={{ display: 'flex', gap: 3, marginBottom: 10 }}>
                {renderStars(review.rating)}
              </div>

              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#201F23', margin: '0 0 12px' }}>
                {review.title}
              </h3>

              <div style={{ background: '#F0FDF4', padding: 14, borderRadius: 8, border: '1px solid #BBF7D0', marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#166534', marginBottom: 4 }}>What do you like best?</div>
                <div style={{ fontSize: 14, color: '#201F23', lineHeight: 1.6 }}>{review.pro}</div>
              </div>
              <div style={{ background: '#FFF7ED', padding: 14, borderRadius: 8, border: '1px solid #FED7AA' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#9A3412', marginBottom: 4 }}>What do you dislike?</div>
                <div style={{ fontSize: 14, color: '#201F23', lineHeight: 1.6 }}>{review.con}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Pricing Tab
  if (tab === 'pricing') {
    return (
      <div style={{
        background: '#fff',
        border: '1px solid #E5E7EB',
        borderRadius: 12,
        padding: 32,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}>
        <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 36px' }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: '#FFF5F2', color: '#FF492C',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 12px',
          }}>
            <Award className="w-6 h-6" />
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#201F23', margin: '0 0 8px' }}>
            Flexible Service Packages & Pricing
          </h2>
          <p style={{ fontSize: 15, color: '#6B7280', margin: 0 }}>
            Compare engagement tiers for {serviceName}. Custom quotes are tailored to project scope and timelines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            {
              name: 'Starter Advisory',
              price: 'Project-Based',
              desc: 'Ideal for initial audits, system health checks, and scoping.',
              icon: Zap,
              features: ['Initial Architecture Audit', 'Roadmap Scoping Document', 'Weekly Status Briefings', 'Email & Slack Support']
            },
            {
              name: 'Professional Implementation',
              price: 'Retainer / Milestone',
              desc: 'Full end-to-end setup, data migration, and custom integrations.',
              icon: Award,
              features: ['Full Turnkey Implementation', 'Data Migration & Validation', 'Dedicated Solutions Architect', 'Custom Workflow Automation', 'Post-Launch 60-Day Warranty'],
              featured: true
            },
            {
              name: 'Enterprise Managed Services',
              price: 'Custom Enterprise',
              desc: 'Ongoing 24/7 management, optimization, and SLA guarantees.',
              icon: Shield,
              features: ['24/7/365 Tier-1 Escalation', 'Dedicated Technical Account Manager', 'Executive Quarterly Reviews', 'Custom SLA Guarantee (99.9%)', 'Continuous Performance Auditing']
            },
          ].map((plan, idx) => (
            <div key={idx} style={{
              padding: 32,
              background: plan.featured ? '#FFF5F2' : '#fff',
              border: plan.featured ? '2px solid #FF492C' : '1px solid #E5E7EB',
              borderRadius: 16,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: plan.featured ? '0 8px 24px rgba(255,73,44,0.12)' : '0 2px 6px rgba(0,0,0,0.03)',
            }}>
              {plan.featured && (
                <div style={{
                  position: 'absolute',
                  top: -14,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#FF492C',
                  color: '#fff',
                  padding: '4px 18px',
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                }}>
                  MOST POPULAR
                </div>
              )}

              <div style={{
                width: 44, height: 44, borderRadius: 10,
                background: plan.featured ? '#FF492C' : '#F3F4F6',
                color: plan.featured ? '#fff' : '#201F23',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 16,
              }}>
                <plan.icon className="w-5 h-5" />
              </div>

              <h3 style={{ fontSize: 22, fontWeight: 700, color: '#201F23', marginBottom: 6 }}>
                {plan.name}
              </h3>
              <p style={{ fontSize: 14, color: '#6B7280', minHeight: 40, marginBottom: 20 }}>{plan.desc}</p>

              <div style={{ fontSize: 26, fontWeight: 800, color: plan.featured ? '#FF492C' : '#201F23', marginBottom: 24 }}>
                {plan.price}
              </div>

              <button style={{
                width: '100%',
                padding: '12px 20px',
                background: plan.featured ? '#FF492C' : '#fff',
                color: plan.featured ? '#fff' : '#201F23',
                border: plan.featured ? 'none' : '1px solid #D1D5DB',
                borderRadius: 24,
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                marginBottom: 28,
                transition: 'all 0.15s',
              }}>
                Request Custom Quote
              </button>

              <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: 20, flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#201F23', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  What's Included:
                </div>
                <div className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span style={{ fontSize: 14, color: '#201F23', lineHeight: 1.4 }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Alternatives Tab
  if (tab === 'alternatives') {
    return (
      <div style={{
        background: '#fff',
        border: '1px solid #E5E7EB',
        borderRadius: 12,
        padding: 32,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: '#EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5A39A2' }}>
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: '#201F23', margin: 0 }}>
              Compare {serviceName} Alternatives
            </h2>
            <p style={{ fontSize: 14, color: '#6B7280', margin: '4px 0 0' }}>
              Explore certified alternative providers and compare user ratings side-by-side
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {providers.slice(0, 6).map((provider, idx) => (
            <div key={idx} style={{
              padding: 24,
              background: '#FFFFFF',
              borderRadius: 12,
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              display: 'flex',
              gap: 18,
              alignItems: 'flex-start',
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: 10,
                border: '1px solid #E5E7EB',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 4, background: '#fff', flexShrink: 0,
              }}>
                <ProviderLogo name={provider.name || provider.vendor} logo={provider.logo} size={54} rounded={8} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#201F23', margin: '0 0 4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {provider.name}
                </h3>
                <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 8 }}>
                  By <span style={{ color: '#2563EB', fontWeight: 500 }}>{provider.vendor || provider.name}</span> • {provider.segment || 'Enterprise'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {renderStars(provider.rating || 4.7)}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#201F23' }}>
                    {provider.rating || 4.7}/5
                  </span>
                  <span style={{ fontSize: 13, color: '#9CA3AF' }}>
                    ({provider.reviewCount || 150} reviews)
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Link
                    to={`/services/${serviceName.toLowerCase().replace(/\s+/g, '-')}`}
                    style={{
                      padding: '7px 18px',
                      background: '#5A39A2',
                      color: '#fff',
                      borderRadius: 20,
                      fontSize: 13,
                      fontWeight: 600,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    View Details <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // FAQs Tab
  if (tab === 'faqs') {
    const faqs = [
      {
        q: `What should I look for when choosing ${serviceName}?`,
        a: 'Consider factors like certified expertise, customer verified reviews on G2, SLA commitments, service delivery models, and deep familiarity with your enterprise tech stack.'
      },
      {
        q: 'How do I compare different service providers on G2?',
        a: 'Use G2\'s side-by-side comparison matrix to compare real user satisfaction scores, implementation velocity, support responsiveness, and market presence.'
      },
      {
        q: 'What is the standard engagement model for these services?',
        a: 'Most service partners offer flexible models: Project-based (fixed scope), Retainer (monthly dedicated hours), or Dedicated Team augmentations for long-term engagements.'
      },
      {
        q: 'How long does typical implementation take?',
        a: 'Implementation timelines vary by scope: targeted advisory can conclude in 2-4 weeks, whereas complex enterprise migrations usually span 2 to 6 months.'
      },
      {
        q: 'Are these service partners certified?',
        a: 'Yes, providers listed in this category maintain active premier partner certifications, technical accreditations, and proven compliance credentials.'
      },
    ];

    return (
      <div style={{
        background: '#fff',
        border: '1px solid #E5E7EB',
        borderRadius: 12,
        padding: 32,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB' }}>
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: '#201F23', margin: 0 }}>
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: 14, color: '#6B7280', margin: '4px 0 0' }}>
              Common questions answered by G2 research analysts
            </p>
          </div>
        </div>

        <div className="space-y-4 mt-8">
          {faqs.map((faq, idx) => (
            <div key={idx} style={{
              padding: 22,
              background: '#F9FAFB',
              borderRadius: 12,
              border: '1px solid #E5E7EB',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: '#EDE9FE', color: '#5A39A2',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 14, flexShrink: 0, marginTop: 2,
                }}>
                  Q
                </div>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#201F23', margin: '0 0 8px' }}>
                    {faq.q}
                  </h3>
                  <p style={{ fontSize: 15, color: '#4B5563', lineHeight: 1.7, margin: 0 }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Free Tab
  if (tab === 'free') {
    return (
      <div style={{
        background: '#fff',
        border: '1px solid #E5E7EB',
        borderRadius: 12,
        padding: 32,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#166534' }}>
            <Gift className="w-6 h-6" />
          </div>
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: '#201F23', margin: 0 }}>
              Free Consultations & Audits
            </h2>
            <p style={{ fontSize: 14, color: '#6B7280', margin: '4px 0 0' }}>
              Complimentary assessments offered by verified {serviceName} partners
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {[
            {
              title: '30-Min Architecture Discovery Call',
              provider: providers[0]?.name || 'Premier Advisory Partner',
              desc: 'One-on-one session with a Principal Architect to review current bottlenecks and recommend roadmap improvements.',
              deliverables: ['Custom Architecture Diagram', 'High-level Scope Estimate', 'Vendor Selection Guidance'],
              badge: '100% FREE',
            },
            {
              title: 'Cloud Security & Readiness Audit',
              provider: providers[1]?.name || 'Enterprise Cloud Partner',
              desc: 'Comprehensive security posture scan and compliance checklist for your upcoming implementation.',
              deliverables: ['Security Risk Scorecard', 'Compliance Gap Analysis', 'Remediation Action Plan'],
              badge: 'NO OBLIGATION',
            },
            {
              title: 'Migration Feasibility Assessment',
              provider: providers[2]?.name || 'Specialized Solutions Partner',
              desc: 'Detailed assessment of legacy data sources, pipeline dependencies, and estimated migration timelines.',
              deliverables: ['Data Complexity Matrix', 'Timeline Projections', 'Cost-Benefit Calculation'],
              badge: 'FREE AUDIT',
            },
            {
              title: 'ROI & TCO Optimization Workshop',
              provider: providers[3]?.name || 'Strategic Consulting Group',
              desc: 'Financial modeling session to forecast cost savings and calculate expected return on your technology investment.',
              deliverables: ['Custom ROI Forecast', 'Licensing Optimization Report', 'Executive Summary Deck'],
              badge: 'COMPLIMENTARY',
            },
          ].map((offer, idx) => (
            <div key={idx} style={{
              padding: 24,
              background: '#FFFFFF',
              borderRadius: 12,
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <span style={{
                  fontSize: 11, fontWeight: 800, background: '#DCFCE7', color: '#166534',
                  padding: '3px 10px', borderRadius: 999, border: '1px solid #BBF7D0', letterSpacing: '0.04em'
                }}>
                  {offer.badge}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#6B7280', fontSize: 13 }}>
                  <Clock className="w-3.5 h-3.5" /> 30-45 Mins
                </div>
              </div>

              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#201F23', margin: '0 0 6px' }}>
                {offer.title}
              </h3>
              <div style={{ fontSize: 13, color: '#2563EB', fontWeight: 600, marginBottom: 10 }}>
                Provided by {offer.provider}
              </div>
              <p style={{ fontSize: 14, color: '#4B5563', lineHeight: 1.5, marginBottom: 16 }}>
                {offer.desc}
              </p>

              <div style={{ background: '#F9FAFB', padding: 14, borderRadius: 8, border: '1px solid #E5E7EB', marginBottom: 20, flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#201F23', textTransform: 'uppercase', marginBottom: 8 }}>
                  Included Deliverables:
                </div>
                {offer.deliverables.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#4B5563', marginBottom: 4 }}>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <button style={{
                width: '100%',
                padding: '11px 20px',
                background: '#FF492C',
                color: '#fff',
                border: 'none',
                borderRadius: 24,
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(255,73,44,0.3)',
              }}>
                Book Free Consultation
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Resources Tab
  if (tab === 'resources') {
    return (
      <div style={{
        background: '#fff',
        border: '1px solid #E5E7EB',
        borderRadius: 12,
        padding: 32,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7C3AED' }}>
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: '#201F23', margin: 0 }}>
              Guides, Blueprints & Research
            </h2>
            <p style={{ fontSize: 14, color: '#6B7280', margin: '4px 0 0' }}>
              Free research publications and implementation checklists for {serviceName}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {[
            {
              title: '2026 Ecosystem Service Buyer\'s Guide',
              type: 'E-BOOK / REPORT',
              desc: 'Comprehensive market breakdown, vendor scorecards, and negotiation strategies for enterprise procurement teams.',
              icon: BookOpen,
              readTime: '12 min read',
              bg: '#EFF6FF',
              color: '#2563EB',
            },
            {
              title: 'Service Partner Evaluation Checklist',
              type: 'TOOLKIT / TEMPLATE',
              desc: 'Over 40 evaluation criteria covering security, team expertise, SLAs, and contract terms.',
              icon: FileText,
              readTime: 'Excel / PDF Template',
              bg: '#F0FDF4',
              color: '#16A34A',
            },
            {
              title: 'Cloud Migration & Modernization Playbook',
              type: 'TECHNICAL BLUEPRINT',
              desc: 'Step-by-step implementation guide detailing architecture patterns, rollback plans, and automated testing.',
              icon: TrendingUp,
              readTime: '18 min read',
              bg: '#F5F3FF',
              color: '#7C3AED',
            },
            {
              title: 'Enterprise Case Studies & ROI Benchmarks',
              type: 'RESEARCH PAPER',
              desc: 'Real-world deployment metrics from Fortune 500 companies that implemented these professional services.',
              icon: Award,
              readTime: '8 min read',
              bg: '#FFF7ED',
              color: '#EA580C',
            },
          ].map((item, idx) => (
            <div key={idx} style={{
              padding: 24,
              background: '#FFFFFF',
              borderRadius: 12,
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
              display: 'flex',
              gap: 16,
              alignItems: 'flex-start',
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: item.bg, color: item.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <item.icon className="w-6 h-6" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: item.color, letterSpacing: '0.04em' }}>
                    {item.type}
                  </span>
                  <span style={{ fontSize: 12, color: '#9CA3AF' }}>{item.readTime}</span>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#201F23', margin: '0 0 6px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: 14, color: '#4B5563', lineHeight: 1.5, marginBottom: 16 }}>
                  {item.desc}
                </p>
                <button style={{
                  padding: '7px 18px',
                  background: '#F3F4F6',
                  color: '#201F23',
                  border: '1px solid #D1D5DB',
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}>
                  <Download className="w-3.5 h-3.5" /> Download Guide
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default fallback
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #E5E7EB',
      borderRadius: 12,
      padding: 48,
      textAlign: 'center',
    }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#201F23', marginBottom: 12 }}>
        {tab.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Content
      </h2>
      <p style={{ fontSize: 15, color: '#6B7280' }}>
        Detailed content for this section is coming soon.
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TOP-RATED SERVICE PROVIDERS SUBSCRIPTION FORM
───────────────────────────────────────────── */
function TopRatedSubscription({ serviceName }) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const isValid = email.trim().length > 0 && email.includes('@') && consent;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) {
      setError('Please enter a valid email and agree to the terms.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div style={{
      borderTop: '1px solid #E5E7EB',
      padding: '64px 24px',
    }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        background: '#F3F4F6',
        borderRadius: 16,
        padding: '48px 40px',
        border: '1px solid #E5E7EB',
      }}>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: '#EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="#5A39A2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#201F23', marginBottom: 8 }}>
              You're on the list!
            </h3>
            <p style={{ fontSize: 14, color: '#6B7280' }}>
              We'll send the top-rated software list to <strong>{email}</strong> shortly.
            </p>
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: '#201F23', margin: '0 0 12px' }}>
              Top-rated {serviceName} of 2026
            </h2>
            <p style={{ fontSize: 15, color: '#201F23', lineHeight: 1.6, margin: '0 0 20px' }}>
              Fill out the form and we'll send a list of the top-rated service providers based on real user reviews directly to your inbox.
            </p>

            <form onSubmit={handleSubmit}>
              {/* Email Label */}
              <label
                htmlFor="top_rated_email"
                style={{ fontSize: 13, fontWeight: 700, color: '#201F23', display: 'block', marginBottom: 8 }}
              >
                Email Address <span style={{ color: '#EF4444' }}>*</span>
              </label>

              {/* Email + Button Row */}
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 12,
                alignItems: 'stretch',
                marginBottom: 16,
              }}>
                <div style={{ flex: '1 1 200px', minWidth: 0 }}>
                  <input
                    id="top_rated_email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError(''); }}
                    style={{
                      width: '100%',
                      height: 48,
                      padding: '0 20px',
                      borderRadius: 999,
                      border: '1px solid #D1D5DB',
                      background: '#fff',
                      fontSize: 14,
                      color: '#201F23',
                      outline: 'none',
                      boxSizing: 'border-box',
                      fontFamily: 'inherit',
                      transition: 'border-color 0.15s',
                    }}
                    onFocus={e => e.target.style.borderColor = '#5A39A2'}
                    onBlur={e => e.target.style.borderColor = '#D1D5DB'}
                  />
                </div>
                <button
                  type="submit"
                  disabled={!isValid}
                  style={{
                    flexShrink: 0,
                    height: 48,
                    padding: '0 24px',
                    borderRadius: 999,
                    border: 'none',
                    background: isValid ? '#5A39A2' : '#D1D5DB',
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: isValid ? 'pointer' : 'not-allowed',
                    whiteSpace: 'nowrap',
                    transition: 'background 0.15s',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={e => { if (isValid) e.currentTarget.style.background = '#493088'; }}
                  onMouseLeave={e => { if (isValid) e.currentTarget.style.background = '#5A39A2'; }}
                >
                  Send me the list
                </button>
              </div>

              {/* Error message */}
              {error && (
                <p style={{ fontSize: 13, color: '#EF4444', marginBottom: 12, marginTop: -8 }}>{error}</p>
              )}

              {/* Checkboxes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {/* Consent */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <input
                    id="top_rated_consent"
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={e => setConsent(e.target.checked)}
                    style={{
                      marginTop: 2, flexShrink: 0, cursor: 'pointer',
                      accentColor: '#5A39A2', width: 15, height: 15,
                    }}
                  />
                  <label
                    htmlFor="top_rated_consent"
                    style={{ fontSize: 13, color: '#201F23', lineHeight: 1.5, cursor: 'pointer' }}
                  >
                    To continue, please agree to our{' '}
                    <a
                      href="https://legal.g2.com/terms-of-use"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#2563EB', textDecoration: 'underline', fontSize: 13 }}
                    >
                      Terms of Use
                    </a>{' '}and{' '}
                    <a
                      href="https://legal.g2.com/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#2563EB', textDecoration: 'underline', fontSize: 13 }}
                    >
                      Privacy Policy
                    </a>.
                  </label>
                </div>

                {/* Marketing */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <input
                    id="top_rated_marketing"
                    type="checkbox"
                    checked={marketing}
                    onChange={e => setMarketing(e.target.checked)}
                    style={{
                      marginTop: 2, flexShrink: 0, cursor: 'pointer',
                      accentColor: '#5A39A2', width: 15, height: 15,
                    }}
                  />
                  <label
                    htmlFor="top_rated_marketing"
                    style={{ fontSize: 13, color: '#201F23', lineHeight: 1.5, cursor: 'pointer' }}
                  >
                    I would like to receive updates about products, services, and special offers from G2.
                  </label>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SIDEBAR FILTERS — matches screenshot exactly
───────────────────────────────────────────── */
function SidebarFilters({
  segment, setSegment,
  ratingFive, setRatingFive,
  ratingFour, setRatingFour,
  dealsFilter, setDealsFilter,
  pricingFilter, setPricingFilter,
  language, setLanguage,
  solutionType, setSolutionType,
  clearAll
}) {
  const [locationsDropdownOpen, setLocationsDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  const locationsList = [
    'United States', 'United Kingdom', 'Canada', 'India', 'Australia', 'Germany', 'France'
  ];

  const languageList = [
    'English', 'French', 'Spanish', 'German', 'Chinese', 'Japanese'
  ];

  return (
    <div style={{
      background: '#fff',
      borderRadius: 12,
      border: '1px solid #E5E7EB',
      padding: '20px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    }}>

      {/* Rating Section */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{
          fontSize: 16,
          fontWeight: 700,
          color: '#6B7280',
          marginBottom: 12,
          textTransform: 'none',
        }}>
          Rating
        </h3>

        <label style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          cursor: 'pointer',
          marginBottom: 10,
        }}>
          <input
            type="checkbox"
            checked={ratingFive}
            onChange={e => {
              setRatingFive(e.target.checked);
              if (e.target.checked) setRatingFour(false);
            }}
            style={{
              width: 18,
              height: 18,
              cursor: 'pointer',
              accentColor: '#FF492C',
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <img src={g2Stars} alt="5 Stars" style={{ height: 22 }} />
            <span style={{ fontSize: 14, fontWeight: 600, color: '#1F2937', marginLeft: 4 }}>
              5+
            </span>
          </div>
        </label>

        <label style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          cursor: 'pointer',
        }}>
          <input
            type="checkbox"
            checked={ratingFour}
            onChange={e => {
              setRatingFour(e.target.checked);
              if (e.target.checked) setRatingFive(false);
            }}
            style={{
              width: 18,
              height: 18,
              cursor: 'pointer',
              accentColor: '#FF492C',
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <img src={g2Stars} alt="4 Stars" style={{ height: 22, filter: 'grayscale(100%) brightness(1.5)', opacity: 0.8 }} />
            <span style={{ fontSize: 14, fontWeight: 600, color: '#1F2937', marginLeft: 4 }}>
              4+
            </span>
          </div>
        </label>
      </div>

      {/* Pricing Section */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{
          fontSize: 16,
          fontWeight: 700,
          color: '#6B7280',
          marginBottom: 12,
          textTransform: 'none',
        }}>
          Pricing
        </h3>

        <label style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          cursor: 'pointer',
        }}>
          <input
            type="checkbox"
            checked={pricingFilter}
            onChange={e => setPricingFilter(e.target.checked)}
            style={{
              width: 18,
              height: 18,
              cursor: 'pointer',
              accentColor: '#5A39A2',
            }}
          />
          <span style={{ fontSize: 14, fontWeight: 600, color: '#1F2937' }}>
            Pricing Available
          </span>
        </label>
      </div>

      {/* Language */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{
          fontSize: 16,
          fontWeight: 700,
          color: '#6B7280',
          margin: 0,
        }}>
          Language
        </h3>

        <div style={{ position: 'relative', marginTop: 12 }}>
          <div
            onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
            style={{
              width: '100%',
              padding: '10px 36px 10px 12px',
              fontSize: 14,
              border: languageDropdownOpen ? '1px solid #A78BFA' : '1px solid #D1D5DB',
              borderRadius: 8,
              color: '#4B5563',
              cursor: 'pointer',
              boxShadow: languageDropdownOpen ? '0 0 0 2px rgba(167, 139, 250, 0.2)' : 'none',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span>Search for Language...</span>
            <ChevronDown size={16} color="#6B7280" />
          </div>

          {languageDropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '100%',
              marginTop: 4,
              background: '#fff',
              border: '1px solid #E5E7EB',
              borderRadius: 8,
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              zIndex: 10,
              overflow: 'hidden'
            }}>
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {languageList.map((lang, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '10px 12px',
                      fontSize: 14,
                      color: '#374151',
                      cursor: 'pointer',
                      background: '#F3F4F6',
                      borderBottom: '1px solid #E5E7EB'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#E5E7EB'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#F3F4F6'}
                  >
                    {lang}
                  </div>
                ))}
              </div>
              <div style={{ padding: '8px 12px', background: '#fff' }}>
                <button
                  onClick={() => setLanguageDropdownOpen(false)}
                  style={{ color: '#5A39A2', fontSize: 13, fontWeight: 600, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                >
                  Clear All
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Locations Serviced */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{
          fontSize: 16,
          fontWeight: 700,
          color: '#6B7280',
          margin: 0,
        }}>
          Locations Serviced
        </h3>

        <div style={{ position: 'relative', marginTop: 12 }}>
          <div
            onClick={() => setLocationsDropdownOpen(!locationsDropdownOpen)}
            style={{
              width: '100%',
              padding: '10px 36px 10px 12px',
              fontSize: 14,
              border: locationsDropdownOpen ? '1px solid #A78BFA' : '1px solid #D1D5DB',
              borderRadius: 8,
              color: '#4B5563',
              cursor: 'pointer',
              boxShadow: locationsDropdownOpen ? '0 0 0 2px rgba(167, 139, 250, 0.2)' : 'none',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span>Search for Language...</span>
            <ChevronDown size={16} color="#6B7280" />
          </div>

          {locationsDropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '100%',
              marginTop: 4,
              background: '#fff',
              border: '1px solid #E5E7EB',
              borderRadius: 8,
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              zIndex: 10,
              overflow: 'hidden'
            }}>
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {locationsList.map((loc, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '10px 12px',
                      fontSize: 14,
                      color: '#374151',
                      cursor: 'pointer',
                      background: '#F3F4F6',
                      borderBottom: '1px solid #E5E7EB'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#E5E7EB'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#F3F4F6'}
                  >
                    {loc}
                  </div>
                ))}
              </div>
              <div style={{ padding: '8px 12px', background: '#fff' }}>
                <button
                  onClick={() => setLocationsDropdownOpen(false)}
                  style={{ color: '#5A39A2', fontSize: 13, fontWeight: 600, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                >
                  Clear All
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Industry Expertise */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{
          fontSize: 13,
          fontWeight: 600,
          color: '#6B7280',
          marginBottom: 12,
          textTransform: 'none',
          letterSpacing: '0.01em',
        }}>
          Industry Expertise
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            'Retail',
            'Non-Profit',
            'Travel & Hospitality',
            'Healthcare & Life Sciences',
            'Government / Public Sector',
            'Financial Services / Insurance',
            'Other (HR / IT / Legal / etc.)',
            'Media, Entertainment & Telecom',
            'Education',
            'Manufacturing & Distribution',
            'Consumer Packaged Goods',
            'B2B High Tech',
            'Automotive',
          ].map((industry, idx) => (
            <label
              key={idx}
              style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}
            >
              <input
                type="checkbox"
                style={{
                  width: 16, height: 16, cursor: 'pointer',
                  accentColor: '#5A39A2', marginTop: 2, flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 13, color: '#374151', lineHeight: 1.4 }}>
                {industry}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Partner Level */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{
          fontSize: 13,
          fontWeight: 600,
          color: '#6B7280',
          marginBottom: 12,
          textTransform: 'none',
          letterSpacing: '0.01em',
        }}>
          Partner Level
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {['Platinum', 'Gold', 'Silver', 'Bronze'].map((level, idx) => (
            <label
              key={idx}
              style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
            >
              <input
                type="checkbox"
                style={{
                  width: 16, height: 16, cursor: 'pointer',
                  accentColor: '#5A39A2',
                }}
              />
              <span style={{ fontSize: 13, color: '#374151' }}>
                {level}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear All */}
      <button
        onClick={clearAll}
        style={{
          width: '100%',
          padding: '10px 0',
          fontSize: 14,
          fontWeight: 700,
          color: '#5A39A2',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        Clear All
      </button>

      {/* G2 Disclaimer */}
      <p style={{
        marginTop: 16,
        fontSize: 12,
        color: '#6B7280',
        lineHeight: 1.5,
      }}>
        G2 takes pride in showing unbiased reviews on client satisfaction in our ratings and reports. We do not allow paid placements in any of our ratings, rankings, or reports. Learn about our{' '}
        <a href="#" style={{ color: '#3B82F6', textDecoration: 'underline' }}>
          scoring methodologies
        </a>
        .
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PRODUCT CARD  — matches G2 screenshot
───────────────────────────────────────────── */
function ProductCard({ prod, idx, activeTab, renderStars, inCompare, onToggleCompare, isPinned, onTogglePin }) {
  const [expanded, setExpanded] = useState(false);

  const userSayText = prod.userSay || `Users rate ${prod.name} highly for performance and ease of use.`;
  const truncated = userSayText.length > 160;
  const displayed = expanded || !truncated ? userSayText : userSayText.slice(0, 160) + '...';

  // Fallback description if prod.description not set
  const briefText = prod.description ||
    `${prod.name} is a ${prod.solutionType || 'software'} solution trusted by thousands of businesses. ` +
    `Rated ${prod.rating}/5 based on ${typeof prod.reviewCount === 'number' ? prod.reviewCount.toLocaleString() : prod.reviewCount} verified reviews on G2, ` +
    `it stands out for ease of use, reliability, and customer support — making it a top choice in its category.`;

  // Fallback highlights
  const chips = prod.highlights || [
    ...(prod.pros?.slice(0, 2).map(p => p.label) || []),
    prod.solutionType,
    prod.aiBadge,
  ].filter(Boolean).slice(0, 4);


  // Distinct 2-word CTA per card
  const get2WordCta = () => {
    if (prod.ctaText) {
      const lower = prod.ctaText.toLowerCase();
      if (lower.includes('quote')) return 'Get Quote';
      if (lower.includes('demo')) return 'Request Demo';
      if (lower.includes('free')) return 'Try Free';
      if (lower.includes('sales')) return 'Contact Sales';
      if (lower.includes('website') || lower.includes('visit')) return 'Visit Website';
      if (lower.includes('start')) return 'Get Started';
      if (lower.includes('pricing')) return 'View Pricing';
    }
    const ctaRotation = [
      'Read Reviews',
      'Visit Website',
      'Request Demo',
      'Get Quote',
      'Try Free',
      'View Profile',
      'Contact Sales',
    ];
    return ctaRotation[idx % ctaRotation.length];
  };

  const ctaLabel = get2WordCta();

  return (
    <>
      <style>{`
        /* Mobile responsive styles for product cards */
        @media (max-width: 640px) {
          .product-logo-responsive {
            width: 70px !important;
            height: 70px !important;
            padding: 5px !important;
          }
          
          .product-logo-responsive img,
          .product-logo-responsive > div {
            width: 60px !important;
            height: 60px !important;
          }
          
          .product-card-top {
            padding: 16px !important;
          }
          
          .product-name-text {
            font-size: 18px !important;
          }
          
          .product-vendor-text {
            font-size: 15px !important;
          }
          
          .product-rating-text {
            font-size: 14px !important;
          }
          
          .product-body-section {
            padding: 16px !important;
          }
          
          .product-body-heading {
            font-size: 14px !important;
          }
          
          .product-body-text {
            font-size: 13px !important;
            max-height: 65px !important;
          }
          
          .pros-cons-heading {
            font-size: 14px !important;
          }
          
          .pros-cons-badge {
            font-size: 13px !important;
            padding: 4px 8px 4px 5px !important;
          }
          
          .pros-cons-badge svg {
            width: 16px !important;
            height: 16px !important;
          }
          
          .pros-cons-count {
            font-size: 12px !important;
          }
        }
        
        @media (max-width: 480px) {
          .product-logo-responsive {
            width: 60px !important;
            height: 60px !important;
            padding: 4px !important;
          }
          
          .product-logo-responsive img,
          .product-logo-responsive > div {
            width: 52px !important;
            height: 52px !important;
          }
          
          .product-name-text {
            font-size: 17px !important;
          }
          
          .product-vendor-text {
            font-size: 14px !important;
          }
        }
      `}</style>

      <div style={{
        background: '#fff',
        border: '1px solid #E5E7EB',
        borderRadius: 10,
        marginBottom: 16,
        overflow: 'hidden',
        fontFamily: '"Figtree", "Inter", sans-serif',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        transition: 'box-shadow 0.2s',
      }}>

        {/* ── TOP SECTION: logo + name/rating + CTA ── */}
        <div style={{
          padding: '20px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '16px',
        }}
          className="product-card-top">

          {/* Left: logo + name block */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1, minWidth: 0 }}>
            {/* Logo */}
            <Link to={`/product/${prod.id}`} style={{ flexShrink: 0 }}>
              <div style={{
                width: 76,
                height: 76,
                border: '1px solid #E5E7EB',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 6,
                background: '#fff',
                overflow: 'hidden',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
              }}
                className="product-logo-responsive">
                <ProviderLogo name={prod.name || prod.vendor} logo={prod.logo} size={64} rounded={6} />
              </div>
            </Link>

            {/* Name + By + Stars */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Rank badge - only show for highest rated tab */}
              {activeTab === 'highest_rated' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3, flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: 11, fontWeight: 800, color: '#92400E',
                    background: '#FEF3C7', border: '1px solid #FCD34D',
                    padding: '1px 7px', borderRadius: 4, display: 'inline-flex', alignItems: 'center', gap: 3
                  }}>
                    ★ #{idx + 1} Highest Rated
                  </span>

                  {/* Sponsored tag if any */}
                  {prod.isSponsored && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: '#6B7280' }}>Sponsored</span>
                      <span title="You're seeing this ad based on product relevance." style={{ cursor: 'help', display: 'inline-flex' }}>
                        <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                          <circle cx="10" cy="10" r="6" fill="#6B7280" />
                          <path d="M9.25 14H10.75V9H9.25V14ZM10 7.5C10.41 7.5 10.75 7.16 10.75 6.75C10.75 6.34 10.41 6 10 6C9.59 6 9.25 6.34 9.25 6.75C9.25 7.16 9.59 7.5 10 7.5Z" fill="#fff" />
                        </svg>
                      </span>
                    </div>
                  )}
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: 3 }}>
                <Link
                  to={`/product/${prod.id}`}
                  style={{ fontSize: 18, fontWeight: 700, color: '#201F23', textDecoration: 'none', display: 'block', lineHeight: 1.3, flex: 1 }}
                  className="product-name-text"
                >
                  {prod.name}
                </Link>

                {/* Read Reviews button on same line as name */}
                <Link
                  to={`/product/${prod.id}`}
                  style={{
                    textAlign: 'right',
                    display: 'inline-block',
                    background: 'none',
                    color: '#5A39A2',
                    border: 'none',
                    fontSize: 14,
                    fontWeight: 600,
                    padding: '0',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    transition: 'all 0.15s',
                    lineHeight: 1.3,
                  }}
                  onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                  onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                >
                  {prod.ctaText ? (prod.ctaText.includes('Read') ? 'Read Reviews' : prod.ctaText) : 'Read Reviews'}
                </Link>
              </div>
              <p style={{ fontSize: 13, color: '#201F23', margin: '0 0 5px' }} className="product-vendor-text">
                By <a href="#" style={{ color: '#2563EB', textDecoration: 'none' }}>{prod.vendor || prod.name}</a>
              </p>
              {/* Stars */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap' }} className="product-rating-text">
                <div style={{ display: 'flex', gap: 1 }}>{renderStars(prod.rating)}</div>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#201F23' }}>{prod.rating}/5</span>
                <span style={{ fontSize: 13, color: '#6B7280' }}>
                  ({typeof prod.reviewCount === 'number' ? prod.reviewCount.toLocaleString() : prod.reviewCount})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── BODY SECTION: What do users say? + Pros & Cons ── */}
        <div style={{
          borderTop: '1px solid #E5E7EB',
          padding: '20px',
          display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'flex-start',
        }}
          className="product-body-section">

          {/* LEFT: What do users say + badges */}
          <div style={{ flex: 1, minWidth: 200 }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#201F23', margin: '0 0 6px' }} className="product-body-heading">
              What do users say?
            </p>
            <p style={{ fontSize: 14, color: '#201F23', lineHeight: 1.5, margin: '0 0 10px', maxHeight: '80px', overflow: 'hidden' }} className="product-body-text">
              {displayed}
              {truncated && (
                <button
                  onClick={() => setExpanded(s => !s)}
                  style={{ background: 'none', border: 'none', color: '#6B7280', fontSize: 14, cursor: 'pointer', padding: '0 0 0 4px' }}
                >
                  {expanded ? 'Show Less' : 'Show More'}
                </button>
              )}
            </p>



            {/* Solution Type badge */}
            {prod.solutionType && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
                <span style={{ fontSize: 16, color: '#9CA3AF', fontWeight: 400 }}>{prod.solutionType}</span>
                <span title={prod.solutionType === 'All-in-One'
                  ? 'All-in-One products consolidate features across multiple business functions.'
                  : 'A specialized tool focused on a specific business function or use case.'
                } style={{ cursor: 'help', display: 'inline-flex' }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="6" fill="#201F23" />
                    <path d="M9.25 14H10.75V9H9.25V14ZM10 7.5C10.4142 7.5 10.75 7.16421 10.75 6.75C10.75 6.33579 10.4142 6 10 6C9.58579 6 9.25 6.33579 9.25 6.75C9.25 7.16421 9.58579 7.5 10 7.5Z" fill="#DFDFE2" />
                  </svg>
                </span>
              </div>
            )}

            {/* AI badge */}
            {prod.aiBadge && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M14.31 2.24C14.46 2.09 14.39 2.26 14.18 2.49L13.63 3.9C13.53 4.17 13.48 4.3 13.4 4.41C13.33 4.51 13.24 4.6 13.14 4.67C13.03 4.75 12.9 4.8 12.63 4.9L11.21 5.45C11.06 5.51 10.99 5.54 10.96 5.58C10.95 5.61 10.95 5.66 10.96 5.69C10.99 5.74 11.06 5.77 11.21 5.82L12.63 6.37C12.9 6.47 13.03 6.52 13.14 6.6C13.24 6.67 13.33 6.76 13.4 6.86C13.48 6.97 13.53 7.1 13.63 7.37L14.18 8.79C14.23 8.94 14.26 9.01 14.31 9.04C14.34 9.05 14.38 9.05 14.42 9.04C14.46 9.01 14.49 8.94 14.55 8.79L15.1 7.37C15.2 7.1 15.25 6.97 15.33 6.86C15.4 6.76 15.49 6.67 15.59 6.6C15.7 6.52 15.83 6.47 16.1 6.37L17.51 5.82C17.67 5.77 17.74 5.74 17.76 5.69C17.78 5.66 17.78 5.61 17.76 5.58C17.74 5.54 17.67 5.51 17.51 5.45L16.1 4.9C15.83 4.8 15.7 4.75 15.59 4.67C15.49 4.6 15.4 4.51 15.33 4.41C15.25 4.3 15.2 4.17 15.1 3.9L14.55 2.49C14.49 2.33 14.46 2.26 14.42 2.24C14.38 2.22 14.34 2.22 14.31 2.24Z" fill="currentColor" />
                  <path d="M7.73 6.74C7.66 6.78 7.61 6.9 7.52 7.14L6.65 9.41C6.48 9.83 6.4 10.05 6.27 10.23C6.16 10.39 6.02 10.52 5.86 10.64C5.68 10.76 5.47 10.85 5.04 11.01L2.78 11.88C2.54 11.98 2.41 12.02 2.38 12.09C2.35 12.15 2.35 12.22 2.38 12.27C2.41 12.34 2.54 12.39 2.78 12.48L5.04 13.35C5.47 13.52 5.68 13.6 5.86 13.73C6.02 13.84 6.16 13.98 6.27 14.14C6.4 14.32 6.48 14.53 6.65 14.96L7.52 17.22C7.61 17.46 7.66 17.59 7.73 17.62C7.78 17.65 7.85 17.65 7.91 17.62C7.98 17.59 8.02 17.46 8.12 17.22L8.99 14.96C9.15 14.53 9.24 14.32 9.36 14.14C9.48 13.98 9.61 13.84 9.77 13.73C9.95 13.6 10.17 13.52 10.59 13.35L12.86 12.48C13.1 12.39 13.22 12.34 13.26 12.27C13.29 12.22 13.29 12.15 13.26 12.09C13.22 12.02 13.1 11.98 12.86 11.88L10.59 11.01C10.17 10.85 9.95 10.76 9.77 10.64C9.61 10.52 9.48 10.39 9.36 10.23C9.24 10.05 9.15 9.83 8.99 9.41L8.12 7.14C8.02 6.9 7.98 6.78 7.91 6.74C7.85 6.71 7.78 6.71 7.73 6.74Z" fill="currentColor" />
                </svg>
                <span style={{ fontSize: 16, fontWeight: 600, color: '#201F23' }}>{prod.aiBadge}</span>
              </div>
            )}
          </div>

          {/* RIGHT: Pros and Cons */}
          {prod.pros && prod.pros.length > 0 && (
            <div style={{ flexShrink: 0, minWidth: 200 }}>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#201F23', margin: '0 0 10px' }} className="pros-cons-heading">
                Pros and Cons
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {prod.pros.map((p, i) => {
                  const isCon = !!p.isCon;
                  return (
                    <div key={i} style={{
                      display: 'inline-flex', alignItems: 'center',
                      gap: 6,
                      borderRadius: 6,
                      padding: '4px 10px 4px 6px',
                      background: isCon ? '#FFF1F1' : '#F0FDF4',
                      width: 'fit-content',
                    }}
                      className="pros-cons-badge">
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                        {isCon ? (
                          <path d="M5.56 4H14V12.89L8.67 18.22L8.07 17.81C7.85 17.65 7.69 17.45 7.58 17.2C7.48 16.96 7.46 16.7 7.52 16.44L8.22 12.89H3.33C2.96 12.89 2.65 12.76 2.39 12.5C2.13 12.24 2 11.93 2 11.56V10.5C2 10.4 2.01 10.31 2.03 10.23C2.05 10.15 2.07 10.07 2.11 9.98L4.31 4.81C4.41 4.57 4.58 4.37 4.81 4.22C5.03 4.07 5.28 4 5.56 4ZM15.33 12.89V4H18V12.89H15.33Z" fill="#EF4444" />
                        ) : (
                          <path d="M14.44 16.22H6V7.33L11.33 2L11.93 2.41C12.15 2.57 12.31 2.77 12.42 3.02C12.52 3.27 12.54 3.52 12.48 3.78L11.78 7.33H16.67C17.04 7.33 17.35 7.46 17.61 7.72C17.87 7.98 18 8.3 18 8.67V9.72C18 9.82 17.99 9.91 17.97 9.99C17.95 10.07 17.93 10.15 17.89 10.24L15.69 15.41C15.57 15.65 15.41 15.85 15.19 16C14.96 16.15 14.72 16.22 14.44 16.22ZM4.67 7.33V16.22H2V7.33H4.67Z" fill="#22C55E" />
                        )}
                      </svg>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#201F23' }}>
                        {p.label}
                      </span>
                      <span style={{ fontSize: 13, fontWeight: 400, color: '#6B7280' }} className="pros-cons-count">({p.count})</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ── FOOTER: Add to Compare + Pin ── */}
        <div style={{
          borderTop: '1px solid #F3F4F6',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 8,
        }}>
          {/* Add to Compare */}
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={inCompare}
              onChange={onToggleCompare}
              style={{ accentColor: '#5A39A2', width: 16, height: 16, cursor: 'pointer' }}
            />
            <span style={{ fontSize: 14, fontWeight: 600, color: '#201F23' }}>Add to Compare</span>
          </label>

          {/* Pin button */}
          <button
            onClick={onTogglePin}
            title="Save product"
            style={{
              width: 36, height: 36,
              borderRadius: '50%',
              border: '1px solid #E5E7EB',
              background: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              color: isPinned ? '#5A39A2' : '#6B7280',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#F3F4F6'}
            onMouseLeave={e => e.currentTarget.style.background = '#fff'}
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20">
              <path d="m13 10 2 2v1.5h-4.25v4.75L10 19l-.75-.75V13.5H5V12l2-2V4.5H6V3h8v1.5h-1V10Zm-5.875 2h5.75L11.5 10.625V4.5h-3v6.125L7.125 12Z" />
            </svg>
          </button>
        </div>

      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   SPOTLIGHT + SIMILAR CATEGORIES SECTION
───────────────────────────────────────────── */
function CategoriesSection({ categoryName }) {
  return (
    <div style={{
      borderTop: '1px solid #E5E7EB',
      padding: '40px 24px',
      background: '#fff',
    }}>
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        display: 'flex',
        gap: 40,
        flexWrap: 'wrap',
        alignItems: 'flex-start',
      }}>

        {/* ── LEFT: Spotlight Categories (25%) ── */}
        <div style={{ flex: '0 0 220px', minWidth: 180 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#201F23', marginBottom: 14 }}>
            Spotlight Categories
          </div>
          <div>
            {aiSpotlightCategories.map((cat, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <Link
                  to={cat.href}
                  style={{ fontSize: 14, color: '#201F23', textDecoration: 'none', lineHeight: 1.5 }}
                  onMouseEnter={e => e.currentTarget.style.color = '#2563EB'}
                  onMouseLeave={e => e.currentTarget.style.color = '#201F23'}
                >
                  {cat.label}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Similar Categories (75%) ── */}
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#201F23', marginBottom: 14 }}>
            Similar Categories
          </div>

          {/* 3-column grid on md+, single scrollable list on mobile */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0 40px',
          }}>
            {aiSimilarCategories.map((col, colIdx) => (
              <ul key={colIdx} style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                flex: '1 1 140px',
                minWidth: 140,
              }}>
                {col.map((item, i) => (
                  <li key={i} style={{
                    borderBottom: '1px solid #F3F4F6',
                    padding: '8px 0',
                  }}>
                    <Link
                      to={item.href}
                      style={{ fontSize: 14, color: '#201F23', textDecoration: 'none' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#2563EB'}
                      onMouseLeave={e => e.currentTarget.style.color = '#201F23'}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>

          {/* Browse Themes link */}
          <div style={{ marginTop: 16 }}>
            <Link
              to={`/category/artificial-intelligence/themes`}
              style={{ fontSize: 14, color: '#201F23', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = '#2563EB'}
              onMouseLeave={e => e.currentTarget.style.color = '#201F23'}
            >
              Browse {categoryName} Themes
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CATEGORY DESCRIPTION — author + collapsible content
───────────────────────────────────────────── */
function CategoryDescriptionSection({ serviceName, serviceCategory }) {
  const [expanded, setExpanded] = useState(false);

  // Generate description based on service
  const description = `${serviceName} are professional service providers specializing in ${serviceCategory.toLowerCase()}. These providers help businesses implement, optimize, and manage their technology and business processes. Based on verified reviews from G2, the leading business software review platform, these service providers consistently deliver exceptional results for their clients.`;

  const fullContent = `When selecting ${serviceName.toLowerCase()}, it's important to consider factors such as industry expertise, technical capabilities, client reviews, and service delivery model. The top-rated providers on G2 have demonstrated excellence across these dimensions, earning high ratings from verified customers. Whether you need implementation support, strategic consulting, or managed services, these providers offer comprehensive solutions tailored to your business needs.`;

  return (
    <div style={{ borderTop: '1px solid #E5E7EB', padding: '64px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Author + Meta */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 24, alignItems: 'flex-start' }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 20, fontWeight: 700, flexShrink: 0
          }}>
            G
          </div>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#201F23', margin: '0 0 4px' }}>
              G2 Research Team
            </h3>
            <p style={{ fontSize: 13, color: '#6B7280', margin: '0 0 8px' }}>
              Updated December 2024 · 5 min read
            </p>
          </div>
        </div>

        {/* Title */}
        <h2 style={{ fontSize: 28, fontWeight: 800, color: '#201F23', marginBottom: 16 }}>
          Understanding {serviceName}
        </h2>

        {/* Collapsible Content */}
        <div style={{
          position: 'relative',
          maxHeight: expanded ? 'none' : 120,
          overflow: 'hidden',
          fontSize: 15,
          lineHeight: 1.6,
          color: '#201F23',
        }}>
          <p style={{ margin: '0 0 16px' }}>{description}</p>
          <p style={{ margin: 0 }}>{fullContent}</p>

          {/* Fade overlay when collapsed */}
          {!expanded && (
            <div style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              height: 60,
              background: 'linear-gradient(to bottom, transparent, #ffffff)',
              pointerEvents: 'none',
            }} />
          )}
        </div>

        {/* Show More / Show Less button */}
        <button
          onClick={() => setExpanded(s => !s)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            marginTop: 8,
            background: 'none',
            border: 'none',
            color: '#5A39A2',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <span>{expanded ? 'Show Less' : 'Show More'}</span>
          <svg
            width="18" height="18" viewBox="0 0 20 20" fill="currentColor"
            style={{ transition: 'transform 0.2s', transform: expanded ? 'rotate(180deg)' : 'none' }}
          >
            <path d="M10 13.0625L5 8.0625L6.0625 7L10 10.9375L13.9375 7L15 8.0625L10 13.0625Z" />
          </svg>
        </button>

      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   G2 GRID® SECTION
───────────────────────────────────────────── */
const GRID_PRODUCTS = [
  { id: 'mailchimp', name: 'Intuit Mailchimp Email...', reviews: 12984, stars: 4.5, x: 59.76, y: 42.86, logo: 'https://images.g2crowd.com/uploads/product/hd_favicon/302d00e021ff406c195b03ba50832862/intuit-mailchimp-email-marketing.svg' },
  { id: 'constant-contact', name: 'Constant Contact', reviews: 7427, stars: 4, x: 57.28, y: 35.63, logo: 'https://images.g2crowd.com/uploads/product/hd_favicon/d0637309afa730e835c2875436d214a5/constant-contact.svg' },
  { id: 'grammarly', name: 'Grammarly', reviews: 14065, stars: 4.5, x: 96.03, y: 12.09, logo: 'https://images.g2crowd.com/uploads/product/hd_favicon/bf78c36e6d40b89101b877b7a7c46f2d/grammarly.svg' },
  { id: 'canva', name: 'Canva', reviews: 7654, stars: 4.5, x: 69.86, y: 20.19, logo: 'https://images.g2crowd.com/uploads/product/hd_favicon/020885d89318f0483f6222194b3ee8ff/canva.svg' },
  { id: 'zoom', name: 'Zoom Workplace', reviews: 56559, stars: 4.5, x: 71.06, y: 27.75, logo: 'https://images.g2crowd.com/uploads/product/hd_favicon/c7b3378ce337ba60fdf54bb51ab3eebf/zoom-workplace.svg' },
  { id: 'notion', name: 'Notion', reviews: 13755, stars: 4.5, x: 94.58, y: 17.91, logo: 'https://images.g2crowd.com/uploads/product/hd_favicon/43bf53de40136acd6c0aed67eb459fcd/notion.svg' },
  { id: 'clickup', name: 'ClickUp', reviews: 13714, stars: 4.5, x: 58.14, y: 34.96, logo: 'https://images.g2crowd.com/uploads/product/hd_favicon/b675771627028c890e21cb68228a24e9/clickup.svg' },
  { id: 'apollo', name: 'Apollo.io', reviews: 9769, stars: 4.5, x: 62.17, y: 40.02, logo: 'https://images.g2crowd.com/uploads/product/hd_favicon/774372bf572eb33280b101482ce703b9/apollo-io.svg' },
  { id: 'jasper-ai', name: 'Jasper', reviews: 1274, stars: 4.5, x: 55.35, y: 32.14, logo: 'https://images.g2crowd.com/uploads/product/hd_favicon/75ba5a0ccc3fad5d61ccefa42d560fd3/jasper-ai.svg' },
  { id: 'writesonic', name: 'Writesonic', reviews: 2123, stars: 4.5, x: 66.95, y: 40.71, logo: 'https://images.g2crowd.com/uploads/product/hd_favicon/f584273e7da66ff04861354f181adb7d/writesonic.svg' },
  { id: 'tess-ai', name: 'TESS AI', reviews: 494, stars: 5, x: 58.14, y: 56.33, logo: 'https://images.g2crowd.com/uploads/product/hd_favicon/c2c1c895fcbd07403e63223d6f6d327f/tess-ai.svg' },
  { id: 'superhuman', name: 'Superhuman Mail', reviews: 1283, stars: 5, x: 70.94, y: 40.79, logo: 'https://images.g2crowd.com/uploads/product/favicon/84997/93772fa1ae6d95435481bfdf20d62251.png' },
  { id: 'anyword', name: 'Anyword', reviews: 1228, stars: 5, x: 64.23, y: 45.69, logo: 'https://images.g2crowd.com/uploads/product/favicon/149354/9ff61b33235b03fb69b16721aacf5059.png' },
  { id: 'simplified', name: 'Simplified', reviews: 5011, stars: 4.5, x: 62.27, y: 51.98, logo: 'https://images.g2crowd.com/uploads/product/hd_favicon/7b1ba8c7ba6a59af473f2286867b8689/simplified-simplified.svg' },
  { id: 'gravitywrite', name: 'GravityWrite', reviews: 650, stars: 4.5, x: 80.01, y: 49.06, logo: 'https://images.g2crowd.com/uploads/product/hd_favicon/7ea8a3932bd6977dfb9d50cbb17e454d/gravitywrite.svg' },
  { id: 'gemini', name: 'Gemini', reviews: 516, stars: 4.5, x: 65.04, y: 5.70, logo: 'https://images.g2crowd.com/uploads/vendor/favicon/311/c17f037ef71e37125392bd0f4dfae3a3.png' },
  { id: 'microsoft-copilot', name: 'Microsoft Copilot', reviews: 362, stars: 4.5, x: 62.66, y: 7.88, logo: 'https://images.g2crowd.com/uploads/product/favicon/1594735/a7c282258fd0905f4ccb163af5bbe808.png' },
  { id: 'microsoft-365-copilot', name: 'Microsoft 365 Copilot', reviews: 75, stars: 4, x: 53.82, y: 15.26, logo: 'https://images.g2crowd.com/uploads/product/hd_favicon/9b7a745b5767b3df56d6149ddeebf67a/microsoft-microsoft-365-copilot.svg' },
  { id: 'quillbot', name: 'QuillBot', reviews: 82, stars: 4.5, x: 66.84, y: 35.17, logo: 'https://images.g2crowd.com/uploads/product/hd_favicon/485827d896d18b86a0772d2858fa2874/quillbot.svg' },
  { id: 'autogenai', name: 'AutogenAI', reviews: 164, stars: 4.5, x: 50.10, y: 49.46, logo: 'https://images.g2crowd.com/uploads/product/hd_favicon/b17b2ec218cfed60050bad4e83681bcb/autogenai.svg' },
];

const SOCIAL_SHARE = [
  {
    name: 'LinkedIn', color: '#0A66C2',
    href: 'https://www.linkedin.com/shareArticle?mini=true&url=https://www.g2.com/categories/artificial-intelligence',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>,
  },
  {
    name: 'Twitter', color: '#1DA1F2',
    href: 'https://twitter.com/intent/tweet?url=https://www.g2.com/categories/artificial-intelligence',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.43.36a9 9 0 01-2.88 1.1A4.52 4.52 0 0016.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .36.04.71.11 1.04C7.73 5.38 4.1 3.6 1.67.74a4.52 4.52 0 00-.61 2.27c0 1.57.8 2.95 2.01 3.76a4.49 4.49 0 01-2.05-.57v.06c0 2.19 1.56 4.02 3.63 4.43a4.52 4.52 0 01-2.04.08c.57 1.79 2.24 3.09 4.21 3.12A9.05 9.05 0 010 19.54a12.78 12.78 0 006.92 2.03c8.3 0 12.85-6.88 12.85-12.85 0-.2 0-.39-.01-.58A9.18 9.18 0 0023 3z" /></svg>,
  },
  {
    name: 'Facebook', color: '#1877F2',
    href: 'https://www.facebook.com/sharer/sharer.php?u=https://www.g2.com/categories/artificial-intelligence',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>,
  },
  {
    name: 'Gmail', color: '#EA4335',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&tf=1&body=https://www.g2.com/categories/artificial-intelligence',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>,
  },
  {
    name: 'Mail', color: '#6B7280',
    href: 'mailto:?body=https://www.g2.com/categories/artificial-intelligence',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" /></svg>,
  },
];

function G2GridSection({ categoryName }) {
  const [selectedView, setSelectedView] = useState('grid');
  const [selectedSegment, setSelectedSegment] = useState('all');
  const [tooltip, setTooltip] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const gridRef = useState(null);

  const gridViewOptions = [
    { id: 'grid', label: 'Live' },
    { id: 'trending', label: 'Trending' },
  ];
  const segmentOptions = [
    { id: 'all', label: 'All' },
    { id: 'small-business', label: 'Small Business' },
    { id: 'mid-market', label: 'Mid Market' },
  ];

  // Sidebar radio option button
  const RadioOption = ({ opt, active, onClick }) => (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        width: '100%', padding: '10px 14px', borderRadius: 999,
        border: `1.5px solid ${active ? '#2176AE' : '#D1D5DB'}`,
        background: active ? 'linear-gradient(to right, #EBF4FF, #FFF5F2)' : '#fff',
        cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
        outline: 'none',
      }}
    >
      <div style={{
        width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
        border: `2px solid ${active ? '#2176AE' : '#C4C4C4'}`,
        background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'border-color 0.15s',
      }}>
        {active && <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#2176AE' }} />}
      </div>
      <span style={{ fontSize: 14, fontWeight: 600, color: '#201F23' }}>{opt.label}</span>
    </button>
  );

  const SidebarContent = () => (
    <>
      <div style={{
        background: '#fff', border: '1px solid #E5E7EB',
        borderRadius: 16, padding: '20px 16px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
      }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#201F23', marginBottom: 12, letterSpacing: '0.01em' }}>
            Select Grid® View
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {gridViewOptions.map(opt => (
              <RadioOption key={opt.id} opt={opt} active={selectedView === opt.id} onClick={() => setSelectedView(opt.id)} />
            ))}
          </div>
        </div>
        <div style={{ height: 1, background: '#E5E7EB', marginBottom: 20 }} />
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#201F23', marginBottom: 12, letterSpacing: '0.01em' }}>
            Select Company Size
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {segmentOptions.map(opt => (
              <RadioOption key={opt.id} opt={opt} active={selectedSegment === opt.id} onClick={() => setSelectedSegment(opt.id)} />
            ))}
          </div>
        </div>
      </div>
      <a
        href="#product-list"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '14px 16px', borderRadius: 999, marginTop: 16,
          background: '#5A39A2', color: '#fff',
          fontSize: 14, fontWeight: 700, textDecoration: 'none',
          boxShadow: '0 2px 8px rgba(94,66,192,0.3)', transition: 'background 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = '#493088'}
        onMouseLeave={e => e.currentTarget.style.background = '#5A39A2'}
      >
        Back to product list
      </a>
    </>
  );

  return (
    <div style={{ background: '#fff', borderTop: '1px solid #E5E7EB', padding: '48px 0 40px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

        {/* Section Header */}
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#201F23', margin: '0 0 10px' }}>
            G2 Grid® for <strong>{categoryName}</strong>
          </h2>
          <p style={{ fontSize: 14, color: '#201F23', lineHeight: 1.7, maxWidth: 860, margin: 0 }}>
            Check out the G2 Grid® for the top {categoryName} products. G2 scores products and sellers based on
            reviews gathered from our user community, as well as data aggregated from online sources and social
            networks. Together, these scores are mapped on our proprietary G2 Grid®, which you can use to compare
            products, streamline the buying process, and quickly identify the best products based on the experiences
            of your peers.
          </p>
        </div>

        {/* Mobile: Filter toggle bar */}
        <div className="g2grid-mobile-bar" style={{ display: 'none', marginBottom: 16 }}>
          <button
            onClick={() => setMobileFilterOpen(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '9px 16px', borderRadius: 8,
              border: '1px solid #D1D5DB', background: '#fff',
              fontSize: 13, fontWeight: 600, color: '#201F23', cursor: 'pointer',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 3H2l8 9.46V19l4 2v-7.54L22 3z" />
            </svg>
            Filter Grid®
            <span style={{ marginLeft: 4, fontSize: 12, color: '#5A39A2', fontWeight: 700 }}>
              {gridViewOptions.find(o => o.id === selectedView)?.label} · {segmentOptions.find(o => o.id === selectedSegment)?.label}
            </span>
          </button>
        </div>

        {/* Main layout */}
        <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>

          {/* Desktop Sidebar */}
          <div className="g2grid-sidebar" style={{ width: 240, flexShrink: 0 }}>
            <SidebarContent />
          </div>

          {/* Grid chart area */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Wrapper with Y-axis label */}
            <div style={{ display: 'flex', gap: 0, alignItems: 'stretch' }}>

              {/* Y-axis label — rotated */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 28, flexShrink: 0,
              }}>
                <div style={{
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                  fontSize: 11, fontWeight: 700, color: '#6B7280',
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  whiteSpace: 'nowrap', userSelect: 'none',
                  display: 'flex', alignItems: 'center', gap: 4,
                }}>
                  <span>Market Presence</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0 }}>
                    <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
                  </svg>
                </div>
              </div>

              {/* The actual grid box */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Aspect-ratio container */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '75%',
                  background: '#fff',
                  border: '2px solid #D1D5DB',
                  borderRadius: 8,
                  overflow: 'hidden',
                }}>
                  <div style={{ position: 'absolute', inset: 0 }}>

                    {/* ── Quadrant background shading ── */}
                    {/* Top-right: Leaders — very subtle purple */}
                    <div style={{ position: 'absolute', top: 0, left: '50%', right: 0, bottom: '50%', background: 'rgba(94,66,192,0.03)' }} />
                    {/* Top-left: High Performers — subtle green */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: '50%', bottom: '50%', background: 'rgba(16,185,129,0.03)' }} />
                    {/* Bottom-right: Contenders — subtle orange */}
                    <div style={{ position: 'absolute', top: '50%', left: '50%', right: 0, bottom: 0, background: 'rgba(245,158,11,0.03)' }} />
                    {/* Bottom-left: Niche — subtle grey */}
                    <div style={{ position: 'absolute', top: '50%', left: 0, right: '50%', bottom: 0, background: 'rgba(156,163,175,0.04)' }} />

                    {/* ── Minor grid lines (9×9) ── */}
                    {[10, 20, 30, 40, 60, 70, 80, 90].map(p => (
                      <div key={`gv${p}`} style={{
                        position: 'absolute', top: 0, bottom: 0, left: `${p}%`,
                        width: 1, background: '#E5E7EB',
                      }} />
                    ))}
                    {[10, 20, 30, 40, 60, 70, 80, 90].map(p => (
                      <div key={`gh${p}`} style={{
                        position: 'absolute', left: 0, right: 0, top: `${p}%`,
                        height: 1, background: '#E5E7EB',
                      }} />
                    ))}

                    {/* ── Center divider lines (bold) ── */}
                    <div style={{
                      position: 'absolute', top: 0, bottom: 0, left: '50%',
                      width: 2, background: '#9CA3AF', transform: 'translateX(-50%)',
                    }} />
                    <div style={{
                      position: 'absolute', left: 0, right: 0, top: '50%',
                      height: 2, background: '#9CA3AF', transform: 'translateY(-50%)',
                    }} />

                    {/* ── G2 watermark ── */}
                    <div style={{
                      position: 'absolute', top: '50%', left: '50%',
                      transform: 'translate(-50%, -50%)',
                      fontSize: 56, fontWeight: 900,
                      color: 'rgba(94,66,192,0.055)',
                      userSelect: 'none', pointerEvents: 'none',
                      letterSpacing: '-3px', lineHeight: 1,
                    }}>
                      G2
                    </div>

                    {/* ── Quadrant labels ── */}
                    {/* Leaders — top right */}
                    <div style={{
                      position: 'absolute', top: 10, right: 12,
                      fontSize: 10, fontWeight: 800, color: '#5A39A2',
                      textTransform: 'uppercase', letterSpacing: '0.1em',
                    }}>Leaders</div>
                    {/* High Performers — top left */}
                    <div style={{
                      position: 'absolute', top: 10, left: 12,
                      fontSize: 10, fontWeight: 800, color: '#059669',
                      textTransform: 'uppercase', letterSpacing: '0.1em',
                    }}>High Performers</div>
                    {/* Contenders — bottom right */}
                    <div style={{
                      position: 'absolute', bottom: 10, right: 12,
                      fontSize: 10, fontWeight: 800, color: '#D97706',
                      textTransform: 'uppercase', letterSpacing: '0.1em',
                    }}>Contenders</div>
                    {/* Niche — bottom left */}
                    <div style={{
                      position: 'absolute', bottom: 10, left: 12,
                      fontSize: 10, fontWeight: 800, color: '#9CA3AF',
                      textTransform: 'uppercase', letterSpacing: '0.1em',
                    }}>Niche</div>

                    {/* ── Product dots ── */}
                    {GRID_PRODUCTS.map(prod => (
                      <div
                        key={prod.id}
                        style={{
                          position: 'absolute',
                          left: `${prod.x}%`,
                          top: `${prod.y}%`,
                          transform: 'translate(-50%, -50%)',
                          zIndex: tooltip?.prod?.id === prod.id ? 30 : 10,
                          cursor: 'pointer',
                          transition: 'transform 0.15s',
                        }}
                        onMouseEnter={() => setTooltip({ prod })}
                        onMouseLeave={() => setTooltip(null)}
                      >
                        {/* Drop shadow ring on hover */}
                        <div style={{
                          width: 34, height: 34,
                          borderRadius: 8,
                          border: `2px solid ${tooltip?.prod?.id === prod.id ? '#5A39A2' : '#D1D5DB'}`,
                          background: '#fff',
                          boxShadow: tooltip?.prod?.id === prod.id
                            ? '0 0 0 3px rgba(94,66,192,0.18), 0 4px 12px rgba(0,0,0,0.18)'
                            : '0 1px 4px rgba(0,0,0,0.14)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          overflow: 'hidden',
                          transition: 'border-color 0.15s, box-shadow 0.15s',
                          transform: tooltip?.prod?.id === prod.id ? 'scale(1.15)' : 'scale(1)',
                        }}>
                          <img
                            src={prod.logo}
                            alt={prod.name}
                            style={{ width: 24, height: 24, objectFit: 'contain', display: 'block' }}
                            onError={e => {
                              e.target.style.display = 'none';
                              e.target.parentElement.style.background = '#EDE9FE';
                              e.target.parentElement.insertAdjacentText('beforeend', prod.name[0]);
                            }}
                          />
                        </div>
                      </div>
                    ))}

                    {/* ── Tooltip ── */}
                    {tooltip && (() => {
                      const p = tooltip.prod;
                      const flipX = p.x > 65;
                      const flipY = p.y < 25;
                      return (
                        <div style={{
                          position: 'absolute',
                          left: flipX ? `${p.x - 2}%` : `${p.x + 2}%`,
                          top: flipY ? `${p.y + 5}%` : `${p.y - 5}%`,
                          transform: flipX
                            ? (flipY ? 'translate(-100%, 0)' : 'translate(-100%, -100%)')
                            : (flipY ? 'translate(0, 0)' : 'translate(0, -100%)'),
                          zIndex: 50,
                          background: '#fff',
                          border: '1px solid #E5E7EB',
                          borderRadius: 12,
                          padding: '12px 14px',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.16)',
                          minWidth: 180,
                          pointerEvents: 'none',
                        }}>
                          {/* Arrow */}
                          <div style={{
                            display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8,
                          }}>
                            <div style={{
                              width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                              border: '1px solid #E5E7EB', overflow: 'hidden', background: '#fff',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                              <img src={p.logo} alt={p.name} style={{ width: 26, height: 26, objectFit: 'contain' }} />
                            </div>
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 700, color: '#201F23', lineHeight: 1.3 }}>{p.name}</div>
                              <div style={{ display: 'flex', gap: 1, marginTop: 3 }}>
                                {[...Array(5)].map((_, i) => (
                                  <span key={i} style={{ color: i < Math.floor(p.stars) ? '#FF4F00' : '#D1D5DB', fontSize: 13, lineHeight: 1 }}>★</span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            borderTop: '1px solid #F3F4F6', paddingTop: 8, marginTop: 2,
                          }}>
                            <span style={{ fontSize: 12, color: '#6B7280' }}>{p.reviews} reviews</span>
                            <span style={{ fontSize: 12, color: '#5A39A2', fontWeight: 700 }}>See Reviews →</span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* X-axis label */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                  marginTop: 10,
                  fontSize: 11, fontWeight: 700, color: '#6B7280',
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  userSelect: 'none',
                }}>
                  <span>Satisfaction</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
                  </svg>
                </div>

                {/* Footer row: scoring + social */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  marginTop: 14, flexWrap: 'wrap', gap: 10,
                }}>
                  <a
                    href="https://research.g2.com/g2-scoring-methodologies"
                    target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: 12, color: '#5A39A2', fontWeight: 600, textDecoration: 'none' }}
                    onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                    onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                  >
                    G2 Grid® Scoring
                  </a>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {SOCIAL_SHARE.map(s => (
                      <a
                        key={s.name}
                        href={s.href}
                        target="_blank" rel="noopener noreferrer"
                        title={`Share on ${s.name}`}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          width: 30, height: 30, borderRadius: '50%',
                          background: '#F3F4F6', color: s.color,
                          textDecoration: 'none', transition: 'all 0.15s',
                          flexShrink: 0,
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = s.color; e.currentTarget.style.color = '#fff'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#F3F4F6'; e.currentTarget.style.color = s.color; }}
                      >
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filter Bottom Sheet */}
        {mobileFilterOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 3000, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <div onClick={() => setMobileFilterOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.48)' }} />
            <div style={{
              position: 'relative', zIndex: 3001, background: '#fff',
              borderTopLeftRadius: 20, borderTopRightRadius: 20,
              maxHeight: '82vh', display: 'flex', flexDirection: 'column',
              boxShadow: '0 -4px 24px rgba(0,0,0,0.18)',
            }}>
              <div style={{
                padding: '16px 20px', borderBottom: '1px solid #E5E7EB',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#201F23', margin: 0 }}>Filter Grid®</h3>
                <button onClick={() => setMobileFilterOpen(false)} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#6B7280', lineHeight: 1 }}>✕</button>
              </div>
              <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#201F23', marginBottom: 12 }}>Select Grid® View</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {gridViewOptions.map(opt => (
                      <RadioOption key={opt.id} opt={opt} active={selectedView === opt.id} onClick={() => setSelectedView(opt.id)} />
                    ))}
                  </div>
                </div>
                <div style={{ height: 1, background: '#E5E7EB', marginBottom: 20 }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#201F23', marginBottom: 12 }}>Select Company Size</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {segmentOptions.map(opt => (
                      <RadioOption key={opt.id} opt={opt} active={selectedSegment === opt.id} onClick={() => setSelectedSegment(opt.id)} />
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ padding: '12px 20px', borderTop: '1px solid #E5E7EB', display: 'flex', gap: 12 }}>
                <button
                  onClick={() => { setSelectedView('grid'); setSelectedSegment('all'); }}
                  style={{ flex: 1, padding: '11px 0', borderRadius: 8, border: '1px solid #D1D5DB', background: '#fff', color: '#201F23', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
                >Reset</button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  style={{ flex: 1, padding: '11px 0', borderRadius: 8, border: 'none', background: '#5A39A2', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
                >Apply</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .g2grid-sidebar { display: none !important; }
          .g2grid-mobile-bar { display: flex !important; }
        }
        @media (min-width: 769px) {
          .g2grid-mobile-bar { display: none !important; }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   LEARN MORE SECTION
───────────────────────────────────────────── */
const LEARN_MORE_TOPICS = [
  { id: 'what-is', label: 'What is active learning software?' },
  { id: 'how-it-works', label: 'How do active learning tools work in machine learning?' },
  { id: 'common-features', label: 'What are the common features of active learning tools?' },
  { id: 'types', label: 'Types of active learning tools' },
  { id: 'benefits', label: 'What are the benefits of active learning tools?' },
  { id: 'challenges', label: 'Challenges of active learning tools' },
  { id: 'vs-reinforcement', label: 'Active learning vs. reinforcement learning' },
  { id: 'use-cases', label: 'Active learning tools use cases' },
  { id: 'related-software', label: 'Software and services related to active learning tools' },
  { id: 'pricing', label: 'Active learning software pricing' },
  { id: 'which-companies', label: 'Which companies should buy active learning tools?' },
  { id: 'how-to-choose', label: 'How to choose the best active learning tools' },
  { id: 'who-uses', label: 'Who uses active learning tools?' },
  { id: 'trends', label: 'Active learning tools trends' },
];

const LEARN_MORE_CONTENT = [
  {
    id: 'what-is',
    heading: 'What is active learning software?',
    body: [
      { type: 'p', text: 'Active learning tools are advanced ML tools that train on labeled data and continuously refine their models to predict labels for unlabeled data points. Active learners are commonly used in computer vision tasks like image recognition, segmentation, and object detection. When the model faces uncertainty, such as with ambiguous data or edge cases, it uses the "human-in-the-loop" technique to involve human annotators in correcting errors, refining predictions, and enhancing overall accuracy.' },
      { type: 'p', text: 'Active learning software determines a data point\'s class based on Euclidean distance or its position on the classification boundary, generating a confidence score. If the score is low for the predicted label, the model queries a human, making it a semi-supervised process where the model learns while actively engaging the user.' },
      { type: 'p', text: 'Businesses using these tools can reduce data labeling costs, improve dataset quality, and optimize budgets. Active learning tools work in compliance with ML software, MLOps platforms, artificial intelligence (AI) software, and data science platforms to build accurate models and achieve positive outcomes.' },
    ],
  },
  {
    id: 'how-it-works',
    heading: 'How do active learning tools work in machine learning?',
    body: [
      { type: 'p', text: 'Below is the complete process of how active learning tools use background knowledge to identify unlabeled test data and enhance its accuracy with retraining.' },
      {
        type: 'ul', items: [
          { label: 'Starting small:', text: 'The process begins by training the ML model on the provided labeled dataset, which is essentially 10% of the total training dataset. It also provides a solid foundation for the ML tool\'s initial training.' },
          { label: 'Model training:', text: 'Using the available data, the active learning system trains one or multiple ML models (committee of models), which will work on the rest of the 90% unlabeled dataset.' },
          { label: 'Query strategy:', text: 'A query strategy selects the most informative unlabeled data. The points that the algorithm is most uncertain about are mined and kept aside for human intervention.' },
          { label: 'Human-in-the-loop:', text: 'The accuracy and precision of active learning tools stem from human involvement in data labeling. The ML model identifies data points to query based on their informativeness, and human intervention occurs only when the model is most uncertain about a decision.' },
          { label: 'Retraining:', text: 'Once the newly trained dataset is added, the model retrains, predicting uncertain data points and integrating these learnings into its main algorithm. This continuous cycle of querying, labeling, and retraining improves the model\'s accuracy, speed, and resource efficiency.' },
        ]
      },
    ],
  },
  {
    id: 'common-features',
    heading: 'What are the common features of active learning tools?',
    body: [
      { type: 'p', text: 'Active learning tools efficiently handle large data volumes, using real-time user feedback to boost performance. Let\'s explore the features offered by some best active learning solutions.' },
      {
        type: 'ul', items: [
          { label: 'Automated query strategies:', text: 'These tools use query strategies like uncertainty sampling, random sampling, and margin sampling to identify the most informative data points for human review.' },
          { label: 'Integration with existing ML frameworks:', text: 'Active learning tools are compatible with key ML frameworks like PyTorch, Python Keras, TensorFlow, and Scikit-Learn, allowing developers to code efficiently and save time.' },
          { label: 'Scalability:', text: 'An active learning-powered ML model processes large datasets of various types. These tools adapt to all user inputs, integrating learnings into their core training dataset for retraining and performance enhancement.' },
          { label: 'Faster model training:', text: 'Retraining on new data points allows the ML model to excel in live testing environments, minimizing error risks and passing quality assurance during production unit testing.' },
          { label: 'Data labeling:', text: 'Active learning tools manage, track, and label large volumes of unlabeled datasets without requiring separate database management tools.' },
          { label: 'Performance metrics and analytics:', text: 'Built-in performance metrics and analytics dashboards highlight the impact of labeled data on model efficiency, helping to reduce errors and risks.' },
          { label: 'Customizable querying:', text: 'Active learning supports flexible, customizable query strategies tailored to various use cases, enhancing accuracy.' },
          { label: 'Collaboration and interactivity:', text: 'These tools thoroughly review training data and repurpose elements to aid in classifying unlabeled datasets while continuously collaborating with users for process refinement.' },
          { label: 'Data annotation:', text: 'Active learning tools simplify data annotation through an integrated query system, eliminating the need for API calls to external systems.' },
        ]
      },
    ],
  },
  {
    id: 'types',
    heading: 'Types of active learning tools',
    body: [
      { type: 'p', text: 'Active learning tools can be classified based on their data labeling approach, as well as the uncertainty measure and confidence score generated by the model. Depending on the dataset\'s difficulty level, businesses can utilize two types of active learning tools.' },
      { type: 'h4', text: 'Query synthesis' },
      { type: 'p', text: 'This approach is ideal for labeling challenging data points that the ML model rates with an unusually high confidence score. Query synthesis identifies data points that misalign with the overall data distribution.' },
      {
        type: 'ul', items: [
          { label: 'Generative AI software:', text: 'These tools train algorithms on unlabeled data pools by creating clusters of informative data points based on real-world distributions.' },
          { label: 'Simulated environments:', text: 'These tools generate synthetic data points based on their distance from the classification boundary, utilizing active learning in simulated environments.' },
        ]
      },
      { type: 'h4', text: 'Sampling methods' },
      { type: 'p', text: 'Sampling methods select the most informative data points from new incoming unlabeled data streams. Key types include:' },
      {
        type: 'ul', items: [
          { label: 'Uncertainty sampling:', text: 'Clusters incoming unlabeled data based on a preset threshold or informative score, indicating the ML model\'s uncertainty in predicting these points\' classes.' },
          { label: 'Least confidence sampling:', text: 'Targets data points with the lowest confidence scores, indicating high uncertainty.' },
          { label: 'Policy-based active learning (PAL):', text: 'Enables stream-based selective sampling in a reinforcement context.' },
          { label: 'Margin sampling:', text: 'Prioritizes data points near the classification boundary.' },
          { label: 'Entropy-based sampling:', text: 'Only clusters the unlabeled data points that have competing hypotheses and are highly uncertain about labeling.' },
          { label: 'Random sampling:', text: 'The algorithm randomly samples incoming unlabeled points and clusters them into different groups.' },
          { label: 'Query by committee (QBC):', text: 'An ensemble of ML models that collectively agree or disagree on label prediction.' },
          { label: 'Diversity sampling tools:', text: 'Focuses on selecting heterogeneous data variables that are not labeled in the training set.' },
          { label: 'Expected model change:', text: 'The ML model only queries data points expected to significantly impact accuracy and precision.' },
        ]
      },
    ],
  },
  {
    id: 'benefits',
    heading: 'What are the benefits of active learning tools?',
    body: [
      { type: 'p', text: 'Active learning solutions are resource-efficient for companies that relied heavily on data labeling software and annotators. Let\'s look at some of the major benefits.' },
      {
        type: 'ul', items: [
          { label: 'Cost-effectiveness:', text: 'Active learning software trains on small labeled datasets, using previous learnings to predict data classes, significantly reducing the need for costly data labeling.' },
          { label: 'Faster model performance:', text: 'By focusing on the most informative samples, these tools improve prediction accuracy and retrain models on new data, boosting performance on real-world test data.' },
          { label: 'Faster time to market:', text: 'Active learning accelerates the machine development lifecycle, enabling faster assembly and deployment of models through collaborative data handling.' },
          { label: 'Optimized resource utilization:', text: 'Increased collaboration and rigorous training make these tools more efficient than unsupervised ML algorithms, saving valuable time for data scientists.' },
          { label: 'Improved model generalization:', text: 'By using metrics like confidence scores and tensor values, these models rapidly self-learn, enhancing efficiency on unseen data.' },
          { label: 'Better for self-assist technology:', text: 'These tools excel in tasks such as object detection for autonomous vehicles, robotic vacuums, and voice recognition systems.' },
        ]
      },
    ],
  },
  {
    id: 'challenges',
    heading: 'Challenges of active learning tools',
    body: [
      { type: 'p', text: 'Even the best active learning solutions come with their own set of challenges. Some common challenges are mentioned below.' },
      {
        type: 'ul', items: [
          { label: 'Data growth:', text: 'Managing ever-growing datasets requires additional investments in data management solutions or network infrastructure, which can be costly.' },
          { label: 'Data security and compliance:', text: 'Ensuring compliance with GDPR and other legal standards is crucial when handling data.' },
          { label: 'Data preservation:', text: 'Maintaining data quality as it evolves can be tough, demanding investments into data archiving and backup software.' },
          { label: 'Data storage and retrieval cost:', text: 'Storing and retrieving data, especially high-resolution images, videos, and text datasets, can be costly.' },
          { label: 'Data accessibility:', text: 'Limited access to data, whether on-premises, in the cloud, or in hybrid environments, can hinder processing.' },
          { label: 'Format compatibility:', text: 'Accommodating all data formats often requires data conversion or parsing to prevent diverse formats from affecting ML model performance.' },
        ]
      },
    ],
  },
  {
    id: 'vs-reinforcement',
    heading: 'Active learning vs. reinforcement learning',
    body: [
      { type: 'p', text: 'Active learning and reinforcement learning are distinct machine learning algorithms that have their own unique approaches to data prediction.' },
      { type: 'p', text: 'Active learning is a semi-supervised machine learning technique where a small labeled dataset is paired with a larger unlabeled one for model training. These tools infer from labeled data and generate confidence scores for new data points, using factors like heuristics, probability distribution, and distance from classification boundaries. If the model is uncertain about a label, it queries a human annotator. Active learning is widely used in image synthesis, computer vision, and object detection.' },
      { type: 'p', text: 'In contrast, reinforcement learning is neither supervised nor unsupervised. It trains an agent by observing its actions in various scenarios, using a reward and penalty system to encourage positive behavior and discourage mistakes. Errors trigger a feedback loop, where a human guides the agent to align with new values. This iterative process fosters decision-making, trial and error, and dynamic data prediction. Reinforcement learning is primarily applied in gaming, robotics, and automation.' },
    ],
  },
  {
    id: 'use-cases',
    heading: 'Active learning tools use cases',
    body: [
      { type: 'p', text: 'Active learning tools have a wide set of practical applications across industries. Let\'s explore some use cases for key AI assistive tasks.' },
      {
        type: 'ul', items: [
          { label: 'Computer vision:', text: 'Companies that work with short datasets and high computational costs use these collaborative tools to detect, localize, and classify external objects with less time, resources, and production effort.' },
          { label: 'Object detection:', text: 'These tools reduce the manpower needed to feed large image sets for object detection. Especially useful when the model needs to declare the class of every external component and label them without any error.' },
          { label: 'Image classification:', text: 'These tools are pivotal in static or dynamic image classification by iteratively refining the ML model. Also used for medical imaging and simplifying disease identification.' },
          { label: 'Image restoration:', text: 'These tools can repair chipped or scrubbed images by analyzing the image style and template and matching it with unlabeled data.' },
          { label: 'Natural language processing:', text: 'These tools can be used for sentiment analysis and sequential modeling, training on fewer data samples to analyze newer text sequences.' },
          { label: 'Voice recognition solutions:', text: 'These tools can also be used for voice assistive technology like Amazon Echo, Google Home or Microsoft Cortana.' },
        ]
      },
    ],
  },
  {
    id: 'related-software',
    heading: 'Software and services related to active learning tools',
    body: [
      { type: 'p', text: 'Active learning tools lack direct alternatives, but the following related software can complement them. These tools help cut data costs, save resources, and accelerate ML model production.' },
      {
        type: 'ul', items: [
          { label: 'MLOps platforms:', text: 'MLOps supports the deployment, validation, testing, and production cycles of ML models. It ensures increased agility, efficiency, and production speed of well-trained active learning systems.' },
          { label: 'Data labeling software:', text: 'Data labeling software is essential for labeling data fields for model training. It powers active learning software by feeding it with the right and accurately labeled data.' },
          { label: 'Data science and machine learning platforms:', text: 'This suite offers comprehensive features like data analytics, data preparation, data visualization, model training, statistical interpretation, validation, and testing.' },
        ]
      },
    ],
  },
  {
    id: 'pricing',
    heading: 'Active learning software pricing',
    body: [
      { type: 'p', text: 'Active learning tools offer various pricing models, with costs typically influenced by factors like features, number of users, deployment scale, and the level of support and training needed. Common pricing models include:' },
      {
        type: 'ul', items: [
          { label: 'Subscription-based:', text: 'This is the most common model, where users pay a recurring fee for ongoing access to the tool.' },
          { label: 'Pay-as-you-go:', text: 'In this model, users are charged based on their actual usage, often measured by the number of data points processed or labels created.' },
          { label: 'One-time payment:', text: 'This model requires a single upfront payment for a perpetual license, granting indefinite access to the software.' },
        ]
      },
      { type: 'p', text: 'On average, prices can range from a few hundred dollars per month for basic licenses to thousands or even tens of thousands for enterprise-level solutions with extensive support and customization.' },
      { type: 'p', text: 'Most tools offer flexible pricing plans to accommodate different budgets and needs, and most vendors provide trial versions or demos for users to test features before making a commitment.' },
    ],
  },
  {
    id: 'which-companies',
    heading: 'Which companies should buy active learning tools?',
    body: [
      { type: 'p', text: 'Any industry or company with a development team can employ an active learning tool. Below are some major companies that can benefit from purchasing one.' },
      {
        type: 'ul', items: [
          { label: 'Financial institutions', text: 'handle complex data for tasks like credit control, risk analysis, account management, and loan approvals. Active learning tools reduce data complexity, speed up data labeling, and provide timely predictions for these critical tasks.' },
          { label: 'Healthcare organizations', text: 'manage diverse data, including medical records, patient information, and lab results, for activities like drug research and distribution.' },
          { label: 'Legal firms', text: 'benefit from active learning by categorizing and labeling legal documents, which optimizes document review, legal research, decision-making, and drafting.' },
          { label: 'Government agencies', text: 'use active learning tools to design policies, regulatory frameworks, election initiatives, and welfare programs.' },
          { label: 'Educational institutions', text: 'utilise active learning to create e-learning curriculums, organize webinars, and provide instant feedback, enhancing learning environments.' },
          { label: 'Retail and manufacturing companies', text: 'apply active learning to label supply chain data, forecast demand, and improve quality control.' },
        ]
      },
    ],
  },
  {
    id: 'how-to-choose',
    heading: 'How to choose the best active learning tools',
    body: [
      { type: 'p', text: 'Selecting the right active learning tool for your project requires careful consideration of several factors. Be sure to involve your data and machine learning teams to make an informed, efficient decision.' },
      {
        type: 'numbered', items: [
          { label: 'Define goals and requirements:', text: 'These tools are beneficial only if there\'s a clear understanding of business data and data scientists\' needs. Identify the specific use case and ensure the tool aligns with your data types and task complexity.' },
          { label: 'Identify key features:', text: 'Look for model compatibility, sampling strategies, scalability, ease of use, and thorough support and documentation.' },
          { label: 'Consider cost and licensing:', text: 'Review pricing models and trial options. Consider the balance between cost, features, and scalability, while staying within your budget.' },
          { label: 'Test and compare:', text: 'Use demos to test features, benchmark performance on your datasets, and read user reviews for additional insights.' },
          { label: 'Run a pilot:', text: 'After selecting a provider, take a customized demo to experience the software hands-on. This helps ensure a smooth decision-making process.' },
          { label: 'Post-implementation checks:', text: 'Subscribe to the best plan for your company, run quality control tests using your data. Ensure the platform maintains scalability, efficiency, and role-based access.' },
        ]
      },
    ],
  },
  {
    id: 'who-uses',
    heading: 'Who uses active learning tools?',
    body: [
      { type: 'p', text: 'Below are a few types of professionals who may use active learning software.' },
      {
        type: 'ul', items: [
          { label: 'IT administrators', text: 'use active learning tools to optimize data infrastructure for secure and efficient model training and deployment.' },
          { label: 'Data scientists', text: 'apply active learning to improve model accuracy and development speed by focusing on uncertain data points, reducing labeling costs.' },
          { label: 'Data analysts', text: 'automate data exploration, focusing on flagged data points that are critical for decision-making.' },
        ]
      },
      { type: 'p', text: 'Key teams benefiting from active learning:' },
      {
        type: 'ul', items: [
          { label: 'Machine learning teams', text: 'oversee the entire ML model cycle and develop forecasting strategies. Active learning tools enhance data quality and scalability, improving forecasting outcomes.' },
          { label: 'Data operations teams', text: 'ensure data quality and monitor model performance to prevent degradation. They use active learning to extract insights from customer feedback.' },
        ]
      },
    ],
  },
  {
    id: 'trends',
    heading: 'Active learning tools trends',
    body: [
      { type: 'p', text: 'At present, the need for highly agile ML algorithms that can manage and store large volumes of data is rapidly growing. Here\'s how active learning tools can contribute to this trend.' },
      {
        type: 'ul', items: [
          { label: 'Data storage alternative:', text: 'Active data archiving has emerged as a smarter data management solution. The user can move inactive or less frequently used data to cheaper storage systems. This can help users access quality data with ease and reduce data storage costs.' },
          { label: 'AI/MLOps for storage system management automation:', text: 'AI and MLOps simplify data storage and retrieval by using software libraries and automating access, allowing models to work more easily with data.' },
        ]
      },
      { type: 'authors', researched: 'Michael Pigott', reviewed: 'Jigmee Bhutia' },
    ],
  },
];

function LearnMoreSection({ categoryName }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(`lm-${id}`);
    if (el) {
      const offset = 40;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  // Render content blocks
  const renderBody = (body) =>
    body.map((block, i) => {
      if (block.type === 'p') {
        return (
          <p key={i} style={{ fontSize: 15, color: '#4B5563', lineHeight: 1.8, margin: '0 0 16px' }}>
            {block.text}
          </p>
        );
      }
      if (block.type === 'h4') {
        return (
          <h4 key={i} style={{ fontSize: 17, fontWeight: 800, color: '#201F23', margin: '24px 0 12px' }}>
            {block.text}
          </h4>
        );
      }
      if (block.type === 'ul' || block.type === 'numbered') {
        return (
          <ul key={i} style={{ listStyle: 'none', margin: '0 0 20px', padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {block.items.map((item, j) => (
              <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 15, lineHeight: 1.75 }}>
                {/* Purple/Blue Chevron Arrow Icon */}
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: 4,
                  color: '#5A39A2',
                }}>
                  <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
                    <path
                      d="M2 2L7 7L2 12"
                      stroke="#5A39A2"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <strong style={{ color: '#201F23', fontWeight: 700 }}>{item.label}</strong>{' '}
                  <span style={{ color: '#4B5563' }}>{item.text}</span>
                </div>
              </li>
            ))}
          </ul>
        );
      }
      if (block.type === 'authors') {
        return (
          <p key={i} style={{ fontSize: 14, color: '#6B7280', fontStyle: 'italic', marginTop: 24, lineHeight: 1.7 }}>
            Researched and written by <strong style={{ color: '#201F23' }}>{block.researched}</strong>
            <br />
            Reviewed and edited by <strong style={{ color: '#201F23' }}>{block.reviewed}</strong>
          </p>
        );
      }
      return null;
    });

  return (
    <div className="lm-section" style={{ background: '#fff', borderTop: '1px solid #E5E7EB', padding: '48px 0 64px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }} className="lm-inner-container">

        {/* Section heading */}
        <h2 className="lm-title" style={{
          fontSize: 28, fontWeight: 800, color: '#5A39A2',
          margin: '0 0 32px',
        }}>
          Learn More About {categoryName}
        </h2>

        <div className="lm-layout" style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>

          {/* ── Desktop Sticky Sidebar ── */}
          <aside
            className="lm-sidebar"
            style={{
              width: 270,
              flexShrink: 0,
              position: 'sticky',
              top: 24,
              alignSelf: 'flex-start',
              maxHeight: 'calc(100vh - 48px)',
              overflowY: 'auto',
              scrollbarWidth: 'none',
              zIndex: 10,
            }}
          >
            <div style={{
              background: '#fff',
              border: '1px solid #E5E7EB',
              borderRadius: 14,
              padding: '18px 0',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            }}>
              <div style={{
                fontSize: 13, fontWeight: 800, color: '#201F23',
                padding: '0 20px 12px',
                borderBottom: '1px solid #F3F4F6',
                letterSpacing: '0.03em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <span>{categoryName} Topics</span>
                <span style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#5A39A2',
                  background: '#F3F0FF',
                  padding: '2px 8px',
                  borderRadius: 999,
                }}>
                  {LEARN_MORE_TOPICS.length}
                </span>
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: '8px 0 0' }}>
                {LEARN_MORE_TOPICS.map(topic => (
                  <li key={topic.id}>
                    <button
                      onClick={() => scrollTo(topic.id)}
                      style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        padding: '8px 20px',
                        fontSize: 13,
                        fontWeight: 500,
                        lineHeight: 1.5,
                        color: '#201F23',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = '#201F23';
                        e.currentTarget.style.background = '#F9FAFB';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = '#201F23';
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      {topic.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* ── Mobile Accordion Toggle ── */}
          <div
            className="lm-mobile-toc"
            style={{
              display: 'none',
              width: '100%',
              marginBottom: 20,
            }}
          >
            <div style={{
              background: '#fff',
              border: '1px solid #E5E7EB',
              borderRadius: 12,
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}>
              <button
                onClick={() => setMobileOpen(o => !o)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  background: '#F9FAFB',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#5A39A2' }}>
                    {categoryName} Topics
                  </span>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    background: '#EDE9FE',
                    color: '#5A39A2',
                    padding: '2px 8px',
                    borderRadius: 999,
                  }}>
                    {LEARN_MORE_TOPICS.length}
                  </span>
                </div>
                <svg
                  width="18" height="18" viewBox="0 0 20 20" fill="#5A39A2"
                  style={{
                    transition: 'transform 0.2s ease',
                    transform: mobileOpen ? 'rotate(180deg)' : 'none',
                    flexShrink: 0,
                  }}
                >
                  <path d="M10 13.0625L5 8.0625L6.0625 7L10 10.9375L13.9375 7L15 8.0625L10 13.0625Z" />
                </svg>
              </button>
              {mobileOpen && (
                <ul style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: '6px 0',
                  borderTop: '1px solid #E5E7EB',
                  maxHeight: '360px',
                  overflowY: 'auto',
                }}>
                  {LEARN_MORE_TOPICS.map((topic, idx) => (
                    <li key={topic.id}>
                      <button
                        onClick={() => scrollTo(topic.id)}
                        style={{
                          display: 'block',
                          width: '100%',
                          textAlign: 'left',
                          padding: '10px 18px',
                          fontSize: 14,
                          color: '#201F23',
                          fontWeight: 500,
                          background: 'none',
                          border: 'none',
                          borderBottom: idx < LEARN_MORE_TOPICS.length - 1 ? '1px solid #F3F4F6' : 'none',
                          cursor: 'pointer',
                        }}
                      >
                        {topic.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* ── Main Content ── */}
          <div className="lm-content" style={{ flex: 1, minWidth: 0, width: '100%' }}>
            {LEARN_MORE_CONTENT.map((section, idx) => (
              <div
                key={section.id}
                id={`lm-${section.id}`}
                style={{
                  paddingBottom: 36,
                  marginBottom: idx < LEARN_MORE_CONTENT.length - 1 ? 16 : 0,
                  borderBottom: idx < LEARN_MORE_CONTENT.length - 1 ? '1px solid #F3F4F6' : 'none',
                  scrollMarginTop: 90,
                }}
              >
                <h3 style={{
                  fontSize: 20, fontWeight: 800, color: '#201F23',
                  margin: '0 0 16px',
                  paddingTop: idx === 0 ? 0 : 8,
                  lineHeight: 1.35,
                }}>
                  {section.heading}
                </h3>
                {renderBody(section.body)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 1023px) {
          .lm-section {
            padding: 32px 0 48px !important;
          }
          .lm-inner-container {
            padding: 0 16px !important;
          }
          .lm-title {
            font-size: 22px !important;
            margin-bottom: 20px !important;
          }
          .lm-layout {
            flex-direction: column !important;
            gap: 16px !important;
          }
          .lm-sidebar {
            display: none !important;
          }
          .lm-mobile-toc {
            display: block !important;
            width: 100% !important;
          }
          .lm-content {
            width: 100% !important;
            flex: none !important;
          }
        }
        @media (min-width: 1024px) {
          .lm-mobile-toc {
            display: none !important;
          }
        }
        .lm-sidebar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
