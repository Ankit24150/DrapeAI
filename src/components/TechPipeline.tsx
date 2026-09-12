import { useReveal } from '../hooks/useReveal';

const stages = [
  { label: 'Your Photo', note: 'A single image is all DrapeAI needs to begin.' },
  { label: 'Pose Detection', note: 'AI identifies body position and proportions.' },
  { label: 'Garment Segmentation', note: 'The chosen piece is isolated from its product photo.' },
  { label: 'Cloth-to-Body Warping', note: 'Fabric is reshaped to follow your posture and form.' },
  { label: 'Realistic Try-On', note: 'A natural, personalized preview is ready to view.' },
];

export default function TechPipeline() {
  const headingRef = useReveal<HTMLDivElement>();
  const pipeRef = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="py-24 md:py-32 border-t border-stone/70">
      <div className="mx-auto max-w-content px-6 md:px-10">
        <div ref={headingRef} className="reveal grid lg:grid-cols-[1fr_1fr] gap-6 lg:gap-16">
          <h2 className="font-display font-semibold text-[36px] md:text-[46px] leading-[1.06] tracking-tightest text-ink">
            Behind the drape.
          </h2>
          <p className="font-body text-[15.5px] leading-relaxed text-charcoal max-w-[440px]">
            Every try-on runs through five quiet steps of computer vision. You only ever
            see the last one — a garment that looks like it was made to fit you.
          </p>
        </div>

        <div ref={pipeRef} className="reveal mt-16 md:mt-20">
          {/* Desktop: horizontal pipeline with connecting line */}
          <div className="hidden md:block relative">
            <svg
              viewBox="0 0 1000 4"
              preserveAspectRatio="none"
              className="absolute top-[9px] left-0 w-full h-[4px]"
            >
              <line x1="0" y1="2" x2="1000" y2="2" stroke="#DCD5C6" strokeWidth="2" />
              <line x1="0" y1="2" x2="1000" y2="2" stroke="#8A6A3B" strokeWidth="2" className="drape-line" style={{ strokeDasharray: '40 960' }} />
            </svg>
            <div className="relative grid grid-cols-5 gap-6">
              {stages.map((s) => (
                <div key={s.label} className="pt-8">
                  <div className="w-[9px] h-[9px] rounded-full bg-ink absolute -top-[1px]" style={{ left: 0 }} />
                  <h3 className="font-display text-[17px] text-ink leading-snug">{s.label}</h3>
                  <p className="font-body text-[13.5px] leading-relaxed text-charcoal mt-2.5 max-w-[190px]">
                    {s.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: vertical pipeline */}
          <div className="md:hidden relative pl-8">
            <div className="absolute left-[3.5px] top-2 bottom-2 w-px bg-stone" />
            <div className="flex flex-col gap-10">
              {stages.map((s) => (
                <div key={s.label} className="relative">
                  <div className="w-2 h-2 rounded-full bg-ink absolute -left-[30px] top-1.5" />
                  <h3 className="font-display text-[18px] text-ink">{s.label}</h3>
                  <p className="font-body text-[14px] leading-relaxed text-charcoal mt-2">{s.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
