import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PenTool, Trash2, SwitchCamera, ExternalLink } from 'lucide-react';

export default function SellerGigs() {
  const gigs = [
    { id: 1, title: 'I will design a modern minimal logo for your brand', active: true, orders: 4, impressions: '2.1k', clicks: 342, earnings: '$800' },
    { id: 2, title: 'I will create a complete brand identity package', active: true, orders: 1, impressions: '840', clicks: 121, earnings: '$2,500' },
    { id: 3, title: 'I will design custom social media templates', active: false, orders: 0, impressions: '150', clicks: 23, earnings: '$0' },
  ];

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
              {gigs.map((gig) => (
                <tr key={gig.id} className="border-b border-border hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-16 bg-surface rounded-lg relative overflow-hidden border border-border">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary-purple/20 to-primary-blue/20" />
                      </div>
                      <div>
                        <p className="text-white font-medium line-clamp-1 max-w-sm">{gig.title}</p>
                        <span className={`inline-flex items-center gap-1.5 mt-1 text-xs font-semibold ${gig.active ? 'text-success' : 'text-text-secondary'}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${gig.active ? 'bg-success' : 'bg-text-secondary'}`} />
                          {gig.active ? 'Active' : 'Paused'}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-text-secondary">{gig.impressions}</td>
                  <td className="px-6 py-4 text-text-secondary">{gig.clicks}</td>
                  <td className="px-6 py-4 text-text-secondary">{gig.orders}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <Button variant="ghost" size="icon"><PenTool className="h-4 w-4" /></Button>
                       <Button variant="ghost" size="icon"><SwitchCamera className="h-4 w-4" /></Button>
                       <Button variant="ghost" size="icon" className="text-error hover:text-error hover:bg-error/10"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
