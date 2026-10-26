import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Heart,
  LogOut,
  Menu,
  Shirt,
  Sparkles,
  Upload,
  UserRound,
  X,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

const navItems = [
  { label: 'Virtual try-on', href: '#try-on' },
  { label: 'Categories', href: '#categories' },
  { label: 'Style notes', href: '#style-notes' },
];

const categories = [
  {
    name: 'Women',
    note: 'A softer point of view',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=85&w=1000&auto=format&fit=crop',
    alt: 'Model in a sculptural black dress',
  },
  {
    name: 'Men',
    note: 'Modern, considered essentials',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=85&w=1000&auto=format&fit=crop',
    alt: 'Model in a relaxed modern outfit',
  },
  {
    name: 'Streetwear',
    note: 'Made to move with you',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=85&w=1000&auto=format&fit=crop',
    alt: 'Street-style fashion editorial',
  },
  {
    name: 'Accessories',
    note: 'The details that make it yours',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=85&w=1000&auto=format&fit=crop',
    alt: 'Curated fashion accessories and clothing',
  },
];

const styleReferences = [
  {
    name: 'The tailored layer',
    note: 'Clean lines · relaxed structure',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=85&w=700&auto=format&fit=crop',
  },
  {
    name: 'The soft knit',
    note: 'A little ease · all day',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=85&w=700&auto=format&fit=crop',
  },
  {
    name: 'The evening edit',
    note: 'Quiet confidence · after dark',
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=85&w=700&auto=format&fit=crop',
  },
];

const styleNotes = [
  {
    number: '01',
    title: 'Quiet structure',
    note: 'A sharper silhouette, softened by natural texture.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=85&w=1000&auto=format&fit=crop',
    style: 'The tailored layer',
  },
  {
    number: '02',
    title: 'Off-duty, elevated',
    note: 'Easy pieces with just enough intention.',
    image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=85&w=1000&auto=format&fit=crop',
    style: 'The soft knit',
  },
  {
    number: '03',
    title: 'A little after-hours',
    note: 'An expressive finish for wherever the night goes.',
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=85&w=1000&auto=format&fit=crop',
    style: 'The evening edit',
  },
];

