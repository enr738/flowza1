'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Search, Menu, X, MessageSquare } from 'lucide-react';
import { SignInButton, SignUpButton, UserButton, useAuth, useUser } from '@clerk/nextjs';
import { useLanguage } from '@/context/LanguageContext';
import { createClient } from '@/lib/supabase';
import { getProfileByClerkId } from '@/lib/profile';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileSearchTerm, setMobileSearchTerm] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const [messagesHref, setMessagesHref] = useState('/messages');
  const { isSignedIn } = useAuth();
  const { user, isLoaded } = useUser();
  const { t, language, setLanguage } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;

    async function fetchUnread() {
      const supabase = createClient();
      const me = await getProfileByClerkId(user!.id);
      if (!me) return;

      // رابط الرسائل حسب الـ role
      const roleMap: Record<string, string> = {
        seller: '/dashboard/seller/messages',
        buyer_personal: '/dashboard/personal/messages',
        buyer_company: '/dashboard/company/messages',
      };
      if (me.role && roleMap[me.role]) {
        setMessagesHref(roleMap[me.role]);
      }

      const { count } = await supabase
        .from('messages')
        .select('id', { count: 'exact', head: true })
        .eq('receiver_id', me.id)
        .eq('is_read', false);

      setUnreadCount(count || 0);
    }

    fetchUnread();

    // تحديث كل 30 ثانية
    const interval = setInterval(fetchUnread, 30000);
    return () => clearInterval(interval);
  }, [isLoaded, isSignedIn, user]);

  const handleSearch = (term: string) => {
    if (term.trim()) {
      router.push(`/explore?q=${encodeURIComponent(term.trim())}`);
    }
  };

  const handleDesktopKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch(searchTerm);
  };

  const handleMobileKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(mobileSearchTerm);
      setIsOpen(false);
    }
  };

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
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary rtl:left-auto rtl:right-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleDesktopKeyDown}
              placeholder={t('searchPlaceholder')}
              className="w-full h-10 pl-10 pr-4 rtl:pr-10 rtl:pl-4 rounded-xl bg-surface border border-border text-sm text-white focus:outline-none focus:border-primary-blue transition-colors"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="hidden md:flex flex-shrink-0 items-center gap-4">
          {/* Language Toggle */}
          <div className="lang-toggle">
            <button onClick={() => setLanguage('en')} className={language === 'en' ? 'active' : ''}>EN</button>
            <button onClick={() => setLanguage('ar')} className={language === 'ar' ? 'active' : ''}>AR</button>
          </div>

          <Link href="/explore" className="text-sm font-medium text-[#C4BFD8] hover:text-white transition-colors">
            {t('explore')}
          </Link>

          {isSignedIn && (
            <Link href={messagesHref} className="relative">
              <MessageSquare className="h-6 w-6 text-[#C4BFD8] hover:text-white transition-colors" />
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center">
                  <span className="text-white text-[9px] font-bold">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                </div>
              )}
            </Link>
          )}

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
                  {t('signIn')}
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm">{t('joinFlowza')}</Button>
              </SignUpButton>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 text-[#C4BFD8] hover:text-white z-50" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Slide-down Menu */}
      <div className={`md:hidden absolute top-16 left-0 w-full bg-background-dark border-b border-border transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100 py-4' : 'max-h-0 opacity-0 py-0'}`}>
        <div className="px-4 flex flex-col space-y-4">
          {/* Mobile Language Toggle */}
          <div className="flex justify-center mb-1">
            <div className="lang-toggle">
              <button onClick={() => setLanguage('en')} className={language === 'en' ? 'active' : ''}>EN</button>
              <button onClick={() => setLanguage('ar')} className={language === 'ar' ? 'active' : ''}>AR</button>
            </div>
          </div>

          <div className="relative mb-2">
            <div className="absolute inset-y-0 left-3 rtl:left-auto rtl:right-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-[#C4BFD8]" />
            </div>
            <input
              type="text"
              value={mobileSearchTerm}
              onChange={(e) => setMobileSearchTerm(e.target.value)}
              onKeyDown={handleMobileKeyDown}
              placeholder={t('searchPlaceholderShort')}
              className="w-full h-11 pl-10 pr-4 rtl:pr-10 rtl:pl-4 rounded-xl bg-surface border border-border text-[#FFFFFF] placeholder:text-[#C4BFD8] focus:outline-none focus:border-primary-blue text-sm"
            />
          </div>

          <Link href="/explore" onClick={() => setIsOpen(false)} className="text-[#C4BFD8] hover:text-white font-medium p-2 rounded-lg hover:bg-white/5">
            {t('explore')}
          </Link>

          {isSignedIn && (
            <Link href={messagesHref} onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-[#C4BFD8] hover:text-white font-medium p-2 rounded-lg hover:bg-white/5">
              <div className="relative">
                <MessageSquare className="h-5 w-5" />
                {unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center">
                    <span className="text-white text-[9px] font-bold">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  </div>
                )}
              </div>
              Messages
              {unreadCount > 0 && (
                <span className="ml-auto text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">{unreadCount}</span>
              )}
            </Link>
          )}

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
                <button onClick={() => setIsOpen(false)} className="w-full text-left rtl:text-right text-[#C4BFD8] hover:text-white font-medium p-2 rounded-lg hover:bg-white/5">
                  {t('signIn')}
                </button>
              </SignInButton>
              <div className="border-t border-border pt-4 mt-2">
                <SignUpButton mode="modal">
                  <div className="w-full" onClick={() => setIsOpen(false)}>
                    <Button className="w-full justify-center">{t('joinFlowza')}</Button>
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