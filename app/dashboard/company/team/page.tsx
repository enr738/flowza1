import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Mail, Search, Shield, Trash2 } from 'lucide-react';

export default function CompanyTeam() {
  const members = [
    { id: 1, name: 'Alice Smith', email: 'alice@acme.com', role: 'owner', orders: 12 },
    { id: 2, name: 'John Doe', email: 'john@acme.com', role: 'admin', orders: 24 },
    { id: 3, name: 'Bob Johnson', email: 'bob@acme.com', role: 'member', orders: 5 },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@acme.com', role: 'member', orders: 4 },
  ];

  const getRoleBadge = (role: string) => {
    switch(role) {
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
              {members.map((m) => (
                <tr key={m.id} className="border-b border-border hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-blue to-primary-purple flex items-center justify-center font-bold text-white shadow-sm">
                        {m.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-medium">{m.name}</p>
                        <p className="text-xs text-text-secondary">{m.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{getRoleBadge(m.role)}</td>
                  <td className="px-6 py-4 text-text-secondary">{m.orders}</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon" className="hover:text-white"><Shield className="h-4 w-4" /></Button>
                    {m.role !== 'owner' && (
                      <Button variant="ghost" size="icon" className="text-error hover:text-error hover:bg-error/10 ml-2"><Trash2 className="h-4 w-4" /></Button>
                    )}
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