export default function HeroPage() {
  const [user, setUser] = useState<User | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(styleReferences[0].name);
  const [personPhoto, setPersonPhoto] = useState<File | null>(null);
  const [personPhotoUrl, setPersonPhotoUrl] = useState<string | null>(null);
  const [clothingPhoto, setClothingPhoto] = useState<File | null>(null);
  const [clothingPhotoUrl, setClothingPhotoUrl] = useState<string | null>(null);
  const [tryOnMessage, setTryOnMessage] = useState('');
  const [stylistMessageVisible, setStylistMessageVisible] = useState(false);
  const personPhotoInputRef = useRef<HTMLInputElement>(null);
  const clothingPhotoInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

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

  useEffect(() => {
    if (!personPhoto) {
      setPersonPhotoUrl(null);
      return;
    }
    const localPhotoUrl = URL.createObjectURL(personPhoto);
    setPersonPhotoUrl(localPhotoUrl);
    return () => URL.revokeObjectURL(localPhotoUrl);
  }, [personPhoto]);

  useEffect(() => {
    if (!clothingPhoto) {
      setClothingPhotoUrl(null);
      return;
    }
    const localPhotoUrl = URL.createObjectURL(clothingPhoto);
    setClothingPhotoUrl(localPhotoUrl);
    return () => URL.revokeObjectURL(localPhotoUrl);
  }, [clothingPhoto]);

  if (checkingSession) {
    return <main className="grid min-h-screen place-items-center bg-canvas font-body text-charcoal">Loading your fitting room...</main>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'there';
  const displayEmail = user.email || 'your account email';

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/login', { replace: true });
  }

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>, photoType: 'person' | 'clothing') {
    const selectedPhoto = event.target.files?.[0];
    if (selectedPhoto) {
      if (photoType === 'person') {
        setPersonPhoto(selectedPhoto);
      } else {
        setClothingPhoto(selectedPhoto);
      }
      setTryOnMessage('');
    }
  }

  function handleTryOn() {
    if (!personPhoto || !clothingPhoto) {
      setTryOnMessage('Upload both a person photo and a clothing photo to prepare your try-on.');
      return;
    }
    setTryOnMessage('Both photos are ready in this browser. Virtual try-on processing is not connected yet, so no generated result is shown.');
  }

  const reveal = {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.18 },
    transition: { duration: 0.7, ease: [0.2, 0.75, 0.25, 1] as const },
  };

  function selectStyleAndScroll(styleName: string) {
    setSelectedStyle(styleName);
    document.getElementById('try-on')?.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
  }

  return (
    <main className="member-hero min-h-screen overflow-hidden text-ink">
      <header className="member-nav sticky top-0 z-40 border-b border-[#dedbd4]/80 bg-[#f8f7f4]/90 backdrop-blur-xl">
        <nav className="mx-auto flex h-[76px] max-w-content items-center justify-between px-5 sm:px-8 lg:px-12" aria-label="Main navigation">
          <Link to="/hero" className="member-wordmark font-display text-[23px] font-semibold tracking-tightest" aria-label="DrapeAI home">
            drape<span>ai</span>
          </Link>
          <div className="hidden items-center gap-9 lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="member-nav-link relative py-3 text-[13px] text-[#59564f] transition-colors hover:text-ink">
                {item.label}
              </a>
            ))}
          </div>
          <div className="hidden items-center gap-5 sm:flex">
            <div className="hidden text-right xl:block">
              <p className="text-[12px] font-medium text-ink">{displayName}</p>
              <p className="mt-0.5 text-[10px] text-[#77736b]">{displayEmail}</p>
            </div>
            <button type="button" onClick={handleLogout} className="member-logout inline-flex min-h-11 items-center gap-2 rounded-full border border-[#d8d4cb] px-4 text-[12px] text-[#4e4b45] transition-colors hover:border-ink hover:text-ink">
              <LogOut size={14} strokeWidth={1.7} /> <span>Log out</span>
            </button>
          </div>
          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="grid h-11 w-11 place-items-center rounded-full border border-[#dedbd4] sm:hidden"
          >
            {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </nav>
        <AnimatePresence initial={false}>
          {mobileMenuOpen && (
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
              className="overflow-hidden border-t border-[#dedbd4] bg-[#f8f7f4] sm:hidden"
            >
              <div className="space-y-1 px-5 py-4">
                {navItems.map((item) => (
                  <a key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} className="block rounded-xl px-3 py-3 text-sm text-[#4e4b45] hover:bg-[#efede7]">
                    {item.label}
                  </a>
                ))}
                <div className="flex items-center justify-between border-t border-[#dedbd4] px-3 pt-4">
                  <span className="max-w-[65%] truncate text-xs text-[#77736b]">{displayEmail}</span>
                  <button type="button" onClick={handleLogout} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#d8d4cb] px-4 text-xs">
                    <LogOut size={14} /> Log out
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <section className="member-editorial-hero mx-auto grid max-w-content items-center gap-10 px-5 pb-16 pt-8 sm:px-8 sm:pb-20 md:pt-12 lg:grid-cols-[0.86fr_1.14fr] lg:gap-12 lg:px-12 lg:pb-24 lg:pt-10">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="order-2 relative z-10 lg:order-1"
        >
          <p className="member-kicker mb-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#8a6a3b] sm:text-[11px]">
            <span className="h-px w-7 bg-[#a98a60]" /> Your personal style, in a new light
          </p>
          <h1 className="member-serif max-w-[640px] text-[54px] font-normal leading-[0.97] tracking-[-0.055em] text-[#171717] sm:text-[72px] lg:text-[82px]">
            Your Style.<br /><span className="member-italic">Reimagined.</span>
          </h1>
          <p className="mt-6 text-[14px] leading-7 text-[#68645c] sm:mt-7 sm:max-w-[420px] sm:text-[15px]">
            Discover your next look with AI-powered virtual try-on.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-9">
            <a href="#try-on" className="member-primary-cta group inline-flex min-h-12 items-center gap-4 rounded-full bg-[#1d1d1b] px-6 text-[12px] font-medium text-[#fbfaf7] transition duration-300 hover:-translate-y-0.5 hover:bg-[#68523a] sm:px-7">
              Try it on <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#categories" className="member-secondary-cta inline-flex min-h-12 items-center gap-2 rounded-full px-5 text-[12px] font-medium text-[#49463f] transition-colors hover:text-[#8a6a3b]">
              Explore collection <ArrowDown size={14} />
            </a>
          </div>
          <div className="mt-10 flex items-center gap-3 border-t border-[#dedbd4] pt-5 sm:mt-14">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#ece8df] text-[#706149]"><Sparkles size={15} strokeWidth={1.6} /></span>
            <p className="text-[12px] text-[#69665e]">Welcome back, <span className="font-medium text-[#242320]">{displayName}</span></p>
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98, x: 16 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0.75, 0.25, 1] }}
          className="member-hero-image order-1 relative min-h-[380px] overflow-hidden rounded-[5px] bg-[#ded7cc] sm:min-h-[520px] lg:order-2 lg:min-h-[620px]"
        >
          <img
            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=90&w=1600&auto=format&fit=crop"
            alt="Fashion editorial portrait in a flowing dark outfit"
            className="absolute inset-0 h-full w-full object-cover object-[center_38%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/35 via-transparent to-[#171717]/5" />
          <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/40 bg-[#f8f7f4]/85 px-3.5 py-2 text-[9px] uppercase tracking-[0.16em] text-[#3f3c36] backdrop-blur-md sm:left-7 sm:top-7">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8c9a78]" /> The new perspective
          </div>
          <motion.div
            animate={shouldReduceMotion ? undefined : { y: [0, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-5 right-4 flex max-w-[210px] items-center gap-3 rounded-[3px] border border-white/40 bg-[#f8f7f4]/90 p-3 shadow-xl backdrop-blur-md sm:bottom-8 sm:right-8 sm:max-w-[230px] sm:p-4"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e9e3d8] text-[#755b39]"><Shirt size={17} strokeWidth={1.5} /></span>
            <span>
              <span className="block text-[9px] uppercase tracking-[0.14em] text-[#858075]">Your fitting room</span>
              <span className="mt-1 block font-display text-[13px] text-[#25231f]">Made for your point of view</span>
            </span>
          </motion.div>
          <p className="absolute bottom-7 left-5 hidden text-[9px] uppercase tracking-[0.18em] text-white/80 sm:block sm:left-7">A considered kind of new</p>
        </motion.div>
      </section>

      <section id="try-on" className="member-tryon-section scroll-mt-20 border-y border-[#e4e0d8] bg-[#efede7]">
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <motion.div {...reveal} className="mb-10 flex flex-col justify-between gap-5 md:mb-12 md:flex-row md:items-end">
            <div>
              <p className="member-kicker mb-4 text-[10px] uppercase tracking-[0.2em] text-[#8a6a3b]">The DrapeAI fitting room</p>
              <h2 className="member-serif text-[42px] leading-[1.02] tracking-[-0.045em] text-[#1c1b19] sm:text-[54px]">See it in your own way.</h2>
            </div>
            <p className="max-w-[340px] text-[13px] leading-6 text-[#6c685f]">Upload a photo of yourself and the clothing piece you want to try on.</p>
          </motion.div>

          <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.08 }} className="grid overflow-hidden rounded-[4px] border border-[#dedad1] bg-[#f9f8f5] lg:grid-cols-[1.04fr_0.96fr]">
            <div className="grid grid-cols-2 gap-3 bg-[#e8e5de] p-3 sm:gap-4 sm:p-5 lg:p-6">
              <div className="flex min-w-0 flex-col">
                <p className="mb-2 text-[9px] font-medium uppercase tracking-[0.14em] text-[#625b4f] sm:text-[10px]">01 / Your photo</p>
                <div className="relative flex-1 overflow-hidden border border-[#d6d0c4] bg-[#f5f3ee]">
                  {personPhotoUrl ? (
                    <img src={personPhotoUrl} alt="Preview of your selected person photo" className="absolute inset-0 h-full w-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-2 text-center text-[#887c69]">
                      <UserRound size={26} strokeWidth={1.2} />
                      <p className="mt-3 text-[10px] text-[#5f5b53] sm:text-[11px]">Full-body photo works best</p>
                      <p className="mt-1 hidden text-[9px] leading-4 text-[#898378] sm:block">Choose a clear photo of the person</p>
                    </div>
                  )}
                  <button type="button" onClick={() => personPhotoInputRef.current?.click()} className="absolute inset-x-2 bottom-2 inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full border border-white/70 bg-[#f8f7f4]/95 px-2 text-[9px] font-medium text-[#35322c] shadow-sm transition-colors hover:bg-white sm:inset-x-3 sm:bottom-3 sm:gap-2 sm:text-[10px]">
                    <Upload size={13} /> {personPhoto ? 'Change person photo' : 'Upload person photo'}
                  </button>
                  {personPhoto && <span className="absolute left-2 top-2 rounded-full bg-[#f8f7f4]/95 px-2 py-1 text-[8px] text-[#4f5c43] sm:left-3 sm:top-3 sm:text-[9px]">Ready</span>}
                </div>
                <p className="mt-2 truncate text-[9px] text-[#716d64]" title={personPhoto?.name}>{personPhoto?.name || 'No person photo selected'}</p>
                <input ref={personPhotoInputRef} type="file" accept="image/*" onChange={(event) => handlePhotoChange(event, 'person')} className="sr-only" aria-label="Upload a photo of yourself" />
              </div>
              <div className="flex min-w-0 flex-col">
                <p className="mb-2 text-[9px] font-medium uppercase tracking-[0.14em] text-[#625b4f] sm:text-[10px]">02 / Clothing item</p>
                <div className="relative flex-1 overflow-hidden border border-[#d6d0c4] bg-[#f5f3ee]">
                  {clothingPhotoUrl ? (
                    <img src={clothingPhotoUrl} alt="Preview of your selected clothing photo" className="absolute inset-0 h-full w-full object-contain p-2 sm:p-4" />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-2 text-center text-[#887c69]">
                      <Shirt size={26} strokeWidth={1.2} />
                      <p className="mt-3 text-[10px] text-[#5f5b53] sm:text-[11px]">Choose one clothing item</p>
                      <p className="mt-1 hidden text-[9px] leading-4 text-[#898378] sm:block">A clear product photo works best</p>
                    </div>
                  )}
                  <button type="button" onClick={() => clothingPhotoInputRef.current?.click()} className="absolute inset-x-2 bottom-2 inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full border border-white/70 bg-[#f8f7f4]/95 px-2 text-[9px] font-medium text-[#35322c] shadow-sm transition-colors hover:bg-white sm:inset-x-3 sm:bottom-3 sm:gap-2 sm:text-[10px]">
                    <Upload size={13} /> {clothingPhoto ? 'Change clothing photo' : 'Upload clothing'}
                  </button>
                  {clothingPhoto && <span className="absolute left-2 top-2 rounded-full bg-[#f8f7f4]/95 px-2 py-1 text-[8px] text-[#4f5c43] sm:left-3 sm:top-3 sm:text-[9px]">Ready</span>}
                </div>
                <p className="mt-2 truncate text-[9px] text-[#716d64]" title={clothingPhoto?.name}>{clothingPhoto?.name || 'No clothing photo selected'}</p>
                <input ref={clothingPhotoInputRef} type="file" accept="image/*" onChange={(event) => handlePhotoChange(event, 'clothing')} className="sr-only" aria-label="Upload a photo of the clothing item" />
              </div>
            </div>

            <div className="flex flex-col justify-center px-5 py-8 sm:px-9 sm:py-10 lg:px-12 lg:py-12">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#8a6a3b]">01 / Pick a direction</p>
                <span className="rounded-full border border-[#dedad1] px-3 py-1.5 text-[9px] uppercase tracking-[0.12em] text-[#77736b]">Style references</span>
              </div>
              <h3 className="member-serif mt-4 text-[30px] leading-tight text-[#23221f]">What are you feeling?</h3>
              <div className="mt-6 space-y-2.5">
                {styleReferences.map((style, index) => {
                  const isSelected = selectedStyle === style.name;
                  return (
                    <button
                      key={style.name}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => { setSelectedStyle(style.name); setTryOnMessage(''); }}
                      className={`member-style-option flex w-full items-center gap-3 border p-2 text-left transition-all sm:gap-4 sm:p-2.5 ${isSelected ? 'border-[#87775f] bg-[#f0ede6]' : 'border-[#e4e0d8] hover:border-[#b8ad9c]'}`}
                    >
                      <img src={style.image} alt="" className="h-[66px] w-[54px] shrink-0 object-cover sm:h-[74px] sm:w-[60px]" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-[12px] font-medium text-[#2b2925]">{style.name}</span>
                        <span className="mt-1.5 block text-[10px] text-[#78746b]">{style.note}</span>
                      </span>
                      <span className={`mr-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border ${isSelected ? 'border-[#70604a] bg-[#70604a] text-white' : 'border-[#d4cfc5] text-transparent'}`}>
                        {isSelected ? <Check size={12} /> : <span className="sr-only">Not selected</span>}
                      </span>
                      <span className="sr-only">Option {index + 1}</span>
                    </button>
                  );
                })}
              </div>
              <button type="button" onClick={handleTryOn} className="member-primary-cta group mt-6 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-[#1d1d1b] px-6 text-[12px] font-medium text-[#fbfaf7] transition duration-300 hover:bg-[#68523a]">
                Start Virtual Try-On <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </button>
              <p className="mt-3 flex items-start gap-2 text-[10px] leading-5 text-[#79756d]"><Heart size={13} className="mt-0.5 shrink-0" /> Both photos stay on this device. They are not uploaded.</p>
              {tryOnMessage && <p role="status" className="mt-3 border-l-2 border-[#a98a60] pl-3 text-[11px] leading-5 text-[#58544c]">{tryOnMessage}</p>}
            </div>
          </motion.div>
          <p className="mt-4 text-[10px] leading-5 text-[#817c72]">Your two images can be previewed here, but the project has no connected virtual try-on service yet, so it cannot generate the combined result.</p>
        </div>
      </section>

      <section id="categories" className="scroll-mt-20 bg-[#f8f7f4]">
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <motion.div {...reveal} className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
            <div>
              <p className="member-kicker mb-4 text-[10px] uppercase tracking-[0.2em] text-[#8a6a3b]">A world of your own</p>
              <h2 className="member-serif text-[42px] leading-none tracking-[-0.04em] text-[#1c1b19] sm:text-[54px]">Find your feeling.</h2>
            </div>
            <span className="hidden pb-1 text-[11px] text-[#77736b] sm:block">Explore by category</span>
          </motion.div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {categories.map((category, index) => (
              <motion.a
                {...reveal}
                transition={{ ...reveal.transition, delay: index * 0.07 }}
                key={category.name}
                href="#style-notes"
                className="member-category-card group relative block min-h-[270px] overflow-hidden bg-[#ded9cf] sm:min-h-[360px] lg:min-h-[390px]"
              >
                <img src={category.image} alt={category.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151513]/70 via-[#151513]/5 to-transparent transition-colors duration-500 group-hover:from-[#151513]/75" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-6">
                  <p className="text-[9px] uppercase tracking-[0.17em] text-white/75">{category.note}</p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <h3 className="member-serif text-[26px] leading-none sm:text-[32px]">{category.name}</h3>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/50 transition-colors group-hover:bg-white group-hover:text-[#24221f]"><ArrowUpRight size={15} /></span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section id="style-notes" className="scroll-mt-20 border-t border-[#e4e0d8] bg-[#f2f0eb]">
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <motion.div {...reveal} className="mb-9 flex flex-col justify-between gap-5 sm:mb-11 md:flex-row md:items-end">
            <div>
              <p className="member-kicker mb-4 text-[10px] uppercase tracking-[0.2em] text-[#8a6a3b]">A little inspiration</p>
              <h2 className="member-serif text-[42px] leading-none tracking-[-0.04em] text-[#1c1b19] sm:text-[54px]">Style notes.</h2>
            </div>
            <p className="max-w-[350px] text-[12px] leading-6 text-[#716d64]">Editorial directions to spark an idea. Choose a mood to carry into your fitting-room preview.</p>
          </motion.div>
          <div className="grid gap-4 md:grid-cols-3">
            {styleNotes.map((note, index) => (
              <motion.article {...reveal} transition={{ ...reveal.transition, delay: index * 0.08 }} key={note.number} className="member-note-card group">
                <div className="relative aspect-[1.12/1] overflow-hidden bg-[#ded9cf]">
                  <img src={note.image} alt={`${note.title} fashion inspiration`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/50 bg-[#f8f7f4]/85 px-3 py-1.5 text-[9px] tracking-[0.12em] text-[#46433d] backdrop-blur">{note.number} / STYLE NOTE</span>
                </div>
                <div className="border-b border-[#dcd8cf] py-4 sm:py-5">
                  <h3 className="member-serif text-[26px] text-[#282622]">{note.title}</h3>
                  <p className="mt-1.5 text-[11px] text-[#716d64]">{note.note}</p>
                  <button type="button" onClick={() => selectStyleAndScroll(note.style)} className="mt-4 inline-flex min-h-10 items-center gap-2 text-[10px] font-medium uppercase tracking-[0.1em] text-[#62533e] transition-colors hover:text-[#1d1d1b]">
                    Try this direction <ArrowRight size={13} />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
          <p className="mt-5 text-[10px] text-[#888378]">Style inspiration only — there is no live product catalog or order data connected here.</p>
        </div>
      </section>

      <section className="member-stylist-section bg-[#252720] text-[#f8f7f4]">
        <motion.div {...reveal} className="mx-auto flex max-w-content flex-col gap-7 px-5 py-14 sm:px-8 md:flex-row md:items-center md:justify-between md:py-16 lg:px-12">
          <div className="flex items-start gap-4 sm:gap-5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#c9b38d]/50 text-[#d8c7a7]"><Sparkles size={18} strokeWidth={1.5} /></span>
            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#c9b38d]">A thought for your wardrobe</p>
              <h2 className="member-serif mt-2 text-[30px] leading-tight sm:text-[36px]">Meet your AI fashion stylist.</h2>
              <p className="mt-2 max-w-[490px] text-[12px] leading-6 text-white/65">A more personal way to find your next look is on its way.</p>
            </div>
          </div>
          <div className="shrink-0">
            <button
              type="button"
              aria-expanded={stylistMessageVisible}
              onClick={() => setStylistMessageVisible((visible) => !visible)}
              className="inline-flex min-h-12 items-center gap-3 rounded-full border border-white/30 px-6 text-[11px] transition-colors hover:border-[#c9b38d] hover:text-[#e2d2b5]"
            >
              Ask your stylist <ArrowRight size={14} />
            </button>
            {stylistMessageVisible && (
              <p role="status" className="mt-3 max-w-[280px] text-[10px] leading-5 text-white/65">
                Your stylist is coming soon. For now, choose a style direction in the fitting room above.
              </p>
            )}
          </div>
        </motion.div>
      </section>

      <footer className="flex flex-col items-center justify-between gap-3 bg-[#f8f7f4] px-5 py-6 text-center text-[10px] text-[#77736b] sm:flex-row sm:px-8 sm:text-left lg:px-12">
        <span className="font-display text-[14px] font-semibold tracking-tightest text-[#282622]">drape<span className="text-[#8a6a3b]">ai</span></span>
        <span>Signed in as {displayEmail}</span>
        <span>Thoughtfully, and always yours.</span>
      </footer>
    </main>
  );
}
