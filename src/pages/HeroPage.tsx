import { useEffect, useState } from 'react';
import { ArrowRight, Camera, Heart, LogOut, Shirt, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export default function HeroPage() {
  const [user, setUser] = useState<User | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    supabase.auth.getUser().then(({ data }) => {
      if (active) {
        setUser(data.user);
        setCheckingSession(false);
        if (data.user) {
          void supabase.functions.invoke('send-welcome-email');
        }
      }
    });
    return () => { active = false; };
  }, []);

  if (checkingSession) return <main className="grid min-h-screen place-items-center bg-canvas font-body text-charcoal">Loading your fitting room...</main>;
  if (!user) {
    navigate('/login', { replace: true });
    return null;
  }

  const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'there';
  const displayEmail = user.email || 'your account email';

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/login', { replace: true });
  }

  return (
    <main className="member-hero min-h-screen bg-canvas text-ink">
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-6 md:px-10 md:py-8">
        <Link to="/" className="font-display text-[23px] font-semibold tracking-tightest">DrapeAI</Link>
        <div className="flex items-center gap-5 font-body text-[13px] text-charcoal">
          <span className="hidden sm:inline">{displayEmail}</span>
          <button type="button" onClick={handleLogout} className="inline-flex items-center gap-2 rounded-full border border-stoneDark/60 px-4 py-2 transition-colors hover:border-ink hover:text-ink"><LogOut size={14} /> Log out</button>
        </div>
      </nav>

      <section className="mx-auto grid max-w-content items-center gap-12 px-6 pb-16 pt-12 md:px-10 md:pb-24 md:pt-20 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
        <div className="max-w-[590px]">
          <p className="mb-5 flex items-center gap-2 font-body text-[12px] uppercase tracking-[0.18em] text-brass"><Sparkles size={15} /> Your fitting room is ready</p>
          <h1 className="font-display text-[52px] font-semibold leading-[0.98] tracking-tightest sm:text-[72px]">Welcome back,<br /><span className="text-brass">{displayName}.</span></h1>
          <p className="mt-7 max-w-[500px] font-display text-[20px] leading-snug text-charcoal md:text-[23px]">See how your next outfit looks on you before it reaches your cart.</p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button type="button" className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-body text-[14px] text-canvas transition-all hover:-translate-y-0.5 hover:bg-brass">Start a new try-on <ArrowRight size={16} /></button>
            <button type="button" className="inline-flex items-center gap-2 font-body text-[14px] text-charcoal transition-colors hover:text-brass"><Heart size={16} /> View saved looks</button>
          </div>
          <div className="mt-12 grid max-w-[480px] grid-cols-3 border-t border-stone pt-5">
            <div><p className="font-display text-[25px] text-ink">03</p><p className="mt-1 font-body text-[11px] text-charcoal">Saved looks</p></div>
            <div className="border-l border-stone pl-5"><p className="font-display text-[25px] text-ink">12</p><p className="mt-1 font-body text-[11px] text-charcoal">Pieces explored</p></div>
            <div className="border-l border-stone pl-5"><p className="font-display text-[25px] text-ink">01</p><p className="mt-1 font-body text-[11px] text-charcoal">Fitting profile</p></div>
          </div>
        </div>

        <div className="member-visual relative min-h-[390px] overflow-hidden rounded-[28px] bg-[#26352f] p-7 text-canvas shadow-[0_30px_70px_-35px_rgba(23,20,15,0.5)] md:min-h-[500px] md:p-10">
          <div className="member-grid absolute inset-0 opacity-30" />
          <div className="relative z-10 flex items-center justify-between font-body text-[10px] uppercase tracking-[0.16em] text-canvas/65"><span>Personal fitting room</span><span className="flex items-center gap-2"><i className="h-1.5 w-1.5 rounded-full bg-[#d9c29a]" /> Live</span></div>
          <div className="member-orbit member-orbit-one" /><div className="member-orbit member-orbit-two" />
          <div className="member-garment" aria-hidden="true"><div className="member-garment-neck" /><div className="member-garment-body"><Shirt size={25} /></div></div>
          <div className="absolute bottom-7 left-7 right-7 z-10 flex items-end justify-between md:bottom-10 md:left-10 md:right-10"><div><p className="font-body text-[10px] uppercase tracking-[0.16em] text-[#d9c29a]">Next up</p><p className="mt-2 font-display text-[25px] leading-none">Your first<br />new look</p></div><Camera size={24} strokeWidth={1.3} className="text-[#d9c29a]" /></div>
        </div>
      </section>

      <section className="border-t border-stone/70 bg-canvasDim/40"><div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-5 px-6 py-5 md:px-10"><p className="font-body text-[12px] text-charcoal">Signed in as <strong className="font-medium text-ink">{displayEmail}</strong></p><p className="font-body text-[12px] text-charcoal/70">Your photos stay private and yours.</p></div></section>
    </main>
  );
}
