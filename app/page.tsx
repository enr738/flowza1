import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { GigCard } from '@/components/gigs/GigCard';
import { Search, PenTool, Code, Layout, Video, Megaphone, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

// Mock data for featured gigs
const FEATURED_GIGS = [
  { id: '1', title: 'I will design a modern minimal logo for your brand', sellerName: 'Sarah J.', price: 150, rating: 4.9, ratingCount: 128, imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800' },
  { id: '2', title: 'I will build a full-stack Next.js web application', sellerName: 'Alex M.', price: 800, rating: 5.0, ratingCount: 45, imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800' },
  { id: '3', title: 'I will write SEO optimized blog articles and website copy', sellerName: 'Emma W.', price: 50, rating: 4.8, ratingCount: 312, imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead2708?auto=format&fit=crop&q=80&w=800' },
  { id: '4', title: 'I will create engaging short-form video content for TikTok/Reels', sellerName: 'David K.', price: 120, rating: 4.9, ratingCount: 89, imageUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f6128?auto=format&fit=crop&q=80&w=800' },
  { id: '5', title: 'I will manage and grow your social media presence', sellerName: 'Lisa R.', price: 400, rating: 4.7, ratingCount: 201, imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800' },
  { id: '6', title: 'I will design your mobile app UI/UX in Figma', sellerName: 'Marcus T.', price: 350, rating: 5.0, ratingCount: 67, imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800' },
];

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
          {/* Background Glows */}
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary-blue/20 rounded-full blur-[120px] -z-10" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-primary-purple/20 rounded-full blur-[120px] -z-10" />
          
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Find <span className="text-gradient">World-Class</span><br />
              Freelancers
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
              The premier marketplace connecting ambitious companies with elite talent. Build your dream team and scale your business faster with Flowza.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-3xl mx-auto relative group">
              <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
              <div className="relative glass rounded-2xl flex items-center p-2">
                <Search className="ml-4 h-6 w-6 text-text-secondary" />
                <input 
                  type="text" 
                  placeholder="What service are you looking for today?"
                  className="w-full bg-transparent border-none text-white px-4 h-14 outline-none text-lg placeholder:text-text-secondary w-full"
                />
                <Button size="lg" className="rounded-xl px-8 ml-2">Search</Button>
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
                <button
                  key={cat.name}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-surface/50 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium text-white"
                >
                  <cat.icon className="h-4 w-4 text-primary-purple" />
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Gigs */}
        <section className="py-20 bg-surface/30 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Featured Services</h2>
                <p className="text-text-secondary">Top rated freelancers ready to start your project</p>
              </div>
              <Link href="/explore" className="hidden md:flex items-center gap-2 text-primary-blue font-medium hover:text-white transition-colors">
                Explore All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {FEATURED_GIGS.map((gig) => (
                <GigCard key={gig.id} {...gig} />
              ))}
            </div>
            
            <div className="mt-10 text-center md:hidden">
              <Link href="/explore">
                <Button variant="outline" className="w-full">Explore All Services</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* For Companies Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center flex-col-reverse lg:flex-row">
              <div className="relative">
                <div className="absolute inset-0 bg-primary-purple/20 blur-[100px] -z-10 rounded-full" />
                <Card gradientBorder className="p-8 md:p-10 relative z-10">
                  <h3 className="text-2xl font-bold mb-6 text-white">Company Dashboard Preview</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-background-dark/50 border border-white/5">
                        <div className="h-10 w-10 rounded-lg bg-gradient-primary opacity-80" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3 w-1/3 bg-white/10 rounded" />
                          <div className="h-3 w-1/2 bg-white/5 rounded" />
                        </div>
                      </div>
                    ))}
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-primary w-2/3" />
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-xs text-text-secondary">Budget Used</span>
                        <span className="text-xs text-white font-medium">65%</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div>
                <div className="inline-block px-4 py-1.5 rounded-full bg-primary-blue/10 text-primary-blue text-sm font-semibold tracking-wide mb-6">
                  FOR ENTERPRISE
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Scale your team with <span className="text-gradient">Flowza for Companies</span>
                </h2>
                <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                  Manage your entire freelance workforce in one place. Set team budgets, track project progress, and collaborate seamlessly with built-in tools designed for modern businesses.
                </p>
                
                <ul className="space-y-4 mb-10">
                  {[
                    'Centralized billing and budget management',
                    'Dedicated project tracking dashboard',
                    'Team collaboration and multi-user access',
                    'Priority support from success managers'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                      <span className="text-white">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link href="/onboarding/company-setup">
                  <Button size="lg" className="px-8">Setup a Company Account</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 border-t border-border bg-surface/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '10K+', label: 'Elite Freelancers' },
                { value: '50K+', label: 'Projects Completed' },
                { value: '4.9/5', label: 'Average Client Rating' },
                { value: '24/7', label: 'Dedicated Support' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <h4 className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</h4>
                  <p className="text-text-secondary font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-gradient-primary opacity-10" />
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to bring your ideas to life?
            </h2>
            <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
              Join thousands of businesses already using Flowza to build exceptional products.
            </p>
            <Link href="/onboarding">
              <Button size="lg" className="h-14 px-10 text-lg shadow-[0_0_40px_rgba(124,58,237,0.4)]">
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
