import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { DollarSign, Clock, ArrowDownToLine, ArrowUpRight } from 'lucide-react';

export default function SellerEarnings() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Earnings</h1>
        <p className="text-text-secondary">Manage your finances, payouts, and revenue history.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 relative overflow-hidden bg-gradient-to-br from-primary-blue/20 to-primary-purple/20 border-primary-blue/30">
          <div className="absolute top-0 right-0 p-4 opacity-50"><DollarSign className="h-16 w-16 text-primary-blue" /></div>
          <p className="text-sm font-medium text-white/80 mb-2">Available for withdrawal</p>
          <p className="text-4xl font-bold text-white mb-6">$3,240.50</p>
          <Button className="w-full gap-2"><ArrowDownToLine className="h-4 w-4" /> Withdraw Funds</Button>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
             <p className="text-sm font-medium text-text-secondary">Pending Clearance</p>
             <Clock className="h-5 w-5 text-warning" />
          </div>
          <p className="text-3xl font-bold text-white mb-2">$850.00</p>
          <p className="text-sm text-text-secondary">From 3 active orders</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
             <p className="text-sm font-medium text-text-secondary">Lifetime Earned</p>
             <ArrowUpRight className="h-5 w-5 text-success" />
          </div>
          <p className="text-3xl font-bold text-white mb-2">$14,500.00</p>
          <p className="text-sm text-text-secondary">Since member joined</p>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-bold text-white mb-6">Recent Transactions</h2>
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase text-text-secondary border-b border-white/10">
            <tr>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Type</th>
              <th className="pb-3 font-medium">Description</th>
              <th className="pb-3 font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {[
              { date: 'Oct 24, 2023', type: 'Cleared', desc: 'Order #1234 - Logo Design', amount: '+$150.00', color: 'text-success' },
              { date: 'Oct 22, 2023', type: 'Withdrawal', desc: 'Transfer to Bank Account', amount: '-$500.00', color: 'text-white' },
              { date: 'Oct 15, 2023', type: 'Pending', desc: 'Order #1100 - Web App', amount: '+$800.00', color: 'text-warning' },
            ].map((t, i) => (
              <tr key={i} className="border-b border-border/50">
                <td className="py-4 text-text-secondary">{t.date}</td>
                <td className="py-4 text-text-secondary"><span className="px-2 py-1 rounded bg-white/5">{t.type}</span></td>
                <td className="py-4 text-white font-medium">{t.desc}</td>
                <td className={`py-4 text-right font-bold ${t.color}`}>{t.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
