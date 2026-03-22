'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ShoppingBag, Users, Briefcase, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

export default function CompanyOverview() {
  const { user } = useUser();

  const stats = [
    { name: 'Total Orders', value: '0', icon: ShoppingBag },
    { name: 'Team Members', value: '0', icon: Users },
    { name: 'Monthly Spend', value: '$0', icon: TrendingUp },
    { name: 'Active Projects', value: '0', icon: Briefcase },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            {user?.imageUrl ? (
              <img src={user.imageUrl} alt="Avatar" className="h-8 w-8 rounded object-cover shadow-lg" />
            ) : (
              <div className="h-8 w-8 rounded bg-gradient-to-br from-primary-blue to-primary-purple flex items-center justify-center font-bold text-white shadow-lg">
                {user?.firstName?.charAt(0) || 'C'}
              </div>
            )}
            <h1 className="text-3xl font-bold text-white">{user?.fullName || 'Company'} Dashboard</h1>
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
                    {user?.imageUrl ? (
                      <img src={user.imageUrl} alt="Avatar" className="h-8 w-8 rounded-full object-cover border border-white/5" />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-surface flex items-center justify-center text-xs border border-white/5">
                        {user?.firstName?.charAt(0) || 'U'}
                      </div>
                    )}
                    <div>
                      <p className="text-white text-sm font-medium">Marketing Materials</p>
                      <p className="text-xs text-text-secondary">Ordered by {user?.fullName || 'User'}</p>
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
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <Briefcase className="w-12 h-12 text-white/20 mb-4" />
            <h3 className="text-white font-semibold text-lg mb-2">No projects yet</h3>
            <p className="text-text-secondary text-sm">
              Your active projects will appear here once you start hiring.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
