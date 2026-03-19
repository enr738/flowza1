import { GigCard } from '@/components/gigs/GigCard';
import { FolderHeart } from 'lucide-react';

export default function PersonalFavorites() {
  const savedGigs: any[] = [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Saved Gigs</h1>
        <p className="text-text-secondary">Services {"you've"} bookmarked for future reference.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
          <FolderHeart className="w-16 h-16 text-white/20 mb-4" />
          <h3 className="text-white font-semibold text-lg mb-2">No saved services</h3>
          <p className="text-text-secondary text-sm">
            Services you save for later will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}
