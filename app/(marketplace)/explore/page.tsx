'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { GigCard } from '@/components/gigs/GigCard';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SlidersHorizontal, Star, PackageOpen } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { useUser } from '@clerk/nextjs';
import { getProfileByClerkId } from '@/lib/profile';

const CATEGORIES = ['All', 'Design', 'Development', 'Writing', 'Marketing', 'Video'];
const SORT_OPTIONS = ['Relevant', 'Best Rated', 'Lowest Price', 'Newest'];

interface GigData {
  id: string;
  title: string;
  price: number;
  category: string;
  images: string[] | null;
  rating_avg: number;
  rating_count: number;
  created_at: string;
  profiles: {
    username: string;
    avatar_url: string | null;
  } | null;
}

export default function ExplorePage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [gigs, setGigs] = useState<GigData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Relevant');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery] = useState(initialQuery);
  const { user: currentUser } = useUser();

  useEffect(() => {
    async function fetchGigs() {
      setIsLoading(true);
      const supabaseClient = createClient();
      let query = supabaseClient
        .from('gigs')
        .select('*, profiles!seller_id(username, avatar_url)')
        .eq('is_active', true);

      if (currentUser) {
        const myProfile = await getProfileByClerkId(currentUser.id);
        if (myProfile) {
          query = query.neq('seller_id', myProfile.id);
        }
      }

      const { data, error } = await query;

      if (!error && data) {
        setGigs(data as GigData[]);
      }
      setIsLoading(false);
    }
    fetchGigs();
  }, [currentUser]);

  const filtered = gigs
    .filter(g => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return g.title.toLowerCase().includes(q) || (g.category || '').toLowerCase().includes(q);
      }
      return true;
    })
    .filter(g => activeCategory === 'All' || g.category === activeCategory)
    .filter(g => g.price >= priceRange[0] && g.price <= priceRange[1])
    .filter(g => (g.rating_avg || 0) >= minRating)
    .sort((a, b) => {
      if (sortBy === 'Best Rated') return (b.rating_avg || 0) - (a.rating_avg || 0);
      if (sortBy === 'Lowest Price') return a.price - b.price;
      if (sortBy === 'Newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      return 0;
    });

  return (
    <>
      <Navbar />
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {searchQuery ? `Results for "${searchQuery}"` : 'Explore Services'}
            </h1>
            <p className="text-text-secondary">
              {isLoading ? 'Loading...' : `${filtered.length} services available`}
            </p>
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
                        <label className="text-xs text-text-secondary mb-1 block">Min (DZD)</label>
                        <input type="number" value={priceRange[0]} onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
                          className="w-full h-9 px-3 rounded-lg bg-background-dark border border-border text-white text-sm focus:outline-none focus:border-primary-blue" />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs text-text-secondary mb-1 block">Max (DZD)</label>
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
              {isLoading ? (
                <div className={`grid gap-5 grid-cols-1 sm:grid-cols-2 ${showFilters ? 'lg:grid-cols-2 xl:grid-cols-3' : 'lg:grid-cols-3 xl:grid-cols-4'}`}>
                  {[1, 2, 3, 4].map(i => (
                    <Card key={i} className="animate-pulse">
                      <div className="aspect-video bg-white/5" />
                      <div className="p-4 space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-white/10" />
                          <div className="h-3 w-20 bg-white/10 rounded" />
                        </div>
                        <div className="h-4 w-full bg-white/10 rounded" />
                        <div className="h-4 w-2/3 bg-white/10 rounded" />
                        <div className="flex justify-between mt-4">
                          <div className="h-3 w-16 bg-white/10 rounded" />
                          <div className="h-4 w-12 bg-white/10 rounded" />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center w-full">
                  <PackageOpen className="w-16 h-16 text-white/20 mb-4" />
                  <h3 className="text-white font-semibold text-lg mb-2">No services yet</h3>
                  <p className="text-text-secondary text-sm">
                    Services will appear here once freelancers join the platform.
                  </p>
                </div>
              ) : (
                <div className={`grid gap-5 grid-cols-1 sm:grid-cols-2 ${showFilters ? 'lg:grid-cols-2 xl:grid-cols-3' : 'lg:grid-cols-3 xl:grid-cols-4'}`}>
                  {filtered.map(gig => (
                    <GigCard
                      key={gig.id}
                      id={gig.id}
                      title={gig.title}
                      sellerName={gig.profiles?.username || 'Unknown'}
                      sellerAvatar={gig.profiles?.avatar_url || undefined}
                      price={gig.price}
                      rating={gig.rating_avg || 0}
                      ratingCount={gig.rating_count || 0}
                      imageUrl={gig.images?.[0] || '/placeholder-gig.png'}
                    />
                  ))}
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
