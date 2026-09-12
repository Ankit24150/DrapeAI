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
      className="reveal group border-t border-stone/80 py-9 px-1 sm:px-8 first:sm:border-l-0 sm:border-l sm:border-stone/80 transition-colors duration-300 hover:bg-canvasDim/60"
      style={{ transitionDelay: `${(index % 3) * 90}ms` }}
    >
      <Icon size={22} strokeWidth={1.5} className="text-charcoal transition-colors duration-300 group-hover:text-brass" />
      <h3 className="font-display text-[19px] mt-5 text-ink">{title}</h3>
      <p className="font-body text-[14.5px] leading-relaxed text-charcoal mt-2.5 max-w-[280px]">{copy}</p>
    </div>
  );
}

export default function Features() {
  const headingRef = useReveal<HTMLDivElement>();

  return (
    <section id="features" className="py-24 md:py-32">
      <div className="mx-auto max-w-content px-6 md:px-10">
        <div ref={headingRef} className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6 max-w-[760px] md:max-w-none">
          <h2 className="font-display font-semibold text-[36px] md:text-[46px] leading-[1.06] tracking-tightest text-ink">
            Fashion, reimagined.
          </h2>
          <p className="font-body text-[15px] text-charcoal max-w-[340px]">
            Every tool DrapeAI needs to make a garment feel like it was already yours.
          </p>
        </div>

        <div className="mt-14 md:mt-16 grid sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <FeatureCell key={f.title} icon={f.icon} title={f.title} copy={f.copy} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
