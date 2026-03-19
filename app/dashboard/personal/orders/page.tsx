import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ShoppingBag } from 'lucide-react';

export default function PersonalOrders() {
  const statuses = ['Active', 'Completed', 'Cancelled'];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">My Orders</h1>
        <p className="text-text-secondary">Track the progress of your purchased services.</p>
      </div>

      <div className="flex gap-4 border-b border-border pb-px">
        {statuses.map(s => (
          <button key={s} className={`pb-4 px-2 text-sm font-medium border-b-2 transition-colors ${s === 'Active' ? 'border-primary-purple text-primary-purple' : 'border-transparent text-text-secondary hover:text-white'}`}>
            {s} {s === 'Active' && <span className="ml-1.5 bg-primary-purple/20 text-primary-purple py-0.5 px-2 rounded-full text-xs">2</span>}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <ShoppingBag className="w-16 h-16 text-white/20 mb-4" />
          <h3 className="text-white font-semibold text-lg mb-2">No active orders</h3>
          <p className="text-text-secondary text-sm">
            Your orders will appear here once you make a purchase.
          </p>
        </div>
      </div>
    </div>
  );
}
