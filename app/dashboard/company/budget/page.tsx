import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PieChart, Download } from 'lucide-react';

export default function CompanyBudget() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Budget Allocation</h1>
          <p className="text-text-secondary">Track spending limits across your company and teams.</p>
        </div>
        <Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Export Report</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 flex items-center justify-center border border-primary-blue/20 bg-primary-blue/5">
           <div className="text-center py-10">
              <div className="relative inline-flex items-center justify-center mb-6">
                <svg className="w-48 h-48 transform -rotate-90">
                  <circle className="text-border" strokeWidth="12" stroke="currentColor" fill="transparent" r="80" cx="96" cy="96" />
                  <circle className="text-primary-blue" strokeWidth="12" strokeDasharray="502" strokeDashoffset="75" strokeLinecap="round" stroke="currentColor" fill="transparent" r="80" cx="96" cy="96" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                   <span className="text-3xl font-bold text-white">85%</span>
                   <span className="text-xs text-text-secondary uppercase tracking-wider">Utilized</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-white mb-1">$8,500 <span className="text-text-secondary font-normal text-lg">/ $10,000</span></p>
              <p className="text-sm text-text-secondary">Monthly Company Budget</p>
           </div>
        </Card>

        <Card className="p-6">
           <div className="flex justify-between items-center mb-6">
             <h3 className="font-bold text-white">Spend by Category</h3>
             <PieChart className="h-5 w-5 text-text-secondary" />
           </div>
           <div className="space-y-6">
              {[
                { name: 'Development', amount: '$4,200', pct: 42, color: 'bg-primary-blue' },
                { name: 'Design', amount: '$2,800', pct: 28, color: 'bg-primary-purple' },
                { name: 'Marketing', amount: '$1,500', pct: 15, color: 'bg-success' },
              ].map(c => (
                <div key={c.name}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white">{c.name}</span>
                    <span className="text-text-secondary font-medium">{c.amount}</span>
                  </div>
                  <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${c.color}`} style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              ))}
           </div>
        </Card>
      </div>
    </div>
  );
}
