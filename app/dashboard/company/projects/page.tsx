import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Plus, Briefcase } from 'lucide-react';

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
        <div className="col-span-full py-20">
          <div className="flex flex-col items-center justify-center text-center">
            <Briefcase className="w-16 h-16 text-white/20 mb-4" />
            <h3 className="text-white font-semibold text-lg mb-2">No projects yet</h3>
            <p className="text-text-secondary text-sm mb-6">
              Organize your orders into projects for better tracking.
            </p>
            <Button className="gap-2"><Plus className="h-4 w-4" /> Create First Project</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
