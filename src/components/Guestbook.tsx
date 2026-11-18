import React, { useState, useEffect } from 'react';
import { Heart, Send, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_GUESTBOOK_WISHES, GuestbookWish } from '../data/weddingData';

const GUESTBOOK_STORAGE_KEY = 'Pratha_Abhinav_guestbook_wishes';

export const Guestbook: React.FC = () => {
  const [wishes, setWishes] = useState<GuestbookWish[]>([]);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userLikedIds, setUserLikedIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(GUESTBOOK_STORAGE_KEY);
      if (stored) {
        setWishes(JSON.parse(stored));
      } else {
        setWishes(INITIAL_GUESTBOOK_WISHES);
        localStorage.setItem(GUESTBOOK_STORAGE_KEY, JSON.stringify(INITIAL_GUESTBOOK_WISHES));
      }
    } catch {
      setWishes(INITIAL_GUESTBOOK_WISHES);
    }
  }, []);

  const handleLike = (id: string) => {
    if (userLikedIds.includes(id)) return;

    const updated = wishes.map((w) => (w.id === id ? { ...w, hearts: w.hearts + 1 } : w));
    setWishes(updated);
    setUserLikedIds([...userLikedIds, id]);
    localStorage.setItem(GUESTBOOK_STORAGE_KEY, JSON.stringify(updated));

    try {
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.8 },
        colors: ['#E11D48', '#FDA4AF', '#F43F5E'],
      });
    } catch {
      // ignore
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    const newWish: GuestbookWish = {
      id: `w-${Date.now()}`,
      name: name.trim(),
      relation: relation.trim() || 'Well-wisher',
      message: message.trim(),
      hearts: 1,
      date: 'Just now',
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    localStorage.setItem(GUESTBOOK_STORAGE_KEY, JSON.stringify(updated));

    setName('');
    setRelation('');
    setMessage('');
    setIsSubmitting(false);

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#D4AF37', '#9A7426', '#E25822'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <section id="guestbook" className="py-20 lg:py-28 bg-[#F5EFE6] border-t border-[#C5A059]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="font-editorial text-sm uppercase tracking-[0.25em] text-[#9A7426] font-medium mb-2">
            Wishes &amp; Blessings
          </p>
          <h2 className="text-3xl sm:text-5xl font-display font-medium text-[#2C241E] text-balance">
            The Digital Guestbook
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6B5A4B] font-light max-w-md mx-auto">
            Leave your warm thoughts, memories, and prayers for Pratha &amp; Abhinav as they embark on their journey.
          </p>
          <div className="w-16 h-px bg-[#C5A059]/40 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Leave a blessing form */}
          <div className="lg:col-span-5 bg-white/90 p-6 sm:p-8 rounded-2xl border border-[#C5A059]/30 shadow-sm space-y-5">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#9A7426] font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Bless the Couple</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-medium text-[#2C241E] mt-1">
                Share Your Love
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#7D6B58] font-semibold mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Radhika &amp; Kunal"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#C5A059]/40 bg-[#FAF7F2]/60 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#9A7426]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#7D6B58] font-semibold mb-1">
                  Relation or City (Optional)
                </label>
                <input
                  type="text"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  placeholder="e.g. Bride's College Roommate · Mumbai"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#C5A059]/40 bg-[#FAF7F2]/60 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#9A7426]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#7D6B58] font-semibold mb-1">
                  Your Message &amp; Blessings *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="May your life together be blessed with endless happiness..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#C5A059]/40 bg-[#FAF7F2]/60 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#9A7426]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#9A7426] hover:bg-[#83611D] rounded-full transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish Blessing</span>
              </button>
            </form>
          </div>

          {/* Right Column: Wishes Wall */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between text-xs text-[#8C7A6B] font-medium px-1">
              <span>{wishes.length} Heartfelt Messages</span>
              <span>Sorted by Latest</span>
            </div>

            <div className="space-y-3.5 max-h-[600px] overflow-y-auto pr-1">
              {wishes.map((wish) => {
                const isLiked = userLikedIds.includes(wish.id);

                return (
                  <div
                    key={wish.id}
                    className="p-5 rounded-2xl bg-white border border-[#C5A059]/25 shadow-2xs hover:shadow-xs transition-all space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h4 className="font-display font-medium text-base sm:text-lg text-[#2C241E]">
                          {wish.name}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-[#8C7A6B]">
                          <span>{wish.relation}</span>
                          <span aria-hidden="true">·</span>
                          <span>{wish.date}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleLike(wish.id)}
                        disabled={isLiked}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          isLiked
                            ? 'bg-rose-50 text-rose-600 border border-rose-200'
                            : 'bg-[#FAF7F2] text-[#7D6B58] hover:text-rose-600 hover:bg-rose-50 border border-[#C5A059]/30'
                        }`}
                        title="Send Love"
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${
                            isLiked ? 'fill-rose-500 text-rose-500' : 'text-[#8C7A6B]'
                          }`}
                        />
                        <span className="font-mono tabular-nums">{wish.hearts}</span>
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm text-[#5A4D41] leading-relaxed font-light italic">
                      &ldquo;{wish.message}&rdquo;
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
