import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Search, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background-dark/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <div className="hidden md:block">
            <Image src="/logo.png" alt="Flowza" width={140} height={40} priority />
          </div>
          <div className="block md:hidden">
            <Image src="/logo-icon.png" alt="Flowza Logo" width={40} height={40} priority />
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
          <Link href="/explore" className="text-sm font-medium text-text-secondary hover:text-white transition-colors">
            Explore
          </Link>
          <Link href="/onboarding" className="text-sm font-medium text-text-secondary hover:text-white transition-colors">
            Sign In
          </Link>
          <Link href="/onboarding">
            <Button size="sm">Join Flowza</Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 text-text-secondary hover:text-white">
          <Menu className="h-6 w-6" />
        </button>

      </div>
    </nav>
  );
}
