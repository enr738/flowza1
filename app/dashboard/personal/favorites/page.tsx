import { FolderHeart } from 'lucide-react';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { auth } from '@clerk/nextjs/server';
import { getProfileByClerkId } from '@/lib/profile';
import { GigCard } from '@/components/gigs/GigCard';

export default async function PersonalFavorites() {
  const { userId } = auth();
  let savedGigs: any[] = [];
  if (userId) {
    const supabase = createServerSupabaseClient();
    const profile = await getProfileByClerkId(userId);
    
    if (profile) {
      const { data } = await supabase
        .from('favorites')
        .select(`
          id,
          gigs (
            id,
            title,
            description,
            price,
            rating_avg,
            rating_count,
            image_url,
            seller_id,
            profiles:seller_id (username, avatar_url, level)
          )
        `)
        .eq('user_id', profile.id)
        .order('created_at', { ascending: false });
      if (data) {
        // Map to standard gig format
        savedGigs = data.map((fav: any) => ({
          ...fav.gigs,
          sellerProfile: fav.gigs.profiles
        })).filter(g => g.id); // filter out nulls if gig was deleted
      }
    }
  }
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Saved Gigs</h1>
        <p className="text-text-secondary">Services {"you've"} bookmarked for future reference.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {savedGigs.length > 0 ? (
          savedGigs.map(gig => (
            <GigCard
              key={gig.id}
              id={gig.id}
              title={gig.title}
              price={gig.price}
              rating={gig.rating_avg}
              ratingCount={gig.rating_count}
              sellerName={gig.sellerProfile?.username || 'Unknown'}
              sellerAvatar={gig.sellerProfile?.avatar_url || ''}
              imageUrl={gig.image_url}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
            <FolderHeart className="w-16 h-16 text-white/20 mb-4" />
            <h3 className="text-white font-semibold text-lg mb-2">No saved gigs yet</h3>
            <p className="text-text-secondary text-sm">
              Explore the marketplace and click the heart icon on services you like.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}