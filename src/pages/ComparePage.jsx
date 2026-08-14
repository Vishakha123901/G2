import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { categoriesData } from '../data/categoriesData';

export default function ComparePage() {
  const [searchParams] = useSearchParams();
  const idsParam = searchParams.get('ids') || '';
  const selectedIds = idsParam.split(',').filter(Boolean);

  // Flatten all products across categories to find the selected ones
  const allProducts = categoriesData.flatMap(c => c.products || []);
  const products = selectedIds.length > 0
    ? selectedIds.map(id => allProducts.find(p => p.id === id)).filter(Boolean)
    : allProducts.slice(0, 3); // Fallback to first 3 products if none specified

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <span key={i} style={{ color: i < Math.floor(rating) ? '#FF4F00' : '#D1D5DB', fontSize: 16 }}>★</span>
    ));

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', fontFamily: '"Figtree", "Inter", sans-serif' }}>
      <Header />

      {/* Hero Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #E5E7EB', padding: '32px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 8 }}>
            <Link to="/" style={{ color: '#2563EB', textDecoration: 'none' }}>Home</Link> › <span>Compare Products</span>
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#1C1D21', margin: '0 0 8px' }}>
            Compare {products.map(p => p.name).join(' vs ')}
          </h1>
          <p style={{ fontSize: 15, color: '#6B7280', margin: 0 }}>
            Side-by-side comparison of ratings, features, and user sentiment.
          </p>
        </div>
      </div>

      {/* Comparison Grid */}
      <div style={{ maxWidth: 1280, margin: '32px auto', padding: '0 24px' }}>
        {products.length === 0 ? (
          <div style={{ background: '#fff', padding: 48, borderRadius: 12, textAlign: 'center', border: '1px solid #E5E7EB' }}>
            <h2 style={{ fontSize: 20, color: '#374151', marginBottom: 12 }}>No products selected for comparison</h2>
            <Link to="/" style={{ color: '#5E42C0', fontWeight: 600, textDecoration: 'none' }}>Back to Categories</Link>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${products.length}, minmax(280px, 1fr))`,
            gap: 24,
            alignItems: 'stretch',
          }}>
            {products.map((prod) => (
              <div key={prod.id} style={{
                background: '#fff',
                border: '1px solid #E5E7EB',
                borderRadius: 12,
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}>
                {/* Logo & Title */}
                <div style={{ textAlign: 'center', paddingBottom: 20, borderBottom: '1px solid #F3F4F6', marginBottom: 20 }}>
                  <div style={{
                    width: 80, height: 80, margin: '0 auto 16px',
                    border: '1px solid #E5E7EB', borderRadius: 12,
                    padding: 8, background: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <img src={prod.logo} alt={prod.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1C1D21', margin: '0 0 4px' }}>{prod.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 8 }}>
                    {renderStars(prod.rating)}
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginLeft: 4 }}>{prod.rating}/5</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>
                    ({typeof prod.reviewCount === 'number' ? prod.reviewCount.toLocaleString() : prod.reviewCount} reviews)
                  </div>
                </div>

                {/* Key Information */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', marginBottom: 6 }}>
                      Product Overview
                    </div>
                    <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.6, margin: 0 }}>
                      {prod.description || `${prod.name} is a highly rated solution offering top-tier capability for teams.`}
                    </p>
                  </div>

                  {/* Badges */}
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', marginBottom: 6 }}>
                      Classification
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      <span style={{ fontSize: 12, padding: '4px 10px', background: '#F3F4F6', borderRadius: 20, color: '#374151', fontWeight: 600 }}>
                        {prod.solutionType || 'Best-of-Breed'}
                      </span>
                      {prod.aiBadge && (
                        <span style={{ fontSize: 12, padding: '4px 10px', background: '#EDE9FE', borderRadius: 20, color: '#5E42C0', fontWeight: 600 }}>
                          {prod.aiBadge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Pros */}
                  {prod.pros && prod.pros.length > 0 && (
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', marginBottom: 8 }}>
                        Top Pros & Cons
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {prod.pros.map((p, i) => (
                          <div key={i} style={{
                            fontSize: 12, padding: '6px 10px', borderRadius: 6,
                            background: p.isCon ? '#FFF1F1' : '#F0FDF4',
                            color: p.isCon ? '#991B1B' : '#166534',
                            fontWeight: 600, display: 'flex', justifyContent: 'space-between'
                          }}>
                            <span>{p.isCon ? '👎' : '👍'} {p.label}</span>
                            <span>({p.count})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action CTA */}
                <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid #F3F4F6' }}>
                  <Link to={`/product/${prod.id}`} style={{
                    display: 'block', textAlign: 'center', background: '#5E42C0', color: '#fff',
                    padding: '12px 16px', borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: 'none'
                  }}>
                    View Product Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
