'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Send, ArrowLeft, Loader2 } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { createClient } from '@/lib/supabase';

interface SellerProfile {
  id: string;
  username: string;
  avatar_url: string | null;
}

export default function NewMessagePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sellerId = searchParams.get('sellerId') || '';
  const { user, isLoaded } = useUser();

  const [seller, setSeller] = useState<SellerProfile | null>(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      router.push('/sign-in');
      return;
    }

    async function fetchSeller() {
      if (!sellerId) {
        setIsLoading(false);
        return;
      }
      const supabase = createClient();
      const { data } = await supabase
        .from('profiles')
        .select('id, username, avatar_url')
        .eq('id', sellerId)
        .single();

      if (data) {
        setSeller(data as SellerProfile);
      }
      setIsLoading(false);
    }
    fetchSeller();
  }, [sellerId, user, isLoaded, router]);

  const handleSend = async () => {
    if (!message.trim() || !seller || !user) return;
    setIsSending(true);
    setError('');

    try {
      const supabase = createClient();

      // Get sender profile id
      const { data: senderProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('clerk_id', user.id)
        .single();

      if (!senderProfile) {
        setError('Your profile was not found. Please complete onboarding first.');
        setIsSending(false);
        return;
      }

      const { data: newMessage, error: insertError } = await supabase
        .from('messages')
        .insert({
          sender_id: senderProfile.id,
          receiver_id: seller.id,
          content: message.trim(),
        })
        .select('id')
        .single();

      if (insertError) {
        setError('Failed to send message. Please try again.');
        setIsSending(false);
        return;
      }

      if (newMessage) {
        router.push(`/messages/${newMessage.id}`);
      }
    } catch {
      setError('An unexpected error occurred.');
    } finally {
      setIsSending(false);
    }
  };

  if (!isLoaded || isLoading) {
    return (
      <>
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 text-primary-blue animate-spin" />
        </main>
      </>
    );
  }

  if (!sellerId || !seller) {
    return (
      <>
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center py-20 text-center px-4">
          <h1 className="text-2xl font-bold text-white mb-3">Seller Not Found</h1>
          <p className="text-text-secondary mb-6">The seller you are trying to contact could not be found.</p>
          <Button onClick={() => router.push('/explore')}>Browse Services</Button>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 py-10 px-4">
        <div className="container mx-auto max-w-2xl">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <Card className="p-6 md:p-8">
            {/* Seller Header */}
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border">
              <div className="relative h-14 w-14 rounded-full overflow-hidden bg-surface flex-shrink-0">
                {seller.avatar_url ? (
                  <Image src={seller.avatar_url} alt={seller.username} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-primary flex items-center justify-center text-white text-xl font-bold">
                    {seller.username?.charAt(0) || '?'}
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Message {seller.username}</h1>

              </div>
            </div>

            {/* Message Input */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-white">Your Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe what you need, your budget, timeline, and any relevant details..."
                rows={6}
                className="w-full px-4 py-3 rounded-xl bg-background-dark border border-border text-white placeholder:text-text-secondary focus:outline-none focus:border-primary-blue transition-colors text-sm resize-none"
              />

              {error && (
                <p className="text-error text-sm">{error}</p>
              )}

              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSend}
                  disabled={!message.trim() || isSending}
                  isLoading={isSending}
                  className="gap-2"
                >
                  <Send className="h-4 w-4" />
                  Send Message
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </>
  );
}
