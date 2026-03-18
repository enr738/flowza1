import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';

export default function CompanyProjects() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
          <p className="text-text-secondary">Organize your company orders into manageable projects.</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" /> New Project</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Website Redesign', status: 'Active', tasks: 4, spent: '$3,200', budget: '$5,000' },
          { name: 'Q4 Marketing Campaign', status: 'Active', tasks: 2, spent: '$1,800', budget: '$2,500' },
          { name: 'Mobile App Launch', status: 'Planning', tasks: 0, spent: '$0', budget: '$15,000' },
          { name: 'Brand Refresh', status: 'Completed', tasks: 6, spent: '$2,400', budget: '$2,400' },
        ].map((p, i) => (
          <Card key={i} className="p-6 border border-white/5 hover:border-white/10 transition-colors cursor-pointer">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-bold text-white">{p.name}</h3>
              <span className={`px-2 py-1 uppercase tracking-wider text-[10px] font-bold rounded ${p.status === 'Active' ? 'bg-primary-blue/20 text-primary-blue' : p.status === 'Completed' ? 'bg-success/20 text-success' : 'bg-surface text-text-secondary border border-border'}`}>
                {p.status}
              </span>
            </div>
            
            <div className="flex justify-between text-sm mb-2">
              <span className="text-text-secondary">Budget Used</span>
              <span className="text-white font-medium">{p.spent} / {p.budget}</span>
            </div>
            
            <div className="h-2 w-full bg-border rounded-full overflow-hidden mb-6">
               <div 
                 className={`h-full rounded-full ${p.status === 'Completed' ? 'bg-success' : 'bg-gradient-primary'}`} 
                 style={{ width: `${(parseInt(p.spent.replace(/\$|,/g, '')) / parseInt(p.budget.replace(/\$|,/g, ''))) * 100}%` }} 
               />
            </div>
            
            <div className="flex justify-between items-center text-sm pt-4 border-t border-white/5">
              <span className="text-text-secondary">{p.tasks} active orders</span>
              <div className="flex -space-x-2">
                 <div className="h-6 w-6 rounded-full border-2 border-surface bg-white/10" />
                 <div className="h-6 w-6 rounded-full border-2 border-surface bg-white/20" />
                 <div className="h-6 w-6 rounded-full border-2 border-surface bg-white/30 flex items-center justify-center text-[10px] text-white font-medium">+2</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
