"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { getProfileByClerkId, getProfileById } from '@/lib/profile';
import { createClient } from '@/lib/supabase';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export default function NewMessagePage() {
  const { user, isLoaded } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();
  const sellerId = searchParams.get('sellerId');

  const [myProfile, setMyProfile] = useState<any>(null);
  const [sellerProfile, setSellerProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProfiles() {
      if (!isLoaded) return;
      if (!user) {
        router.push('/sign-in');
        return;
      }
      if (!sellerId) {
        setError('No seller specified.');
        setLoading(false);
        return;
      }

      const me = await getProfileByClerkId(user.id);
      const seller = await getProfileById(sellerId);

      setMyProfile(me);
      setSellerProfile(seller);
      setLoading(false);
    }
    loadProfiles();
  }, [user, isLoaded, sellerId, router]);

  async function handleSend() {
    if (!content.trim() || !myProfile || !sellerId) return;
    if (myProfile.id === sellerId) {
      setError("You cannot message yourself.");
      return;
    }

    const supabase = createClient();
    const { data, error } = await supabase
      .from('messages')
      .insert({
        sender_id: myProfile.id,
        receiver_id: sellerId,
        content: content.trim()
      })
      .select('id')
      .single();

    if (error) {
      setError('Failed to send message.');
    } else if (data) {
      router.push(`/messages/${data.id}`);
    }
  }

  if (loading) return <div className="text-white p-8">Loading...</div>;
  if (error) return <div className="text-red-500 p-8">{error}</div>;
  if (myProfile?.id === sellerId) return <div className="text-red-500 p-8">You cannot message yourself.</div>;

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <Card className="p-8">
        <div className="flex items-center gap-4 mb-8">
          {sellerProfile?.avatar_url ? (
            <Image src={sellerProfile.avatar_url} alt="Avatar" width={48} height={48} className="rounded-full" />
          ) : (
            <div className="w-12 h-12 bg-primary-purple rounded-full flex items-center justify-center text-white text-lg font-bold uppercase">
              {sellerProfile?.username?.[0] || 'U'}
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold text-white">Message {sellerProfile?.username}</h2>
            <p className="text-text-secondary">Start a conversation.</p>
          </div>
        </div>

        <textarea 
          className="w-full bg-surface-dark border border-border rounded-xl p-4 text-white focus:outline-none focus:border-primary-purple min-h-[150px] mb-4"
          placeholder="Type your message here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button onClick={handleSend} className="w-full" disabled={!content.trim()}>
          Send Message
        </Button>
      </Card>
    </div>
  );
}
