import { useReveal } from '../hooks/useReveal';
import { motion, useReducedMotion } from 'framer-motion';

export default function CTASection() {
  const ref = useReveal<HTMLDivElement>();
  const shouldReduceMotion = useReducedMotion();
  const particles = [
    { left: '12%', top: '25%', delay: 0 },
    { left: '82%', top: '18%', delay: 0.8 },
    { left: '22%', top: '76%', delay: 1.4 },
    { left: '76%', top: '72%', delay: 0.4 },
    { left: '53%', top: '14%', delay: 1.1 },
  ];

  return (
    <section className="studio-cta-section relative overflow-hidden border-t border-white/10 py-24 text-white md:py-32">
      <div className="studio-cta-orbit studio-cta-orbit-one" aria-hidden="true" />
      <div className="studio-cta-orbit studio-cta-orbit-two" aria-hidden="true" />
      {particles.map((particle, index) => (
        <motion.span
          key={index}
          className="studio-cta-particle absolute h-1 w-1 rounded-full"
          style={{ left: particle.left, top: particle.top }}
          animate={shouldReduceMotion ? undefined : { opacity: [0.25, 0.9, 0.25], scale: [0.8, 1.5, 0.8], y: [0, -12, 0] }}
          transition={{ duration: 4 + particle.delay, delay: particle.delay, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
      ))}
      <div ref={ref} className="studio-cta-card reveal relative mx-auto max-w-content overflow-hidden rounded-[28px] border px-6 py-16 text-center md:px-10 md:py-24">
        <h2 className="font-display font-semibold text-[38px] md:text-[54px] leading-[1.06] tracking-tightest max-w-[820px] mx-auto">
          Your next outfit is waiting <span className="studio-gradient-text">to be seen on you.</span>
        </h2>
        <p className="mt-6 mx-auto max-w-[420px] font-body text-[16px] text-slate-400">
          Experience a smarter way to shop fashion.
        </p>
        <a
          href="#top"
          className="studio-cta mt-10 inline-flex items-center justify-center rounded-full border border-cyan-200/20 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 px-8 py-4 font-body text-[15px] font-medium text-slate-950 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]"
        >
          Try DrapeAI
        </a>
      </div>
    </section>
  );
}
