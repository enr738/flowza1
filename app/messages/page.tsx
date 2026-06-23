'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { getProfileByClerkId } from '@/lib/profile';
import { createClient } from '@/lib/supabase';
import { Card } from '@/components/ui/Card';
import { MessageSquare, ArrowRight, Loader2, PackageOpen } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';

interface Conversation {
  otherPartyId: string;
  otherPartyUsername: string;
  otherPartyAvatar: string | null;
  lastMessage: string;
  lastMessageAt: string;
  seedMessageId: string;
  unreadCount: number;
}

export default function MessagesInboxPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInbox() {
      if (!isLoaded) return;
      if (!user) {
        router.push('/sign-in');
        return;
      }

      const supabase = createClient();
      const me = await getProfileByClerkId(user.id);
      if (!me) {
        setLoading(false);
        return;
      }

      const { data: messages } = await supabase
        .from('messages')
        .select('*, sender:profiles!sender_id(id, username, avatar_url, email), receiver:profiles!receiver_id(id, username, avatar_url, email)')
        .or(`sender_id.eq.${me.id},receiver_id.eq.${me.id}`)
        .order('created_at', { ascending: false });

      if (messages && messages.length > 0) {
        const grouped = new Map<string, Conversation>();

        messages.forEach((msg: any) => {
          const isSender = msg.sender_id === me.id;
          const otherPartyId = isSender ? msg.receiver_id : msg.sender_id;
          const otherPartyProfile = isSender ? msg.receiver : msg.sender;
          
          if (!grouped.has(otherPartyId)) {
            const fallbackUsername = otherPartyProfile?.username || otherPartyProfile?.email?.split('@')[0] || 'Unknown';
            
            grouped.set(otherPartyId, {
              otherPartyId,
              otherPartyUsername: fallbackUsername,
              otherPartyAvatar: otherPartyProfile?.avatar_url,
              lastMessage: msg.content,
              lastMessageAt: msg.created_at,
              seedMessageId: msg.id,
              unreadCount: 0,
            });
          }

          // حساب الرسائل غير المقروءة
          const isSenderMsg = msg.sender_id === me.id;
          const partnerId = isSenderMsg ? msg.receiver_id : msg.sender_id;
          if (!isSenderMsg && !msg.is_read) {
            const conv = grouped.get(partnerId);
            if (conv) conv.unreadCount++;
          }
        });

        setConversations(Array.from(grouped.values()));
      }
      
      setLoading(false);
    }
    loadInbox();
  }, [user, isLoaded, router]);

  return (
    <div className="min-h-screen bg-background-dark flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-12 w-12 rounded-xl bg-primary-purple/10 flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-primary-purple" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Messages</h1>
              <p className="text-text-secondary">Your recent conversations</p>
            </div>
          </div>

          <Card className="overflow-hidden border border-border bg-surface">
            {loading ? (
              <div className="p-20 flex flex-col items-center justify-center">
                <Loader2 className="h-8 w-8 text-primary-purple animate-spin mb-4" />
                <p className="text-text-secondary">Loading inbox...</p>
              </div>
            ) : conversations.length === 0 ? (
              <div className="p-20 flex flex-col items-center justify-center text-center">
                <PackageOpen className="w-16 h-16 text-white/10 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No conversations yet</h3>
                <p className="text-text-secondary max-w-sm">
                  When you contact a seller or a buyer contacts you, your messages will appear here.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {conversations.map((conv) => (
                  <Link 
                    href={`/messages/${conv.seedMessageId}`} 
                    key={conv.otherPartyId}
                    className="flex items-center p-6 hover:bg-white/5 transition-colors group"
                  >
                    <div className="relative h-14 w-14 rounded-full overflow-hidden bg-primary-purple/20 flex-shrink-0 flex items-center justify-center mr-4">
                      {conv.otherPartyAvatar ? (
                        <Image 
                          src={conv.otherPartyAvatar} 
                          alt={conv.otherPartyUsername} 
                          fill 
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <span className="text-xl font-bold text-white uppercase">
                          {conv.otherPartyUsername[0]}
                        </span>
                      )}
                      {/* دائرة الإشعار */}
                      {conv.unreadCount > 0 && (
                        <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 flex items-center justify-center z-10">
                          <span className="text-white text-[10px] font-bold">
                            {conv.unreadCount > 9 ? '9+' : conv.unreadCount}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-bold text-lg truncate pr-4 ${conv.unreadCount > 0 ? 'text-white' : 'text-white/80'}`}>
                          {conv.otherPartyUsername}
                        </h3>
                        <span className="text-xs text-text-secondary flex-shrink-0">
                          {new Date(conv.lastMessageAt).toLocaleDateString(undefined, { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                      <p className={`text-sm truncate pr-8 ${conv.unreadCount > 0 ? 'text-white font-medium' : 'text-text-secondary'}`}>
                        {conv.lastMessage}
                      </p>
                    </div>

                    <div className="pl-4">
                      <ArrowRight className="h-5 w-5 text-text-secondary group-hover:text-primary-purple group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}