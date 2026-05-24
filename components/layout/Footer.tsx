'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-background-dark py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Image priority quality={85} src="/logo.png" alt="Flowza - Freelance Marketplace" width={140} height={40} className="mb-4" />
            <p className="text-[#C4BFD8] max-w-sm mb-6">{t('footerDescription')}</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">{t('platform')}</h4>
            <ul className="space-y-2">
              <li><Link href="/explore" className="text-[#C4BFD8] hover:text-[#4DA6FF] hover:underline text-sm transition-colors">{t('explore')}</Link></li>
              <li><Link href="/onboarding/company-setup" className="text-[#C4BFD8] hover:text-[#4DA6FF] hover:underline text-sm transition-colors">{t('forCompanies')}</Link></li>
              <li><Link href="/onboarding" className="text-[#C4BFD8] hover:text-[#4DA6FF] hover:underline text-sm transition-colors">{t('becomeASeller')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">{t('support')}</h4>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-[#C4BFD8] hover:text-[#4DA6FF] hover:underline text-sm transition-colors">{t('contactUs')}</Link></li>
              <li><Link href="/faq" className="text-[#C4BFD8] hover:text-[#4DA6FF] hover:underline text-sm transition-colors">{t('faq')}</Link></li>
              <li><Link href="/terms" className="text-[#C4BFD8] hover:text-[#4DA6FF] hover:underline text-sm transition-colors">{t('termsOfService')}</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border text-center text-[#C4BFD8] text-sm">
          <p>&copy; {t('allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
}
