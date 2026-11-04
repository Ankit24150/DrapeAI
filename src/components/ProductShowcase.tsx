import { ArrowRight, Ruler, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useReveal } from '../hooks/useReveal';

const panels = [
  {
    label: 'Before',
    img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop',
    alt: 'A plain photo of a person before using DrapeAI',
  },
  {
    label: 'AI Try-On',
    img: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=800&auto=format&fit=crop',
    alt: 'DrapeAI mapping a garment onto the person in real time',
    processing: true,
  },
  {
    label: 'After',
    img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop',
    alt: 'The finished personalized try-on result',
  },
];

export default function ProductShowcase() {
  const headingRef = useReveal<HTMLDivElement>();
  const rowRef = useReveal<HTMLDivElement>();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="studio-showcase relative overflow-hidden border-t border-white/10 py-24 md:py-32">
      <div className="studio-showcase-glow" aria-hidden="true" />
      <div className="mx-auto max-w-content px-6 md:px-10">
        <div ref={headingRef} className="reveal max-w-[560px]">
          <h2 className="font-display font-semibold text-[36px] md:text-[46px] leading-[1.06] tracking-tightest text-white">
            One photo. <span className="studio-gradient-text">Every outfit.</span>
          </h2>
          <p className="mt-4 max-w-[520px] font-body text-[15px] leading-relaxed text-slate-400">
            See the transformation from your original photo to an AI-mapped fit preview.
          </p>
        </div>

        <div
          ref={rowRef}
          className="reveal mt-14 md:mt-16 grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-6 sm:gap-4"
        >
          {panels.map((p, i) => (
            <div key={p.label} className="flex sm:contents">
              <figure className="w-full">
                <div className={`showcase-panel studio-showcase-panel relative overflow-hidden rounded-2xl border ${p.processing ? 'showcase-panel-processing' : ''}`}>
                  <img src={p.img} alt={p.alt} className="w-full h-[340px] md:h-[420px] object-cover" />
                  {p.processing && (
                    <>
                      <svg
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        className="pointer-events-none absolute inset-0 h-full w-full opacity-80"
                      >
                        <line x1="0" y1="30" x2="100" y2="30" stroke="#67e8f9" strokeWidth="0.25" className="drape-line" />
                        <line x1="0" y1="55" x2="100" y2="55" stroke="#a5b4fc" strokeWidth="0.25" className="drape-line" style={{ animationDelay: '1.2s' }} />
                        <line x1="0" y1="78" x2="100" y2="78" stroke="#c4b5fd" strokeWidth="0.25" className="drape-line" style={{ animationDelay: '2.4s' }} />
                      </svg>
                      <div className="studio-showcase-scanline pointer-events-none absolute inset-x-0" aria-hidden="true" />
                      <div className="studio-fitting-split pointer-events-none absolute inset-0" aria-hidden="true">
                        <motion.span
                          className="absolute inset-y-0 w-px bg-cyan-100 shadow-[0_0_16px_rgba(34,211,238,0.9)]"
                          initial={{ left: '50%' }}
                          animate={{ left: shouldReduceMotion ? '50%' : ['42%', '58%', '42%'] }}
                          transition={shouldReduceMotion ? { duration: 0 } : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-slate-950/60 px-2.5 py-1 font-body text-[8px] tracking-[0.12em] text-white/85 backdrop-blur-xl">BEFORE / AFTER</span>
                      </div>
                      <span className="studio-showcase-badge absolute right-3 top-3 rounded-full px-3 py-1.5 font-body text-[10px] text-cyan-100 sm:right-4 sm:top-4">
                        AI FIT PREVIEW
                      </span>
                      <div className="studio-showcase-metrics absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 rounded-xl px-3 py-2 sm:bottom-4 sm:left-4 sm:right-4">
                        <span className="flex items-center gap-1.5 font-body text-[9px] text-white/90"><Sparkles size={12} className="text-cyan-300" />98.2% Fit Confidence</span>
                        <span className="hidden items-center gap-1.5 font-body text-[9px] text-cyan-100 sm:flex">⚡ &lt;450ms</span>
                        <span className="flex items-center gap-1.5 font-body text-[9px] text-white/90"><Ruler size={12} className="text-violet-300" />Size M</span>
                      </div>
                    </>
                  )}
                  <div className="showcase-depth" aria-hidden="true" />
                </div>
                <figcaption className="mt-4 font-body text-[13.5px] tracking-wide text-slate-300">
                  {p.label}
                </figcaption>
              </figure>

              {i < panels.length - 1 && (
                <div className="hidden sm:flex items-center justify-center px-1">
                  <ArrowRight size={18} className="text-cyan-300" strokeWidth={1.5} />
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="mt-10 font-body text-[14px] text-slate-400">
          From product image to personalized try-on.
        </p>
      </div>
    </section>
  );
}
