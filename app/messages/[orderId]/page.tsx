'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { CornerUpLeft, MoreVertical, Paperclip, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export default function ChatPage({ params }: { params: { orderId: string } }) {
  const [input, setInput] = useState('');

  // Mock Data
  const orderDetails = {
    id: params.orderId,
    title: 'Website Redesign Project',
    status: 'In Progress',
    due: 'Oct 31, 2023',
    seller: { name: 'Sarah J.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150', status: 'online' }
  };

  const [messages, setMessages] = useState<any[]>([]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), text: input, sender: 'me', time: 'Just now' }]);
    setInput('');
  };

  return (
    <>
      <Navbar />
      <div className="flex h-[calc(100vh-64px)] max-h-[900px]">
        {/* Order Details Sidebar (Hidden on mobile) */}
        <aside className="hidden md:flex flex-col w-80 border-r border-border bg-background-dark p-6">
          <Link href="/dashboard/personal/orders">
            <Button variant="ghost" size="sm" className="mb-6 gap-2 text-text-secondary -ml-2 hover:text-white">
              <CornerUpLeft className="h-4 w-4" /> Back to Orders
            </Button>
          </Link>

          <div className="flex flex-col items-center text-center space-y-3 mb-8 pb-8 border-b border-border">
            <div className="relative">
              <div className="h-20 w-20 rounded-full overflow-hidden bg-surface relative">
                <Image src={orderDetails.seller.avatar} alt="Seller" fill className="object-cover" />
              </div>
              <div className="absolute bottom-1 right-1 h-3.5 w-3.5 bg-success rounded-full border-2 border-background-dark" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{orderDetails.seller.name}</h2>
              <p className="text-sm text-text-secondary">Top Rated Seller</p>
            </div>
            <Button className="w-full mt-2" size="sm">View Profile</Button>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-white mb-2">Order Info</h3>
            <div className="p-4 rounded-xl bg-surface border border-border">
              <p className="font-medium text-white text-sm mb-1">{orderDetails.title}</p>
              <p className="text-xs text-text-secondary mb-3">Order #{orderDetails.id}</p>
              <div className="flex justify-between items-center text-sm pt-3 border-t border-border">
                <span className="text-text-secondary">Status</span>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-primary-blue/20 text-primary-blue">{orderDetails.status}</span>
              </div>
              <div className="flex justify-between items-center text-sm mt-2">
                <span className="text-text-secondary">Due Date</span>
                <span className="font-medium text-white">{orderDetails.due}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Chat Window */}
        <main className="flex-1 flex flex-col bg-[#1A1628] relative">

          {/* Chat Header */}
          <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-background-dark/80 backdrop-blur z-10">
            <div className="flex items-center gap-3">
              <div className="md:hidden">
                <Button variant="ghost" size="icon" className="-ml-2"><CornerUpLeft className="h-4 w-4" /></Button>
              </div>
              <div className="relative h-10 w-10 rounded-full overflow-hidden md:hidden">
                <Image src={orderDetails.seller.avatar} alt="Seller" fill className="object-cover" />
              </div>
              <div>
                <h2 className="font-bold text-white leading-tight">{orderDetails.seller.name}</h2>
                <p className="text-xs text-text-secondary flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" /> Online
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon"><MoreVertical className="h-5 w-5" /></Button>
          </header>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col justify-center">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <MessageSquare className="w-16 h-16 text-white/20 mb-4" />
                <h3 className="text-white font-semibold text-lg mb-2">No messages yet</h3>
                <p className="text-text-secondary text-sm">
                  Messages will appear here once you place or receive an order.
                </p>
              </div>
            ) : (
              <div>
                <div className="text-center text-xs text-text-secondary my-4">Today, Oct 24</div>

                {messages.map(msg => {
                  const isMe = msg.sender === 'me';
                  return (
                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[75%] md:max-w-[60%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                        <div
                          className={`px-5 py-3 rounded-2xl ${isMe
                              ? 'bg-gradient-primary text-white rounded-br-sm shadow-[0_4px_20px_rgba(124,58,237,0.2)]'
                              : 'bg-surface border border-white/5 text-white rounded-bl-sm'
                            }`}
                        >
                          <p className="text-sm leading-relaxed">{msg.text}</p>
                        </div>
                        <div className="flex items-center gap-1 mt-1.5 px-1">
                          <span className="text-[10px] text-text-secondary">{msg.time}</span>
                          {isMe && <CheckCircle2 className="h-3 w-3 text-primary-blue" />}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Input Area */}
          <footer className="p-4 bg-background-dark border-t border-border">
            <form onSubmit={handleSend} className="max-w-4xl mx-auto relative flex items-center gap-2">
              <Button type="button" variant="ghost" size="icon" className="shrink-0 text-text-secondary hover:text-white"><Paperclip className="h-5 w-5" /></Button>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 h-12 px-5 rounded-full bg-surface border border-white/10 text-white placeholder:text-text-secondary focus:outline-none focus:border-primary-purple transition-colors text-sm"
              />
              <Button type="submit" size="icon" disabled={!input.trim()} className="shrink-0 h-10 w-10 rounded-full transition-transform active:scale-95">
                <Send className="h-4 w-4 ml-0.5" />
              </Button>
            </form>
          </footer>
        </main>
      </div>
    </>
  );
}
