'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Search, PenTool, Code, Layout, Video, Megaphone, ArrowRight, CheckCircle2, PackageOpen } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function LandingPage() {
  const { t } = useLanguage();

  const categories = [
    { key: 'design', icon: PenTool },
    { key: 'development', icon: Code },
    { key: 'writing', icon: Layout },
    { key: 'marketing', icon: Megaphone },
    { key: 'video', icon: Video },
  ];

  const companyFeatures = [
    'featureBilling',
    'featureTracking',
    'featureCollaboration',
    'featureSupport',
  ];

  const stats = [
    { icon: '🌱', key: 'growingCommunity' },
    { icon: '📁', key: 'realProjects' },
    { icon: '✓', key: 'verifiedTalent' },
    { icon: '💬', key: 'alwaysHere' },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full overflow-x-hidden">

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28">
          {/* Background Glows */}
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary-blue/20 rounded-full blur-[120px] -z-10" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-primary-purple/20 rounded-full blur-[120px] -z-10" />

          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight text-white max-w-5xl mx-auto">
              {t('heroTitle')} <br className="hidden md:block" />
              <span className="text-gradient">{t('heroTitleHighlight')}</span>
            </h1>
            <p className="text-lg md:text-xl text-[#C4BFD8] max-w-3xl mx-auto mb-10 leading-relaxed text-wrap">
              {t('heroSubtitle')}
            </p>

            {/* Search Bar / Main Action */}
            <div className="max-w-3xl mx-auto relative group">
              <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
              <div className="relative glass rounded-2xl flex flex-col sm:flex-row items-center p-2 gap-2">
                <div className="relative w-full flex-1 flex items-center">
                  <Search className="absolute left-4 rtl:left-auto rtl:right-4 h-6 w-6 text-[#C4BFD8]" />
                  <input
                    type="text"
                    placeholder={t('searchBarPlaceholder')}
                    className="w-full bg-transparent border-none text-white pl-12 pr-4 rtl:pr-12 rtl:pl-4 h-14 outline-none text-base md:text-lg placeholder:text-[#C4BFD8]"
                  />
                </div>
                <Link href="/explore" className="w-full sm:w-auto mt-2 sm:mt-0">
                  <Button size="lg" className="w-full rounded-xl px-8 h-14">{t('search')}</Button>
                </Link>
              </div>
            </div>

            {/* Trust Badges — Honest labels */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mt-8 text-sm md:text-base font-semibold text-white">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-5 w-5 text-[#22C55E]" />
                {t('verifiedFreelancers')}
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-5 w-5 text-[#22C55E]" />
                {t('securePayments')}
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-5 w-5 text-[#22C55E]" />
                {t('support247')}
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-12">
              {categories.map((cat) => (
                <Link href="/explore" key={cat.key}>
                  <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-surface/50 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium text-white">
                    <cat.icon className="h-4 w-4 text-[#7C3AED]" />
                    {t(cat.key)}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div className="border-t border-white/5 my-16 max-w-7xl mx-auto" />

        {/* Featured Gigs */}
        <section className="py-20 md:py-28 bg-surface/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{t('featuredServices')}</h2>
                <p className="text-[#C4BFD8] text-lg">{t('topRatedFreelancers')}</p>
              </div>
              <Link href="/explore" className="hidden md:flex items-center gap-2 text-[#4DA6FF] font-medium hover:text-white transition-colors hover:underline">
                {t('exploreAll')} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="flex flex-col items-center justify-center py-20 text-center w-full">
              <PackageOpen className="w-16 h-16 text-white/20 mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">{t('noServicesYet')}</h3>
              <p className="text-text-secondary text-sm">
                {t('servicesWillAppear')}
              </p>
            </div>

            <div className="mt-10 text-center md:hidden">
              <Link href="/explore">
                <Button variant="secondary" className="w-full">{t('exploreAllServices')}</Button>
              </Link>
            </div>
          </div>
        </section>

        <div className="border-t border-white/5 my-16 max-w-7xl mx-auto" />

        {/* For Companies Section */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center flex-col-reverse lg:flex-row">
              <div className="relative w-full overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-primary-purple/20 blur-[100px] -z-10 rounded-full" />
                <Card className="p-6 md:p-8 lg:p-10 relative z-10 w-full overflow-hidden border-2 border-white/10">
                  <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white text-wrap">{t('companyDashboardPreview')}</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-background-dark/50 border border-white/5 overflow-hidden">
                        <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-gradient-primary opacity-80" />
                        <div className="flex-1 space-y-2 min-w-0">
                          <div className="h-3 max-w-[120px] w-full bg-white/10 rounded" />
                          <div className="h-3 max-w-[180px] w-full bg-white/5 rounded" />
                        </div>
                      </div>
                    ))}
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-primary w-2/3" />
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-xs text-[#C4BFD8]">{t('budgetUsed')}</span>
                        <span className="text-xs text-white font-medium">65%</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div>
                <div className="inline-block px-4 py-1.5 rounded-full bg-[#4DA6FF]/10 text-[#4DA6FF] text-sm font-semibold tracking-wide mb-6">
                  {t('forEnterprise')}
                </div>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight text-wrap">
                  {t('scaleYourTeam')} <br className="hidden lg:block" />
                  <span className="text-gradient">{t('flowzaForCompanies')}</span>
                </h2>
                <p className="text-lg text-[#C4BFD8] mb-8 leading-relaxed max-w-xl text-wrap">
                  {t('companyDescription')}
                </p>

                <ul className="space-y-4 mb-10 text-wrap">
                  {companyFeatures.map((featureKey, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-[#22C55E] flex-shrink-0 mt-0.5" />
                      <span className="text-white font-medium">{t(featureKey)}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/onboarding/company-setup">
                  <Button size="lg" className="w-full sm:w-auto h-14">{t('setupCompanyAccount')}</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="border-t border-white/5 my-16 max-w-7xl mx-auto" />

        {/* Stats Section — Honest values */}
        <section className="py-20 md:py-28 bg-surface/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-4xl md:text-5xl lg:text-6xl mb-4">{stat.icon}</p>
                  <p className="text-[#C4BFD8] font-medium text-sm md:text-base">{t(stat.key)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-gradient-primary opacity-10" />
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl mx-auto">
              {t('readyToStart')}
            </h2>
            <p className="text-lg md:text-xl text-[#C4BFD8] mb-10 max-w-2xl mx-auto">
              {t('ctaSubtitle')}
            </p>
            <Link href="/onboarding">
              <Button size="lg" className="h-14 w-full sm:w-auto px-10">
                {t('getStartedFree')}
              </Button>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
