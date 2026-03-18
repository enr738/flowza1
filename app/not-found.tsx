import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-32 px-4 relative overflow-hidden text-center">
        {/* Background glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-blue/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-purple/10 rounded-full blur-[120px] -z-10" />

        <div className="mb-8">
          <Image src="/logo-icon.png" alt="Flowza" width={80} height={80} priority quality={100} className="mx-auto drop-shadow-2xl" />
        </div>

        <h1 className="text-7xl md:text-9xl font-bold text-gradient mb-6">404</h1>
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
          Oops! This page doesn{"'"}t exist.
        </h2>
        <p className="text-[#C4BFD8] text-lg max-w-md mx-auto mb-10">
          The page you{"'"}re looking for may have been moved, deleted, or possibly never existed.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full max-w-sm mx-auto">
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full gap-2 h-14 px-8 border-2 border-white/20 text-white font-semibold">
              <ArrowLeft className="h-4 w-4" /> Go Home
            </Button>
          </Link>
          <Link href="/explore" className="w-full sm:w-auto">
            <Button className="w-full gap-2 h-14 px-8">
              <Search className="h-4 w-4" /> Browse Services
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
