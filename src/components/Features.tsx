import { Layers, Palette, PersonStanding, Shirt, ShoppingBag, Zap } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const features = [
  {
    icon: Zap,
    title: 'Real-Time Virtual Try-On',
    copy: 'Preview garments on your own body with fast AI-powered rendering.',
  },
  {
    icon: PersonStanding,
    title: 'Multi-Pose Support',
    copy: 'Experience garments across different poses and positions.',
  },
  {
    icon: Layers,
    title: 'Realistic Garment Mapping',
    copy: 'AI-powered cloth-to-body warping creates a more natural fit preview.',
  },
  {
    icon: Shirt,
    title: 'Outfit Customization',
    copy: 'Mix and match tops, bottoms, and outerwear.',
  },
  {
    icon: Palette,
    title: 'Color & Pattern Switching',
    copy: 'Instantly explore different colors and patterns.',
  },
  {
    icon: ShoppingBag,
    title: 'Built for Modern Commerce',
    copy: 'Designed to integrate seamlessly with online fashion stores.',
  },
];

function FeatureCell({
  icon: Icon,
  title,
  copy,
  index,
}: {
  icon: typeof Zap;
  title: string;
  copy: string;
  index: number;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty('--spotlight-x', `${event.clientX - bounds.left}px`);
        event.currentTarget.style.setProperty('--spotlight-y', `${event.clientY - bounds.top}px`);
      }}
      className={`reveal studio-bento-card group relative overflow-hidden rounded-2xl border p-6 sm:p-8 transition duration-300 hover:-translate-y-1 ${index === 0 ? 'lg:col-span-2 lg:row-span-2 lg:min-h-[360px]' : ''}`}
      style={{ transitionDelay: `${(index % 3) * 90}ms` }}
    >
      <span className="studio-bento-icon relative z-10 grid h-12 w-12 place-items-center rounded-2xl">
        <Icon size={22} strokeWidth={1.5} className="text-cyan-200 transition-colors duration-300 group-hover:text-white" />
      </span>
      <span className="relative z-10 mt-8 block font-body text-[9px] tracking-[0.18em] text-slate-500">CAPABILITY · 0{index + 1}</span>
      <h3 className="relative z-10 mt-2 font-display text-[19px] text-white">{title}</h3>
      <p className="relative z-10 mt-2.5 max-w-[280px] font-body text-[14px] leading-relaxed text-slate-400">{copy}</p>
    </div>
  );
}

export default function Features() {
  const headingRef = useReveal<HTMLDivElement>();

  return (
    <section id="features" className="studio-bento-section relative overflow-hidden border-t border-white/10 py-24 md:py-32">
      <div className="studio-bento-glow" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-content px-6 md:px-10">
        <div ref={headingRef} className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6 max-w-[760px] md:max-w-none">
          <h2 className="font-display font-semibold text-[36px] leading-[1.06] tracking-tightest text-white md:text-[46px]">
            Fashion, <span className="studio-gradient-text">reimagined.</span>
          </h2>
          <p className="max-w-[340px] font-body text-[15px] text-slate-400">
            Every tool DrapeAI needs to make a garment feel like it was already yours.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:auto-rows-fr">
          {features.map((f, i) => (
            <FeatureCell key={f.title} icon={f.icon} title={f.title} copy={f.copy} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
