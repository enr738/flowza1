'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { DollarSign, ShoppingBag, Eye, Star, TrendingUp, PackageOpen, ListTodo } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { createClient } from '@/lib/supabase';
import { getProfileByClerkId } from '@/lib/profile';

export default function SellerOverview() {
  const { user } = useUser();
  const router = useRouter();

  const [stats, setStats] = useState([
    { name: 'Total Earnings', value: '0 DZD', icon: DollarSign, trend: '--' },
    { name: 'Active Orders', value: '0', icon: ShoppingBag, trend: '--' },
    { name: 'Profile Views', value: '0', icon: Eye, trend: '--' },
    { name: 'Average Rating', value: '--', icon: Star, trend: '--' },
  ]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!user) return;
      const supabase = createClient();

      const profile = await getProfileByClerkId(user.id);
      if (!profile) {
        setIsLoading(false);
        return;
      }

      const [{ count: gigsCount }, { count: ordersCount }, { data: orders }] = await Promise.all([
        supabase.from('gigs').select('*', { count: 'exact', head: true }).eq('seller_id', profile.id),
        supabase.from('orders').select('*', { count: 'exact', head: true }).eq('seller_id', profile.id),
        supabase.from('orders').select('*').eq('seller_id', profile.id).order('created_at', { ascending: false }).limit(5)
      ]);

      const { data: completedOrders } = await supabase.from('orders').select('amount').eq('seller_id', profile.id).eq('status', 'completed');
      const earnings = completedOrders?.reduce((acc, order) => acc + (order.amount || 0), 0) || 0;

      setStats([
        { name: 'Total Earnings', value: `${earnings} DZD`, icon: DollarSign, trend: '--' },
        { name: 'Active Orders', value: ordersCount?.toString() || '0', icon: ShoppingBag, trend: '--' },
        { name: 'Gigs', value: gigsCount?.toString() || '0', icon: PackageOpen, trend: '--' },
        { name: 'Average Rating', value: '--', icon: Star, trend: '--' },
      ]);
      setRecentOrders(orders || []);
      setIsLoading(false);
    }
    fetchData();
  }, [user]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.firstName || 'there'} 👋</h1>
          <p className="text-text-secondary">Here is what is happening with your freelance business today.</p>
        </div>
        <Button onClick={() => router.push('/dashboard/seller/gigs/new')}>Create New Gig</Button>
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
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-10 text-center animate-pulse">
              <div className="w-12 h-12 bg-white/10 rounded-full mb-4" />
              <div className="h-4 w-32 bg-white/10 rounded mb-2" />
              <div className="h-3 w-48 bg-white/10 rounded" />
            </div>
          ) : recentOrders.length > 0 ? (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex justify-between items-center p-4 rounded-xl border border-border/50">
                  <div>
                    <p className="text-white font-medium">Order #{order.id.slice(0, 8)}</p>
                    <p className="text-xs text-text-secondary capitalize">Status: {order.status}</p>
                  </div>
                  <span className="font-semibold text-white">{order.amount} DZD</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <ShoppingBag className="w-12 h-12 text-white/20 mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">No orders yet</h3>
              <p className="text-text-secondary text-sm">
                Your orders will appear here once you start selling.
              </p>
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold text-white mb-6">Action Items</h2>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <ListTodo className="w-10 h-10 text-white/20 mb-3" />
            <h3 className="text-white font-semibold text-base mb-1">All caught up</h3>
            <p className="text-text-secondary text-xs">
              No pending action items right now.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
