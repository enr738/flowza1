'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Target, User, Building2, ArrowRight, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase';

function getRoleDashboard(role: string): string {
  switch (role) {
    case 'Seller':
    case 'seller':
      return '/dashboard/seller';
    case 'Personal Buyer':
    case 'buyer_personal':
      return '/dashboard/personal';
    case 'Company':
    case 'buyer_company':
      return '/dashboard/company';
    default:
      return '';
  }
}

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
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [checkingRole, setCheckingRole] = useState(true);

  // Check if user already has a role — redirect if so
  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      router.push('/sign-in');
      return;
    }

    async function checkExistingRole() {
      const supabase = createClient();
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('clerk_id', user!.id)
        .single();

      if (profile?.role) {
        const dashboard = getRoleDashboard(profile.role);
        if (dashboard) {
          router.push(dashboard);
          return;
        }
      }
      setCheckingRole(false);
    }
    checkExistingRole();
  }, [user, isLoaded, router]);

  const handleRoleSelect = async (roleTitle: string, roleHref: string) => {
    const roleMap: Record<string, string> = {
      'Seller': 'seller',
      'Personal Buyer': 'buyer_personal',
      'Company': 'buyer_company',
    };
    const dbRole = roleMap[roleTitle] || roleTitle;
    
    localStorage.setItem('flowza_role', roleTitle);
    const res = await fetch('/api/profile/role', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: dbRole }),
    });
    
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      alert(`Failed to save role: ${errData.error || 'Unknown error'}. Please try again.`);
      return;
    }
    
    // Verify it was saved
    const supabase = createClient();
    const { data } = await supabase.from('profiles').select('role').eq('clerk_id', user!.id).single();
    console.log('Role saved verify:', data?.role);
    
    router.push(roleHref);
  };

  if (!isLoaded || checkingRole) {
    return (
      <>
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 text-primary-blue animate-spin" />
        </main>
        <Footer />
      </>
    );
  }

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
            <div onClick={() => handleRoleSelect(role.title, role.href)} key={role.title} className="group cursor-pointer h-full">
              <Card
                className={`relative p-8 flex flex-col items-center text-center h-full border-2 transition-all duration-200 hover:-translate-y-1 bg-gradient-to-b ${role.gradient} ${role.border}`}
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
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
