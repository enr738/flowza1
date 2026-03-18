import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background-dark py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Image src="/logo.png" alt="Flowza" width={140} height={40} className="mb-4" />
            <p className="text-text-secondary max-w-sm mb-6">
              The premier freelance marketplace for top-tier talent. Build your dream team in minutes.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              <li><Link href="/explore" className="text-text-secondary hover:text-white text-sm transition-colors">Explore</Link></li>
              <li><Link href="/onboarding/company-setup" className="text-text-secondary hover:text-white text-sm transition-colors">For Companies</Link></li>
              <li><Link href="/onboarding" className="text-text-secondary hover:text-white text-sm transition-colors">Become a Seller</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-text-secondary hover:text-white text-sm transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="text-text-secondary hover:text-white text-sm transition-colors">FAQ</Link></li>
              <li><Link href="#" className="text-text-secondary hover:text-white text-sm transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border text-center text-text-secondary text-sm">
          <p>&copy; {new Date().getFullYear()} Flowza Marketplace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
