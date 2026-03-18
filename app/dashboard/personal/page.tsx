import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ShoppingBag, Heart, Clock, Search } from 'lucide-react';
import Link from 'next/link';

export default function PersonalOverview() {
  const stats = [
    { name: 'Active Orders', value: '2', icon: ShoppingBag },
    { name: 'Completed Projects', value: '15', icon: Clock },
    { name: 'Saved Gigs', value: '12', icon: Heart },
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
           
           <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-background-dark/30">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-primary opacity-80" />
                    <div>
                      <p className="text-white font-medium">Custom Website Development</p>
                      <p className="text-sm text-text-secondary">Seller: Alex M.</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-blue/10 text-primary-blue border border-primary-blue/20">
                    In Progress
                  </span>
                </div>
              ))}
           </div>
        </Card>

        <Card className="p-6">
           <div className="flex items-center justify-between mb-6">
             <h2 className="text-xl font-bold text-white">Recently Saved</h2>
             <Link href="/dashboard/personal/favorites" className="text-sm text-primary-blue hover:text-white transition-colors">View All</Link>
           </div>
           
           <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-16 bg-surface rounded-lg relative overflow-hidden border border-border" />
                    <div>
                      <p className="text-white font-medium line-clamp-1">I will write SEO optimized blog articles</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-text-secondary">Emma W.</span>
                        <span className="text-primary-blue text-xs font-semibold">★ 4.8</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
           </div>
        </Card>
      </div>
    </div>
  );
}
