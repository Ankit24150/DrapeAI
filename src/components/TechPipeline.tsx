import { motion, useReducedMotion } from 'framer-motion';
import { Activity, ScanLine, Waves } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const stages = [
  {
    number: '01',
    label: '2D / 3D Body Pose Estimation',
    note: 'Map body landmarks and proportions from a single photo to build a pose-aware fitting frame.',
    detail: 'POSE TENSOR',
    value: '17 × 3',
    icon: Activity,
    tone: 'cyan',
  },
  {
    number: '02',
    label: 'High-Precision Garment Segmentation',
    note: 'Separate the garment from its source image while preserving its silhouette and fine details.',
    detail: 'MASK RESOLUTION',
    value: '1024²',
    icon: ScanLine,
    tone: 'indigo',
  },
  {
    number: '03',
    label: 'Cloth-to-Body Neural Warping',
    note: 'Warp the garment to the estimated pose and blend texture for a natural-looking fit preview.',
    detail: 'FEATURE SPACE',
    value: '768D',
    icon: Waves,
    tone: 'violet',
  },
];

export default function TechPipeline() {
  const headingRef = useReveal<HTMLDivElement>();
  const pipeRef = useReveal<HTMLDivElement>();
  const shouldReduceMotion = useReducedMotion();
  const pulseTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 3.2, ease: 'linear' as const, repeat: Infinity };

  return (
    <section id="about" className="studio-pipeline relative overflow-hidden border-t border-white/10 py-24 md:py-32">
      <div className="studio-pipeline-glow" aria-hidden="true" />
      <div className="mx-auto max-w-content px-6 md:px-10">
        <div ref={headingRef} className="reveal relative z-10 grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <p className="mb-4 font-body text-[11px] tracking-[0.2em] text-cyan-300">NEURAL FITTING PIPELINE</p>
            <h2 className="font-display text-[36px] font-semibold leading-[1.06] tracking-tightest text-white md:text-[46px]">
              Behind the <span className="studio-gradient-text">drape.</span>
            </h2>
          </div>
          <p className="max-w-[440px] font-body text-[15.5px] leading-relaxed text-slate-400 lg:pt-8">
            Three computer-vision stages connect your photo to a personalized garment preview.
            Pose, fabric, and texture are brought together in one fitting flow.
          </p>
        </div>

        <div ref={pipeRef} className="reveal relative z-10 mt-12 md:mt-16">
          <svg
            viewBox="0 0 1000 12"
            preserveAspectRatio="none"
            className="studio-pipeline-beam studio-pipeline-beam-horizontal pointer-events-none absolute left-[16.66%] top-[27px] hidden h-3 w-[66.68%] overflow-visible md:block"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="pipeline-beam-gradient">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.05" />
                <stop offset="50%" stopColor="#818cf8" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#c084fc" stopOpacity="0.05" />
              </linearGradient>
              <filter id="pipeline-beam-glow" x="-50%" y="-300%" width="200%" height="700%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <path d="M0 6H1000" stroke="url(#pipeline-beam-gradient)" strokeWidth="2" />
            <motion.circle
              r="4"
              cy="6"
              fill="#a5f3fc"
              filter="url(#pipeline-beam-glow)"
              initial={{ cx: '0%' }}
              animate={{ cx: shouldReduceMotion ? '0%' : '100%' }}
              transition={pulseTransition}
            />
          </svg>

          <svg
            viewBox="0 0 12 1000"
            preserveAspectRatio="none"
            className="studio-pipeline-beam studio-pipeline-beam-vertical pointer-events-none absolute bottom-0 left-[11px] top-0 h-full w-3 overflow-visible md:hidden"
            aria-hidden="true"
          >
            <path d="M6 0V1000" stroke="rgba(129,140,248,0.3)" strokeWidth="2" />
            <motion.circle
              r="4"
              cx="6"
              fill="#a5f3fc"
              initial={{ cy: '0%' }}
              animate={{ cy: shouldReduceMotion ? '0%' : '100%' }}
              transition={pulseTransition}
            />
          </svg>

          <div className="grid gap-8 md:grid-cols-3 md:gap-6">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <article
                  key={stage.number}
                  className={`studio-pipeline-card studio-pipeline-${stage.tone} relative ml-8 rounded-2xl border p-5 transition duration-300 hover:-translate-y-2 hover:rotate-1 hover:border-cyan-500/40 md:ml-0 md:p-6`}
                >
                  <span className="studio-pipeline-node absolute -left-[23px] top-7 grid h-4 w-4 place-items-center rounded-full md:left-1/2 md:right-auto md:top-[25px] md:-translate-x-1/2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-200" />
                  </span>
                  <div className="flex items-start justify-between gap-4">
                    <span className="studio-pipeline-icon grid h-11 w-11 place-items-center rounded-xl">
                      <Icon size={20} strokeWidth={1.7} />
                    </span>
                    <span className="font-body text-[11px] tracking-[0.16em] text-slate-500">STEP {stage.number}</span>
                  </div>

                  <h3 className="mt-7 min-h-[3.5rem] font-display text-[19px] font-medium leading-snug text-white">
                    {stage.label}
                  </h3>
                  <p className="mt-3 min-h-[4.5rem] font-body text-[13px] leading-relaxed text-slate-400">
                    {stage.note}
                  </p>

                  <div className="mt-6 flex items-end justify-between gap-3 border-t border-white/10 pt-4">
                    <div>
                      <span className="block font-body text-[9px] tracking-[0.16em] text-slate-500">{stage.detail}</span>
                      <span className="mt-1 block font-mono text-[13px] text-cyan-100">{stage.value}</span>
                    </div>
                    <span className="studio-pipeline-live rounded-full px-2.5 py-1 font-body text-[9px] tracking-[0.12em] text-emerald-200">
                      LATENCY · LIVE
                    </span>
                  </div>

                  {index < stages.length - 1 && (
                    <span className="studio-pipeline-mobile-arrow absolute -bottom-[22px] left-1/2 z-10 h-3 w-3 rotate-45 border-b border-r border-indigo-300/70 md:hidden" aria-hidden="true" />
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
