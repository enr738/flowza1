'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Star, Clock, CheckCircle2, ChevronRight, Share2, Heart, MessageCircle, PackageOpen, Palette, Code2, PenTool, Megaphone, Video } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { useUser } from '@clerk/nextjs';
import { getProfileByClerkId, getProfileById } from '@/lib/profile';

interface GigDetail {
  id: string;
  title: string;
  description: string | null;
  price: number;
  category: string | null;
  images: string[] | null;
  rating_avg: number;
  rating_count: number;
  seller_id: string;
  profiles: {
    username: string;
    avatar_url: string | null;
    clerk_id: string;
  } | null;
}

const categoryIcons: Record<string, React.ElementType> = {
  Design: Palette,
  Development: Code2,
  Writing: PenTool,
  Marketing: Megaphone,
  Video: Video,
};

export default function GigDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user } = useUser();
  const [gig, setGig] = useState<GigDetail | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [myProfileId, setMyProfileId] = useState<string | null>(null);
  const [sellerProfile, setSellerProfile] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [orderLoading, setOrderLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  useEffect(() => {
    async function fetchGig() {
      setIsLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from('gigs')
        .select('*, profiles!seller_id(username, avatar_url, clerk_id)')
        .eq('id', params.id)
        .single();

      if (error || !data) {
        setNotFound(true);
      } else {
        setGig(data as GigDetail);
        
        const seller = await getProfileById(data.seller_id);
        setSellerProfile(seller);
        
        if (user) {
          const myProfile = await getProfileByClerkId(user.id);
          setMyProfileId(myProfile?.id);
        }

        const { data: reviewsData } = await supabase
          .from('reviews')
          .select('*, profiles!reviewer_id(username, avatar_url)')
          .eq('gig_id', params.id)
          .order('created_at', { ascending: false });
        if (reviewsData) setReviews(reviewsData);

        if (user && myProfileId) {
          const { data: favData } = await supabase
            .from('favorites')
            .select('id')
            .eq('user_id', myProfileId)
            .eq('gig_id', params.id)
            .single();
          if (favData) setIsSaved(true);
        }
      }
      setIsLoading(false);
    }
    fetchGig();
  }, [params.id, user, myProfileId]);

  const handleOrder = async () => {
    if (!gig) return;
    setOrderLoading(true);
    try {
      const res = await fetch('/api/payment/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gigId: gig.id,
          gigTitle: gig.title,
          amount: gig.price,
          sellerId: sellerProfile?.clerk_id || '',
        }),
      });
      const data = await res.json();
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      }
    } catch (error) {
      console.error('Order error:', error);
    } finally {
      setOrderLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user || !gig) {
      showToast('Please sign in to save gigs.');
      return;
    }
    
    try {
      if (isSaved) {
        await fetch('/api/favorites', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ gig_id: gig.id })
        });
        setIsSaved(false);
        showToast('Removed from saved');
      } else {
        await fetch('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ gig_id: gig.id })
        });
        setIsSaved(true);
        showToast('Saved!');
      }
    } catch (error) {
      showToast('Error saving gig');
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast('Link copied!');
    } catch {
      showToast('Could not copy link.');
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="flex-1 py-10 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="animate-pulse space-y-6">
              <div className="h-4 w-48 bg-white/10 rounded" />
              <div className="h-8 w-96 bg-white/10 rounded" />
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-white/10 rounded-full" />
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-white/10 rounded" />
                  <div className="h-3 w-24 bg-white/10 rounded" />
                </div>
              </div>
              <div className="aspect-video bg-white/5 rounded-2xl" />
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (notFound || !gig) {
    return (
      <>
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center py-32 px-4 text-center">
          <PackageOpen className="w-16 h-16 text-white/20 mb-4" />
          <h1 className="text-3xl font-bold text-white mb-3">Gig Not Found</h1>
          <p className="text-text-secondary mb-6">This service may have been removed or does not exist.</p>
          <Link href="/explore">
            <Button>Browse Services</Button>
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const hasImages = gig.images && gig.images.length > 0;
  const imageUrls = hasImages ? gig.images! : [];
  const sellerName = sellerProfile?.username || sellerProfile?.email?.split('@')[0] || 'Unknown';
  const sellerAvatar = sellerProfile?.avatar_url || '';
  const sellerLevel = 'Seller';
  const CategoryIcon = categoryIcons[gig.category || ''] || PackageOpen;

  return (
    <>
      <Navbar />
      <main className="flex-1 py-10 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-text-secondary mb-6 gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/explore" className="hover:text-white transition-colors">{gig.category || 'Services'}</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white line-clamp-1">{gig.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column (Gig Content) */}
            <div className="lg:col-span-2 space-y-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                {gig.title}
              </h1>

              {/* Seller Info Bar */}
              <div className="flex items-center gap-4 border-b border-border pb-6">
                <div className="relative h-12 w-12 rounded-full overflow-hidden bg-surface">
                  {sellerAvatar ? (
                    <Image src={sellerAvatar} alt={sellerName} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                      {sellerName.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Link href={`/profile/${sellerProfile?.username}`}>
                      <span className="font-semibold text-white hover:text-primary-blue transition-colors">{sellerName}</span>
                    </Link>
                    <span className="text-primary-blue text-sm">| {sellerLevel}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 text-sm">
                    <Star className="h-4 w-4 fill-warning text-warning" />
                    <span className="text-white font-medium">{(gig.rating_avg || 0).toFixed(1)}</span>
                    <span className="text-text-secondary">({gig.rating_count || 0} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-surface border border-border">
                  {hasImages && imageUrls[activeImage] ? (
                    <Image src={imageUrls[activeImage]} alt="Gig Image" fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#4c1d95] flex flex-col items-center justify-center gap-3">
                      <CategoryIcon className="w-20 h-20 text-white/20" />
                      <span className="text-white/30 text-sm font-medium">{gig.category || 'Service'}</span>
                    </div>
                  )}
                </div>
                {hasImages && imageUrls.length > 1 && (
                  <div className="grid grid-cols-5 gap-4">
                    {imageUrls.map((url, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${activeImage === i ? 'border-primary-blue opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                      >
                        <Image src={url} alt={`Thumbnail ${i}`} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="pt-6">
                <h2 className="text-2xl font-bold text-white mb-4">About This Service</h2>
                <div className="text-text-secondary leading-relaxed whitespace-pre-wrap">
                  {gig.description || 'No description provided.'}
                </div>
              </div>

              {/* Reviews */}
              <div className="pt-6 border-t border-border">
                <h2 className="text-2xl font-bold text-white mb-6">Reviews</h2>
                <div className="space-y-4">
                  {reviews.length > 0 ? (
                    reviews.map(review => (
                      <Card key={review.id} className="p-6 border-border/50 bg-surface/50">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-surface overflow-hidden relative">
                              {review.profiles?.avatar_url ? (
                                <Image src={review.profiles.avatar_url} alt="" fill className="object-cover" />
                              ) : (
                                <div className="w-full h-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                                  {review.profiles?.username?.charAt(0)}
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-white">{review.profiles?.username}</div>
                              <div className="text-xs text-text-secondary">{new Date(review.created_at).toLocaleDateString()}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-warning text-warning' : 'text-text-secondary/30'}`} />
                            ))}
                          </div>
                        </div>
                        {review.comment && <p className="text-text-secondary text-sm leading-relaxed">{review.comment}</p>}
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-10 bg-surface/30 rounded-xl border border-border/50">
                      <MessageCircle className="w-12 h-12 text-white/20 mx-auto mb-3" />
                      <h3 className="text-white font-medium">No reviews yet</h3>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column (Sidebar/Checkout) */}
            <div>
              <div className="sticky top-24 space-y-6">
                {/* Actions */}
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1 gap-2" onClick={handleSave}>
                    <Heart className={`h-4 w-4 transition-colors ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                    {isSaved ? 'Saved' : 'Save'}
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2" onClick={handleShare}>
                    <Share2 className="h-4 w-4" /> Share
                  </Button>
                </div>

                {/* Pricing Card — Single Price */}
                <Card className="overflow-hidden">
                  <div className="p-6 space-y-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-white">Service Package</h3>
                      <span className="text-2xl font-light text-white">{gig.price} DZD</span>
                    </div>

                    <div className="flex items-center gap-4 text-sm font-medium text-white mb-6">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-text-secondary" /> Delivery Included
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-text-secondary" /> Revisions Included
                      </div>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {['1 Delivery', 'Source Files', 'Revisions Included'].map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                          <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {myProfileId === gig.seller_id ? (
                      <div className="space-y-3">
                        <p className="text-center text-sm font-medium text-text-secondary bg-white/5 p-3 rounded-lg border border-border">This is your gig</p>
                        <Link href={`/dashboard/seller/gigs/${gig.id}/edit`}>
                          <Button className="w-full">Edit Gig</Button>
                        </Link>
                      </div>
                    ) : (
                      <button
                        onClick={handleOrder}
                        disabled={orderLoading}
                        className="w-full px-8 py-4 bg-gradient-to-r from-[#4DA6FF] to-[#7C3AED]
                                   text-white font-bold rounded-xl hover:opacity-90
                                   transition-all duration-200 disabled:opacity-50"
                      >
                        {orderLoading ? 'Processing...' : `Order Now – ${gig.price} DZD`}
                      </button>
                    )}
                  </div>
                </Card>

                {/* Contact Seller */}
                {myProfileId !== gig.seller_id && (
                <Card className="p-6 text-center">
                  <div className="relative h-20 w-20 mx-auto rounded-full overflow-hidden bg-surface mb-4">
                    {sellerAvatar ? (
                      <Image src={sellerAvatar} alt={sellerName} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold">
                        {sellerName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <Link href={`/profile/${sellerProfile?.username}`}>
                    <h3 className="font-bold text-white mb-1 hover:text-primary-blue transition-colors">{sellerName}</h3>
                  </Link>
                  <p className="text-sm text-text-secondary mb-4">{sellerLevel}</p>
                  <Link href={`/messages/new?sellerId=${gig.seller_id}`}>
                    <Button variant="outline" className="w-full gap-2">
                      <MessageCircle className="h-4 w-4" /> Contact Seller
                    </Button>
                  </Link>
                </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="px-5 py-3 rounded-xl bg-surface border border-border text-white text-sm font-medium shadow-2xl">
            {toast}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
