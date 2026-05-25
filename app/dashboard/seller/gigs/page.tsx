'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PenTool, Trash2, ExternalLink, PackageOpen, Loader2 } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { createClient } from '@/lib/supabase';

interface GigRow {
  id: string;
  title: string;
  price: number;
  category: string | null;
  is_active: boolean;
  created_at: string;
}

export default function SellerGigs() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [gigs, setGigs] = useState<GigRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      router.push('/sign-in');
      return;
    }

    async function fetchGigs() {
      const supabase = createClient();
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('clerk_id', user!.id)
        .single();

      if (!profile) {
        setIsLoading(false);
        return;
      }

      const { data } = await supabase
        .from('gigs')
        .select('id, title, price, category, is_active, created_at')
        .eq('seller_id', profile.id)
        .order('created_at', { ascending: false });

      setGigs((data as GigRow[]) || []);
      setIsLoading(false);
    }
    fetchGigs();
  }, [user, isLoaded, router]);

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this gig?')) return;
    const supabase = createClient();
    await supabase.from('gigs').delete().eq('id', id);
    setGigs(gigs.filter(g => g.id !== id));
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manage Gigs</h1>
          <p className="text-text-secondary">Create and manage your professional services.</p>
        </div>
        <Button onClick={() => router.push('/dashboard/seller/gigs/new')}>Create New Gig</Button>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-white/5 text-text-secondary">
              <tr>
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price (DZD)</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Loader2 className="w-8 h-8 text-primary-blue animate-spin mb-4" />
                      <p className="text-text-secondary text-sm">Loading your gigs...</p>
                    </div>
                  </td>
                </tr>
              ) : gigs.length === 0 ? (
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
              ) : (
                gigs.map((gig) => (
                  <tr key={gig.id} className="border-t border-border/50 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-white font-medium">{gig.title}</span>
                    </td>
                    <td className="px-6 py-4 text-text-secondary">{gig.category || '–'}</td>
                    <td className="px-6 py-4 text-white font-medium">{gig.price} DZD</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${gig.is_active ? 'bg-success/20 text-success' : 'bg-white/10 text-text-secondary'}`}>
                        {gig.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => window.open(`/gigs/${gig.id}`, '_blank')}
                          className="p-2 rounded-lg hover:bg-white/10 text-text-secondary hover:text-white transition-colors"
                          title="View"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => router.push(`/dashboard/seller/gigs/${gig.id}/edit`)}
                          className="p-2 rounded-lg hover:bg-white/10 text-text-secondary hover:text-white transition-colors"
                          title="Edit"
                        >
                          <PenTool className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(gig.id)}
                          className="p-2 rounded-lg hover:bg-red-500/10 text-text-secondary hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
