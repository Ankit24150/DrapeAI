import { useEffect, useRef, useState } from 'react';
import { domAnimation, LazyMotion, m, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Scan, Shirt, Sparkles } from 'lucide-react';

export default function Hero() {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springConfig = { stiffness: 160, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-8, 8]), springConfig);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const seq = () =>
    `transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
      mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`;
  const seqStyle = (delayMs: number) => ({ transitionDelay: `${delayMs}ms` });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section className="landing-hero studio-hero relative overflow-hidden pt-[150px] pb-24 md:pt-[190px] md:pb-32">
      <div className="hero-aura hero-aura-one" aria-hidden="true" />
      <div className="hero-aura hero-aura-two" aria-hidden="true" />
      <div className="hero-contour" aria-hidden="true" />
      <div className="mx-auto max-w-content px-6 md:px-10 grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-10 items-center">
        <div className="max-w-[560px]">
          <p className={`${seq()} mb-6 font-body text-[13px] tracking-[0.14em] text-cyan-300`} style={seqStyle(0)}>
            AI-POWERED VIRTUAL TRY-ON
          </p>

          <h1 className={`${seq()} studio-hero-title font-display font-semibold text-[52px] leading-[1.03] tracking-tightest sm:text-[64px] md:text-[74px]`} style={seqStyle(60)}>
            Try before
            <br />
            <span className="studio-gradient-text">you buy.</span>
          </h1>

          <p className={`${seq()} mt-7 max-w-[480px] font-display text-[20px] leading-snug text-slate-200 md:text-[22px]`} style={seqStyle(140)}>
            Experience fashion on your body before it reaches your cart.
          </p>

          <p className={`${seq()} mt-5 max-w-[460px] font-body text-[15.5px] leading-relaxed text-slate-400`} style={seqStyle(220)}>
            DrapeAI uses AI to realistically map garments onto your own photo, helping
            you visualize fit, style, and drape before purchasing.
          </p>

          <div className={`${seq()} mt-10 flex flex-wrap items-center gap-5`} style={seqStyle(300)}>
            <a
              href="#how-it-works"
              className="studio-cta inline-flex items-center justify-center rounded-full border border-cyan-200/30 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 px-7 py-4 font-body text-[15px] font-semibold text-slate-950 transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(99,102,241,0.5)]"
            >
              Try DrapeAI
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 border-b border-slate-500 pb-0.5 font-body text-[15px] text-slate-200 transition-colors duration-300 hover:border-cyan-300 hover:text-cyan-200"
            >
              See how it works
            </a>
          </div>
        </div>

        <div
          ref={frameRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`${seq()} relative mx-auto w-full max-w-[430px] lg:max-w-none`}
          style={{ ...seqStyle(160), perspective: 1000 }}
        >
          <LazyMotion features={domAnimation}>
            <m.div
              className="hero-product-frame studio-model-card relative overflow-hidden rounded-[28px] border border-white/15"
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            >
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop"
              alt="Model previewing a tailored coat through DrapeAI's virtual try-on"
              className="h-[520px] w-full object-cover md:h-[600px]"
            />

            <div className="hero-image-sheen pointer-events-none absolute inset-0" />
            <div className="studio-scanline pointer-events-none absolute inset-x-0" aria-hidden="true" />

            <div className="pointer-events-none absolute inset-0">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full opacity-70">
                <rect x="30" y="10" width="40" height="78" rx="3" fill="none" stroke="#67e8f9" strokeWidth="0.3" strokeDasharray="1.4 1.6" />
                <path d="M50 24 42 39 40 56 50 70 60 56 58 39Z" fill="none" stroke="#a5b4fc" strokeWidth="0.24" />
                <path d="m42 39-9 10m25-10 9 10m-27 7 10 2 10-2" fill="none" stroke="#a5b4fc" strokeWidth="0.24" />
                {[
                  [50, 24], [42, 39], [58, 39], [33, 49], [67, 49], [40, 56], [60, 56], [50, 70],
                ].map(([x, y]) => (
                  <circle key={`${x}-${y}`} cx={x} cy={y} r="0.8" fill="#67e8f9" className="studio-joint" />
                ))}
              </svg>
            </div>

            <div className="studio-hud-chip absolute left-5 top-5 flex items-center gap-2 rounded-xl px-3.5 py-2.5">
              <Scan size={15} className="text-cyan-300" strokeWidth={1.75} />
              <span className="font-body text-[11px] text-white/90">Pose detected</span>
            </div>

            <div className="studio-hud-chip absolute right-5 top-5 flex items-center gap-2 rounded-xl px-3.5 py-2.5">
              <Shirt size={15} className="text-violet-300" strokeWidth={1.75} />
              <span className="font-body text-[11px] text-white/90">Garment mapped</span>
            </div>

            <div className="studio-accuracy absolute right-5 top-[78px] grid h-[88px] w-[88px] place-items-center rounded-full">
              <span className="text-center font-body text-[10px] leading-tight text-white/70">
                <strong className="block text-[20px] font-semibold text-white">98%</strong>
                Fit accuracy
              </span>
            </div>

            <div className="studio-hud-chip absolute bottom-5 left-5 flex items-center gap-2 rounded-xl px-3.5 py-2.5">
              <Sparkles size={15} className="text-cyan-300" strokeWidth={1.75} />
              <span className="font-body text-[11px] text-white/90">Fit preview ready</span>
            </div>

            <div className="studio-latency absolute bottom-5 right-5 rounded-full px-3.5 py-2 font-body text-[10px] font-medium text-cyan-100">
              ⚡ &lt;500ms Real-time
            </div>
            </m.div>
          </LazyMotion>

          <div className="studio-trust absolute -bottom-6 left-6 flex items-center gap-3 rounded-2xl px-5 py-3.5 text-white">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
            </span>
            <span className="font-body text-[12.5px] tracking-wide">Real-time AI garment mapping</span>
          </div>
        </div>
      </div>
    </section>
  );
}
