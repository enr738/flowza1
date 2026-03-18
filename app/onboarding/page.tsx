'use client';

import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Target, User, Building2, ArrowRight } from 'lucide-react';

const ROLES = [
  {
    icon: Target,
    emoji: '🎯',
    title: 'Seller',
    description: 'I offer services and want to find clients',
    cta: 'Start Selling',
    href: '/dashboard/seller',
    gradient: 'from-primary-blue/20 to-primary-blue/5',
    border: 'border-primary-blue/30 hover:border-primary-blue/60',
    featured: false,
  },
  {
    icon: User,
    emoji: '👤',
    title: 'Personal Buyer',
    description: 'I hire freelancers for personal projects',
    cta: 'Hire Freelancers',
    href: '/dashboard/personal',
    gradient: 'from-primary-purple/20 to-primary-purple/5',
    border: 'border-primary-purple/30 hover:border-primary-purple/60',
    featured: false,
  },
  {
    icon: Building2,
    emoji: '🏢',
    title: 'Company',
    description: 'I manage a team and hire freelancers at scale',
    cta: 'Setup Company',
    href: '/onboarding/company-setup',
    gradient: 'from-success/20 to-success/5',
    border: 'border-success/30 hover:border-success/60',
    featured: true,
  },
] as const;

export default function OnboardingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4 relative overflow-hidden">
        <div className="absolute top-20 left-1/4 w-80 h-80 bg-primary-blue/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-primary-purple/10 rounded-full blur-[120px] -z-10" />

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How will you use <span className="text-gradient">Flowza</span>?
          </h1>
          <p className="text-text-secondary text-lg">Choose the option that best describes you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {ROLES.map((role) => (
            <Link href={role.href} key={role.title} className="group">
              <Card
                className={`relative p-8 flex flex-col items-center text-center h-full border-2 transition-all duration-200 cursor-pointer hover:-translate-y-1 bg-gradient-to-b ${role.gradient} ${role.border}`}
              >
                {role.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-primary text-white text-xs font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="text-5xl mb-5">{role.emoji}</div>
                <h2 className="text-xl font-bold text-white mb-3">{role.title}</h2>
                <p className="text-text-secondary text-sm mb-8 leading-relaxed">{role.description}</p>
                <Button
                  variant="glass"
                  className="w-full mt-auto group-hover:bg-white/15 flex items-center gap-2 justify-center"
                >
                  {role.cta}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}