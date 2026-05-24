'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const translations: Record<string, { en: string; ar: string }> = {
  // Navbar
  joinFlowza: { en: 'Join Flowza', ar: 'انضم إلى فلوزا' },
  signIn: { en: 'Sign In', ar: 'تسجيل الدخول' },
  explore: { en: 'Explore', ar: 'استكشف' },
  searchPlaceholder: { en: 'What service are you looking for?', ar: 'ما الخدمة التي تبحث عنها؟' },
  searchPlaceholderShort: { en: 'Search...', ar: 'بحث...' },
  search: { en: 'Search', ar: 'بحث' },

  // Hero Section
  heroTitle: { en: 'The Freelance Marketplace for', ar: 'منصة العمل الحر' },
  heroTitleHighlight: { en: 'Individuals & Teams', ar: 'للأفراد والفرق' },
  heroSubtitle: {
    en: 'Hire world-class freelancers or offer your skills — built for solo buyers and companies that scale.',
    ar: 'وظّف أفضل المستقلين أو اعرض مهاراتك — مصممة للأفراد والشركات التي تنمو.',
  },
  searchBarPlaceholder: {
    en: 'What service are you looking for today?',
    ar: 'ما الخدمة التي تبحث عنها اليوم؟',
  },

  // Trust Badges (honest replacements)
  verifiedFreelancers: { en: 'Verified Freelancers', ar: 'مستقلون موثوقون' },
  securePayments: { en: 'Secure Payments', ar: 'دفع آمن' },
  support247: { en: '24/7 Support', ar: 'دعم على مدار الساعة' },

  // Category Pills
  design: { en: 'Design', ar: 'تصميم' },
  development: { en: 'Development', ar: 'تطوير' },
  writing: { en: 'Writing', ar: 'كتابة' },
  marketing: { en: 'Marketing', ar: 'تسويق' },
  video: { en: 'Video', ar: 'فيديو' },

  // Featured Services
  featuredServices: { en: 'Featured Services', ar: 'خدمات مميزة' },
  topRatedFreelancers: {
    en: 'Top rated freelancers ready to start your project',
    ar: 'مستقلون بتقييمات عالية جاهزون لبدء مشروعك',
  },
  exploreAll: { en: 'Explore All', ar: 'استكشف الكل' },
  noServicesYet: { en: 'No services yet', ar: 'لا توجد خدمات بعد' },
  servicesWillAppear: {
    en: 'Services will appear here once freelancers join the platform.',
    ar: 'ستظهر الخدمات هنا بمجرد انضمام المستقلين إلى المنصة.',
  },
  exploreAllServices: { en: 'Explore All Services', ar: 'استكشف جميع الخدمات' },

  // For Companies Section
  forEnterprise: { en: 'FOR ENTERPRISE', ar: 'للشركات' },
  scaleYourTeam: { en: 'Scale your team with', ar: 'وسّع فريقك مع' },
  flowzaForCompanies: { en: 'Flowza for Companies', ar: 'فلوزا للشركات' },
  companyDescription: {
    en: 'Manage your entire freelance workforce in one place. Set team budgets, track project progress, and collaborate seamlessly with built-in tools designed for modern businesses.',
    ar: 'أدر جميع المستقلين في مكان واحد. حدد ميزانيات الفريق، تتبع تقدم المشاريع، وتعاون بسلاسة مع أدوات مدمجة مصممة للشركات الحديثة.',
  },
  companyDashboardPreview: { en: 'Company Dashboard Preview', ar: 'معاينة لوحة تحكم الشركة' },
  budgetUsed: { en: 'Budget Used', ar: 'الميزانية المستخدمة' },
  setupCompanyAccount: { en: 'Setup a Company Account', ar: 'إنشاء حساب شركة' },

  // Company features list
  featureBilling: { en: 'Centralized billing and budget management', ar: 'فوترة مركزية وإدارة الميزانية' },
  featureTracking: { en: 'Dedicated project tracking dashboard', ar: 'لوحة تحكم مخصصة لتتبع المشاريع' },
  featureCollaboration: { en: 'Team collaboration and multi-user access', ar: 'تعاون الفريق والوصول المتعدد' },
  featureSupport: { en: 'Priority support from success managers', ar: 'دعم ذو أولوية من مديري النجاح' },

  // Stats Section (honest replacements)
  growingCommunity: { en: 'Growing Community', ar: 'مجتمع متنامي' },
  realProjects: { en: 'Real Projects', ar: 'مشاريع حقيقية' },
  verifiedTalent: { en: 'Verified Talent', ar: 'مواهب موثوقة' },
  alwaysHere: { en: 'Always Here', ar: 'دائماً هنا' },

  // CTA Section
  readyToStart: {
    en: 'Ready to bring your ideas to life?',
    ar: 'هل أنت مستعد لتحويل أفكارك إلى واقع؟',
  },
  ctaSubtitle: {
    en: 'Join thousands of businesses already using Flowza to build exceptional products.',
    ar: 'انضم إلى آلاف الشركات التي تستخدم فلوزا لبناء منتجات استثنائية.',
  },
  getStartedFree: { en: 'Get Started Free', ar: 'ابدأ مجاناً' },

  // Footer
  footerDescription: {
    en: 'The premier freelance marketplace for top-tier talent. Build your dream team in minutes.',
    ar: 'منصة العمل الحر الرائدة للمواهب المتميزة. ابنِ فريق أحلامك في دقائق.',
  },
  platform: { en: 'Platform', ar: 'المنصة' },
  forCompanies: { en: 'For Companies', ar: 'للشركات' },
  becomeASeller: { en: 'Become a Seller', ar: 'كن بائعاً' },
  support: { en: 'Support', ar: 'الدعم' },
  contactUs: { en: 'Contact Us', ar: 'تواصل معنا' },
  faq: { en: 'FAQ', ar: 'الأسئلة الشائعة' },
  termsOfService: { en: 'Terms of Service', ar: 'شروط الخدمة' },
  allRightsReserved: { en: '2026 Flowza. All rights reserved.', ar: '2026 فلوزا. جميع الحقوق محفوظة.' },

  // 404 Page
  notFoundTitle: { en: '404', ar: '404' },
  notFoundHeading: { en: "Oops! This page doesn't exist.", ar: 'عذراً! هذه الصفحة غير موجودة.' },
  notFoundDescription: {
    en: "The page you're looking for may have been moved, deleted, or possibly never existed.",
    ar: 'الصفحة التي تبحث عنها ربما تم نقلها أو حذفها أو لم تكن موجودة أبداً.',
  },
  goHome: { en: 'Go Home', ar: 'العودة للرئيسية' },
  browseServices: { en: 'Browse Services', ar: 'تصفح الخدمات' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  // Load saved language on mount
  useEffect(() => {
    const saved = localStorage.getItem('flowza-lang') as Language | null;
    if (saved === 'en' || saved === 'ar') {
      setLanguageState(saved);
    }
  }, []);

  // Apply dir and lang to <html> and font class whenever language changes
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    html.setAttribute('lang', language);

    if (language === 'ar') {
      html.classList.add('font-cairo');
      html.classList.remove('font-inter');
    } else {
      html.classList.add('font-inter');
      html.classList.remove('font-cairo');
    }
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('flowza-lang', lang);
  }, []);

  const t = useCallback(
    (key: string): string => {
      const entry = translations[key];
      if (!entry) return key;
      return entry[language];
    },
    [language]
  );

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
