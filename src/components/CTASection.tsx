import { useReveal } from '../hooks/useReveal';

export default function CTASection() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="py-28 md:py-36 bg-ink text-canvas">
      <div ref={ref} className="reveal mx-auto max-w-content px-6 md:px-10 text-center">
        <h2 className="font-display font-semibold text-[38px] md:text-[54px] leading-[1.06] tracking-tightest max-w-[820px] mx-auto">
          Your next outfit is waiting to be seen on you.
        </h2>
        <p className="mt-6 font-body text-[16px] text-canvas/70 max-w-[420px] mx-auto">
          Experience a smarter way to shop fashion.
        </p>
        <a
          href="#top"
          className="mt-10 inline-flex items-center justify-center bg-canvas text-ink font-body text-[15px] px-8 py-4 rounded-full hover:bg-brassLight hover:text-ink transition-colors duration-300"
        >
          Try DrapeAI
        </a>
      </div>
    </section>
  );
}
