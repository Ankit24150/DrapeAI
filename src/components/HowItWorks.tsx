import { useReveal } from '../hooks/useReveal';

const steps = [
  {
    n: '01',
    title: 'Upload',
    copy: 'Upload a clear photo of yourself.',
  },
  {
    n: '02',
    title: 'Choose',
    copy: 'Select the garment you want to try.',
  },
  {
    n: '03',
    title: 'AI Mapping',
    copy: 'Our AI detects your pose and maps the garment naturally onto your body.',
  },
  {
    n: '04',
    title: 'Preview',
    copy: 'See your personalized try-on result before you buy.',
  },
];

function Step({ n, title, copy, index }: { n: string; title: string; copy: string; index: number }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="reveal border-t border-stone/80 pt-7 md:pt-8"
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <span className="font-display text-[15px] text-brass">{n}</span>
      <h3 className="font-display text-[22px] mt-3 text-ink">{title}</h3>
      <p className="font-body text-[15px] leading-relaxed text-charcoal mt-3 max-w-[260px]">{copy}</p>
    </div>
  );
}

export default function HowItWorks() {
  const headingRef = useReveal<HTMLDivElement>();

  return (
    <section id="how-it-works" className="py-24 md:py-32 border-t border-stone/70">
      <div className="mx-auto max-w-content px-6 md:px-10">
        <div ref={headingRef} className="reveal max-w-[560px]">
          <h2 className="font-display font-semibold text-[36px] md:text-[46px] leading-[1.06] tracking-tightest text-ink">
            How DrapeAI works
          </h2>
        </div>

        <div className="mt-14 md:mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {steps.map((s, i) => (
            <Step key={s.n} n={s.n} title={s.title} copy={s.copy} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
