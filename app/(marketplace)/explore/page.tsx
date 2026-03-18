'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { GigCard } from '@/components/gigs/GigCard';
import { Button } from '@/components/ui/Button';
import { SlidersHorizontal, Star } from 'lucide-react';

const ALL_GIGS = [
  { id: '1', title: 'I will design a modern minimal logo for your brand', sellerName: 'Sarah J.', price: 150, rating: 4.9, ratingCount: 128, imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800', category: 'Design' },
  { id: '2', title: 'I will build a full-stack Next.js web application', sellerName: 'Alex M.', price: 800, rating: 5.0, ratingCount: 45, imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800', category: 'Development' },
  { id: '3', title: 'I will write SEO optimized blog articles and website copy', sellerName: 'Emma W.', price: 50, rating: 4.8, ratingCount: 312, imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead2708?auto=format&fit=crop&q=80&w=800', category: 'Writing' },
  { id: '4', title: 'I will create engaging short-form video content for TikTok/Reels', sellerName: 'David K.', price: 120, rating: 4.9, ratingCount: 89, imageUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f6128?auto=format&fit=crop&q=80&w=800', category: 'Video' },
  { id: '5', title: 'I will manage and grow your social media presence', sellerName: 'Lisa R.', price: 400, rating: 4.7, ratingCount: 201, imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800', category: 'Marketing' },
  { id: '6', title: 'I will design your mobile app UI/UX in Figma', sellerName: 'Marcus T.', price: 350, rating: 5.0, ratingCount: 67, imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800', category: 'Design' },
  { id: '7', title: 'I will develop a custom Shopify store with theme', sellerName: 'Nina P.', price: 600, rating: 4.8, ratingCount: 143, imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800', category: 'Development' },
  { id: '8', title: 'I will create a professional explainer video for your product', sellerName: 'Omar S.', price: 250, rating: 4.9, ratingCount: 78, imageUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800', category: 'Video' },
];

const CATEGORIES = ['All', 'Design', 'Development', 'Writing', 'Marketing', 'Video'];
const SORT_OPTIONS = ['Relevant', 'Best Rated', 'Lowest Price', 'Newest'];

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Relevant');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = ALL_GIGS
    .filter(g => activeCategory === 'All' || g.category === activeCategory)
    .filter(g => g.price >= priceRange[0] && g.price <= priceRange[1])
    .filter(g => g.rating >= minRating)
    .sort((a, b) => {
      if (sortBy === 'Best Rated') return b.rating - a.rating;
      if (sortBy === 'Lowest Price') return a.price - b.price;
      return 0;
    });

  return (
    <>
      <Navbar />
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Explore Services</h1>
            <p className="text-text-secondary">{filtered.length} services available</p>
          </div>

          {/* Sort + Filter Toggle */}
          <div className="flex flex-wrap gap-3 items-center mb-6">
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${activeCategory === cat ? 'bg-gradient-primary border-transparent text-white' : 'border-border text-text-secondary hover:text-white hover:border-white/20'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex gap-3 ml-auto">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="h-10 px-3 rounded-xl bg-surface border border-border text-sm text-white focus:outline-none focus:border-primary-blue"
              >
                {SORT_OPTIONS.map(opt => <option key={opt} value={opt} className="bg-surface">{opt}</option>)}
              </select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>

          <div className="flex gap-6">
            {/* Filter Sidebar */}
            {showFilters && (
              <aside className="w-64 flex-shrink-0 space-y-6">
                <div className="glass rounded-2xl p-5">
                  <h3 className="font-semibold text-white mb-4">Price Range</h3>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label className="text-xs text-text-secondary mb-1 block">Min ($)</label>
                        <input type="number" value={priceRange[0]} onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
                          className="w-full h-9 px-3 rounded-lg bg-background-dark border border-border text-white text-sm focus:outline-none focus:border-primary-blue" />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs text-text-secondary mb-1 block">Max ($)</label>
                        <input type="number" value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                          className="w-full h-9 px-3 rounded-lg bg-background-dark border border-border text-white text-sm focus:outline-none focus:border-primary-blue" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-2xl p-5">
                  <h3 className="font-semibold text-white mb-4">Minimum Rating</h3>
                  <div className="space-y-2">
                    {[0, 4, 4.5, 4.8].map(r => (
                      <button key={r} onClick={() => setMinRating(r)}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${minRating === r ? 'bg-primary-purple/20 text-white' : 'text-text-secondary hover:text-white'}`}>
                        <Star className="h-3.5 w-3.5 fill-warning text-warning" />
                        {r === 0 ? 'Any' : `${r}+`}
                      </button>
                    ))}
                  </div>
                </div>
              </aside>
            )}

            {/* Gig Grid */}
            <div className="flex-1">
              {filtered.length === 0 ? (
                <div className="text-center py-20 text-text-secondary">
                  <p className="text-xl mb-2">No services match your filters</p>
                  <Button variant="outline" onClick={() => { setActiveCategory('All'); setMinRating(0); setPriceRange([0, 1000]); }}>
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className={`grid gap-5 grid-cols-1 sm:grid-cols-2 ${showFilters ? 'lg:grid-cols-2 xl:grid-cols-3' : 'lg:grid-cols-3 xl:grid-cols-4'}`}>
                  {filtered.map(gig => <GigCard key={gig.id} {...gig} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
