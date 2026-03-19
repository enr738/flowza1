'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Search, Menu, X } from 'lucide-react';
import { SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/nextjs';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background-dark/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0 z-50" onClick={() => setIsOpen(false)}>
          <div className="hidden md:block">
            <Image priority quality={85} src="/logo.png" alt="Flowza - Freelance Marketplace" width={140} height={40} />
          </div>
          <div className="block md:hidden">
            <Image priority quality={85} src="/logo-icon.png" alt="Flowza Icon - Freelance Marketplace" width={40} height={40} />
          </div>
        </Link>

        {/* Desktop Navigation & Search */}
        <div className="hidden md:flex flex-1 items-center justify-center px-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <input
              type="text"
              placeholder="What service are you looking for?"
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-surface border border-border text-sm text-white focus:outline-none focus:border-primary-blue transition-colors"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="hidden md:flex flex-shrink-0 items-center gap-4">
          <Link href="/explore" className="text-sm font-medium text-[#C4BFD8] hover:text-white transition-colors">
            Explore
          </Link>
          {isSignedIn ? (
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                variables: { colorPrimary: '#7C3AED' },
                elements: { avatarBox: 'w-9 h-9' },
              }}
            />
          ) : (
            <>
              <SignInButton mode="modal">
                <button className="text-sm font-medium text-[#C4BFD8] hover:text-white transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm">Join Flowza</Button>
              </SignUpButton>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-[#C4BFD8] hover:text-white z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

      </div>

      {/* Mobile Slide-down Menu */}
      <div
        className={`md:hidden absolute top-16 left-0 w-full bg-background-dark border-b border-border transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[400px] opacity-100 py-4' : 'max-h-0 opacity-0 py-0'
          }`}
      >
        <div className="px-4 flex flex-col space-y-4">
          <div className="relative mb-2">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-[#C4BFD8]" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-surface border border-border text-[#FFFFFF] placeholder:text-[#C4BFD8] focus:outline-none focus:border-primary-blue text-sm"
            />
          </div>

          <Link href="/explore" onClick={() => setIsOpen(false)} className="text-[#C4BFD8] hover:text-white font-medium p-2 rounded-lg hover:bg-white/5">
            Explore
          </Link>
          {isSignedIn ? (
            <div className="p-2">
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  variables: { colorPrimary: '#7C3AED' },
                  elements: { avatarBox: 'w-9 h-9' },
                }}
              />
            </div>
          ) : (
            <>
              <SignInButton mode="modal">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full text-left text-[#C4BFD8] hover:text-white font-medium p-2 rounded-lg hover:bg-white/5"
                >
                  Sign In
                </button>
              </SignInButton>

              <div className="border-t border-border pt-4 mt-2">
                <SignUpButton mode="modal">
                  <div className="w-full" onClick={() => setIsOpen(false)}>
                    <Button className="w-full justify-center">Join Flowza</Button>
                  </div>
                </SignUpButton>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
