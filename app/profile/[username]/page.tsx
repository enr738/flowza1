'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { createClient } from '@/lib/supabase';
import { useUser } from '@clerk/nextjs';
import { Star, UserPlus, UserMinus, PackageOpen, MessageCircle } from 'lucide-react';
import { GigCard } from '@/components/gigs/GigCard';
import Link from 'next/link';

export default function ProfilePage({ params }: { params: { username: string } }) {
  const { user } = useUser();
  const [profile, setProfile] = useState<any>(null);
  const [myProfile, setMyProfile] = useState<any>(null);
  const [gigs, setGigs] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [followers, setFollowers] = useState<any[]>([]);
  const [following, setFollowing] = useState<any[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState<'gigs' | 'reviews' | 'followers' | 'following'>('gigs');
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowingLoading, setIsFollowingLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const supabase = createClient();

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', params.username)
        .single();

      if (!profileData) {
        setIsLoading(false);
        return;
      }

      setProfile(profileData);

      if (user) {
        const { data: myProf } = await supabase
          .from('profiles')
          .select('*')
          .eq('clerk_id', user.id)
          .single();
        if (myProf) setMyProfile(myProf);

        const { data: followCheck } = await supabase
          .from('follows')
          .select('*')
          .eq('follower_id', myProf?.id)
          .eq('following_id', profileData.id)
          .single();
        
        setIsFollowing(!!followCheck);
      }

      // Fetch active gigs
      const { data: gigsData } = await supabase
        .from('gigs')
        .select('*')
        .eq('seller_id', profileData.id)
        .eq('status', 'active');
      
      setGigs(gigsData || []);

      // Fetch reviews
      const { data: reviewsData } = await supabase
        .from('reviews')
        .select('*, profiles!reviewer_id(username, avatar_url)')
        .eq('seller_id', profileData.id)
        .order('created_at', { ascending: false });

      setReviews(reviewsData || []);

      // Fetch followers
      const { data: followersData } = await supabase
        .from('follows')
        .select('*, profiles!follower_id(username, avatar_url)')
        .eq('following_id', profileData.id);

      setFollowers(followersData || []);

      // Fetch following
      const { data: followingData } = await supabase
        .from('follows')
        .select('*, profiles!following_id(username, avatar_url)')
        .eq('follower_id', profileData.id);

      setFollowing(followingData || []);

      setIsLoading(false);
    }
    fetchData();
  }, [params.username, user]);

  const toggleFollow = async () => {
    if (!myProfile) return;
    setIsFollowingLoading(true);
    try {
      if (isFollowing) {
        await fetch('/api/profile/follow', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ following_id: profile.id })
        });
        setFollowers(prev => prev.filter(f => f.follower_id !== myProfile.id));
      } else {
        await fetch('/api/profile/follow', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ following_id: profile.id })
        });
        setFollowers(prev => [...prev, { follower_id: myProfile.id, profiles: myProfile }]);
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('Follow error', error);
    } finally {
      setIsFollowingLoading(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="flex-1 flex justify-center items-center py-20"><div className="animate-spin h-8 w-8 border-4 border-primary-blue border-t-transparent rounded-full" /></main>
        <Footer />
      </>
    );
  }

  if (!profile) {
    return (
      <>
        <Navbar />
        <main className="flex-1 flex justify-center items-center py-20"><p className="text-white text-xl">User not found</p></main>
        <Footer />
      </>
    );
  }

  const isOwnProfile = myProfile?.id === profile.id;
  const avatar = profile.avatar_url;
  const joinedDate = new Date(profile.created_at || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  const completedOrders = 0; // Would be derived from orders table
  const avgRating = gigs.reduce((acc, gig) => acc + (gig.rating_avg || 0), 0) / (gigs.length || 1);

  return (
    <>
      <Navbar />
      <main className="flex-1 py-10 px-4 min-h-screen">
        <div className="container mx-auto max-w-6xl space-y-8">
          
          {/* Header Profile Card */}
          <Card className="p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-[#4DA6FF]/20 to-[#7C3AED]/20" />
            <div className="relative flex flex-col md:flex-row items-center md:items-end gap-6 pt-12">
              <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-background bg-surface relative z-10 shadow-xl">
                {avatar ? (
                  <Image src={avatar} alt={profile.username} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-primary flex items-center justify-center text-4xl text-white font-bold">
                    {profile.username.charAt(0)}
                  </div>
                )}
              </div>
              
              <div className="flex-1 text-center md:text-left z-10">
                <h1 className="text-3xl font-bold text-white">{profile.username}</h1>
                <p className="text-text-secondary mt-1">{profile.bio || 'Member of Flowza'}</p>
                <div className="flex items-center justify-center md:justify-start gap-4 mt-4 text-sm font-medium text-text-secondary">
                  <div className="flex items-center gap-1"><Star className="h-4 w-4 text-warning fill-warning" /> {avgRating.toFixed(1)}</div>
                  <div>•</div>
                  <div>Member since {joinedDate}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 z-10">
                {!isOwnProfile && user && (
                  <>
                    <Button variant="outline" className="gap-2" onClick={() => window.location.href=`/messages/new?sellerId=${profile.clerk_id}`}>
                      <MessageCircle className="h-4 w-4" /> Message
                    </Button>
                    <Button onClick={toggleFollow} disabled={isFollowingLoading} className="gap-2 bg-gradient-to-r from-primary-blue to-primary-purple text-white">
                      {isFollowing ? <UserMinus className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                      {isFollowing ? 'Unfollow' : 'Follow'}
                    </Button>
                  </>
                )}
              </div>
            </div>
            
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-6 border-t border-border/50 text-center relative z-10">
              <div>
                <div className="text-2xl font-bold text-white">{followers.length}</div>
                <div className="text-sm text-text-secondary">Followers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{following.length}</div>
                <div className="text-sm text-text-secondary">Following</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{gigs.length}</div>
                <div className="text-sm text-text-secondary">Active Services</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{completedOrders}</div>
                <div className="text-sm text-text-secondary">Completed Orders</div>
              </div>
            </div>
          </Card>

          {/* Tabs */}
          <div className="flex items-center gap-2 border-b border-border">
            {['gigs', 'reviews', 'followers', 'following'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-3 font-medium text-sm transition-all border-b-2 ${
                  activeTab === tab 
                    ? 'border-primary-blue text-white' 
                    : 'border-transparent text-text-secondary hover:text-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="py-4">
            {activeTab === 'gigs' && (
              gigs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gigs.map(gig => (
                    <GigCard
                      key={gig.id}
                      id={gig.id}
                      title={gig.title}
                      sellerName={profile.username}
                      sellerAvatar={profile.avatar_url}
                      price={gig.price}
                      rating={gig.rating_avg || 0}
                      ratingCount={gig.rating_count || 0}
                      imageUrl={gig.images?.[0] || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000'}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-surface/30 rounded-xl border border-border/50">
                  <PackageOpen className="w-12 h-12 text-white/20 mx-auto mb-3" />
                  <h3 className="text-white font-medium">No active services</h3>
                </div>
              )
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {reviews.length > 0 ? (
                  reviews.map(review => (
                    <Card key={review.id} className="p-6 border-border/50 bg-surface/50">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-surface overflow-hidden relative">
                            {review.profiles?.avatar_url ? (
                              <Image src={review.profiles.avatar_url} alt="" fill className="object-cover" />
                            ) : (
                              <div className="w-full h-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                                {review.profiles?.username?.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-white">{review.profiles?.username}</div>
                            <div className="text-xs text-text-secondary">{new Date(review.created_at).toLocaleDateString()}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-warning text-warning' : 'text-text-secondary/30'}`} />
                          ))}
                        </div>
                      </div>
                      {review.comment && <p className="text-text-secondary text-sm leading-relaxed">{review.comment}</p>}
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-20 bg-surface/30 rounded-xl border border-border/50">
                    <MessageCircle className="w-12 h-12 text-white/20 mx-auto mb-3" />
                    <h3 className="text-white font-medium">No reviews yet</h3>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'followers' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {followers.map(f => (
                  <Link key={f.id} href={`/profile/${f.profiles?.username}`}>
                    <Card className="p-4 flex items-center gap-3 hover:border-white/20 transition-colors">
                      <div className="h-10 w-10 rounded-full bg-surface overflow-hidden relative">
                        {f.profiles?.avatar_url ? (
                          <Image src={f.profiles.avatar_url} alt="" fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                            {f.profiles?.username?.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="font-medium text-white">{f.profiles?.username}</div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}

            {activeTab === 'following' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {following.map(f => (
                  <Link key={f.id} href={`/profile/${f.profiles?.username}`}>
                    <Card className="p-4 flex items-center gap-3 hover:border-white/20 transition-colors">
                      <div className="h-10 w-10 rounded-full bg-surface overflow-hidden relative">
                        {f.profiles?.avatar_url ? (
                          <Image src={f.profiles.avatar_url} alt="" fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                            {f.profiles?.username?.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="font-medium text-white">{f.profiles?.username}</div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
