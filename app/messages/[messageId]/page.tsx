"use client";

import { useEffect, useState, useRef } from 'react';
import { useUser } from '@clerk/nextjs';
import { getProfileByClerkId, getProfileById } from '@/lib/profile';
import { createClient } from '@/lib/supabase';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Clock, Check, XCircle } from 'lucide-react';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';

export default function MessageThread({ params }: { params: { messageId: string } }) {
  const { user, isLoaded } = useUser();
  const [messages, setMessages] = useState<any[]>([]);
  const [myProfile, setMyProfile] = useState<any>(null);
  const [otherProfile, setOtherProfile] = useState<any>(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadData() {
      if (!isLoaded || !user) return;
      const me = await getProfileByClerkId(user.id);
      if (!me) return;
      setMyProfile(me);

      const supabase = createClient();
      
      // 1. Fetch seed message
      const { data: seedMsg } = await supabase
        .from('messages')
        .select('*')
        .eq('id', params.messageId)
        .single();
        
      if (!seedMsg) { 
        setLoading(false); 
        return; 
      }

      // 2. Determine other party
      const otherId = seedMsg.sender_id === me.id ? seedMsg.receiver_id : seedMsg.sender_id;
      const other = await getProfileById(otherId);
      setOtherProfile(other);

      // 3. Load all messages
      const { data: allMsgs } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${me.id},receiver_id.eq.${otherId}),and(sender_id.eq.${otherId},receiver_id.eq.${me.id})`)
        .order('created_at', { ascending: true });
        
      if (allMsgs) {
        setMessages(allMsgs.map(m => ({ ...m, status: 'sent' })));
      }

      setLoading(false);

      // 4. Subscribe to realtime
      const channel = supabase.channel(`chat_${me.id}_${otherId}`)
        .on('postgres_changes', { 
            event: 'INSERT', 
            schema: 'public', 
            table: 'messages',
            filter: `receiver_id=eq.${me.id}`
          },
          (payload) => {
            if (payload.new.sender_id === otherId) {
               setMessages(prev => {
                 // Avoid duplicate messages
                 if (prev.some(m => m.id === payload.new.id)) return prev;
                 return [...prev, { ...payload.new, status: 'sent' }];
               });
            }
          })
        .subscribe();

      return () => { 
        supabase.removeChannel(channel); 
      };
    }
    loadData();
  }, [user, isLoaded, params.messageId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSend() {
    if (!content.trim() || !myProfile || !otherProfile) return;
    
    const newMsg = {
      id: crypto.randomUUID(),
      sender_id: myProfile.id,
      receiver_id: otherProfile.id,
      content: content.trim(),
      created_at: new Date().toISOString(),
      status: 'pending' // custom property for UI
    };
    
    setMessages(prev => [...prev, newMsg]);
    setContent('');

    const supabase = createClient();
    const { data, error } = await supabase
      .from('messages')
      .insert({
        sender_id: newMsg.sender_id,
        receiver_id: newMsg.receiver_id,
        content: newMsg.content
      })
      .select('id')
      .single();

    if (error) {
      setMessages(prev => prev.map(m => m.id === newMsg.id ? { ...m, status: 'error' } : m));
    } else {
      setMessages(prev => prev.map(m => m.id === newMsg.id ? { ...m, id: data.id, status: 'sent' } : m));
    }
  }

  if (loading) return <div className="p-8 text-white">Loading...</div>;

  const displayName = otherProfile?.username || otherProfile?.email?.split('@')[0] || 'Unknown';

  return (
    <div className="min-h-screen bg-background-dark flex flex-col">
      <Navbar />
      <div className="max-w-4xl mx-auto w-full py-8 px-6 flex flex-col flex-1 h-[calc(100vh-80px)]">
      <Card className="p-4 mb-4 flex items-center gap-4">
        {otherProfile?.avatar_url ? (
          <Image 
            src={otherProfile.avatar_url} 
            alt="Avatar" 
            width={48} 
            height={48} 
            className="rounded-full object-cover w-12 h-12" 
            unoptimized 
          />
        ) : (
          <div className="w-12 h-12 bg-primary-purple rounded-full flex items-center justify-center text-white text-lg font-bold uppercase shrink-0">
            {displayName[0]}
          </div>
        )}
        <div>
          <h2 className="text-xl font-bold text-white">{displayName}</h2>
        </div>
      </Card>

      <Card className="flex-1 overflow-y-auto p-6 mb-4 space-y-4 flex flex-col">
        {messages.length === 0 ? (
          <div className="text-gray-400 text-center my-auto">No messages yet. Say hi!</div>
        ) : (
          messages.map(msg => {
            const isMe = msg.sender_id === myProfile?.id;
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] rounded-2xl p-4 ${isMe ? 'bg-primary-purple text-white rounded-br-none' : 'bg-surface-light border border-border text-white rounded-bl-none'}`}>
                  <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                  {isMe && (
                    <div className="flex justify-end mt-2 opacity-70">
                      {msg.status === 'pending' && <Clock className="w-3 h-3" />}
                      {msg.status === 'sent' && <Check className="w-3 h-3" />}
                      {msg.status === 'error' && <XCircle className="w-3 h-3 text-red-400" />}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </Card>

      <div className="flex gap-4">
        <textarea 
          className="flex-1 bg-[#1a1628] border border-white/10 rounded-xl p-4 text-white placeholder:text-white/40 focus:outline-none h-20 resize-none"
          placeholder="Type your message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => { 
            if (e.key === 'Enter' && !e.shiftKey) { 
              e.preventDefault(); 
              handleSend(); 
            } 
          }}
        />
        <Button onClick={handleSend} className="h-20 px-8" disabled={!content.trim()}>
          Send
        </Button>
      </div>
      </div>
    </div>
  );
}
