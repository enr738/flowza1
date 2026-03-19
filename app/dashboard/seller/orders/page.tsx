import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ShoppingBag } from 'lucide-react';

export default function SellerOrders() {
  const statuses = ['Active', 'Completed', 'Cancelled', 'Delivered'];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Orders</h1>
        <p className="text-text-secondary">Manage and track your active project deliveries.</p>
      </div>

      <div className="flex gap-4 border-b border-border pb-px">
        {statuses.map(s => (
          <button key={s} className={`pb-4 px-2 text-sm font-medium border-b-2 transition-colors ${s === 'Active' ? 'border-primary-blue text-primary-blue' : 'border-transparent text-text-secondary hover:text-white'}`}>
            {s} {s === 'Active' && <span className="ml-1.5 bg-primary-blue/20 text-primary-blue py-0.5 px-2 rounded-full text-xs">8</span>}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <ShoppingBag className="w-16 h-16 text-white/20 mb-4" />
          <h3 className="text-white font-semibold text-lg mb-2">No orders yet</h3>
          <p className="text-text-secondary text-sm">
            Your orders will appear here once you start selling.
          </p>
        </div>
      </div>
    </div>
  );
}
