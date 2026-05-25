'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Code2, Briefcase, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const contacts = [
  {
    title: 'Developer Support',
    description: 'For technical issues, bugs, or feature requests related to the platform.',
    email: 'khalilhanniche@gmail.com',
    icon: Code2,
    gradient: 'from-[#4DA6FF] to-[#3B82F6]',
  },
  {
    title: 'Platform Owner',
    description: 'For business inquiries, partnerships, or general questions about Flowza.',
    email: 'mohrad20062006@gmail.com',
    icon: Briefcase,
    gradient: 'from-[#7C3AED] to-[#A855F7]',
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-20 px-4 relative overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary-blue/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-primary-purple/15 rounded-full blur-[120px] -z-10" />

        <div className="w-full max-w-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image src="/logo.png" alt="Flowza" width={140} height={40} />
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-white text-center mb-2">Get in Touch</h1>
          <p className="text-text-secondary text-center mb-10">Choose who you&apos;d like to contact below.</p>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contacts.map((c) => (
              <Card key={c.email} className="p-6 flex flex-col items-center text-center space-y-4 hover:border-white/20 transition-colors">
                <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center`}>
                  <c.icon className="h-7 w-7 text-white" />
                </div>
                <h2 className="text-lg font-bold text-white">{c.title}</h2>
                <p className="text-text-secondary text-sm leading-relaxed">{c.description}</p>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Mail className="h-4 w-4" />
                  <span>{c.email}</span>
                </div>
                <a href={`mailto:${c.email}`} className="w-full flex items-center justify-center gap-2 bg-white text-black font-semibold rounded-lg h-10 px-4 hover:bg-white/90 transition-colors">
                  <ExternalLink className="h-4 w-4" />
                  Send Email
                </a>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
