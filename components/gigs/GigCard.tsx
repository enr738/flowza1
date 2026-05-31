import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Star } from 'lucide-react';

interface GigCardProps {
  id: string;
  title: string;
  sellerName: string;
  sellerAvatar?: string;
  price: number;
  rating: number;
  ratingCount: number;
  imageUrl: string;
}

export function GigCard({ id, title, sellerName, sellerAvatar, price, rating, ratingCount, imageUrl }: GigCardProps) {
  return (
    <Link href={`/gigs/${id}`}>
      <Card className="group flex flex-col h-full hover:-translate-y-1 transition-transform duration-200 cursor-pointer">
        <div className="relative aspect-video w-full overflow-hidden bg-surface">
          <Image 
            src={imageUrl} 
            alt={`${title} freelance service`}
            width={600}
            height={338}
            quality={85}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="relative h-6 w-6 rounded-full overflow-hidden bg-primary-purple/30 shrink-0 flex items-center justify-center">
              {sellerAvatar ? (
                <Image 
                  src={sellerAvatar} 
                  alt={`${sellerName} profile picture`} 
                  width={24} 
                  height={24} 
                  quality={85}
                  loading="lazy"
                  className="w-full h-full object-cover" 
                />
              ) : (
                <span className="text-xs font-bold text-white uppercase">{sellerName.charAt(0)}</span>
              )}
            </div>
            <span className="text-sm text-text-secondary font-medium">{sellerName}</span>
          </div>
          
          <h3 className="text-white font-medium line-clamp-2 mb-4 group-hover:text-primary-blue transition-colors">
            {title}
          </h3>
          
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-warning text-warning" />
              <span className="text-white font-medium">{rating.toFixed(1)}</span>
              <span className="text-text-secondary text-sm">({ratingCount})</span>
            </div>
            
            <div className="text-right">
              <span className="text-xs text-text-secondary uppercase tracking-wider">Starting at</span>
              <p className="text-white font-bold">{price} DZD</p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
