import { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { dealsData } from '../data/dealsData';
import { dealCategories, dealsListingData } from '../data/dealsListingData';
import './DealsPage.css';

// Cards visible per breakpoint
const CARDS_DESKTOP = 4;
const CARDS_MOBILE = 2;
const GAP = 12; // px — matches G2's space-between="12"

export default function DealsPage() {
  const [pageDesktop, setPageDesktop] = useState(0);
  const [pageMobile, setPageMobile] = useState(0);
  const [selectedModalDeal, setSelectedModalDeal] = useState(null);

  const total = dealsData.length;
  // Page-based counts → 12 cards: desktop = 3 pages, mobile = 6 pages
  const totalPagesDesktop = Math.ceil(total / CARDS_DESKTOP);
  const totalPagesMobile = Math.ceil(total / CARDS_MOBILE);

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <span key={i} style={{ color: i < Math.floor(rating) ? '#FF4F00' : '#E5E7EB', fontSize: '13px' }}>★</span>
    ));

  return (
    <>

      <div className="deals-page">
        <Header />

        {/* Hero */}
        <section className="deals-hero">
          <div className="deals-hero__inner">
            <h1 className="deals-hero__title">
              Save with <span className="g2-orange">G2 Deals.</span>
            </h1>
            <p className="deals-hero__subtitle">Go ahead, start shopping.</p>
          </div>
        </section>

        {/* Carousel */}
        <section className="deals-carousel">
          <div className="deals-carousel__inner">

            {/* ── DESKTOP (≥600px): 4 cards, arrows outside, dots below ── */}
            <DesktopCarousel
              deals={dealsData}
              page={pageDesktop}
              setPage={setPageDesktop}
              cardsVisible={CARDS_DESKTOP}
              totalPages={totalPagesDesktop}
              renderStars={renderStars}
              onOpenModal={setSelectedModalDeal}
            />

            {/* ── MOBILE (<600px): 2 cards, arrows inline with dots ── */}
            <MobileCarousel
              deals={dealsData}
              page={pageMobile}
              setPage={setPageMobile}
              cardsVisible={CARDS_MOBILE}
              totalPages={totalPagesMobile}
              renderStars={renderStars}
              onOpenModal={setSelectedModalDeal}
            />

          </div>
        </section>

        {/* Subscribe Banner */}
        <section className="deals-subscribe">
          <div className="deals-subscribe__outer">
            <div className="deals-subscribe__inner">
              <div className="deals-subscribe__left">
                {/* Newsletter icon — matches G2's icon-newsletter SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 42 42"
                  className="deals-subscribe__icon"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M41.95 1c0-.55-.45-1-1-1L10.98.05c-.55 0-1 .45-1 1v4L1 5.06c-.55 0-1 .44-1 1l.05 29.96c0 3.3 2.69 5.98 5.99 5.98L36 41.95c1.6 0 3.11-.63 4.24-1.76s1.75-2.64 1.75-4.24L41.94 1zM2.04 36.01L1.99 7.05h7.99L10.03 36c0 1.07-.41 2.07-1.17 2.83A3.94 3.94 0 016.04 40a4.01 4.01 0 01-4-3.99zm36.79 2.77a3.94 3.94 0 01-2.82 1.17l-25.51.04c.99-1.1 1.53-2.51 1.53-4l-.05-29.96V2.04L39.94 2l.05 33.96c0 1.07-.41 2.07-1.17 2.83z" />
                  <path d="M16.22 14.02l19.98-.03c.26 0 .52-.11.71-.29a.99.99 0 00.29-.71V6c-.01-.55-.46-1-1.01-1l-19.98.03c-.26 0-.52.11-.71.29a.99.99 0 00-.29.71v6.99c.01.55.46 1 1.01 1zM35.19 7v4.99l-17.97.03V7.03L35.19 7zM24.23 26.85h-7.99c-.26.01-.52.12-.71.31a.99.99 0 00-.29.71v7.19c.01.55.46 1 1.01 1h7.99c.26-.01.52-.12.71-.31a.99.99 0 00.29-.71v-7.19c-.01-.55-.46-1-1.01-1zm-6.98 7.2v-5.19h5.98v5.19h-5.98zm-1.03-15.97h7.99c.55-.01 1-.46 1-1.01s-.45-1-1-1h-7.99c-.55.01-1 .46-1 1.01s.45 1 1 1zm.01 3.59h7.99c.55-.01 1-.46 1-1.01s-.45-1-1-1h-7.99c-.55.01-1 .46-1 1.01s.45 1 1 1zm0 3.6h7.99c.55-.01 1-.46 1-1.01s-.45-1-1-1h-7.99c-.55.01-1 .46-1 1.01s.45 1 1 1zm11.98-7.21h7.99c.55-.01 1-.46 1-1.01s-.45-1-1-1h-7.99c-.55.01-1 .46-1 1.01s.45 1 1 1zm.01 3.59h7.99c.55-.01 1-.46 1-1.01s-.45-1-1-1h-7.99c-.55.01-1 .46-1 1.01s.45 1 1 1zm0 3.6h7.99c.55-.01 1-.46 1-1.01s-.45-1-1-1h-7.99c-.55.01-1 .46-1 1.01s.45 1 1 1zm.01 3.59h7.99c.55-.01 1-.46 1-1.01s-.46-.99-1-1h-7.99c-.55.01-1 .46-1 1.01s.45 1 1 1zm0 3.6h7.99c.55-.01 1-.46 1-1.01s-.47-1-1-1h-7.99c-.55.01-1 .46-1 1.01s.45 1 1 1zm8 1.58h-7.99c-.55.01-1 .46-1 1.01s.45 1 1 1h7.99c.55-.01 1-.46 1-1.01s-.47-1.01-1-1z" />
                </svg>
                <span className="deals-subscribe__text">Know the most current deals immediately</span>
              </div>
              <a href="https://www.g2.com/deals/digests/new" className="deals-subscribe__btn">
                Subscribe now
              </a>
            </div>
          </div>
        </section>

        {/* Deals Listing Section */}
        <DealsListingSection onOpenModal={setSelectedModalDeal} />

        {/* Exclusive Offer Modal Popup */}
        {selectedModalDeal && (
          <OfferModal deal={selectedModalDeal} onClose={() => setSelectedModalDeal(null)} />
        )}

        <Footer />
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   DESKTOP CAROUSEL
───────────────────────────────────────────── */
function DesktopCarousel({ deals, page, setPage, cardsVisible, totalPages, renderStars }) {
  // Each card takes 1/cardsVisible of container width minus gaps
  const cardW = `calc((100% - ${GAP * (cardsVisible - 1)}px) / ${cardsVisible})`;
  // Translate by one full "page" = container width + one gap
  const offset = `calc((100% + ${GAP}px) * ${page} * -1)`;

  return (
    <div className="deals-desktop-carousel">
      <div className="carousel-outer">
        <button
          className="carousel-arrow carousel-arrow--left-abs"
          onClick={() => setPage(p => Math.max(0, p - 1))}
          disabled={page === 0}
          aria-label="Previous"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor" />
          </svg>
        </button>

        <div className="carousel-clip">
          <div className="carousel-track" style={{ transform: `translateX(${offset})` }}>
            {deals.map(deal => (
              <DealCard key={deal.id} deal={deal} cardW={cardW} renderStars={renderStars} />
            ))}
          </div>
        </div>

        <button
          className="carousel-arrow carousel-arrow--right-abs"
          onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
          disabled={page >= totalPages - 1}
          aria-label="Next"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" fill="currentColor" />
          </svg>
        </button>
      </div>

      <div className="carousel-dots" style={{ justifyContent: 'center', marginTop: '20px' }}>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`carousel-dot${page === i ? ' active' : ''}`}
            onClick={() => setPage(i)}
            aria-label={`Page ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MOBILE CAROUSEL
───────────────────────────────────────────── */
function MobileCarousel({ deals, page, setPage, cardsVisible, totalPages, renderStars }) {
  const cardW = `calc((100% - ${GAP * (cardsVisible - 1)}px) / ${cardsVisible})`;
  const offset = `calc((100% + ${GAP}px) * ${page} * -1)`;

  return (
    <div className="deals-mobile-carousel">
      <div className="carousel-clip" style={{ padding: '4px 0' }}>
        <div className="carousel-track" style={{ transform: `translateX(${offset})` }}>
          {deals.map(deal => (
            <DealCard key={deal.id} deal={deal} cardW={cardW} renderStars={renderStars} />
          ))}
        </div>
      </div>

      <div className="carousel-nav">
        <button
          className="carousel-arrow"
          onClick={() => setPage(p => Math.max(0, p - 1))}
          disabled={page === 0}
          aria-label="Previous"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor" />
          </svg>
        </button>

        <div className="carousel-dots">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`carousel-dot${page === i ? ' active' : ''}`}
              onClick={() => setPage(i)}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>

        <button
          className="carousel-arrow"
          onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
          disabled={page >= totalPages - 1}
          aria-label="Next"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" fill="currentColor" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DEALS LISTING SECTION
───────────────────────────────────────────── */
function DealsListingSection({ onOpenModal }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTab, setActiveTab] = useState({});   // { [deal.id]: 'offer' | 'overview' }
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getTab = (id) => activeTab[id] || 'offer';
  const setTab = (id, tab) => setActiveTab(prev => ({ ...prev, [id]: tab }));

  // Filter by category + search
  const filtered = dealsListingData.filter(d => {
    const matchCat = activeCategory === 'all' || d.category === activeCategory;
    const matchSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'alphabetical') return a.name.localeCompare(b.name);
    if (sortBy === 'discount') {
      const pctA = parseInt(a.discount) || 0;
      const pctB = parseInt(b.discount) || 0;
      return pctB - pctA;
    }
    // popularity / latest → sort by reviews desc
    return b.reviews - a.reviews;
  });

  const activeCatLabel = dealCategories.find(c => c.slug === activeCategory)?.label || 'All offers';

  return (
    <section className="deals-listing">
      <div className="deals-listing__outer">

        {/* ── SIDEBAR ── */}
        <aside className="dl-sidebar">

          {/* Mobile: collapsible hamburger */}
          <div className="dl-sidebar__mobile">
            <button
              className="dl-sidebar__mobile-btn"
              onClick={() => setMobileMenuOpen(o => !o)}
              aria-expanded={mobileMenuOpen}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg viewBox="0 0 512 512" width="18" height="18" fill="currentColor">
                  <path d="M32 96h448v96H32zm0 128h448v96H32zm0 128h448v96H32z" />
                </svg>
                {activeCatLabel}
              </span>
              <svg viewBox="0 0 10 10" width="12" height="12" fill="currentColor"
                style={{ transform: mobileMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                <path d="M10.001 8.015V3.957L5.017.915l-5.016 3v4l5-3z" />
              </svg>
            </button>
            <ul className={`dl-sidebar__list dl-sidebar__mobile-list${mobileMenuOpen ? ' open' : ''}`}>
              {dealCategories.map(cat => (
                <li key={cat.slug} className="dl-sidebar__item">
                  <button
                    className={`dl-sidebar__link${activeCategory === cat.slug ? ' active' : ''}`}
                    onClick={() => { setActiveCategory(cat.slug); setMobileMenuOpen(false); }}
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop: visible card */}
          <div className="dl-sidebar__desktop">
            <ul className="dl-sidebar__list">
              {dealCategories.map(cat => (
                <li key={cat.slug} className="dl-sidebar__item">
                  <button
                    className={`dl-sidebar__link${activeCategory === cat.slug ? ' active' : ''}`}
                    onClick={() => setActiveCategory(cat.slug)}
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <div className="dl-main">

          {/* Toolbar: search + sort */}
          <div className="dl-toolbar">
            <div className="dl-search">
              <svg className="dl-search__icon" viewBox="0 0 512 512" fill="currentColor">
                <path d="M496 436L375 333c-13-12-26-17-37-16 29-34 46-77 46-125C384 86 298 0 192 0S0 86 0 192s86 192 192 192c48 0 91-17 125-46-1 11 4 24 16 37l103 121c17 20 46 21 64 4 17-18 16-47-4-64zM192 320c-71 0-128-57-128-128S121 64 192 64s128 57 128 128-57 128-128 128z" />
              </svg>
              <input
                type="text"
                className="dl-search__input"
                placeholder="Search software deals"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="dl-sort">
              <label className="dl-sort__label">
                Sort By:&nbsp;
                <select
                  className="dl-sort__select"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                >
                  <option value="popularity">popularity</option>
                  <option value="latest">latest</option>
                  <option value="discount">discount</option>
                  <option value="alphabetical">alphabetical</option>
                </select>
              </label>
            </div>
          </div>

          {/* Product cards */}
          {sorted.length === 0 ? (
            <div style={{ padding: '32px 0', textAlign: 'center', color: '#9CA3AF', fontSize: '14px' }}>
              No deals found.
            </div>
          ) : (
            sorted.map(deal => (
              <ProductCard key={deal.id} deal={deal} tab={getTab(deal.id)} setTab={setTab} onOpenModal={onOpenModal} />
            ))
          )}
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   INDIVIDUAL PRODUCT CARD
───────────────────────────────────────────── */
function ProductCard({ deal, tab, setTab, onOpenModal }) {
  const [mobileOfferOpen, setMobileOfferOpen] = useState(false);
  const [mobileOverviewOpen, setMobileOverviewOpen] = useState(false);

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <span key={i} style={{ color: i < Math.floor(rating) ? '#FF492C' : '#E5E7EB', fontSize: '15px', lineHeight: 1 }}>★</span>
    ));

  return (
    <div className="dl-card">

      {/* ── HEAD: logo + name + rating (Shared by Desktop & Mobile) ── */}
      <div className="dl-card__head">
        <div className="dl-card__logo-wrap">
          <img src={deal.image} alt={deal.name} className="dl-card__logo" />
        </div>
        <div className="dl-card__title-block">
          <h3 className="dl-card__name">{deal.name}</h3>
          <div className="dl-card__rating">
            <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>{renderStars(deal.rating)}</div>
            <span style={{ paddingLeft: '4px', color: '#2563EB', fontWeight: '500' }}>({deal.reviews.toLocaleString()})</span>
          </div>
        </div>
      </div>

      {/* ── DESKTOP VIEW: Tabs Layout ── */}
      <div className="dl-card__desktop-view">
        {/* Desktop Tabs Header */}
        <ul className="dl-card__desktop-tabs">
          <li>
            <button
              className={`dl-card__desktop-tab${tab === 'offer' ? ' active' : ''}`}
              onClick={() => setTab(deal.id, 'offer')}
            >
              Offer Details
            </button>
          </li>
          <li>
            <button
              className={`dl-card__desktop-tab${tab === 'overview' ? ' active' : ''}`}
              onClick={() => setTab(deal.id, 'overview')}
            >
              Overview
            </button>
          </li>
        </ul>

        {/* Desktop Tab Body */}
        <div className="dl-card__body">
          {tab === 'offer' && (
            <div className="dl-card__offer-layout">
              {/* Left: Offer Content (~75%) */}
              <div className="dl-card__offer-text">
                <div className="dl-card__offer-heading">{deal.offerTitle}</div>
                <p className="dl-card__offer-desc">{deal.offerDesc}</p>
                <div className="dl-card__how-label">How to claim this offer</div>
                <p className="dl-card__how-text">{deal.howToClaim}</p>
              </div>

              {/* Right: Coupon Tease (~25%) */}
              <div className="dl-card__coupon">
                <div className="dl-card__coupon-brand">
                  <svg
                    className="dl-card__coupon-g2logo"
                    viewBox="0 0 1000 1000"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <circle cx="500" cy="500" r="500" fill="#FF4F00" />
                    <path fill="#fff" d="M716.4 383H631c2.3-13.4 10.6-20.9 27.4-29.4l15.7-8c28.1-14.4 43.1-30.7 43.1-57.3 0-16.7-6.5-29.9-19.4-39.4s-28.1-14.2-45.9-14.2a70.8 70.8 0 00-38.9 11.1c-11.7 7.2-20.4 16.5-25.8 28.1l24.7 24.8c9.6-19.4 23.5-28.9 41.8-28.9 15.5 0 25 8 25 19.1 0 9.3-4.6 17-22.4 26l-10.1 4.9c-21.9 11.1-37.1 23.8-45.9 38.2s-13.1 32.5-13.1 54.4v6h129.2zM705 459.2H563.6l-70.7 122.4h141.4L705 704.1l70.7-122.5L705 459.2z" />
                    <path fill="#fff" d="M505.1 663.3c-90 0-163.3-73.3-163.3-163.3s73.3-163.3 163.3-163.3L561 219.8a286.4 286.4 0 00-55.9-5.5c-157.8 0-285.7 127.9-285.7 285.7s127.9 285.7 285.7 285.7a283.9 283.9 0 00168.2-54.8l-61.8-107.2a162.8 162.8 0 01-106.4 39.6z" />
                  </svg>
                  <strong>Deals</strong>
                </div>

                {deal.currentPrice && <div className="dl-card__coupon-value">{deal.currentPrice}</div>}
                {deal.originalPrice && <div className="dl-card__coupon-original">{deal.originalPrice}</div>}
                <div className="dl-card__coupon-discount">{deal.discount}</div>

                <a href="https://www.g2.com/deals" className="dl-card__coupon-btn" onClick={e => { e.preventDefault(); onOpenModal && onOpenModal(deal); }}>
                  Learn more
                </a>
              </div>
            </div>
          )}

          {tab === 'overview' && (
            <div>
              <div className="dl-card__overview-title">Product Description</div>
              <p className="dl-card__overview-text">{deal.offerDesc}</p>
              <p className="dl-card__overview-meta">
                <strong>Users: </strong>{deal.users} &middot; <strong>Industries: </strong>{deal.industries} &middot; <strong>Market Segment: </strong>{deal.marketSegment}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── MOBILE VIEW: Accordions Layout ── */}
      <div className="dl-card__mobile-accordion">
        <div className="dl-card__acc-divider"></div>

        {/* Accordion 1: Offer Details */}
        <button
          className="dl-card__acc-header"
          onClick={() => setMobileOfferOpen(prev => !prev)}
        >
          <div className="dl-card__acc-header-left">
            <span className="dl-card__acc-badge">{deal.discountBadge}</span>
            <span className="dl-card__acc-title">Offer Details</span>
          </div>
          <svg
            className={`dl-card__acc-chevron${mobileOfferOpen ? ' open' : ''}`}
            viewBox="0 0 10 10"
            fill="currentColor"
          >
            <path d="M10.001 8.015V3.957L5.017.915l-5.016 3v4l5-3z" />
          </svg>
        </button>

        {mobileOfferOpen && (
          <div className="dl-card__acc-body">
            <div className="dl-card__offer-heading">{deal.offerTitle}</div>
            <p className="dl-card__offer-desc">{deal.offerDesc}</p>
            <div className="dl-card__how-label">How to claim this offer</div>
            <p className="dl-card__how-text">{deal.howToClaim}</p>

            <div className="dl-card__coupon-mobile">
              <div className="dl-card__coupon-brand">
                <svg
                  className="dl-card__coupon-g2logo"
                  viewBox="0 0 1000 1000"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle cx="500" cy="500" r="500" fill="#FF4F00" />
                  <path fill="#fff" d="M716.4 383H631c2.3-13.4 10.6-20.9 27.4-29.4l15.7-8c28.1-14.4 43.1-30.7 43.1-57.3 0-16.7-6.5-29.9-19.4-39.4s-28.1-14.2-45.9-14.2a70.8 70.8 0 00-38.9 11.1c-11.7 7.2-20.4 16.5-25.8 28.1l24.7 24.8c9.6-19.4 23.5-28.9 41.8-28.9 15.5 0 25 8 25 19.1 0 9.3-4.6 17-22.4 26l-10.1 4.9c-21.9 11.1-37.1 23.8-45.9 38.2s-13.1 32.5-13.1 54.4v6h129.2zM705 459.2H563.6l-70.7 122.4h141.4L705 704.1l70.7-122.5L705 459.2z" />
                  <path fill="#fff" d="M505.1 663.3c-90 0-163.3-73.3-163.3-163.3s73.3-163.3 163.3-163.3L561 219.8a286.4 286.4 0 00-55.9-5.5c-157.8 0-285.7 127.9-285.7 285.7s127.9 285.7 285.7 285.7a283.9 283.9 0 00168.2-54.8l-61.8-107.2a162.8 162.8 0 01-106.4 39.6z" />
                </svg>
                <strong>Deals</strong>
              </div>

              {deal.currentPrice && <div className="dl-card__coupon-value">{deal.currentPrice}</div>}
              {deal.originalPrice && <div className="dl-card__coupon-original">{deal.originalPrice}</div>}
              <div className="dl-card__coupon-discount">{deal.discount}</div>

              <a href="https://www.g2.com/deals" className="dl-card__coupon-btn" onClick={e => { e.preventDefault(); onOpenModal && onOpenModal(deal); }}>
                Learn more
              </a>
            </div>
          </div>
        )}

        {/* Accordion 2: Overview */}
        <button
          className="dl-card__acc-header"
          onClick={() => setMobileOverviewOpen(prev => !prev)}
        >
          <div className="dl-card__acc-header-left">
            <span className="dl-card__acc-title">Overview</span>
          </div>
          <svg
            className={`dl-card__acc-chevron${mobileOverviewOpen ? ' open' : ''}`}
            viewBox="0 0 10 10"
            fill="currentColor"
          >
            <path d="M10.001 8.015V3.957L5.017.915l-5.016 3v4l5-3z" />
          </svg>
        </button>

        {mobileOverviewOpen && (
          <div className="dl-card__acc-body">
            <div className="dl-card__overview-title">Product Description</div>
            <p className="dl-card__overview-text">{deal.offerDesc}</p>
            <p className="dl-card__overview-meta">
              <strong>Users: </strong>Software Engineer, Project Manager &middot; <strong>Industries: </strong>Computer Software, IT & Services &middot; <strong>Market Segment: </strong>41% Small-Business, 41% Mid-Market
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
/* ─────────────────────────────────────────────
   OFFER MODAL — matches G2's exclusive offer modal
───────────────────────────────────────────── */
function OfferModal({ deal, onClose }) {
  const [showMore, setShowMore] = useState(false);

  // Close on Escape key + lock body scroll
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <span key={i} style={{ color: i < Math.floor(rating) ? '#FF4F00' : '#E5E7EB', fontSize: '15px' }}>★</span>
    ));

  const howText = deal.howToClaim || '';
  const truncated = howText.length > 180;
  const displayedHow = showMore || !truncated ? howText : howText.slice(0, 180) + '...';

  return (
    <div
      className="g2-modal-overlay"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={`Exclusive offer for ${deal.name}`}
    >
      <div className="g2-modal-container">

        {/* ── HEADER ── */}
        <div className="g2-modal-header">
          <span className="g2-modal-header-title">Now viewing an exclusive offer</span>
          <button className="g2-modal-close-btn" onClick={onClose} aria-label="Close">×</button>
        </div>

        {/* ── SCROLLABLE BODY ── */}
        <div className="g2-modal-body">

          {/* Dark banner */}
          <div className="g2-modal-banner" />

          {/* Logo + name row — logo overlaps banner bottom */}
          <div className="g2-modal-product-row">
            <div className="g2-modal-logo-wrap">
              <img src={deal.image} alt={deal.name} className="g2-modal-logo" />
            </div>
            <div className="g2-modal-name-block">
              <h2 className="g2-modal-product-name">{deal.name}</h2>
              <div className="g2-modal-rating-row">
                <div style={{ display: 'flex', gap: '2px' }}>{renderStars(deal.rating)}</div>
                <span className="g2-modal-reviews">({deal.reviews.toLocaleString()})</span>
              </div>
            </div>
          </div>

          {/* Description + read reviews */}
          <div className="g2-modal-desc-section">
            <p className="g2-modal-desc">{deal.offerDesc}</p>
            <a href="https://www.g2.com/deals" className="g2-modal-read-reviews">Read reviews...</a>
          </div>

          {/* Gray "Offer Details" bar */}
          <div className="g2-modal-dark-bar">Offer Details</div>

          {/* Offer content */}
          <div className="g2-modal-offer-section">
            <h3 className="g2-modal-offer-title">{deal.offerTitle}</h3>
            <p className="g2-modal-offer-text">{deal.offerDesc}</p>

            <div className="g2-modal-how-label">How to claim this offer</div>
            <div className="g2-modal-how-box">
              <p className="g2-modal-how-text">{displayedHow}</p>
              {truncated && (
                <button className="g2-modal-show-more-btn" onClick={() => setShowMore(s => !s)}>
                  {showMore ? (
                    <>Show Less <svg viewBox="0 0 10 10" width="12" height="12" fill="currentColor" style={{ marginLeft: 4, transform: 'rotate(180deg)' }}><path d="M10.001 8.015V3.957L5.017.915l-5.016 3v4l5-3z" /></svg></>
                  ) : (
                    <>Show More <svg viewBox="0 0 10 10" width="12" height="12" fill="currentColor" style={{ marginLeft: 4 }}><path d="M10.001 8.015V3.957L5.017.915l-5.016 3v4l5-3z" /></svg></>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Coupon tease — right-aligned at bottom */}
          <div className="g2-modal-coupon-tease">
            <div className="g2-modal-coupon-brand">
              <svg className="g2-modal-coupon-logo" viewBox="0 0 1000 1000" aria-hidden="true">
                <circle cx="500" cy="500" r="500" fill="#FF4F00" />
                <path fill="#fff" d="M716.4 383H631c2.3-13.4 10.6-20.9 27.4-29.4l15.7-8c28.1-14.4 43.1-30.7 43.1-57.3 0-16.7-6.5-29.9-19.4-39.4s-28.1-14.2-45.9-14.2a70.8 70.8 0 00-38.9 11.1c-11.7 7.2-20.4 16.5-25.8 28.1l24.7 24.8c9.6-19.4 23.5-28.9 41.8-28.9 15.5 0 25 8 25 19.1 0 9.3-4.6 17-22.4 26l-10.1 4.9c-21.9 11.1-37.1 23.8-45.9 38.2s-13.1 32.5-13.1 54.4v6h129.2zM705 459.2H563.6l-70.7 122.4h141.4L705 704.1l70.7-122.5L705 459.2z" />
                <path fill="#fff" d="M505.1 663.3c-90 0-163.3-73.3-163.3-163.3s73.3-163.3 163.3-163.3L561 219.8a286.4 286.4 0 00-55.9-5.5c-157.8 0-285.7 127.9-285.7 285.7s127.9 285.7 285.7 285.7a283.9 283.9 0 00168.2-54.8l-61.8-107.2a162.8 162.8 0 01-106.4 39.6z" />
              </svg>
              <strong>Deals</strong>
            </div>
            {deal.currentPrice && <div className="g2-modal-coupon-val">{deal.currentPrice}</div>}
            {deal.originalPrice && <div className="g2-modal-coupon-orig">{deal.originalPrice}</div>}
            <div className="g2-modal-coupon-disc">{deal.discount}</div>
            <button className="g2-modal-claim-btn" onClick={onClose}>Claim Offer</button>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SHARED DEAL CARD (carousel)
───────────────────────────────────────────── */
function DealCard({ deal, cardW, renderStars }) {
  return (
    <div className="deal-card" style={{ width: cardW }}>
      <div className="deal-card__top">
        <div className="deal-card__logo-wrap">
          <img src={deal.image} alt={deal.name} className="deal-card__logo" />
        </div>
        <div className="deal-card__copy">
          <div className="deal-card__name">{deal.name}</div>
          <div className="deal-card__rating">
            <div style={{ display: 'flex', gap: '1px' }}>{renderStars(deal.rating)}</div>
            <span className="deal-card__reviews">({deal.reviews.toLocaleString()})</span>
          </div>
        </div>
      </div>
      <div className="deal-card__bottom">
        {deal.currentPrice && <div className="deal-card__value">{deal.currentPrice}</div>}
        {deal.originalPrice && <div className="deal-card__original">{deal.originalPrice}</div>}
        <div className="deal-card__discount">{deal.discount}</div>
      </div>
    </div>
  );
}
