'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { createClient } from '@/lib/supabase';
import { getProfileByClerkId } from '@/lib/profile';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Loader2, ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function EditGigPage({ params }: { params: { gigId: string } }) {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Development');
  const [price, setPrice] = useState('');
  const [deliveryDays, setDeliveryDays] = useState('3');

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      router.push('/sign-in');
      return;
    }

    async function fetchGig() {
      setIsLoading(true);
      const supabase = createClient();
      
      const myProfile = await getProfileByClerkId(user!.id);
      if (!myProfile) {
        router.push('/dashboard/seller/gigs');
        return;
      }

      const { data, error } = await supabase
        .from('gigs')
        .select('*')
        .eq('id', params.gigId)
        .single();

      if (error || !data) {
        router.push('/dashboard/seller/gigs');
        return;
      }

      // Check ownership
      if (data.seller_id !== myProfile.id) {
        router.push('/dashboard/seller/gigs');
        return;
      }

      setTitle(data.title || '');
      setDescription(data.description || '');
      setCategory(data.category || 'Development');
      setPrice(data.price?.toString() || '');
      setDeliveryDays(data.delivery_days?.toString() || '3');
      
      setIsLoading(false);
    }

    fetchGig();
  }, [user, isLoaded, params.gigId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    const res = await fetch(`/api/gigs/${params.gigId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        category,
        price: Number(price),
        delivery_days: Number(deliveryDays)
      })
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || 'Failed to update gig');
      setIsSaving(false);
    } else {
      router.push('/dashboard/seller/gigs');
      router.refresh();
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 text-primary-blue animate-spin mb-4" />
        <p className="text-text-secondary text-sm">Loading gig data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/seller/gigs">
          <Button variant="outline" className="p-2 h-10 w-10">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Edit Service</h1>
          <p className="text-text-secondary">Update the details of your gig.</p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
          {error}
        </div>
      )}

      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white block">Gig Title</label>
            <input
              required
              maxLength={80}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-background-dark border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-blue transition-colors"
              placeholder="I will..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white block">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-background-dark border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-blue transition-colors"
              >
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Video">Video</option>
                <option value="Writing">Writing</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-white block">Delivery Time (Days)</label>
              <input
                required
                type="number"
                min={1}
                value={deliveryDays}
                onChange={(e) => setDeliveryDays(e.target.value)}
                className="w-full bg-background-dark border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-blue transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white block">Price (DZD)</label>
            <input
              required
              type="number"
              min={100}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-background-dark border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-blue transition-colors"
              placeholder="5000"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white block">Description</label>
            <textarea
              required
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-background-dark border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-blue transition-colors resize-none"
              placeholder="Describe your service in detail..."
            />
          </div>

          <div className="pt-4 flex justify-end gap-4">
            <Link href="/dashboard/seller/gigs">
              <Button variant="outline" type="button">Cancel</Button>
            </Link>
            <Button type="submit" disabled={isSaving} className="gap-2">
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" /> Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
