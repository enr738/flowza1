import { GigCard } from '@/components/gigs/GigCard';

export default function PersonalFavorites() {
  const savedGigs = [
    { id: '1', title: 'I will design a modern minimal logo for your brand', sellerName: 'Sarah J.', price: 150, rating: 4.9, ratingCount: 128, imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800' },
    { id: '4', title: 'I will create engaging short-form video content for TikTok/Reels', sellerName: 'David K.', price: 120, rating: 4.9, ratingCount: 89, imageUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f6128?auto=format&fit=crop&q=80&w=800' },
    { id: '6', title: 'I will design your mobile app UI/UX in Figma', sellerName: 'Marcus T.', price: 350, rating: 5.0, ratingCount: 67, imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Saved Gigs</h1>
        <p className="text-text-secondary">Services {"you've"} bookmarked for future reference.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {savedGigs.map(gig => (
          <div key={gig.id} className="relative group">
            <GigCard {...gig} />
            <button className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-white/20">
               <span className="text-white">✕</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
