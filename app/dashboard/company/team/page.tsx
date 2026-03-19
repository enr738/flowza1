import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Mail, Search, Shield, Trash2, Users } from 'lucide-react';

export default function CompanyTeam() {
  const members: any[] = [];

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'owner': return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-primary-purple/20 text-primary-purple border border-primary-purple/30">👑 Owner</span>;
      case 'admin': return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-primary-blue/20 text-primary-blue border border-primary-blue/30">🛡️ Admin</span>;
      default: return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-surface border border-border text-text-secondary">👤 Member</span>;
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Team Members</h1>
          <p className="text-text-secondary">Manage access and roles for your company workspace.</p>
        </div>
        <Button className="gap-2"><Mail className="h-4 w-4" /> Invite Member</Button>
      </div>

      <Card className="overflow-hidden">
        <div className="p-4 border-b border-border flex gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <input type="text" placeholder="Search members..." className="w-full pl-9 pr-4 py-2 bg-background-dark border border-border rounded-xl text-sm focus:outline-none focus:border-primary-blue text-white" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-white/5 text-text-secondary">
              <tr>
                <th className="px-6 py-4 font-medium">Member</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Orders Placed</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4} className="py-20 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Users className="w-16 h-16 text-white/20 mb-4" />
                    <h3 className="text-white font-semibold text-lg mb-2">No team members yet</h3>
                    <p className="text-text-secondary text-sm">
                      Invite members to join your company workspace.
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
