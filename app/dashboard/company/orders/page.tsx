import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Filter, Download, ShoppingBag } from 'lucide-react';

export default function CompanyOrders() {
  const statuses = ['All Orders', 'Active', 'In Review', 'Completed', 'Cancelled'];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Company Orders</h1>
          <p className="text-text-secondary">View and manage all service requests across your organization.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" /> Filter</Button>
          <Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Export CSV</Button>
        </div>
      </div>

      <div className="flex gap-4 border-b border-border pb-px overflow-x-auto">
        {statuses.map(s => (
          <button key={s} className="pb-4 px-2 text-sm font-medium border-b-2 text-text-secondary border-transparent whitespace-nowrap hover:text-white hover:border-border transition-colors last:mr-4">
            {s} {s === 'Active' && <span className="ml-1.5 bg-primary-blue/20 text-primary-blue py-0.5 px-2 rounded-full text-xs">4</span>}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-white/5 text-text-secondary">
              <tr>
                <th className="px-6 py-4 font-medium">Order Details</th>
                <th className="px-6 py-4 font-medium">Team Member</th>
                <th className="px-6 py-4 font-medium">Freelancer</th>
                <th className="px-6 py-4 font-medium">Date & Status</th>
                <th className="px-6 py-4 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="py-20 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <ShoppingBag className="w-16 h-16 text-white/20 mb-4" />
                    <h3 className="text-white font-semibold text-lg mb-2">No orders yet</h3>
                    <p className="text-text-secondary text-sm">
                      Your company orders will appear here once you start hiring.
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
