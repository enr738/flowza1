import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { DollarSign, ShoppingBag, Eye, Star, TrendingUp } from 'lucide-react';

export default function SellerOverview() {
  const stats = [
    { name: 'Total Earnings', value: '$12,450', icon: DollarSign, trend: '+14%' },
    { name: 'Active Orders', value: '8', icon: ShoppingBag, trend: '+2' },
    { name: 'Profile Views', value: '1,240', icon: Eye, trend: '+23%' },
    { name: 'Average Rating', value: '4.9', icon: Star, trend: 'Stable' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Sarah! 👋</h1>
          <p className="text-text-secondary">Here is what is happening with your freelance business today.</p>
        </div>
        <Button>Create New Gig</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
           <Card key={stat.name} className="p-6 relative overflow-hidden group">
             <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-text-secondary mb-1">{stat.name}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className="h-10 w-10 bg-primary-blue/10 rounded-xl flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-primary-blue" />
                </div>
             </div>
             <div className="mt-4 flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-success font-medium">{stat.trend}</span>
                <span className="text-text-secondary">vs last month</span>
             </div>
           </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
           <h2 className="text-xl font-bold text-white mb-6">Recent Orders</h2>
           <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-background-dark/30 hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-primary opacity-80" />
                    <div>
                      <p className="text-white font-medium">Modern Logo Design</p>
                      <p className="text-sm text-text-secondary">Client: John Doe</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-white font-semibold">$150.00</span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-warning/10 text-warning border border-warning/20">
                      In Progress
                    </span>
                  </div>
                </div>
              ))}
           </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold text-white mb-6">Action Items</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-dashed border-primary-purple/40 bg-primary-purple/5">
              <p className="text-sm text-white font-medium mb-1">Deliver Order #1024</p>
              <p className="text-xs text-text-secondary mb-3">Due in 2 days</p>
              <Button size="sm" className="w-full">Deliver Now</Button>
            </div>
            <div className="p-4 rounded-xl border border-border bg-background-dark/30">
               <p className="text-sm text-white font-medium mb-1">New Message</p>
               <p className="text-xs text-text-secondary mb-3">From Alice regarding "Logo Design"</p>
               <Button variant="outline" size="sm" className="w-full">Reply</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
