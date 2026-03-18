import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Filter, Download } from 'lucide-react';

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
               {[
                 { id: '1024', title: 'Website Redesign', member: 'Alice Smith', seller: 'Alex M.', date: 'Oct 24, 2023', status: 'In Progress', amt: '$800' },
                 { id: '1025', title: 'Q4 Marketing Videos', member: 'John Doe', seller: 'David K.', date: 'Oct 23, 2023', status: 'In Review', amt: '$450' },
                 { id: '1026', title: 'Social Media Strategy', member: 'Sarah Wilson', seller: 'Lisa R.', date: 'Oct 20, 2023', status: 'Completed', amt: '$1,200' },
                 { id: '1027', title: 'Sales Deck Presentation', member: 'John Doe', seller: 'Emma W.', date: 'Oct 15, 2023', status: 'Completed', amt: '$250' },
               ].map((o) => (
                 <tr key={o.id} className="border-b border-border hover:bg-white/5 transition-colors">
                   <td className="px-6 py-4">
                      <p className="font-semibold text-white whitespace-nowrap">{o.title}</p>
                      <p className="text-xs text-text-secondary mt-1">Order #{o.id}</p>
                   </td>
                   <td className="px-6 py-4 text-text-secondary whitespace-nowrap">{o.member}</td>
                   <td className="px-6 py-4 text-primary-purple font-medium whitespace-nowrap">{o.seller}</td>
                   <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-text-secondary mb-1">{o.date}</p>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${o.status === 'Completed' ? 'bg-success/20 text-success' : o.status === 'In Progress' ? 'bg-primary-blue/20 text-primary-blue' : 'bg-warning/20 text-warning'}`}>
                        {o.status}
                      </span>
                   </td>
                   <td className="px-6 py-4 text-right font-bold text-white">{o.amt}</td>
                 </tr>
               ))}
             </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
