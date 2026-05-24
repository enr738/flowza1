'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Star, Clock, CheckCircle2, ChevronRight, Share2, Heart, MessageCircle, PackageOpen } from 'lucide-react';
import { createClient } from '@/lib/supabase';

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

export default function GigDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [gig, setGig] = useState<GigDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [activePackage, setActivePackage] = useState<'basic' | 'standard' | 'premium'>('standard');
  const [orderLoading, setOrderLoading] = useState(false);

  useEffect(() => {
    async function fetchGig() {
      setIsLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from('gigs')
        .select('*, profiles(username, avatar_url, clerk_id)')
        .eq('id', params.id)
        .single();

      if (error || !data) {
        setNotFound(true);
      } else {
        setGig(data as GigDetail);
      }
      setIsLoading(false);
    }
    fetchGig();
  }, [params.id]);

  const getPackages = (basePrice: number) => ({
    basic: {
      name: 'Basic',
      price: basePrice,
      deliveryDays: 3,
      revisions: 2,
      features: ['1 Delivery', 'Source Files', '2 Revisions'],
    },
    standard: {
      name: 'Standard',
      price: Math.round(basePrice * 1.8),
      deliveryDays: 5,
      revisions: 5,
      features: ['1 Delivery', 'Source Files', '5 Revisions', 'Priority Support'],
    },
    premium: {
      name: 'Premium',
      price: Math.round(basePrice * 3),
      deliveryDays: 7,
      revisions: 'Unlimited' as string | number,
      features: ['1 Delivery', 'Source Files', 'Unlimited Revisions', 'Priority Support', 'Commercial Use'],
    },
  });

  const handleOrder = async () => {
    if (!gig) return;
    setOrderLoading(true);
    const packages = getPackages(gig.price);
    const pkg = packages[activePackage];
    try {
      const res = await fetch('/api/payment/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gigId: gig.id,
          gigTitle: gig.title,
          amount: pkg.price,
          sellerId: gig.profiles?.clerk_id || '',
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

  const handleContactSeller = () => {
    if (!gig) return;
    router.push(`/messages/new?sellerId=${gig.seller_id}`);
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

  const packages = getPackages(gig.price);
  const pkg = packages[activePackage];
  const imageUrls = gig.images && gig.images.length > 0 ? gig.images : ['/placeholder-gig.png'];
  const sellerName = gig.profiles?.username || 'Freelancer';
  const sellerAvatar = gig.profiles?.avatar_url || '';
  const sellerLevel = 'Seller';

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
                    <span className="font-semibold text-white">{sellerName}</span>
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
                  {imageUrls[activeImage] && imageUrls[activeImage] !== '/placeholder-gig.png' ? (
                    <Image src={imageUrls[activeImage]} alt="Gig Image" fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <PackageOpen className="w-16 h-16 text-white/20" />
                    </div>
                  )}
                </div>
                {imageUrls.length > 1 && (
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
            </div>

            {/* Right Column (Sidebar/Checkout) */}
            <div>
              <div className="sticky top-24 space-y-6">
                {/* Actions */}
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1 gap-2"><Heart className="h-4 w-4" /> Save</Button>
                  <Button variant="outline" className="flex-1 gap-2"><Share2 className="h-4 w-4" /> Share</Button>
                </div>

                {/* Pricing Card */}
                <Card className="overflow-hidden">
                  <div className="flex border-b border-border">
                    {(['basic', 'standard', 'premium'] as const).map(p => (
                      <button
                        key={p}
                        onClick={() => setActivePackage(p)}
                        className={`flex-1 py-4 text-center text-sm font-semibold capitalize transition-all ${activePackage === p ? 'text-primary-blue border-b-2 border-primary-blue bg-primary-blue/5' : 'text-text-secondary hover:bg-white/5'}`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>

                  <div className="p-6 space-y-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                      <span className="text-2xl font-light text-white">{pkg.price} DZD</span>
                    </div>

                    <div className="flex items-center gap-4 text-sm font-medium text-white mb-6">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-text-secondary" /> {pkg.deliveryDays} Days Delivery
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-text-secondary" /> {pkg.revisions} Revisions
                      </div>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                          <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={handleOrder}
                      disabled={orderLoading}
                      className="w-full px-8 py-4 bg-gradient-to-r from-[#4DA6FF] to-[#7C3AED]
                                 text-white font-bold rounded-xl hover:opacity-90
                                 transition-all duration-200 disabled:opacity-50"
                    >
                      {orderLoading ? 'Processing...' : `Order Now – ${pkg.price} DZD`}
                    </button>
                    <Button variant="ghost" className="w-full text-sm">
                      Compare Packages
                    </Button>
                  </div>
                </Card>

                {/* Contact Seller */}
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
                  <h3 className="font-bold text-white mb-1">{sellerName}</h3>
                  <p className="text-sm text-text-secondary mb-4">{sellerLevel}</p>
                  <Button variant="outline" className="w-full gap-2" onClick={handleContactSeller}>
                    <MessageCircle className="h-4 w-4" /> Contact Seller
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
