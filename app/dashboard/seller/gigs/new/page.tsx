'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { createClient } from '@/lib/supabase';

const CATEGORIES = ['Design', 'Development', 'Writing', 'Marketing', 'Video'];

export default function CreateGigPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Design');
  const [price, setPrice] = useState('');
  const [deliveryDays, setDeliveryDays] = useState('');
  const [imageUrl1, setImageUrl1] = useState('');
  const [imageUrl2, setImageUrl2] = useState('');
  const [imageUrl3, setImageUrl3] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const validate = (): string | null => {
    if (!title.trim() || title.length > 100) return 'Title is required and must be under 100 characters.';
    if (!description.trim() || description.length < 50) return 'Description is required and must be at least 50 characters.';
    if (!price || Number(price) < 1000) return 'Price must be at least 1000 DZD.';
    if (!deliveryDays || Number(deliveryDays) < 1) return 'Delivery time must be at least 1 day.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!user) {
      setError('You must be signed in to create a gig.');
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createClient();

      // Get the seller's profile id
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('clerk_id', user.id)
        .single();

      if (!profile) {
        setError('Your profile was not found. Please complete onboarding first.');
        setIsSubmitting(false);
        return;
      }

      const images: string[] = [imageUrl1, imageUrl2, imageUrl3].filter(url => url.trim() !== '');

      const { error: insertError } = await supabase.from('gigs').insert({
        seller_id: profile.id,
        title: title.trim(),
        description: description.trim(),
        category,
        price: Number(price),
        images: images.length > 0 ? images : null,
        is_active: true,
      });

      if (insertError) {
        setError(`Failed to create gig: ${insertError.message}`);
        setIsSubmitting(false);
        return;
      }

      router.push('/dashboard/seller/gigs');
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 border-2 border-primary-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    router.push('/sign-in');
    return null;
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <button
          onClick={() => router.push('/dashboard/seller/gigs')}
          className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Gigs
        </button>
        <h1 className="text-3xl font-bold text-white mb-2">Create New Gig</h1>
        <p className="text-text-secondary">Fill in the details below to publish your service.</p>
      </div>

      <Card className="p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Title <span className="text-error">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              placeholder="I will design a modern logo for your brand"
              className="w-full h-12 px-4 rounded-xl bg-background-dark border border-border text-white placeholder:text-text-secondary focus:outline-none focus:border-primary-blue transition-colors text-sm"
            />
            <p className="text-xs text-text-secondary mt-1.5">{title.length}/100 characters</p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Description <span className="text-error">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              placeholder="Describe your service in detail. What will the buyer receive? What makes your service unique? (min 50 characters)"
              className="w-full px-4 py-3 rounded-xl bg-background-dark border border-border text-white placeholder:text-text-secondary focus:outline-none focus:border-primary-blue transition-colors text-sm resize-none"
            />
            <p className={`text-xs mt-1.5 ${description.length < 50 ? 'text-warning' : 'text-text-secondary'}`}>
              {description.length}/50 minimum characters
            </p>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Category <span className="text-error">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-12 px-4 rounded-xl bg-background-dark border border-border text-white focus:outline-none focus:border-primary-blue transition-colors text-sm"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat} className="bg-background-dark">{cat}</option>
              ))}
            </select>
          </div>

          {/* Price & Delivery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Price (DZD) <span className="text-error">*</span>
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min={1000}
                placeholder="5000"
                className="w-full h-12 px-4 rounded-xl bg-background-dark border border-border text-white placeholder:text-text-secondary focus:outline-none focus:border-primary-blue transition-colors text-sm"
              />
              <p className="text-xs text-text-secondary mt-1.5">Minimum: 1,000 DZD</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Delivery Time (days) <span className="text-error">*</span>
              </label>
              <input
                type="number"
                value={deliveryDays}
                onChange={(e) => setDeliveryDays(e.target.value)}
                min={1}
                placeholder="3"
                className="w-full h-12 px-4 rounded-xl bg-background-dark border border-border text-white placeholder:text-text-secondary focus:outline-none focus:border-primary-blue transition-colors text-sm"
              />
              <p className="text-xs text-text-secondary mt-1.5">Minimum: 1 day</p>
            </div>
          </div>

          {/* Image URLs */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Image URLs <span className="text-text-secondary font-normal">(optional, up to 3)</span>
            </label>
            <div className="space-y-3">
              <input
                type="url"
                value={imageUrl1}
                onChange={(e) => setImageUrl1(e.target.value)}
                placeholder="https://example.com/image1.jpg"
                className="w-full h-11 px-4 rounded-xl bg-background-dark border border-border text-white placeholder:text-text-secondary focus:outline-none focus:border-primary-blue transition-colors text-sm"
              />
              <input
                type="url"
                value={imageUrl2}
                onChange={(e) => setImageUrl2(e.target.value)}
                placeholder="https://example.com/image2.jpg"
                className="w-full h-11 px-4 rounded-xl bg-background-dark border border-border text-white placeholder:text-text-secondary focus:outline-none focus:border-primary-blue transition-colors text-sm"
              />
              <input
                type="url"
                value={imageUrl3}
                onChange={(e) => setImageUrl3(e.target.value)}
                placeholder="https://example.com/image3.jpg"
                className="w-full h-11 px-4 rounded-xl bg-background-dark border border-border text-white placeholder:text-text-secondary focus:outline-none focus:border-primary-blue transition-colors text-sm"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-error/10 border border-error/20">
              <AlertCircle className="h-5 w-5 text-error flex-shrink-0 mt-0.5" />
              <p className="text-error text-sm">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/dashboard/seller/gigs')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Publish Gig
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
