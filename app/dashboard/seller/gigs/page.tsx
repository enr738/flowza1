import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PenTool, Trash2, SwitchCamera, ExternalLink, PackageOpen } from 'lucide-react';

export default function SellerGigs() {
  const gigs: any[] = [];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manage Gigs</h1>
          <p className="text-text-secondary">Create and manage your professional services.</p>
        </div>
        <Button>Create New Gig</Button>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-white/5 text-text-secondary">
              <tr>
                <th className="px-6 py-4 font-medium">Gig Profile</th>
                <th className="px-6 py-4 font-medium">Impressions</th>
                <th className="px-6 py-4 font-medium">Clicks</th>
                <th className="px-6 py-4 font-medium">Orders</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="py-20 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <PackageOpen className="w-16 h-16 text-white/20 mb-4" />
                    <h3 className="text-white font-semibold text-lg mb-2">No gigs yet</h3>
                    <p className="text-text-secondary text-sm">
                      Create your first gig to start selling on Flowza.
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
