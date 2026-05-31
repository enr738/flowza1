'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Star, Loader2, MessageSquarePlus, Check } from 'lucide-react';

export default function LeaveReviewButton({ order }: { order: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // If already submitted in this session or if we had a flag in the DB
  if (isSubmitted) {
    return (
      <div className="flex items-center gap-2 text-success text-sm font-medium">
        <Check className="h-4 w-4" /> Reviewed
      </div>
    );
  }

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: order.id,
          gig_id: order.gig_id,
          seller_id: order.seller_id,
          rating,
          comment
        })
      });

      if (res.ok) {
        setIsSubmitted(true);
        setIsOpen(false);
      } else {
        const err = await res.json().catch(() => ({}));
        alert(err.error || 'Failed to submit review');
      }
    } catch (error) {
      alert('Failed to submit review');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button variant="outline" size="sm" className="gap-2" onClick={() => setIsOpen(true)}>
        <MessageSquarePlus className="h-4 w-4" /> Leave Review
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-surface border border-border rounded-xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Rate Your Experience</h3>
            <p className="text-sm text-text-secondary mb-6">
              How was your service from {order.profiles?.username || 'the seller'}?
            </p>
            
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star 
                    className={`h-8 w-8 transition-colors ${(hoverRating || rating) >= star ? 'fill-warning text-warning' : 'text-text-secondary/30'}`} 
                  />
                </button>
              ))}
            </div>

            <textarea
              className="w-full bg-background-dark border border-border rounded-xl p-3 text-white focus:outline-none focus:border-primary-blue mb-6 resize-none h-24 text-sm"
              placeholder="Leave a comment (optional)..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={500}
            />

            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setIsOpen(false)} disabled={isLoading}>Cancel</Button>
              <Button onClick={handleSubmit} disabled={isLoading} className="gap-2 bg-gradient-to-r from-primary-blue to-primary-purple text-white">
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                Submit Review
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
