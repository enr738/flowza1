'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { MessageCircle, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // TODO: Save to Supabase contact_messages table
    await new Promise(r => setTimeout(r, 1000));
    setSubmitted(true);
    setLoading(false);
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-20 px-4 relative overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary-blue/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-primary-purple/15 rounded-full blur-[120px] -z-10" />

        <div className="w-full max-w-lg glass rounded-2xl p-8 md:p-10">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image src="/logo.png" alt="Flowza" width={140} height={40} />
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-white text-center mb-2">Get in Touch</h1>
          <p className="text-text-secondary text-center mb-8">We typically reply within 24 hours.</p>

          {/* WhatsApp Button */}
          <a href="/api/contact/whatsapp" target="_blank" rel="noopener noreferrer">
            <button className="w-full h-12 flex items-center justify-center gap-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] font-medium hover:bg-[#25D366]/20 transition-all duration-200 mb-6">
              <MessageCircle className="h-5 w-5" />
              Chat on WhatsApp
            </button>
          </a>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-text-secondary text-sm">or fill the form below</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 gap-4">
              <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-success" />
              </div>
              <h2 className="text-xl font-bold text-white">Message Sent!</h2>
              <p className="text-text-secondary text-center">
                {"We'll get back to you soon 👋"}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-text-secondary mb-1.5" htmlFor="name">Full Name</label>
                <input
                  id="name"
                  required
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl bg-background-dark border border-border text-white placeholder:text-text-secondary/50 focus:outline-none focus:border-primary-blue transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-sm text-text-secondary mb-1.5" htmlFor="email">Email</label>
                <input
                  id="email"
                  required
                  type="email"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl bg-background-dark border border-border text-white placeholder:text-text-secondary/50 focus:outline-none focus:border-primary-blue transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-sm text-text-secondary mb-1.5" htmlFor="subject">Subject</label>
                <select
                  id="subject"
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl bg-background-dark border border-border text-white focus:outline-none focus:border-primary-blue transition-colors text-sm appearance-none"
                >
                  <option value="" className="bg-background-dark">Select a subject</option>
                  <option value="General Inquiry" className="bg-background-dark">General Inquiry</option>
                  <option value="Partnership" className="bg-background-dark">Partnership</option>
                  <option value="Technical Support" className="bg-background-dark">Technical Support</option>
                  <option value="Report an Issue" className="bg-background-dark">Report an Issue</option>
                  <option value="Other" className="bg-background-dark">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-text-secondary mb-1.5" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="How can we help you?"
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background-dark border border-border text-white placeholder:text-text-secondary/50 focus:outline-none focus:border-primary-blue transition-colors text-sm resize-none"
                />
              </div>

              <Button type="submit" isLoading={loading} className="w-full h-12 rounded-xl">
                Send Message
              </Button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
