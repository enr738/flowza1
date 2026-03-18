'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Star, Clock, CheckCircle2, ChevronRight, Share2, Heart, MessageCircle } from 'lucide-react';

const mockGig = {
  id: '1',
  title: 'I will design a modern minimal logo for your brand',
  sellerName: 'Sarah J.',
  sellerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
  sellerLevel: 'Top Rated Seller',
  price: 150,
  rating: 4.9,
  ratingCount: 128,
  imageUrls: [
    'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200',
  ],
  description: `Hello! I'm Sarah, a professional brand designer with over 8 years of experience helping startups and established companies build their visual identities.

In this service, I will design a clean, modern, and memorable minimalist logo that perfectly represents your business values and resonates with your target audience.

**What you will get:**
• 3 Unique Logo Concepts
• High-Resolution Files (PNG, JPG, PDF)
• Scalable Vector Files (AI, EPS, SVG)
• Full Copyright Ownership
• 3D Mockups
• Unlimited Revisions

I believe in quality over quantity and work closely with my clients to ensure 100% satisfaction. Let's build something great together!`,
  packages: {
    basic: { name: 'Starter Label', price: 150, deliveryDays: 3, revisions: 3, features: ['1 Logo Concept', 'High-Res PNG & JPG', '3D Mockup'] },
    standard: { name: 'Pro Identity', price: 280, deliveryDays: 5, revisions: 'Unlimited', features: ['3 Logo Concepts', 'All Source Files (Vecor)', '3D Mockups', 'Social Media Kit'] },
    premium: { name: 'Full Branding', price: 500, deliveryDays: 7, revisions: 'Unlimited', features: ['5 Logo Concepts', 'All Source Files', 'Social Media Kit', 'Brand Style Guide', 'Stationery Design'] },
  }
};

export default function GigDetailPage({ params }: { params: { id: string } }) {
  const [activeImage, setActiveImage] = useState(0);
  const [activePackage, setActivePackage] = useState<'basic' | 'standard' | 'premium'>('standard');
  const pkg = mockGig.packages[activePackage];

  return (
    <>
      <Navbar />
      <main className="flex-1 py-10 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-text-secondary mb-6 gap-2">
            <span>Home</span> <ChevronRight className="h-4 w-4" />
            <span>Design</span> <ChevronRight className="h-4 w-4" />
            <span className="text-white">Logo Design</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column (Gig Content) */}
            <div className="lg:col-span-2 space-y-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                {mockGig.title}
              </h1>

              {/* Seller Info Bar */}
              <div className="flex items-center gap-4 border-b border-border pb-6">
                <div className="relative h-12 w-12 rounded-full overflow-hidden bg-surface">
                  <Image src={mockGig.sellerAvatar} alt={mockGig.sellerName} fill className="object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{mockGig.sellerName}</span>
                    <span className="text-primary-blue text-sm">| {mockGig.sellerLevel}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 text-sm">
                    <Star className="h-4 w-4 fill-warning text-warning" />
                    <span className="text-white font-medium">{mockGig.rating}</span>
                    <span className="text-text-secondary">({mockGig.ratingCount} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-surface border border-border">
                  <Image src={mockGig.imageUrls[activeImage]} alt="Gig Image" fill className="object-cover" />
                </div>
                <div className="grid grid-cols-5 gap-4">
                  {mockGig.imageUrls.map((url, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${activeImage === i ? 'border-primary-blue opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    >
                      <Image src={url} alt={`Thumbnail ${i}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="pt-6">
                <h2 className="text-2xl font-bold text-white mb-4">About This Service</h2>
                <div className="text-text-secondary leading-relaxed whitespace-pre-wrap">
                  {mockGig.description}
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
                      <span className="text-2xl font-light text-white">${pkg.price}</span>
                    </div>

                    <p className="text-text-secondary text-sm">
                      {activePackage === 'basic' ? 'Essential startup package.' : activePackage === 'standard' ? 'Perfect for growing businesses.' : 'The ultimate branding experience.'}
                    </p>

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

                    <Button size="lg" className="w-full">
                      Continue (${pkg.price})
                    </Button>
                    <Button variant="ghost" className="w-full text-sm">
                      Compare Packages
                    </Button>
                  </div>
                </Card>

                {/* Contact Seller */}
                <Card className="p-6 text-center">
                  <div className="relative h-20 w-20 mx-auto rounded-full overflow-hidden bg-surface mb-4">
                    <Image src={mockGig.sellerAvatar} alt={mockGig.sellerName} fill className="object-cover" />
                  </div>
                  <h3 className="font-bold text-white mb-1">{mockGig.sellerName}</h3>
                  <p className="text-sm text-text-secondary mb-4">{mockGig.sellerLevel}</p>
                  <Button variant="outline" className="w-full gap-2">
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
