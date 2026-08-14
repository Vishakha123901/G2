import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductData } from '../data/productData';
import { Star, CheckCircle, ExternalLink, ThumbsUp, ArrowLeft, MessageSquare } from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = getProductData(id);
  const [activeTab, setActiveTab] = useState('overview');

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating) ? 'fill-[#FF492C] text-[#FF492C]' : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF7F5] flex flex-col text-[#201F23] font-sans">
      <Header />

      {/* Top Breadcrumbs Banner */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3 text-xs text-gray-500 flex items-center gap-2">
          <Link to="/" className="hover:text-[#FF492C] flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Home
          </Link>
          <span>/</span>
          <Link to={`/category/${product.categorySlug}`} className="hover:text-[#FF492C]">
            {product.category}
          </Link>
          <span>/</span>
          <span className="font-semibold text-gray-800">{product.name}</span>
        </div>
      </div>

      {/* Main Product Hero Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            {/* Left: Product Logo + Title + Badges */}
            <div className="flex items-start gap-5">
              <div className="w-20 h-20 rounded-xl bg-white border border-gray-200 p-3 flex items-center justify-center shadow-sm shrink-0">
                <img
                  src={product.logo}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg';
                  }}
                />
              </div>

              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{product.name}</h1>
                  <span className="bg-[#FFF0ED] text-[#FF492C] text-xs font-bold px-2.5 py-1 rounded-full border border-[#FFD5CC]">
                    {product.badge}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-1">
                  By <span className="font-medium text-gray-700">{product.vendor}</span> | {product.category}
                </p>

                {/* Rating summary */}
                <div className="flex items-center gap-3 mt-3">
                  {renderStars(product.rating)}
                  <span className="text-sm font-bold text-gray-900">{product.rating} out of 5</span>
                  <span className="text-xs text-gray-500">({product.reviewCount} user reviews)</span>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Link
                to="/leave-a-review"
                className="flex-1 md:flex-none text-center bg-[#FF492C] hover:bg-[#e03a1f] text-white font-semibold text-sm px-6 py-3 rounded-lg shadow-sm transition"
              >
                Write a Review
              </Link>
              <a
                href={product.website}
                target="_blank"
                rel="noreferrer"
                className="flex-1 md:flex-none flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 font-medium text-sm text-gray-700 px-5 py-3 rounded-lg transition"
              >
                Visit Website <ExternalLink className="w-4 h-4 text-gray-400" />
              </a>
            </div>

          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-8 border-b border-gray-200 mt-8 font-medium text-sm">
            {['overview', 'features', 'reviews', 'pricing'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 capitalize transition ${
                  activeTab === tab
                    ? 'border-b-2 border-[#FF492C] text-[#FF492C] font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-6 py-10 flex-1 w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Overview Section */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-3">What is {product.name}?</h2>
            <p className="text-gray-600 leading-relaxed text-sm">{product.description}</p>
          </div>

          {/* Key Ratings & Satisfaction Scores */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">G2 Satisfaction Ratings</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Object.entries(product.scores).map(([key, score]) => (
                <div key={key} className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-center">
                  <div className="text-2xl font-black text-[#FF492C]">{score}</div>
                  <div className="text-xs text-gray-500 font-medium capitalize mt-1">
                    {key.replace(/([AZ])/g, ' $1')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Reviews Section */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Verified User Reviews</h2>
                <p className="text-xs text-gray-500">Real feedback from actual software users</p>
              </div>
              <Link
                to="/leave-a-review"
                className="text-xs font-semibold text-[#FF492C] hover:underline flex items-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5" /> Add yours
              </Link>
            </div>

            <div className="space-y-6">
              {product.reviews.map((rev) => (
                <div key={rev.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-gray-900">{rev.author}</span>
                        <span className="inline-flex items-center gap-1 text-[11px] bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-200">
                          <CheckCircle className="w-3 h-3" /> Verified Buyer
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {rev.role} • {rev.companySize}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">{rev.date}</div>
                  </div>

                  <div className="mt-3">
                    {renderStars(rev.rating)}
                    <h3 className="text-base font-bold text-gray-900 mt-1">{rev.title}</h3>
                  </div>

                  <div className="mt-3 space-y-2 text-xs text-gray-600">
                    <div className="bg-green-50/50 p-3 rounded-md border border-green-100">
                      <span className="font-bold text-green-800 block mb-1">What do you like best?</span>
                      {rev.pros}
                    </div>
                    <div className="bg-orange-50/50 p-3 rounded-md border border-orange-100">
                      <span className="font-bold text-orange-800 block mb-1">What do you dislike?</span>
                      {rev.cons}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Sidebar: Pricing & Rating Breakdown */}
        <div className="space-y-6">
          
          {/* Pricing Box */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Pricing Plans</h3>
            <div className="space-y-3">
              {product.pricing.map((tier, idx) => (
                <div key={idx} className="p-3.5 bg-gray-50 rounded-lg border border-gray-200/80">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-gray-900">{tier.plan}</span>
                    <span className="font-bold text-sm text-[#FF492C]">{tier.price}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{tier.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Rating Breakdown Bar Chart */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Rating Breakdown</h3>
            <div className="space-y-2 text-xs text-gray-600">
              {Object.entries(product.ratingsBreakdown).map(([stars, pct]) => (
                <div key={stars} className="flex items-center gap-2">
                  <span className="w-12 capitalize">{stars.replace('Star', ' star')}</span>
                  <div className="flex-1 bg-gray-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#FF492C] h-full rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-8 text-right font-medium">{pct}%</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
}
