'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronDown } from 'lucide-react';

const faqsEn = [
  {
    category: 'General',
    items: [
      { q: "What is Flowza?", a: "Flowza is a freelance marketplace connecting skilled freelancers with individuals and companies in Algeria and beyond." },
      { q: "Is Flowza free to join?", a: "Yes, creating an account is completely free." },
    ]
  },
  {
    category: 'Buyers',
    items: [
      { q: "How do I hire a freelancer?", a: "Browse services in Explore, click on a service, and place an order." },
      { q: "What payment methods are accepted?", a: "We accept Edahabia and CIB cards via Chargily." },
      { q: "What if I'm not satisfied?", a: "Contact the seller first. If unresolved, contact our support team." },
    ]
  },
  {
    category: 'Sellers',
    items: [
      { q: "How do I create a gig?", a: "Go to your seller dashboard and click Create New Gig." },
      { q: "How do I get paid?", a: "Payments are processed via Chargily after order completion." },
    ]
  },
  {
    category: 'Payments',
    items: [
      { q: "Is my payment secure?", a: "Yes, all payments are processed securely via Chargily." },
      { q: "Can I get a refund?", a: "Refund requests are handled case by case. Contact support." },
    ]
  }
];

const faqsAr = [
  {
    category: 'عام',
    items: [
      { q: "ما هي فلوزا؟", a: "فلوزا منصة عمل حر تربط المستقلين المهرة بالأفراد والشركات في الجزائر وخارجها." },
      { q: "هل التسجيل مجاني؟", a: "نعم، إنشاء الحساب مجاني تماماً." },
    ]
  },
  {
    category: 'المشترون',
    items: [
      { q: "كيف أوظف مستقلاً؟", a: "تصفح الخدمات في صفحة الاستكشاف، اضغط على خدمة، وقدم طلبك." },
      { q: "ما طرق الدفع؟", a: "نقبل بطاقات Edahabia و CIB عبر Chargily." },
      { q: "ماذا لو لم أكن راضياً؟", a: "تواصل مع البائع أولاً. إذا لم يُحل، تواصل مع فريق الدعم." },
    ]
  },
  {
    category: 'البائعون',
    items: [
      { q: "كيف أنشئ خدمة؟", a: "اذهب إلى لوحة تحكم البائع واضغط إنشاء خدمة جديدة." },
      { q: "كيف أحصل على أموالي؟", a: "تتم المدفوعات عبر Chargily بعد اكتمال الطلب." },
    ]
  },
  {
    category: 'المدفوعات',
    items: [
      { q: "هل دفعتي آمنة؟", a: "نعم، جميع المدفوعات تتم بأمان عبر Chargily." },
      { q: "هل يمكنني استرداد المبلغ؟", a: "طلبات الاسترداد تُعالج حالة بحالة. تواصل مع الدعم." },
    ]
  }
];

export default function FAQPage() {
  const { language, t } = useLanguage();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const faqs = language === 'ar' ? faqsAr : faqsEn;

  const toggleItem = (catIdx: number, itemIdx: number) => {
    const key = `${catIdx}-${itemIdx}`;
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold text-white text-center mb-12">
            {language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          </h1>

          <div className="space-y-10">
            {faqs.map((cat, catIdx) => (
              <div key={catIdx}>
                <h2 className="text-2xl font-bold text-white mb-6 border-b border-border pb-2">
                  {cat.category}
                </h2>
                <div className="space-y-4">
                  {cat.items.map((item, itemIdx) => {
                    const isOpen = openItems[`${catIdx}-${itemIdx}`];
                    return (
                      <div key={itemIdx} className="bg-surface/50 border border-border rounded-xl overflow-hidden transition-all">
                        <button
                          onClick={() => toggleItem(catIdx, itemIdx)}
                          className="w-full flex items-center justify-between p-5 text-left text-white hover:bg-white/5 transition-colors"
                        >
                          <span className="font-medium text-lg">{item.q}</span>
                          <ChevronDown className={`w-5 h-5 text-text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isOpen && (
                          <div className="p-5 pt-0 text-text-secondary leading-relaxed border-t border-border/50 bg-white/5">
                            {item.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
