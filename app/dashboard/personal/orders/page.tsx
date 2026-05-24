import { Card } from '@/components/ui/Card';
import { ShoppingBag, CheckCircle2 } from 'lucide-react';
import { auth } from '@clerk/nextjs/server';
import { getProfileByClerkId } from '@/lib/profile';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export default async function PersonalOrders({ searchParams }: { searchParams: { success?: string } }) {
  const statuses = ['Active', 'Completed', 'Cancelled'];
  const isSuccess = searchParams?.success === 'true';
  const { userId } = auth();
  
  let orders: any[] = [];
  
  if (userId) {
    const supabase = createServerSupabaseClient();
    const profile = await getProfileByClerkId(userId);
    if (profile) {
      const { data } = await supabase
        .from('orders')
        .select('*, gigs(title), profiles!seller_id(username)')
        .eq('buyer_id', profile.id)
        .order('created_at', { ascending: false });
      if (data) {
        orders = data;
      }
    }
  }

  const activeOrders = orders.filter(o => o.status === 'active' || o.status === 'pending');

  return (
    <div className="space-y-8">
      {isSuccess && (
        <div className="bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] p-4 rounded-xl flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium">Payment successful! Your order has been placed 🎉</p>
        </div>
      )}

      <div>
        <h1 className="text-3xl font-bold text-white mb-2">My Orders</h1>
        <p className="text-text-secondary">Track the progress of your purchased services.</p>
      </div>

      <div className="flex gap-4 border-b border-border pb-px">
        {statuses.map(s => (
          <button key={s} className={`pb-4 px-2 text-sm font-medium border-b-2 transition-colors ${s === 'Active' ? 'border-primary-purple text-primary-purple' : 'border-transparent text-text-secondary hover:text-white'}`}>
            {s} {s === 'Active' && activeOrders.length > 0 && <span className="ml-1.5 bg-primary-purple/20 text-primary-purple py-0.5 px-2 rounded-full text-xs">{activeOrders.length}</span>}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {orders.length > 0 ? (
          orders.map(order => (
            <Card key={order.id} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">{order.gigs?.title || 'Untitled Gig'}</h3>
                  <p className="text-text-secondary text-sm">Seller: {order.profiles?.username || 'Unknown'}</p>
                </div>
                <span className="bg-primary-blue/20 text-primary-blue px-3 py-1 rounded-full text-xs font-semibold capitalize">{order.status}</span>
              </div>
              <div className="mt-6 flex gap-4 text-sm text-text-secondary">
                <span>Amount: {order.amount} DZD</span>
                {order.stripe_payment_id && (
                  <>
                    <span>•</span>
                    <span>Paid</span>
                  </>
                )}
              </div>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ShoppingBag className="w-16 h-16 text-white/20 mb-4" />
            <h3 className="text-white font-semibold text-lg mb-2">No active orders</h3>
            <p className="text-text-secondary text-sm">
              Your orders will appear here once you make a purchase.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
