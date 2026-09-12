import { useEffect, useRef, useState } from 'react';
import { Scan, Shirt, Sparkles } from 'lucide-react';

export default function Hero() {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

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
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: px * 8, y: py * 8 });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <section className="landing-hero relative overflow-hidden pt-[150px] pb-24 md:pt-[190px] md:pb-32">
      <div className="hero-aura hero-aura-one" aria-hidden="true" />
      <div className="hero-aura hero-aura-two" aria-hidden="true" />
      <div className="hero-contour" aria-hidden="true" />
      <div className="mx-auto max-w-content px-6 md:px-10 grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-10 items-center">
        {/* Left: copy */}
        <div className="max-w-[560px]">
          <p className={`${seq()} font-body text-[13px] tracking-[0.14em] text-brass mb-6`} style={seqStyle(0)}>
            AI-Powered Virtual Try-On
          </p>

          <h1 className={`${seq()} font-display font-semibold text-[52px] leading-[1.03] tracking-tightest sm:text-[64px] md:text-[74px] text-ink`} style={seqStyle(60)}>
            Try before
            <br />
            you buy.
          </h1>

          <p className={`${seq()} mt-7 font-display text-[20px] md:text-[22px] leading-snug text-charcoal max-w-[480px]`} style={seqStyle(140)}>
            Experience fashion on your body before it reaches your cart.
          </p>

          <p className={`${seq()} mt-5 font-body text-[15.5px] leading-relaxed text-charcoal/90 max-w-[460px]`} style={seqStyle(220)}>
            DrapeAI uses AI to realistically map garments onto your own photo, helping
            you visualize fit, style, and drape before purchasing.
          </p>

          <div className={`${seq()} mt-10 flex flex-wrap items-center gap-5`} style={seqStyle(300)}>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center bg-ink text-canvas font-body text-[15px] px-7 py-4 rounded-full hover:bg-brass transition-colors duration-300"
            >
              Try DrapeAI
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 font-body text-[15px] text-ink border-b border-ink/40 pb-0.5 hover:border-brass hover:text-brass transition-colors duration-300"
            >
              See how it works
            </a>
          </div>
        </div>

        {/* Right: product visual */}
        <div
          ref={frameRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`${seq()} relative mx-auto w-full max-w-[430px] lg:max-w-none`}
          style={seqStyle(160)}
        >
          <div
            className="hero-product-frame float-slow relative rounded-[28px] overflow-hidden border border-stone/70 shadow-[0_30px_60px_-25px_rgba(23,20,15,0.35)] transition-transform duration-300 ease-out"
            style={{ transform: `rotate3d(${-tilt.y}, ${tilt.x}, 0, 3deg)` }}
          >
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop"
              alt="Model previewing a tailored coat through DrapeAI's virtual try-on"
              className="w-full h-[520px] md:h-[600px] object-cover"
            />

            <div className="hero-image-sheen pointer-events-none absolute inset-0" />

            {/* AI overlay: pose detection frame */}
            <div className="pointer-events-none absolute inset-0">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full opacity-70">
                <rect x="30" y="10" width="40" height="78" rx="3" fill="none" stroke="#F6F3EE" strokeWidth="0.3" strokeDasharray="1.4 1.6" />
              </svg>
            </div>

            {/* Overlay: pose detected */}
            <div className="absolute top-6 left-6 bg-canvas/90 backdrop-blur-sm rounded-xl px-3.5 py-2.5 flex items-center gap-2 shadow-sm">
              <Scan size={15} className="text-brass" strokeWidth={1.75} />
              <span className="font-body text-[11.5px] text-ink/80">Pose detected</span>
            </div>

            {/* Overlay: garment mapped */}
            <div className="absolute top-6 right-6 bg-canvas/90 backdrop-blur-sm rounded-xl px-3.5 py-2.5 flex items-center gap-2 shadow-sm">
              <Shirt size={15} className="text-brass" strokeWidth={1.75} />
              <span className="font-body text-[11.5px] text-ink/80">Garment mapped</span>
            </div>

            {/* Overlay: fit preview / AI processing */}
            <div className="absolute bottom-6 right-6 bg-canvas/90 backdrop-blur-sm rounded-xl px-3.5 py-2.5 flex items-center gap-2 shadow-sm">
              <Sparkles size={15} className="text-brass" strokeWidth={1.75} />
              <span className="font-body text-[11.5px] text-ink/80">Fit preview ready</span>
            </div>
          </div>

          {/* Trust indicator */}
          <div className="absolute -bottom-6 left-6 bg-ink text-canvas rounded-2xl px-5 py-3.5 shadow-[0_18px_40px_-15px_rgba(23,20,15,0.5)] flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brassLight opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brassLight" />
            </span>
            <span className="font-body text-[12.5px] tracking-wide">Real-time AI garment mapping</span>
          </div>
        </div>
      </div>
    </section>
  );
}
