import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

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
        {[1, 2].map((i) => (
          <Card key={i} className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
               <div className="flex items-start gap-4">
                  <div className="h-14 w-20 rounded-lg bg-surface border border-border flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Full-stack Next.js web application</h3>
                    <p className="text-sm text-text-secondary mb-3">Seller: Alex M. • Ordered: Oct 26, 2023</p>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-blue/10 text-primary-blue border border-primary-blue/20">
                        In Progress
                      </span>
                      <span className="text-sm text-text-secondary">Delivery by Oct 31, 2023</span>
                    </div>
                  </div>
               </div>
               
               <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-4 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
                 <div className="text-right">
                   <p className="text-xs text-text-secondary mb-1 uppercase tracking-wider">Amount Paid</p>
                   <p className="text-xl font-bold text-white">$800.00</p>
                 </div>
                 <Button size="sm">View Updates</Button>
               </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
