'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/context/LanguageContext';

const contentEn = {
  title: 'Terms of Service',
  lastUpdated: 'Last updated: June 2026',
  sections: [
    {
      title: '1. Acceptance of Terms',
      body: 'By accessing or using Flowza, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the platform.'
    },
    {
      title: '2. User Accounts',
      body: 'You must provide accurate and complete information when creating an account. You are responsible for maintaining the security of your account credentials.'
    },
    {
      title: '3. Services and Payments',
      body: 'Flowza facilitates transactions between buyers and sellers. All payments are processed securely via Chargily. We are not responsible for any disputes over the quality of services delivered.'
    },
    {
      title: '4. Seller Responsibilities',
      body: 'Sellers must deliver services as described in their gig listings. Misrepresentation of skills or failure to deliver may result in account suspension.'
    },
    {
      title: '5. Buyer Responsibilities',
      body: 'Buyers must provide clear requirements and pay for services rendered. Unjustified chargebacks or harassment of sellers will not be tolerated.'
    },
    {
      title: '6. Prohibited Content',
      body: 'Users may not post content that is illegal, offensive, or violates intellectual property rights. We reserve the right to remove any content at our discretion.'
    },
    {
      title: '7. Intellectual Property',
      body: 'Upon final payment and delivery, the buyer is granted all intellectual property rights for the delivered work, unless otherwise specified by the seller.'
    },
    {
      title: '8. Limitation of Liability',
      body: 'Flowza shall not be liable for any indirect, incidental, or consequential damages arising from the use of our platform.'
    },
    {
      title: '9. Privacy Policy',
      body: 'Your use of Flowza is also governed by our Privacy Policy, which outlines how we collect and use your personal information.'
    },
    {
      title: '10. Contact',
      body: 'If you have any questions about these Terms, please contact us at: khalilhanniche@gmail.com'
    }
  ]
};

const contentAr = {
  title: 'شروط الخدمة',
  lastUpdated: 'آخر تحديث: جوان 2026',
  sections: [
    {
      title: '1. قبول الشروط',
      body: 'بوصولك إلى أو استخدامك لفلوزا، فإنك توافق على الالتزام بشروط الخدمة هذه. إذا كنت لا توافق على أي جزء من الشروط، فلا يجوز لك الوصول إلى المنصة.'
    },
    {
      title: '2. حسابات المستخدمين',
      body: 'يجب عليك تقديم معلومات دقيقة وكاملة عند إنشاء حساب. أنت مسؤول عن الحفاظ على أمان بيانات اعتماد حسابك.'
    },
    {
      title: '3. الخدمات والمدفوعات',
      body: 'تسهل فلوزا المعاملات بين المشترين والبائعين. تتم جميع المدفوعات بأمان عبر Chargily. نحن لسنا مسؤولين عن أي نزاعات حول جودة الخدمات المقدمة.'
    },
    {
      title: '4. مسؤوليات البائع',
      body: 'يجب على البائعين تقديم الخدمات كما هو موضح في قوائمهم. قد يؤدي تحريف المهارات أو الفشل في التسليم إلى تعليق الحساب.'
    },
    {
      title: '5. مسؤوليات المشتري',
      body: 'يجب على المشترين تقديم متطلبات واضحة ودفع ثمن الخدمات المقدمة. لن يتم التسامح مع طلبات الاسترداد غير المبررة أو مضايقة البائعين.'
    },
    {
      title: '6. المحتوى المحظور',
      body: 'لا يجوز للمستخدمين نشر محتوى غير قانوني أو مسيء أو ينتهك حقوق الملكية الفكرية. نحتفظ بالحق في إزالة أي محتوى وفقاً لتقديرنا.'
    },
    {
      title: '7. الملكية الفكرية',
      body: 'عند الدفع النهائي والتسليم، يُمنح المشتري جميع حقوق الملكية الفكرية للعمل المُسلّم، ما لم يحدد البائع خلاف ذلك.'
    },
    {
      title: '8. تحديد المسؤولية',
      body: 'لن تكون فلوزا مسؤولة عن أي أضرار غير مباشرة أو عرضية أو تبعية تنشأ عن استخدام منصتنا.'
    },
    {
      title: '9. سياسة الخصوصية',
      body: 'يخضع استخدامك لفلوزا أيضاً لسياسة الخصوصية الخاصة بنا، والتي توضح كيفية جمع معلوماتك الشخصية واستخدامها.'
    },
    {
      title: '10. تواصل معنا',
      body: 'إذا كان لديك أي أسئلة حول هذه الشروط، يرجى التواصل معنا على: khalilhanniche@gmail.com'
    }
  ]
};

export default function TermsPage() {
  const { language } = useLanguage();
  const content = language === 'ar' ? contentAr : contentEn;

  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-12 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{content.title}</h1>
            <p className="text-text-secondary">{content.lastUpdated}</p>
          </div>

          <div className="space-y-10">
            {content.sections.map((section, idx) => (
              <section key={idx} className="bg-surface/30 p-6 md:p-8 rounded-2xl border border-border">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4">{section.title}</h2>
                <p className="text-text-secondary leading-relaxed md:text-lg">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
