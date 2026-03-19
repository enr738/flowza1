import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ShoppingBag, Heart, Clock, Search, FolderHeart } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Dashboard',
};

export default function PersonalOverview() {
  const stats = [
    { name: 'Active Orders', value: '0', icon: ShoppingBag },
    { name: 'Completed Projects', value: '0', icon: Clock },
    { name: 'Saved Gigs', value: '0', icon: Heart },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Overview</h1>
          <p className="text-text-secondary">Keep track of your personal projects and favorite freelancers.</p>
        </div>
        <Link href="/explore">
          <Button className="gap-2"><Search className="h-4 w-4" /> Find Services</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6 relative overflow-hidden group border-white/5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-text-secondary mb-1">{stat.name}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
              <div className="h-10 w-10 bg-primary-purple/10 rounded-xl flex items-center justify-center">
                <stat.icon className="h-5 w-5 text-primary-purple" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Current Orders</h2>
            <Link href="/dashboard/personal/orders" className="text-sm text-primary-blue hover:text-white transition-colors">View All</Link>
          </div>

          <div className="flex flex-col items-center justify-center py-10 text-center">
            <ShoppingBag className="w-12 h-12 text-white/20 mb-4" />
            <h3 className="text-white font-semibold text-lg mb-2">No active orders</h3>
            <p className="text-text-secondary text-sm">
              Your orders will appear here once you make a purchase.
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Recently Saved</h2>
            <Link href="/dashboard/personal/favorites" className="text-sm text-primary-blue hover:text-white transition-colors">View All</Link>
          </div>

          <div className="flex flex-col items-center justify-center py-10 text-center">
            <FolderHeart className="w-12 h-12 text-white/20 mb-4" />
            <h3 className="text-white font-semibold text-lg mb-2">No saved services</h3>
            <p className="text-text-secondary text-sm">
              Services you save for later will appear here.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
