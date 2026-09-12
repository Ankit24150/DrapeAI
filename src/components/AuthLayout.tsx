import type { ReactNode } from 'react';
import { ArrowLeft, Camera, ScanFace, Shirt, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

type AuthLayoutProps = { children: ReactNode; eyebrow: string; title: ReactNode; description: string };

export default function AuthLayout({ children, eyebrow, title, description }: AuthLayoutProps) {
  return (
    <main className="auth-page min-h-screen bg-canvas px-4 py-4 sm:px-6 lg:p-8">
      <div className="auth-shell mx-auto grid min-h-[calc(100vh-4rem)] max-w-[1320px] overflow-hidden rounded-[24px] border border-stone/80 bg-canvas shadow-[0_30px_80px_-45px_rgba(23,20,15,0.5)] lg:min-h-[calc(100vh-6rem)] lg:grid-cols-[0.95fr_1.05fr]">
        <section className="auth-visual relative hidden overflow-hidden bg-[#26352f] p-10 text-canvas lg:flex lg:flex-col lg:justify-between xl:p-14">
          <div className="auth-grid absolute inset-0 opacity-30" />
          <div className="relative z-10 flex items-center justify-between"><Link to="/" className="font-display text-[23px] font-semibold tracking-tightest">DrapeAI</Link><span className="rounded-full border border-canvas/25 px-3 py-1 font-body text-[10px] uppercase tracking-[0.18em] text-canvas/70">Studio access</span></div>
          <div className="relative z-10 mx-auto w-full max-w-[520px] py-8">
            <div className="mb-8 flex items-center gap-3 font-body text-[11px] uppercase tracking-[0.2em] text-[#d9c29a]"><span className="h-px w-8 bg-[#d9c29a]" /> Live fitting intelligence</div>
            <div className="auth-orbit auth-orbit-one" /><div className="auth-orbit auth-orbit-two" />
            <div className="auth-garment-scene" aria-hidden="true"><div className="auth-glow" /><div className="auth-garment-shadow" /><div className="auth-garment auth-garment-back" /><div className="auth-garment auth-garment-front"><span className="auth-garment-seam" /><span className="auth-garment-label">DA / 01</span></div><span className="auth-scanner-line" /><span className="auth-point auth-point-one" /><span className="auth-point auth-point-two" /><span className="auth-point auth-point-three" /><span className="auth-telemetry auth-telemetry-one">POSE <b>98.4%</b></span><span className="auth-telemetry auth-telemetry-two">RENDER <b>0.8s</b></span></div>
            <div className="mt-8 grid grid-cols-3 gap-3 font-body text-[11px] text-canvas/65"><div className="border-l border-canvas/20 pl-3"><Camera size={15} className="mb-2 text-[#d9c29a]" /><span>Photo ready</span></div><div className="border-l border-canvas/20 pl-3"><ScanFace size={15} className="mb-2 text-[#d9c29a]" /><span>Pose mapped</span></div><div className="border-l border-canvas/20 pl-3"><Shirt size={15} className="mb-2 text-[#d9c29a]" /><span>Fit rendered</span></div></div>
          </div>
          <div className="relative z-10 flex items-end justify-between gap-8"><div><p className="font-display max-w-[390px] text-[29px] leading-[1.05] tracking-tightest xl:text-[35px]">See the drape before the delivery.</p><p className="mt-4 max-w-[330px] font-body text-[13px] leading-relaxed text-canvas/65">Your own image, your next outfit, rendered in real time.</p></div><Sparkles size={25} strokeWidth={1.25} className="mb-1 shrink-0 text-[#d9c29a]" /></div>
        </section>
        <section className="auth-form-panel flex flex-col justify-center px-5 py-8 sm:px-12 sm:py-10 lg:px-14 lg:py-7 xl:px-20"><div className="mx-auto w-full max-w-[440px]"><Link to="/" className="mb-8 inline-flex items-center gap-2 font-body text-[13px] text-charcoal transition-colors hover:text-ink lg:hidden"><ArrowLeft size={15} /> Back to DrapeAI</Link><div className="mb-6 lg:mb-7"><p className="font-body text-[11px] font-medium uppercase tracking-[0.2em] text-brass">{eyebrow}</p><h1 className="mt-2 font-display text-[35px] leading-[1.02] tracking-tightest text-ink sm:text-[42px]">{title}</h1><p className="mt-3 max-w-[350px] font-body text-[13.5px] leading-relaxed text-charcoal">{description}</p></div>{children}<p className="mt-5 text-center font-body text-[12.5px] text-charcoal/80"><Link to="/" className="text-ink transition-colors hover:text-brass">DrapeAI</Link> keeps your fitting private and your choices personal.</p></div></section>
      </div>
    </main>
  );
}