import { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { dealsData } from '../data/dealsData';
import { dealCategories, dealsListingData } from '../data/dealsListingData';

// Cards visible per breakpoint
const CARDS_DESKTOP = 4;
const CARDS_MOBILE  = 2;
const GAP           = 12; // px — matches G2's space-between="12"

export default function DealsPage() {
  const [pageDesktop, setPageDesktop] = useState(0);
  const [pageMobile,  setPageMobile]  = useState(0);
  const [selectedModalDeal, setSelectedModalDeal] = useState(null);

  const total             = dealsData.length;
  // Page-based counts → 12 cards: desktop = 3 pages, mobile = 6 pages
  const totalPagesDesktop = Math.ceil(total / CARDS_DESKTOP);
  const totalPagesMobile  = Math.ceil(total / CARDS_MOBILE);

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <span key={i} style={{ color: i < Math.floor(rating) ? '#FF4F00' : '#E5E7EB', fontSize: '13px' }}>★</span>
    ));

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }

        .deals-page {
          min-height: 100vh;
          background: #ffffff;
          width: 100%;
          overflow-x: hidden;
        }

        /* ── HERO ── */
        .deals-hero {
          width: 100%;
          padding: 32px 0 16px;
          background: #ffffff;
        }
        .deals-hero__inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 140px;
        }
        .deals-hero__title {
          font-size: 36px;
          font-weight: 700;
          color: #1C1D21;
          margin: 0 0 6px 0;
          line-height: 1.2;
        }
        .deals-hero__title .g2-orange { color: #FF4F00; }
        .deals-hero__subtitle {
          font-size: 15px;
          font-weight: 600;
          color: #1C1D21;
          margin: 0 0 20px 0;
        }

        /* ── CAROUSEL SECTION ── */
        .deals-carousel { width: 100%; padding: 0 0 60px 0; }
        .deals-carousel__inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 140px;
        }

        /* Outer wrapper — clips overflow, allows box-shadows */
        .carousel-clip {
          position: relative;
          overflow: hidden;
          padding: 4px 2px;
        }

        /* Sliding track */
        .carousel-track {
          display: flex;
          gap: 12px;
          transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform;
        }

        /* ── DEAL CARD ── */
        .deal-card {
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.12);
          padding: 18px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 250px;
          flex-shrink: 0;
          cursor: pointer;
          transition: box-shadow 0.2s ease, transform 0.15s ease;
        }
        .deal-card:hover {
          box-shadow: 0 8px 24px rgba(0,0,0,0.16);
          transform: translateY(-1px);
        }
        .deal-card__top {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }
        .deal-card__logo-wrap {
          width: 68px;
          height: 68px;
          flex-shrink: 0;
          border: 1px solid #E5E7EB;
          border-radius: 6px;
          padding: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
        }
        .deal-card__logo { width: 100%; height: 100%; object-fit: contain; }
        .deal-card__copy { flex: 1; min-width: 0; }
        .deal-card__name {
          font-size: 14px;
          font-weight: 600;
          color: #1C1D21;
          margin: 0 0 4px 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .deal-card__rating { display: flex; align-items: center; gap: 4px; }
        .deal-card__reviews { font-size: 11px; color: #71717A; }
        .deal-card__bottom { text-align: left; }
        .deal-card__value {
          font-size: 13px;
          font-weight: 600;
          color: #1C1D21;
          line-height: 1.4;
          word-break: break-word;
        }
        .deal-card__original {
          font-size: 12px;
          color: #9CA3AF;
          text-decoration: line-through;
          line-height: 1.4;
        }
        .deal-card__discount {
          font-size: 13px;
          font-weight: 700;
          color: #FF4F00;
          margin-top: 2px;
        }

        /* ── ARROW BUTTONS ── */
        .carousel-arrow {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #ffffff;
          border: 1px solid #D1D5DB;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          box-shadow: 0 2px 8px 2px rgba(32,31,35,0.10);
          transition: box-shadow 0.2s ease, border-color 0.2s ease;
          color: #374151;
        }
        .carousel-arrow:hover:not(:disabled) {
          box-shadow: 0 2px 8px 2px rgba(32,31,35,0.20);
          border-color: #9CA3AF;
        }
        .carousel-arrow:disabled { opacity: 0.35; cursor: not-allowed; box-shadow: none; }

        /* Dots */
        .carousel-dots { display: flex; align-items: center; gap: 6px; }
        .carousel-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #D1D5DB;
          cursor: pointer;
          border: none;
          padding: 0;
          transition: background 0.2s ease, transform 0.2s ease;
          flex-shrink: 0;
        }
        .carousel-dot.active { background: #2563EB; transform: scale(1.15); }

        /* Desktop absolute arrow positioning */
        .carousel-outer { position: relative; }
        .carousel-arrow--left-abs {
          position: absolute;
          left: -50px;
          top: 50%;
          transform: translateY(-50%);
        }
        .carousel-arrow--right-abs {
          position: absolute;
          right: -50px;
          top: 50%;
          transform: translateY(-50%);
        }

        /* Mobile inline nav bar */
        .carousel-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 20px;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1400px) {
          .deals-hero__inner, .deals-carousel__inner { padding-left: 80px; padding-right: 80px; }
          .carousel-arrow--left-abs  { left: -44px; }
          .carousel-arrow--right-abs { right: -44px; }
        }
        @media (max-width: 1200px) {
          .deals-hero__inner, .deals-carousel__inner { padding-left: 56px; padding-right: 56px; }
        }
        @media (max-width: 1024px) {
          .deals-hero__inner, .deals-carousel__inner { padding-left: 40px; padding-right: 40px; }
          .deals-hero__title { font-size: 32px; }
          .carousel-arrow--left-abs  { left: -38px; }
          .carousel-arrow--right-abs { right: -38px; }
        }
        @media (max-width: 768px) {
          .deals-hero__inner, .deals-carousel__inner { padding-left: 16px; padding-right: 16px; }
          .deals-hero__title { font-size: 28px; }
          .deals-hero { padding: 24px 0 12px; }
          .deals-carousel { padding: 0 0 40px 0; }
        }
        @media (max-width: 640px) {
          .deals-hero__title { font-size: 24px; }
        }

        /* ── SUBSCRIBE BANNER ── */
        .deals-subscribe {
          width: 100%;
          padding: 0 0 32px 0;
        }
        /* Outer wrapper: same max-width + padding as .deals-carousel__inner */
        .deals-subscribe__outer {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 140px;
        }
        /* The actual strip — full width of the carousel container */
        .deals-subscribe__inner {
          width: 100%;
          padding: 14px 20px;
          background: #ffffff;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.12);
          border: 1px solid #E5E7EB;
        }
        .deals-subscribe__left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .deals-subscribe__icon {
          width: 36px;
          height: 36px;
          flex-shrink: 0;
          fill: #1C1D21;
        }
        .deals-subscribe__text {
          font-size: 15px;
          font-weight: 700;
          color: #1C1D21;
          line-height: 1.4;
        }
        .deals-subscribe__btn {
          flex-shrink: 0;
          background: #5E42C0;
          color: #ffffff;
          font-size: 14px;
          font-weight: 700;
          padding: 10px 22px;
          border-radius: 6px;
          text-decoration: none;
          transition: background 0.2s ease, box-shadow 0.2s ease;
          white-space: nowrap;
        }
        .deals-subscribe__btn:hover {
          background: #4E35A6;
          box-shadow: 0 4px 12px rgba(94,66,192,0.35);
        }

        @media (max-width: 1400px) {
          .deals-subscribe__outer { padding-left: 80px; padding-right: 80px; }
        }
        @media (max-width: 1200px) {
          .deals-subscribe__outer { padding-left: 56px; padding-right: 56px; }
        }
        @media (max-width: 1024px) {
          .deals-subscribe__outer { padding-left: 40px; padding-right: 40px; }
        }
        @media (max-width: 768px) {
          .deals-subscribe__outer { padding-left: 16px; padding-right: 16px; }
          .deals-subscribe__inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          .deals-subscribe__btn { width: 100%; text-align: center; }
        }

        /* Show/hide by breakpoint */
        .deals-desktop-carousel { display: none; }
        .deals-mobile-carousel  { display: block; }
        @media (min-width: 600px) {
          .deals-desktop-carousel { display: block; }
          .deals-mobile-carousel  { display: none; }
        }

        /* ── DEALS LISTING SECTION ── */
        .deals-listing {
          width: 100%;
          padding: 0 0 60px 0;
        }
        .deals-listing__outer {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 140px;
          display: flex;
          gap: 24px;
          align-items: flex-start;
        }

        /* ── SIDEBAR ── */
        .dl-sidebar {
          width: 240px;
          flex-shrink: 0;
        }

        /* Mobile hamburger menu (hidden on desktop) */
        .dl-sidebar__mobile {
          display: none;
          background: #fff;
          border: 1px solid #E5E7EB;
          border-radius: 6px;
          margin-bottom: 16px;
          overflow: hidden;
        }
        .dl-sidebar__mobile-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          color: #1C1D21;
        }
        .dl-sidebar__mobile-list {
          display: none;
          border-top: 1px solid #E5E7EB;
        }
        .dl-sidebar__mobile-list.open { display: block; }

        /* Desktop sidebar card (hidden on mobile) */
        .dl-sidebar__desktop {
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.10);
          overflow: hidden;
          position: sticky;
          top: 16px;
        }
        .dl-sidebar__list {
          list-style: none;
          margin: 0;
          padding: 8px;
        }
        .dl-sidebar__item {
          margin-bottom: 2px;
        }
        .dl-sidebar__link {
          display: block;
          padding: 9px 14px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          background: none;
          border: none;
          width: 100%;
          text-align: left;
        }
        .dl-sidebar__link:hover {
          background: #F3F0FF;
          color: #5E42C0;
        }
        .dl-sidebar__link.active {
          background: #EDE9FE;
          color: #5E42C0;
          font-weight: 700;
        }

        /* ── MAIN CONTENT ── */
        .dl-main { flex: 1; min-width: 0; }

        /* Search + Sort bar */
        .dl-toolbar {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }
        .dl-search {
          flex: 1;
          min-width: 200px;
          position: relative;
        }
        .dl-search__icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #9CA3AF;
          pointer-events: none;
          width: 16px;
          height: 16px;
        }
        .dl-search__input {
          width: 100%;
          padding: 9px 12px 9px 36px;
          border: 1px solid #D1D5DB;
          border-radius: 6px;
          font-size: 14px;
          color: #1C1D21;
          outline: none;
          transition: border-color 0.15s ease;
        }
        .dl-search__input:focus { border-color: #5E42C0; box-shadow: 0 0 0 2px rgba(94,66,192,0.12); }
        .dl-sort {
          position: relative;
          flex-shrink: 0;
        }
        .dl-sort__label {
          font-size: 13px;
          color: #6B7280;
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
        }
        .dl-sort__select {
          border: none;
          background: none;
          font-size: 13px;
          font-weight: 700;
          color: #1C1D21;
          cursor: pointer;
          outline: none;
          padding: 0;
        }

        /* Product cards */
        .dl-card {
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          margin-bottom: 24px;
          overflow: hidden;
          border: 1px solid #E5E7EB;
        }

        /* Card head: logo + title block */
        .dl-card__head {
          display: flex;
          align-items: flex-start;
          gap: 24px;
          padding: 28px 32px 20px 32px;
        }
        .dl-card__logo-wrap {
          width: 144px;
          height: 144px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #E5E7EB;
          border-radius: 10px;
          padding: 10px;
          background: #ffffff;
        }
        .dl-card__logo {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        .dl-card__title-block {
          flex: 1;
          min-width: 0;
          padding-top: 4px;
        }
        .dl-card__name {
          font-size: 22px;
          font-weight: 700;
          color: #1C1D21;
          margin: 0 0 8px 0;
          line-height: 1.3;
        }
        .dl-card__rating {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          color: #2563EB;
          font-weight: 500;
        }

        /* Desktop Tabs row */
        .dl-card__desktop-tabs {
          display: flex;
          align-items: center;
          border-bottom: 1px solid #E5E7EB;
          padding: 0 32px;
          gap: 32px;
          list-style: none;
          margin: 12px 0 0 0;
        }
        .dl-card__desktop-tab {
          padding: 12px 0;
          font-size: 16px;
          font-weight: 500;
          color: #6B7280;
          cursor: pointer;
          border-bottom: 3px solid transparent;
          margin-bottom: -1px;
          background: none;
          border-top: none;
          border-left: none;
          border-right: none;
          transition: color 0.15s ease, border-color 0.15s ease;
          text-align: left;
        }
        .dl-card__desktop-tab.active {
          color: #1C1D21;
          font-weight: 700;
          border-bottom-color: #2563EB;
        }

        /* Tab body — desktop full content area */
        .dl-card__body {
          padding: 28px 32px 32px 32px;
        }

        /* Offer layout: left text (75%) + right coupon (25%) */
        .dl-card__offer-layout {
          display: flex;
          gap: 36px;
          align-items: flex-start;
        }
        .dl-card__offer-text {
          flex: 1;
          min-width: 0;
        }
        .dl-card__offer-heading {
          font-size: 16px;
          font-weight: 700;
          color: #1C1D21;
          margin: 0 0 10px 0;
          line-height: 1.4;
        }
        .dl-card__offer-desc {
          font-size: 14px;
          color: #4B5563;
          line-height: 1.65;
          margin: 0 0 20px 0;
        }
        .dl-card__how-label {
          font-size: 14px;
          font-weight: 700;
          color: #1C1D21;
          margin-bottom: 6px;
        }
        .dl-card__how-text {
          font-size: 14px;
          color: #4B5563;
          line-height: 1.6;
          white-space: pre-wrap;
          margin: 0;
        }

        /* Coupon tease — right column desktop */
        .dl-card__coupon {
          flex-shrink: 0;
          width: 220px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          text-align: right;
        }
        .dl-card__coupon-brand {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 15px;
          font-weight: 700;
          color: #1C1D21;
          margin-bottom: 8px;
        }
        .dl-card__coupon-g2logo {
          width: 22px;
          height: 22px;
          flex-shrink: 0;
        }
        .dl-card__coupon-value {
          font-size: 14px;
          font-weight: 700;
          color: #1C1D21;
          line-height: 1.4;
          word-break: break-word;
          margin-bottom: 2px;
        }
        .dl-card__coupon-original {
          font-size: 13px;
          color: #9CA3AF;
          text-decoration: line-through;
          line-height: 1.4;
          margin-bottom: 2px;
        }
        .dl-card__coupon-discount {
          font-size: 15px;
          font-weight: 700;
          color: #FF492C;
          margin-bottom: 18px;
        }
        .dl-card__coupon-btn {
          display: inline-block;
          background: #5E42C0;
          color: #ffffff;
          font-size: 14px;
          font-weight: 700;
          padding: 12px 28px;
          border-radius: 28px;
          text-decoration: none;
          text-align: center;
          transition: background 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 4px 12px rgba(94,66,192,0.3);
          border: none;
        }
        .dl-card__coupon-btn:hover {
          background: #4E35A6;
          box-shadow: 0 4px 12px rgba(94,66,192,0.35);
        }

        /* Overview tab */
        .dl-card__overview-title {
          font-size: 15px;
          font-weight: 700;
          color: #1C1D21;
          margin: 0 0 8px 0;
        }
        .dl-card__overview-text {
          font-size: 14px;
          color: #374151;
          line-height: 1.6;
          margin: 0 0 12px 0;
        }
        .dl-card__overview-meta {
          font-size: 13px;
          color: #6B7280;
          line-height: 1.8;
        }

        /* Mobile View: Accordion elements (shown <= 768px) */
        .dl-card__mobile-accordion { display: none; }
        .dl-card__desktop-view { display: block; }

        @media (max-width: 768px) {
          .dl-card__desktop-view { display: none; }
          .dl-card__mobile-accordion { display: block; }

          .dl-card {
            width: 92%;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
          }

          .dl-card__head {
            padding: 20px 16px;
            gap: 16px;
          }
          .dl-card__logo-wrap {
            width: 84px;
            height: 84px;
            border-radius: 8px;
            padding: 6px;
          }
          .dl-card__name {
            font-size: 18px;
          }

          .dl-card__acc-divider {
            height: 1px;
            background: #E5E7EB;
            width: 100%;
          }

          .dl-card__acc-header {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 20px;
            background: none;
            border: none;
            border-bottom: 1px solid #E5E7EB;
            cursor: pointer;
            text-align: left;
          }

          .dl-card__acc-header-left {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .dl-card__acc-badge {
            background: #5E42C0;
            color: #ffffff;
            font-size: 12px;
            font-weight: 700;
            padding: 4px 10px;
            border-radius: 16px;
            white-space: nowrap;
          }

          .dl-card__acc-title {
            font-size: 16px;
            font-weight: 700;
            color: #1C1D21;
          }

          .dl-card__acc-chevron {
            color: #4B5563;
            transition: transform 0.2s ease;
            width: 20px;
            height: 20px;
            flex-shrink: 0;
          }
          .dl-card__acc-chevron.open {
            transform: rotate(180deg);
          }

          .dl-card__acc-body {
            padding: 20px;
            border-bottom: 1px solid #E5E7EB;
            background: #ffffff;
          }

          .dl-card__coupon-mobile {
            margin-top: 16px;
            padding-top: 16px;
            border-top: 1px dashed #E5E7EB;
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          .dl-card__coupon-mobile .dl-card__coupon-btn {
            width: 100%;
            display: block;
            margin-top: 8px;
          }
        }

        /* ── LISTING RESPONSIVE ── */
        @media (max-width: 1400px) {
          .deals-listing__outer { padding-left: 80px; padding-right: 80px; }
        }
        @media (max-width: 1200px) {
          .deals-listing__outer { padding-left: 56px; padding-right: 56px; }
          .dl-sidebar { width: 210px; }
        }
        @media (max-width: 1024px) {
          .deals-listing__outer { padding-left: 40px; padding-right: 40px; }
        }
        @media (max-width: 900px) {
          /* Hide desktop sidebar, show mobile dropdown */
          .deals-listing__outer { flex-direction: column; }
          .dl-sidebar__desktop  { display: none; }
          .dl-sidebar__mobile   { display: block; }
          .dl-sidebar           { width: 100%; position: static; }
        }
        @media (max-width: 768px) {
          .deals-listing__outer { padding-left: 16px; padding-right: 16px; }
          .deals-listing { padding-bottom: 40px; }
        }

        /* ── EXCLUSIVE OFFER MODAL ── */
        .g2-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(3px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          animation: modalFadeIn 0.2s ease;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .g2-modal-container {
          background: #ffffff;
          border-radius: 4px;
          width: 100%;
          max-width: 380px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
          position: relative;
          animation: modalSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes modalSlideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .g2-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 20px;
          border-bottom: 1px solid #E5E7EB;
          background: #ffffff;
        }

        .g2-modal-header-title {
          font-size: 15px;
          font-weight: 600;
          color: #1C1D21;
        }

        .g2-modal-close-btn {
          background: none;
          border: none;
          font-size: 26px;
          color: #6B7280;
          cursor: pointer;
          line-height: 1;
          padding: 0 4px;
          transition: color 0.15s ease;
        }
        .g2-modal-close-btn:hover {
          color: #1C1D21;
        }

        .g2-modal-body {
          overflow-y: auto;
          flex: 1;
          max-height: calc(90vh - 52px);
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .g2-modal-body::-webkit-scrollbar { display: none; }

        .g2-modal-banner {
          height: 120px;
          background: linear-gradient(135deg, #041C2C 0%, #0d3b5e 100%);
          position: relative;
          flex-shrink: 0;
        }

        /* Logo + name row: logo overlaps banner bottom by ~half */
        .g2-modal-product-row {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 0 20px;
          margin-top: -44px;
          margin-bottom: 12px;
          position: relative;
          z-index: 3;
        }

        .g2-modal-logo-wrap {
          width: 88px;
          height: 88px;
          flex-shrink: 0;
          background: #ffffff;
          border: 3px solid #ffffff;
          border-radius: 6px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
        }

        .g2-modal-logo {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .g2-modal-name-block {
          padding-top: 48px; /* pushes name below the banner overlap */
        }

        .g2-modal-product-name {
          font-size: 20px;
          font-weight: 700;
          color: #1C1D21;
          margin: 0 0 4px 0;
          line-height: 1.2;
        }

        .g2-modal-rating-row {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
        }

        .g2-modal-reviews {
          color: #374151;
          font-weight: 400;
        }

        /* Description section */
        .g2-modal-desc-section {
          padding: 0 20px 16px 20px;
          border-bottom: 1px solid #E5E7EB;
        }

        .g2-modal-desc {
          font-size: 14px;
          color: #374151;
          line-height: 1.6;
          margin: 0 0 8px 0;
        }

        .g2-modal-read-reviews {
          font-size: 14px;
          font-weight: 500;
          color: #2563EB;
          text-decoration: none;
        }
        .g2-modal-read-reviews:hover { text-decoration: underline; }

        /* Gray "Offer Details" bar */
        .g2-modal-dark-bar {
          background: #6B7280;
          color: #ffffff;
          padding: 10px 20px;
          font-size: 14px;
          font-weight: 700;
        }

        .g2-modal-offer-section {
          padding: 16px 20px 20px 20px;
        }

        .g2-modal-offer-title {
          font-size: 15px;
          font-weight: 700;
          color: #1C1D21;
          margin: 0 0 10px 0;
          line-height: 1.4;
        }

        .g2-modal-offer-text {
          font-size: 14px;
          color: #374151;
          line-height: 1.6;
          margin: 0 0 14px 0;
        }

        .g2-modal-how-label {
          font-size: 14px;
          font-weight: 700;
          color: #1C1D21;
          margin: 0 0 6px 0;
        }

        .g2-modal-how-box { margin-bottom: 6px; }

        .g2-modal-how-text {
          font-size: 14px;
          color: #374151;
          line-height: 1.6;
          margin: 0;
          white-space: pre-wrap;
        }

        .g2-modal-show-more-btn {
          background: none;
          border: none;
          color: #2563EB;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          padding: 6px 0 0 0;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* Coupon tease — right-aligned row at bottom */
        .g2-modal-coupon-tease {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          text-align: right;
          padding: 14px 20px 20px 20px;
          border-top: 1px solid #E5E7EB;
        }

        .g2-modal-coupon-brand {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 15px;
          font-weight: 700;
          color: #1C1D21;
          margin-bottom: 6px;
        }

        .g2-modal-coupon-logo { width: 24px; height: 24px; }

        .g2-modal-coupon-val {
          font-size: 15px;
          font-weight: 700;
          color: #1C1D21;
          line-height: 1.4;
        }

        .g2-modal-coupon-orig {
          font-size: 13px;
          color: #9CA3AF;
          text-decoration: line-through;
          line-height: 1.4;
        }

        .g2-modal-coupon-disc {
          font-size: 15px;
          font-weight: 700;
          color: #374151;
          margin: 2px 0 14px 0;
        }

        .g2-modal-claim-btn {
          width: 100%;
          background: #5E42C0;
          color: #ffffff;
          font-size: 15px;
          font-weight: 700;
          padding: 12px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .g2-modal-claim-btn:hover { background: #4E35A6; }
      `}</style>

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
                <path d="M41.95 1c0-.55-.45-1-1-1L10.98.05c-.55 0-1 .45-1 1v4L1 5.06c-.55 0-1 .44-1 1l.05 29.96c0 3.3 2.69 5.98 5.99 5.98L36 41.95c1.6 0 3.11-.63 4.24-1.76s1.75-2.64 1.75-4.24L41.94 1zM2.04 36.01L1.99 7.05h7.99L10.03 36c0 1.07-.41 2.07-1.17 2.83A3.94 3.94 0 016.04 40a4.01 4.01 0 01-4-3.99zm36.79 2.77a3.94 3.94 0 01-2.82 1.17l-25.51.04c.99-1.1 1.53-2.51 1.53-4l-.05-29.96V2.04L39.94 2l.05 33.96c0 1.07-.41 2.07-1.17 2.83z"/>
                <path d="M16.22 14.02l19.98-.03c.26 0 .52-.11.71-.29a.99.99 0 00.29-.71V6c-.01-.55-.46-1-1.01-1l-19.98.03c-.26 0-.52.11-.71.29a.99.99 0 00-.29.71v6.99c.01.55.46 1 1.01 1zM35.19 7v4.99l-17.97.03V7.03L35.19 7zM24.23 26.85h-7.99c-.26.01-.52.12-.71.31a.99.99 0 00-.29.71v7.19c.01.55.46 1 1.01 1h7.99c.26-.01.52-.12.71-.31a.99.99 0 00.29-.71v-7.19c-.01-.55-.46-1-1.01-1zm-6.98 7.2v-5.19h5.98v5.19h-5.98zm-1.03-15.97h7.99c.55-.01 1-.46 1-1.01s-.45-1-1-1h-7.99c-.55.01-1 .46-1 1.01s.45 1 1 1zm.01 3.59h7.99c.55-.01 1-.46 1-1.01s-.45-1-1-1h-7.99c-.55.01-1 .46-1 1.01s.45 1 1 1zm0 3.6h7.99c.55-.01 1-.46 1-1.01s-.45-1-1-1h-7.99c-.55.01-1 .46-1 1.01s.45 1 1 1zm11.98-7.21h7.99c.55-.01 1-.46 1-1.01s-.45-1-1-1h-7.99c-.55.01-1 .46-1 1.01s.45 1 1 1zm.01 3.59h7.99c.55-.01 1-.46 1-1.01s-.45-1-1-1h-7.99c-.55.01-1 .46-1 1.01s.45 1 1 1zm0 3.6h7.99c.55-.01 1-.46 1-1.01s-.45-1-1-1h-7.99c-.55.01-1 .46-1 1.01s.45 1 1 1zm.01 3.59h7.99c.55-.01 1-.46 1-1.01s-.46-.99-1-1h-7.99c-.55.01-1 .46-1 1.01s.45 1 1 1zm0 3.6h7.99c.55-.01 1-.46 1-1.01s-.47-1-1-1h-7.99c-.55.01-1 .46-1 1.01s.45 1 1 1zm8 1.58h-7.99c-.55.01-1 .46-1 1.01s.45 1 1 1h7.99c.55-.01 1-.46 1-1.01s-.47-1.01-1-1z"/>
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
  const cardW   = `calc((100% - ${GAP * (cardsVisible - 1)}px) / ${cardsVisible})`;
  // Translate by one full "page" = container width + one gap
  const offset  = `calc((100% + ${GAP}px) * ${page} * -1)`;

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
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor"/>
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
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" fill="currentColor"/>
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
  const cardW  = `calc((100% - ${GAP * (cardsVisible - 1)}px) / ${cardsVisible})`;
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
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor"/>
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
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" fill="currentColor"/>
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
  const [activeTab, setActiveTab]           = useState({});   // { [deal.id]: 'offer' | 'overview' }
  const [searchQuery, setSearchQuery]       = useState('');
  const [sortBy, setSortBy]                 = useState('popularity');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getTab = (id) => activeTab[id] || 'offer';
  const setTab = (id, tab) => setActiveTab(prev => ({ ...prev, [id]: tab }));

  // Filter by category + search
  const filtered = dealsListingData.filter(d => {
    const matchCat    = activeCategory === 'all' || d.category === activeCategory;
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
                  <path d="M32 96h448v96H32zm0 128h448v96H32zm0 128h448v96H32z"/>
                </svg>
                {activeCatLabel}
              </span>
              <svg viewBox="0 0 10 10" width="12" height="12" fill="currentColor"
                style={{ transform: mobileMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                <path d="M10.001 8.015V3.957L5.017.915l-5.016 3v4l5-3z"/>
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
                <path d="M496 436L375 333c-13-12-26-17-37-16 29-34 46-77 46-125C384 86 298 0 192 0S0 86 0 192s86 192 192 192c48 0 91-17 125-46-1 11 4 24 16 37l103 121c17 20 46 21 64 4 17-18 16-47-4-64zM192 320c-71 0-128-57-128-128S121 64 192 64s128 57 128 128-57 128-128 128z"/>
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
                    <circle cx="500" cy="500" r="500" fill="#FF4F00"/>
                    <path fill="#fff" d="M716.4 383H631c2.3-13.4 10.6-20.9 27.4-29.4l15.7-8c28.1-14.4 43.1-30.7 43.1-57.3 0-16.7-6.5-29.9-19.4-39.4s-28.1-14.2-45.9-14.2a70.8 70.8 0 00-38.9 11.1c-11.7 7.2-20.4 16.5-25.8 28.1l24.7 24.8c9.6-19.4 23.5-28.9 41.8-28.9 15.5 0 25 8 25 19.1 0 9.3-4.6 17-22.4 26l-10.1 4.9c-21.9 11.1-37.1 23.8-45.9 38.2s-13.1 32.5-13.1 54.4v6h129.2zM705 459.2H563.6l-70.7 122.4h141.4L705 704.1l70.7-122.5L705 459.2z"/>
                    <path fill="#fff" d="M505.1 663.3c-90 0-163.3-73.3-163.3-163.3s73.3-163.3 163.3-163.3L561 219.8a286.4 286.4 0 00-55.9-5.5c-157.8 0-285.7 127.9-285.7 285.7s127.9 285.7 285.7 285.7a283.9 283.9 0 00168.2-54.8l-61.8-107.2a162.8 162.8 0 01-106.4 39.6z"/>
                  </svg>
                  <strong>Deals</strong>
                </div>

                {deal.currentPrice  && <div className="dl-card__coupon-value">{deal.currentPrice}</div>}
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
                  <circle cx="500" cy="500" r="500" fill="#FF4F00"/>
                  <path fill="#fff" d="M716.4 383H631c2.3-13.4 10.6-20.9 27.4-29.4l15.7-8c28.1-14.4 43.1-30.7 43.1-57.3 0-16.7-6.5-29.9-19.4-39.4s-28.1-14.2-45.9-14.2a70.8 70.8 0 00-38.9 11.1c-11.7 7.2-20.4 16.5-25.8 28.1l24.7 24.8c9.6-19.4 23.5-28.9 41.8-28.9 15.5 0 25 8 25 19.1 0 9.3-4.6 17-22.4 26l-10.1 4.9c-21.9 11.1-37.1 23.8-45.9 38.2s-13.1 32.5-13.1 54.4v6h129.2zM705 459.2H563.6l-70.7 122.4h141.4L705 704.1l70.7-122.5L705 459.2z"/>
                  <path fill="#fff" d="M505.1 663.3c-90 0-163.3-73.3-163.3-163.3s73.3-163.3 163.3-163.3L561 219.8a286.4 286.4 0 00-55.9-5.5c-157.8 0-285.7 127.9-285.7 285.7s127.9 285.7 285.7 285.7a283.9 283.9 0 00168.2-54.8l-61.8-107.2a162.8 162.8 0 01-106.4 39.6z"/>
                </svg>
                <strong>Deals</strong>
              </div>

              {deal.currentPrice  && <div className="dl-card__coupon-value">{deal.currentPrice}</div>}
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
                    <>Show Less <svg viewBox="0 0 10 10" width="12" height="12" fill="currentColor" style={{ marginLeft: 4, transform: 'rotate(180deg)' }}><path d="M10.001 8.015V3.957L5.017.915l-5.016 3v4l5-3z"/></svg></>
                  ) : (
                    <>Show More <svg viewBox="0 0 10 10" width="12" height="12" fill="currentColor" style={{ marginLeft: 4 }}><path d="M10.001 8.015V3.957L5.017.915l-5.016 3v4l5-3z"/></svg></>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Coupon tease — right-aligned at bottom */}
          <div className="g2-modal-coupon-tease">
            <div className="g2-modal-coupon-brand">
              <svg className="g2-modal-coupon-logo" viewBox="0 0 1000 1000" aria-hidden="true">
                <circle cx="500" cy="500" r="500" fill="#FF4F00"/>
                <path fill="#fff" d="M716.4 383H631c2.3-13.4 10.6-20.9 27.4-29.4l15.7-8c28.1-14.4 43.1-30.7 43.1-57.3 0-16.7-6.5-29.9-19.4-39.4s-28.1-14.2-45.9-14.2a70.8 70.8 0 00-38.9 11.1c-11.7 7.2-20.4 16.5-25.8 28.1l24.7 24.8c9.6-19.4 23.5-28.9 41.8-28.9 15.5 0 25 8 25 19.1 0 9.3-4.6 17-22.4 26l-10.1 4.9c-21.9 11.1-37.1 23.8-45.9 38.2s-13.1 32.5-13.1 54.4v6h129.2zM705 459.2H563.6l-70.7 122.4h141.4L705 704.1l70.7-122.5L705 459.2z"/>
                <path fill="#fff" d="M505.1 663.3c-90 0-163.3-73.3-163.3-163.3s73.3-163.3 163.3-163.3L561 219.8a286.4 286.4 0 00-55.9-5.5c-157.8 0-285.7 127.9-285.7 285.7s127.9 285.7 285.7 285.7a283.9 283.9 0 00168.2-54.8l-61.8-107.2a162.8 162.8 0 01-106.4 39.6z"/>
              </svg>
              <strong>Deals</strong>
            </div>
            {deal.currentPrice  && <div className="g2-modal-coupon-val">{deal.currentPrice}</div>}
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
        {deal.currentPrice  && <div className="deal-card__value">{deal.currentPrice}</div>}
        {deal.originalPrice && <div className="deal-card__original">{deal.originalPrice}</div>}
        <div className="deal-card__discount">{deal.discount}</div>
      </div>
    </div>
  );
}
