import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { GigCard } from '@/components/gigs/GigCard';
import { Search, PenTool, Code, Layout, Video, Megaphone, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Find World-Class Freelancers',
};

// Mock data for featured gigs
const FEATURED_GIGS = [
  { id: '1', title: 'I will design a modern minimal logo for your brand', sellerName: 'Sarah J.', price: 150, rating: 4.9, ratingCount: 128, imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800', category: 'Design' },
  { id: '2', title: 'I will build a full-stack Next.js web application', sellerName: 'Alex M.', price: 800, rating: 5.0, ratingCount: 45, imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800', category: 'Development' },
  { id: '3', title: 'I will write SEO optimized blog articles and website copy', sellerName: 'Emma W.', price: 50, rating: 4.8, ratingCount: 312, imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead2708?auto=format&fit=crop&q=80&w=800', category: 'Writing' },
  { id: '4', title: 'I will create engaging short-form video content for TikTok/Reels', sellerName: 'David K.', price: 120, rating: 4.9, ratingCount: 89, imageUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f6128?auto=format&fit=crop&q=80&w=800', category: 'Video' },
  { id: '5', title: 'I will manage and grow your social media presence', sellerName: 'Lisa R.', price: 400, rating: 4.7, ratingCount: 201, imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800', category: 'Marketing' },
  { id: '6', title: 'I will design your mobile app UI/UX in Figma', sellerName: 'Marcus T.', price: 350, rating: 5.0, ratingCount: 67, imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800', category: 'Design' },
];

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full overflow-x-hidden">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28">
          {/* Background Glows */}
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary-blue/20 rounded-full blur-[120px] -z-10" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-primary-purple/20 rounded-full blur-[120px] -z-10" />
          
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight text-white max-w-5xl mx-auto">
              The Freelance Marketplace for <br className="hidden md:block"/>
              <span className="text-gradient">Individuals & Teams</span>
            </h1>
            <p className="text-lg md:text-xl text-[#C4BFD8] max-w-3xl mx-auto mb-10 leading-relaxed text-wrap">
              Hire world-class freelancers or offer your skills — built for solo buyers and companies that scale.
            </p>
            
            {/* Search Bar / Main Action */}
            <div className="max-w-3xl mx-auto relative group">
              <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
              <div className="relative glass rounded-2xl flex flex-col sm:flex-row items-center p-2 gap-2">
                <div className="relative w-full flex-1 flex items-center">
                   <Search className="absolute left-4 h-6 w-6 text-[#C4BFD8]" />
                   <input 
                     type="text" 
                     placeholder="What service are you looking for today?"
                     className="w-full bg-transparent border-none text-white pl-12 pr-4 h-14 outline-none text-base md:text-lg placeholder:text-[#C4BFD8]"
                   />
                </div>
                <Link href="/explore" className="w-full sm:w-auto mt-2 sm:mt-0">
                  <Button size="lg" className="w-full rounded-xl px-8 h-14">Search</Button>
                </Link>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mt-8 text-sm md:text-base font-semibold text-white">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-5 w-5 text-[#22C55E]" />
                10K+ Freelancers
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-5 w-5 text-[#22C55E]" />
                50K+ Projects
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-5 w-5 text-[#22C55E]" />
                4.9★ Rating
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-12">
              {[
                { name: 'Design', icon: PenTool },
                { name: 'Development', icon: Code },
                { name: 'Writing', icon: Layout },
                { name: 'Marketing', icon: Megaphone },
                { name: 'Video', icon: Video },
              ].map((cat) => (
                <Link href="/explore" key={cat.name}>
                  <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-surface/50 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium text-white">
                    <cat.icon className="h-4 w-4 text-[#7C3AED]" />
                    {cat.name}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div className="border-t border-white/5 my-16 max-w-7xl mx-auto" />

        {/* Featured Gigs */}
        <section className="py-20 md:py-28 bg-surface/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Featured Services</h2>
                <p className="text-[#C4BFD8] text-lg">Top rated freelancers ready to start your project</p>
              </div>
              <Link href="/explore" className="hidden md:flex items-center gap-2 text-[#4DA6FF] font-medium hover:text-white transition-colors hover:underline">
                Explore All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {FEATURED_GIGS.map((gig) => (
                <GigCard key={gig.id} {...gig} />
              ))}
            </div>
            
            <div className="mt-10 text-center md:hidden">
              <Link href="/explore">
                <Button variant="secondary" className="w-full">Explore All Services</Button>
              </Link>
            </div>
          </div>
        </section>

        <div className="border-t border-white/5 my-16 max-w-7xl mx-auto" />

        {/* For Companies Section */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center flex-col-reverse lg:flex-row">
              <div className="relative w-full overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-primary-purple/20 blur-[100px] -z-10 rounded-full" />
                <Card className="p-6 md:p-8 lg:p-10 relative z-10 w-full overflow-hidden border-2 border-white/10">
                  <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white text-wrap">Company Dashboard Preview</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-background-dark/50 border border-white/5 overflow-hidden">
                        <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-gradient-primary opacity-80" />
                        <div className="flex-1 space-y-2 min-w-0">
                          <div className="h-3 max-w-[120px] w-full bg-white/10 rounded" />
                          <div className="h-3 max-w-[180px] w-full bg-white/5 rounded" />
                        </div>
                      </div>
                    ))}
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-primary w-2/3" />
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-xs text-[#C4BFD8]">Budget Used</span>
                        <span className="text-xs text-white font-medium">65%</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div>
                <div className="inline-block px-4 py-1.5 rounded-full bg-[#4DA6FF]/10 text-[#4DA6FF] text-sm font-semibold tracking-wide mb-6">
                  FOR ENTERPRISE
                </div>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight text-wrap">
                  Scale your team with <br className="hidden lg:block"/>
                  <span className="text-gradient">Flowza for Companies</span>
                </h2>
                <p className="text-lg text-[#C4BFD8] mb-8 leading-relaxed max-w-xl text-wrap">
                  Manage your entire freelance workforce in one place. Set team budgets, track project progress, and collaborate seamlessly with built-in tools designed for modern businesses.
                </p>
                
                <ul className="space-y-4 mb-10 text-wrap">
                  {[
                    'Centralized billing and budget management',
                    'Dedicated project tracking dashboard',
                    'Team collaboration and multi-user access',
                    'Priority support from success managers'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-[#22C55E] flex-shrink-0 mt-0.5" />
                      <span className="text-white font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link href="/onboarding/company-setup">
                  <Button size="lg" className="w-full sm:w-auto h-14">Setup a Company Account</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="border-t border-white/5 my-16 max-w-7xl mx-auto" />

        {/* Stats Section */}
        <section className="py-20 md:py-28 bg-surface/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {[
                { value: '10K+', label: 'Elite Freelancers' },
                { value: '50K+', label: 'Projects Completed' },
                { value: '4.9/5', label: 'Average Client Rating' },
                { value: '24/7', label: 'Dedicated Support' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">{stat.value}</p>
                  <p className="text-[#C4BFD8] font-medium text-sm md:text-base">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-gradient-primary opacity-10" />
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl mx-auto">
              Ready to bring your ideas to life?
            </h2>
            <p className="text-lg md:text-xl text-[#C4BFD8] mb-10 max-w-2xl mx-auto">
              Join thousands of businesses already using Flowza to build exceptional products.
            </p>
            <Link href="/onboarding">
              <Button size="lg" className="h-14 w-full sm:w-auto px-10">
                Get Started Free
              </Button>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
