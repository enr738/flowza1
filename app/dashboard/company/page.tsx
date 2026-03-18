import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ShoppingBag, Users, Briefcase, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Company Dashboard',
};

export default function CompanyOverview() {
  const stats = [
    { name: 'Total Orders', value: '45', icon: ShoppingBag },
    { name: 'Team Members', value: '8', icon: Users },
    { name: 'Monthly Spend', value: '$8,450', icon: TrendingUp },
    { name: 'Active Projects', value: '4', icon: Briefcase },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8">
        <div>
           <div className="flex items-center gap-3 mb-2">
             <div className="h-8 w-8 rounded bg-gradient-to-br from-primary-blue to-primary-purple flex items-center justify-center font-bold text-white shadow-lg">A</div>
             <h1 className="text-3xl font-bold text-white">Acme Corp Dashboard</h1>
           </div>
           <p className="text-text-secondary">Manage your team, track projects, and monitor your monthly budget.</p>
        </div>
        <div className="flex gap-3">
           <Button variant="outline">Invite Member</Button>
           <Button>New Order</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
           <Card key={stat.name} className="p-6">
             <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-text-secondary mb-1">{stat.name}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <div className="h-10 w-10 bg-primary-blue/10 rounded-xl flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-primary-blue" />
                </div>
             </div>
           </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
           <div className="flex justify-between items-center mb-6">
             <h2 className="text-xl font-bold text-white">Budget Overview</h2>
             <Link href="/dashboard/company/budget" className="text-sm text-primary-blue">Manage Budget</Link>
           </div>
           
           <div className="space-y-4">
             <div>
               <div className="flex justify-between text-sm mb-2">
                 <span className="text-text-secondary">Spent this month</span>
                 <span className="text-white font-medium">$8,450 / $10,000</span>
               </div>
               <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                 <div className="h-full bg-gradient-primary w-[84.5%]" />
               </div>
               <p className="text-right text-xs text-text-secondary mt-2">84.5% utilized</p>
             </div>
           </div>

           <div className="mt-8">
             <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Recent Transactions</h3>
             <div className="space-y-3">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="flex justify-between items-center p-3 rounded-xl border border-border/50">
                    <div className="flex items-center gap-3">
                       <div className="h-8 w-8 rounded-full bg-surface flex items-center justify-center text-xs border border-white/5">JD</div>
                       <div>
                         <p className="text-white text-sm font-medium">Marketing Materials</p>
                         <p className="text-xs text-text-secondary">Ordered by John Doe</p>
                       </div>
                    </div>
                    <span className="font-semibold text-white">-$450</span>
                 </div>
               ))}
             </div>
           </div>
        </Card>

        <Card className="p-6">
           <div className="flex justify-between items-center mb-6">
             <h2 className="text-xl font-bold text-white">Active Projects</h2>
             <Link href="/dashboard/company/projects" className="text-sm text-primary-blue">View All</Link>
           </div>
           
           <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-4 rounded-xl border border-white/5 bg-background-dark/30 hover:bg-white/5 transition-colors cursor-pointer">
                   <div className="flex justify-between items-start mb-2">
                     <p className="text-white font-medium text-sm">Website Redesign</p>
                     <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-warning/10 text-warning uppercase">In Progress</span>
                   </div>
                   <div className="flex justify-between items-end mt-4">
                     <div className="flex -space-x-2">
                        <div className="h-6 w-6 rounded-full border-2 border-surface bg-primary-blue/30" />
                        <div className="h-6 w-6 rounded-full border-2 border-surface bg-primary-purple/30" />
                     </div>
                     <span className="text-xs text-text-secondary">Due in 5 days</span>
                   </div>
                </div>
              ))}
           </div>
        </Card>
      </div>
    </div>
  );
}
