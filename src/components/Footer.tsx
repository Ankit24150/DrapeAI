import { Instagram, Linkedin, Twitter } from 'lucide-react';

const columns = [
  { title: 'Product', links: ['Overview', 'Pricing', 'Integrations'] },
  { title: 'Company', links: ['How It Works', 'Features', 'About'] },
  { title: 'Legal', links: ['Privacy', 'Terms'] },
];

export default function Footer() {
  return (
    <footer className="bg-canvas border-t border-stone/70 pt-16 pb-10">
      <div className="mx-auto max-w-content px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10">
          <div>
            <span className="font-display text-[22px] font-semibold tracking-tightest text-ink">DrapeAI</span>
            <p className="mt-4 font-body text-[14px] leading-relaxed text-charcoal max-w-[220px]">
              Your body. Your style. Powered by AI.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" aria-label="DrapeAI on Instagram" className="text-charcoal hover:text-brass transition-colors">
                <Instagram size={18} strokeWidth={1.6} />
              </a>
              <a href="#" aria-label="DrapeAI on Twitter" className="text-charcoal hover:text-brass transition-colors">
                <Twitter size={18} strokeWidth={1.6} />
              </a>
              <a href="#" aria-label="DrapeAI on LinkedIn" className="text-charcoal hover:text-brass transition-colors">
                <Linkedin size={18} strokeWidth={1.6} />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-body text-[13px] tracking-[0.08em] text-charcoal/70">{col.title}</h4>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="font-body text-[14.5px] text-ink/85 hover:text-brass transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-6 border-t border-stone/70 font-body text-[13px] text-charcoal/70">
          © 2026 DrapeAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
