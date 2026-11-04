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
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty('--spotlight-x', `${event.clientX - bounds.left}px`);
        event.currentTarget.style.setProperty('--spotlight-y', `${event.clientY - bounds.top}px`);
      }}
      className={`reveal studio-bento-card studio-step-card group relative overflow-hidden rounded-2xl border p-6 sm:p-7 ${index === 0 ? 'lg:col-span-2' : ''}`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className="relative z-10 flex items-center justify-between">
        <span className="studio-step-icon grid h-11 w-11 place-items-center rounded-xl font-display text-[14px] text-cyan-100">{n}</span>
        <span className="font-body text-[9px] uppercase tracking-[0.16em] text-slate-500">Process / {n}</span>
      </div>
      <h3 className="relative z-10 mt-7 font-display text-[22px] text-white">{title}</h3>
      <p className="relative z-10 mt-3 max-w-[300px] font-body text-[14px] leading-relaxed text-slate-400">{copy}</p>
    </div>
  );
}

export default function HowItWorks() {
  const headingRef = useReveal<HTMLDivElement>();

  return (
    <section id="how-it-works" className="studio-bento-section relative overflow-hidden border-t border-white/10 py-24 md:py-32">
      <div className="studio-bento-glow" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-content px-6 md:px-10">
        <div ref={headingRef} className="reveal max-w-[560px]">
          <p className="mb-4 font-body text-[10px] uppercase tracking-[0.2em] text-cyan-300">A seamless fitting flow</p>
          <h2 className="font-display text-[36px] font-semibold leading-[1.06] tracking-tightest text-white md:text-[46px]">
            How DrapeAI <span className="studio-gradient-text">works.</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Step key={s.n} n={s.n} title={s.title} copy={s.copy} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
