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
                <span className="text-3xl font-bold text-white">0%</span>
                <span className="text-xs text-text-secondary uppercase tracking-wider">Utilized</span>
              </div>
            </div>
            <p className="text-2xl font-bold text-white mb-1">$0 <span className="text-text-secondary font-normal text-lg">/ $0</span></p>
            <p className="text-sm text-text-secondary">Monthly Company Budget</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-white">Spend by Category</h3>
            <PieChart className="h-5 w-5 text-text-secondary" />
          </div>
          <div className="space-y-6">
            <div className="py-8 text-center flex flex-col items-center">
              <PieChart className="w-12 h-12 text-white/20 mb-3" />
              <p className="text-text-secondary text-sm">No expenses yet</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
