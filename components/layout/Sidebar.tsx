'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, Briefcase, ShoppingBag, DollarSign, 
  Heart, Users, Settings, PieChart, CreditCard,
  MessageSquare, LayoutDashboard, User as UserIcon
} from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';

type Role = 'seller' | 'buyer_personal' | 'buyer_company';

const ROUTES: Record<Role, { name: string; href: string; icon: React.ElementType }[]> = {
  seller: [
    { name: 'Overview', href: '/dashboard/seller', icon: LayoutDashboard },
    { name: 'My Gigs', href: '/dashboard/seller/gigs', icon: Briefcase },
    { name: 'Orders', href: '/dashboard/seller/orders', icon: ShoppingBag },
    { name: 'Earnings', href: '/dashboard/seller/earnings', icon: DollarSign },
    { name: 'Messages', href: '/messages', icon: MessageSquare }, // Mock link
  ],
  buyer_personal: [
    { name: 'Overview', href: '/dashboard/personal', icon: LayoutDashboard },
    { name: 'My Orders', href: '/dashboard/personal/orders', icon: ShoppingBag },
    { name: 'Saved', href: '/dashboard/personal/favorites', icon: Heart },
    { name: 'Messages', href: '/messages', icon: MessageSquare },
  ],
  buyer_company: [
    { name: 'Overview', href: '/dashboard/company', icon: LayoutDashboard },
    { name: 'Team', href: '/dashboard/company/team', icon: Users },
    { name: 'Projects', href: '/dashboard/company/projects', icon: Briefcase },
    { name: 'Budget', href: '/dashboard/company/budget', icon: PieChart },
    { name: 'Orders', href: '/dashboard/company/orders', icon: ShoppingBag },
    { name: 'Settings', href: '/dashboard/company/settings', icon: Settings },
    { name: 'Messages', href: '/messages', icon: MessageSquare },
  ]
};

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const [profile, setProfile] = useState<any>(null);
  
  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;
      const supabase = createClient();
      const { data } = await supabase.from('profiles').select('username').eq('clerk_id', user.id).single();
      if (data) setProfile(data);
    }
    fetchProfile();
  }, [user]);

  let currentRole: Role = 'buyer_personal';
  if (pathname.includes('/dashboard/seller')) currentRole = 'seller';
  if (pathname.includes('/dashboard/company')) currentRole = 'buyer_company';

  const navLinks = [...ROUTES[currentRole]];
  if (currentRole === 'seller' && profile?.username) {
    navLinks.push({ name: 'My Profile', href: `/profile/${profile.username}`, icon: UserIcon });
  }

  return (
    <aside className="w-64 border-r border-border bg-background-dark h-[calc(100vh-64px)] overflow-y-auto sticky top-16 hidden md:block">
      <div className="p-6">
        <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4">
          Menu
        </div>
        <nav className="space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 
                  ${isActive 
                    ? 'bg-primary-purple/10 text-primary-purple' 
                    : 'text-text-secondary hover:bg-white/5 hover:text-white'
                  }`}
              >
                <link.icon className={`h-5 w-5 ${isActive ? 'text-primary-purple' : 'text-text-secondary'}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border bg-background-dark/80 backdrop-blur">
        <Link 
          href="/onboarding" 
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-text-secondary hover:bg-white/5 hover:text-white transition-all duration-200"
        >
          <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-white">
            P
          </div>
          <div>
            <p className="text-white text-sm">Switch Role</p>
          </div>
        </Link>
      </div>
    </aside>
  );
}
