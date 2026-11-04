import { useMotionValue, useSpring, useTransform, motion, LazyMotion, domAnimation } from 'framer-motion';
import {
  ArrowDownUp,
  ArrowRight,
  Camera,
  Check,
  ChevronDown,
  CircleHelp,
  Heart,
  LogOut,
  ScanLine,
  Shirt,
  Sparkles,
  Sun,
  Upload,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import type { User } from '@supabase/supabase-js';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import ProductShowcase from '../components/ProductShowcase';
import TechPipeline from '../components/TechPipeline';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

const garmentCategories = ['Tops', 'Bottoms', 'Outerwear'];
const garments = [
  {
    name: 'Sculpted trench',
    detail: 'Structured cotton · Relaxed',
    image: 'https://images.unsplash.com/photo-1548126032-079a0fb0099d?q=80&w=600&auto=format&fit=crop',
    colors: ['#b4a58c', '#343c48', '#c4b8aa'],
    fabric: 'Cotton twill',
  },
  {
    name: 'Soft tailoring',
    detail: 'Wool blend · Modern fit',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop',
    colors: ['#777f80', '#b48f72', '#282c35'],
    fabric: 'Wool blend',
  },
  {
    name: 'Everyday layer',
    detail: 'Lightweight knit · Easy',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop',
    colors: ['#aa8064', '#d2c8b7', '#454c59'],
    fabric: 'Soft knit',
  },
];

export default function HeroPage() {
  const user = useOutletContext<User>();
  const navigate = useNavigate();
  const [logoutError, setLogoutError] = useState('');
  const fullName = user.user_metadata?.full_name;
  const displayName = (typeof fullName === 'string' ? fullName.trim() : '') || user.email?.split('@')[0] || 'there';
  const displayEmail = user.email || 'your account email';
  const previewRef = useRef<HTMLDivElement | null>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springConfig = { stiffness: 140, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-5, 5]), springConfig);

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setLogoutError(error.message);
      return;
    }
    navigate('/login', { replace: true });
  }

  function handlePreviewMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const bounds = previewRef.current?.getBoundingClientRect();
    if (!bounds) return;
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  }

  function resetPreviewTilt() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <main id="top" className="studio-dashboard min-h-screen text-slate-100">
      <header className="studio-app-header sticky top-0 z-30 border-b border-white/10">
        <nav className="mx-auto flex max-w-[1480px] items-center justify-between gap-5 px-5 py-4 md:px-8">
          <Link to="/hero" className="flex items-center gap-3 font-display text-[22px] font-semibold tracking-tightest text-white">
            <span className="studio-brand-mark grid h-9 w-9 place-items-center rounded-xl"><Shirt size={18} /></span>
            DrapeAI
          </Link>

          <div className="hidden items-center gap-7 font-body text-[12px] text-slate-400 lg:flex">
            <a href="#studio" className="transition-colors hover:text-cyan-200">Studio</a>
            <a href="#how-it-works" className="transition-colors hover:text-cyan-200">How it works</a>
            <a href="#features" className="transition-colors hover:text-cyan-200">Features</a>
            <a href="#about" className="transition-colors hover:text-cyan-200">Technology</a>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden max-w-[180px] truncate font-body text-[12px] text-slate-400 sm:inline">{displayEmail}</span>
            <button type="button" onClick={handleLogout} className="studio-logout inline-flex items-center gap-2 rounded-full px-3.5 py-2 font-body text-[12px] text-slate-200 transition-colors hover:border-cyan-300/50 hover:text-white">
              <LogOut size={14} /> <span className="hidden sm:inline">Log out</span>
            </button>
          </div>
        </nav>
      </header>

      {logoutError && <p role="alert" className="mx-auto max-w-[1480px] px-6 pt-3 text-right font-body text-xs text-red-300 md:px-10">{logoutError}</p>}

      <section id="studio" className="studio-workspace mx-auto max-w-[1480px] px-5 pb-36 pt-9 md:px-8 md:pt-12">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mb-3 flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.2em] text-cyan-300">
              <Sparkles size={13} /> Personal fitting studio
            </p>
            <h1 className="font-display text-[32px] font-medium leading-tight tracking-tightest text-white sm:text-[42px]">
              Welcome back, <span className="studio-gradient-text">{displayName}.</span>
            </h1>
            <p className="mt-2 font-body text-[13px] text-slate-400">Preview the silhouette. Explore the details. Find your fit.</p>
          </div>
          <span className="studio-preview-label inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-body text-[9px] uppercase tracking-[0.14em] text-slate-400">
            <CircleHelp size={12} /> UI preview · controls are visual only
          </span>
        </div>

        <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_350px]">
          <section className="studio-preview-panel rounded-2xl border p-3 sm:p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-1">
              <div>
                <p className="font-body text-[10px] uppercase tracking-[0.16em] text-slate-500">Virtual try-on</p>
                <p className="mt-1 font-display text-[17px] text-white">Look 01 <span className="text-slate-500">/</span> {displayName}</p>
              </div>
              <div className="flex items-center gap-2 font-body text-[10px] text-emerald-200">
                <span className="studio-live-dot h-1.5 w-1.5 rounded-full bg-emerald-300" /> Preview mode
              </div>
            </div>

            <div
              ref={previewRef}
              onMouseMove={handlePreviewMouseMove}
              onMouseLeave={resetPreviewTilt}
              className="studio-preview-perspective relative"
            >
              <LazyMotion features={domAnimation}>
                <motion.div
                  className="studio-model-pod relative overflow-hidden rounded-xl border border-white/10"
                  style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1400&auto=format&fit=crop"
                    alt="Fashion preview in the virtual fitting studio"
                    className="studio-model-image h-[430px] w-full object-cover sm:h-[560px] xl:h-[610px]"
                  />
                  <div className="studio-model-vignette pointer-events-none absolute inset-0" />
                  <div className="studio-model-grid pointer-events-none absolute inset-0" />
                  <div className="studio-model-scanline pointer-events-none absolute inset-x-0" aria-hidden="true" />

                  <div className="studio-pose-overlay pointer-events-none absolute inset-0" aria-hidden="true">
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
                      <path d="M50 18 42 32 39 48 43 63 50 79 57 63 61 48 58 32Z" fill="none" stroke="rgba(103,232,249,.7)" strokeWidth=".22" strokeDasharray="1 1.4" />
                      <path d="m42 32-11 8m27-8 11 8M39 48l-8 14m30-14 8 14m-26 1 7 2 7-2" fill="none" stroke="rgba(167,139,250,.8)" strokeWidth=".2" />
                      {[[50, 18], [42, 32], [58, 32], [31, 40], [69, 40], [39, 48], [61, 48], [31, 62], [69, 62], [50, 79]].map(([x, y]) => (
                        <circle key={`${x}-${y}`} cx={x} cy={y} r=".75" className="studio-pose-anchor" />
                      ))}
                    </svg>
                  </div>

                  <div className="studio-split-divider pointer-events-none absolute inset-y-0 left-1/2" aria-hidden="true">
                    <span className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-slate-950/70 text-white backdrop-blur-xl">
                      <ArrowDownUp size={15} />
                    </span>
                  </div>

                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/55 px-3 py-2 font-body text-[10px] text-white/85 backdrop-blur-xl sm:left-6 sm:top-6">
                    <ScanLine size={13} className="text-cyan-300" /> Pose landmarks
                  </div>
                  <div className="absolute right-4 top-4 rounded-full border border-white/15 bg-slate-950/55 px-3 py-2 font-body text-[9px] text-white/75 backdrop-blur-xl sm:right-6 sm:top-6">
                    BEFORE <span className="mx-1.5 text-cyan-300">/</span> AFTER
                  </div>

                  <div className="studio-confidence absolute bottom-4 right-4 grid h-[82px] w-[82px] place-items-center rounded-full sm:bottom-6 sm:right-6 sm:h-[94px] sm:w-[94px]">
                    <span className="text-center font-body text-[8px] uppercase tracking-[0.1em] text-slate-300">
                      <strong className="block font-display text-[22px] font-medium tracking-normal text-white">96%</strong>
                      Fit confidence
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 flex items-end gap-3 sm:bottom-6 sm:left-6">
                    <span className="studio-split-pill rounded-full px-3 py-2 font-body text-[9px] text-white/90">Split view · preview</span>
                  </div>
                </motion.div>
              </LazyMotion>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1">
              <div className="flex items-center gap-2 font-body text-[11px] text-slate-400">
                <Camera size={14} className="text-cyan-300" /> Fitting profile <span className="text-slate-200">Studio model</span>
              </div>
              <span className="font-body text-[10px] text-slate-500">Photo preview is illustrative</span>
            </div>
          </section>

          <aside className="studio-rail rounded-2xl border p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-body text-[10px] uppercase tracking-[0.16em] text-slate-500">Curated selection</p>
                <h2 className="mt-1 font-display text-[20px] text-white">Choose a layer</h2>
              </div>
              <button type="button" aria-label="More garment options, preview only" className="studio-quiet-icon grid h-9 w-9 place-items-center rounded-xl text-slate-300"><ChevronDown size={16} /></button>
            </div>

            <div className="studio-category-tabs mt-5 grid grid-cols-3 gap-1 rounded-xl p-1">
              {garmentCategories.map((category, index) => (
                <span key={category} className={`studio-category-tab relative rounded-lg px-2 py-2.5 text-center font-body text-[10px] ${index === 2 ? 'is-selected' : ''}`}>
                  {index === 2 && <motion.span layoutId="studio-category-indicator" className="studio-category-indicator absolute inset-0 rounded-lg" transition={{ type: 'spring', stiffness: 360, damping: 32 }} />}
                  <span className="relative z-10">{category}</span>
                </span>
              ))}
            </div>

            <div className="mt-4 space-y-3">
              {garments.map((garment, index) => (
                <article key={garment.name} className={`studio-garment-card group relative flex gap-3 rounded-xl border p-2.5 transition duration-300 hover:-translate-y-2 hover:rotate-1 hover:border-cyan-500/50 ${index === 0 ? 'is-selected' : ''}`}>
                  <div className="relative h-[94px] w-[78px] shrink-0 overflow-hidden rounded-lg">
                    <img src={garment.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    {index === 0 && <span className="absolute right-1.5 top-1.5 grid h-5 w-5 place-items-center rounded-full bg-cyan-300 text-slate-950"><Check size={12} /></span>}
                  </div>
                  <div className="min-w-0 flex-1 py-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="truncate font-display text-[14px] text-white">{garment.name}</h3>
                        <p className="mt-1 truncate font-body text-[9px] text-slate-500">{garment.detail}</p>
                      </div>
                      <Heart size={14} className="mt-0.5 shrink-0 text-slate-500" />
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        {garment.colors.map((color) => (
                          <span key={color} className="studio-color-swatch h-3.5 w-3.5 rounded-full" style={{ backgroundColor: color }} />
                        ))}
                      </div>
                      <span className="font-body text-[8px] text-slate-400">{garment.fabric}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-5 border-t border-white/10 pt-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-body text-[10px] text-slate-300">Fabric finish</span>
                <span className="font-body text-[9px] text-slate-500">Preview only</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Twill', 'Wool', 'Knit'].map((texture, index) => (
                  <span key={texture} className={`studio-texture-chip rounded-full px-3 py-1.5 font-body text-[9px] ${index === 0 ? 'is-selected' : ''}`}>{texture}</span>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
          {[
            { value: '03', label: 'Saved looks', icon: Heart },
            { value: '12', label: 'Pieces explored', icon: Shirt },
            { value: '01', label: 'Fitting profile', icon: Camera },
          ].map(({ value, label, icon: Icon }) => (
            <div key={label} className="studio-stat-card flex items-center gap-2 rounded-xl border px-3 py-3 sm:gap-3 sm:px-4">
              <Icon size={15} className="hidden text-cyan-300 sm:block" />
              <p className="font-display text-[17px] text-white sm:text-[20px]">{value}</p>
              <p className="font-body text-[9px] text-slate-500 sm:text-[10px]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="studio-control-dock fixed bottom-4 left-1/2 z-40 flex w-[calc(100%-24px)] max-w-[700px] -translate-x-1/2 items-center justify-between gap-2 rounded-2xl border p-2.5 sm:bottom-6 sm:w-[calc(100%-40px)] sm:gap-4 sm:px-4">
        <div className="flex min-w-0 items-center gap-1 sm:gap-2">
          <button type="button" className="studio-dock-control flex min-w-[64px] flex-col items-center gap-1 rounded-xl px-2 py-2 text-slate-300 sm:min-w-[92px] sm:flex-row sm:justify-center sm:gap-2">
            <Upload size={15} /><span className="font-body text-[8px] sm:text-[10px]">Model</span>
          </button>
          <button type="button" className="studio-dock-control flex min-w-[64px] flex-col items-center gap-1 rounded-xl px-2 py-2 text-slate-300 sm:min-w-[92px] sm:flex-row sm:justify-center sm:gap-2">
            <ArrowDownUp size={15} /><span className="font-body text-[8px] sm:text-[10px]">Pose</span>
          </button>
          <button type="button" className="studio-dock-control flex min-w-[64px] flex-col items-center gap-1 rounded-xl px-2 py-2 text-slate-300 sm:min-w-[92px] sm:flex-row sm:justify-center sm:gap-2">
            <Sun size={15} /><span className="font-body text-[8px] sm:text-[10px]">Lighting</span>
          </button>
        </div>
        <span className="studio-dock-divider h-9 w-px shrink-0" />
        <button type="button" className="studio-save-cta relative inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 overflow-hidden rounded-xl px-3.5 font-body text-[10px] font-medium text-white sm:px-5 sm:text-[12px]">
          <span className="relative z-10 flex items-center gap-2"><Heart size={14} /> Save outfit <ArrowRight size={14} /></span>
        </button>
      </div>

      <div className="studio-legacy-content">
        <HowItWorks />
        <Features />
        <div id="try-on" className="scroll-mt-20">
          <ProductShowcase />
        </div>
        <TechPipeline />
        <CTASection />
        <Footer />
      </div>

      <section className="studio-account-footer border-t border-white/10">
        <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-5 px-6 py-5 md:px-10">
          <p className="font-body text-[12px] text-slate-400">Signed in as <strong className="font-medium text-slate-200">{displayEmail}</strong></p>
          <p className="font-body text-[12px] text-slate-500">Your photos stay private and yours.</p>
        </div>
      </section>
    </main>
  );
}
