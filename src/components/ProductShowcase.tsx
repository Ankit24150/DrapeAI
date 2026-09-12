import { ArrowRight } from 'lucide-react';
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

  return (
    <section className="py-24 md:py-32 border-t border-stone/70 bg-canvasDim/50">
      <div className="mx-auto max-w-content px-6 md:px-10">
        <div ref={headingRef} className="reveal max-w-[560px]">
          <h2 className="font-display font-semibold text-[36px] md:text-[46px] leading-[1.06] tracking-tightest text-ink">
            One photo. Every outfit.
          </h2>
        </div>

        <div
          ref={rowRef}
          className="reveal mt-14 md:mt-16 grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-6 sm:gap-4"
        >
          {panels.map((p, i) => (
            <div key={p.label} className="flex sm:contents">
              <figure className="w-full">
                <div className="showcase-panel relative rounded-2xl overflow-hidden border border-stone/70">
                  <img src={p.img} alt={p.alt} className="w-full h-[340px] md:h-[420px] object-cover" />
                  {p.processing && (
                    <svg
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      className="absolute inset-0 w-full h-full opacity-80 pointer-events-none"
                    >
                      <line x1="0" y1="30" x2="100" y2="30" stroke="#F6F3EE" strokeWidth="0.25" className="drape-line" />
                      <line x1="0" y1="55" x2="100" y2="55" stroke="#F6F3EE" strokeWidth="0.25" className="drape-line" style={{ animationDelay: '1.2s' }} />
                      <line x1="0" y1="78" x2="100" y2="78" stroke="#F6F3EE" strokeWidth="0.25" className="drape-line" style={{ animationDelay: '2.4s' }} />
                    </svg>
                  )}
                  <div className="showcase-depth" aria-hidden="true" />
                </div>
                <figcaption className="mt-4 font-body text-[13.5px] tracking-wide text-charcoal">
                  {p.label}
                </figcaption>
              </figure>

              {i < panels.length - 1 && (
                <div className="hidden sm:flex items-center justify-center px-1">
                  <ArrowRight size={18} className="text-stoneDark" strokeWidth={1.5} />
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="mt-10 font-body text-[14px] text-charcoal/80">
          From product image to personalized try-on.
        </p>
      </div>
    </section>
  );
}
