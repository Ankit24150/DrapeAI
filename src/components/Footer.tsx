import { Instagram, Linkedin, Twitter } from 'lucide-react';

const columns = [
  { title: 'Product', links: ['Overview', 'Pricing', 'Integrations'] },
  { title: 'Company', links: ['How It Works', 'Features', 'About'] },
  { title: 'Legal', links: ['Privacy', 'Terms'] },
];

export default function Footer() {
  return (
    <footer className="studio-footer relative overflow-hidden border-t border-white/10 pt-16 pb-10">
      <div className="studio-footer-glow" aria-hidden="true" />
      <div className="mx-auto max-w-content px-6 md:px-10">
        <div className="relative z-10 grid grid-cols-2 gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <span className="font-display text-[22px] font-semibold tracking-tightest text-white">DrapeAI</span>
            <p className="mt-4 max-w-[220px] font-body text-[14px] leading-relaxed text-slate-400">
              Your body. Your style. Powered by AI.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a href="#" aria-label="DrapeAI on Instagram" className="text-slate-400 transition-colors hover:text-cyan-200">
                <Instagram size={18} strokeWidth={1.6} />
              </a>
              <a href="#" aria-label="DrapeAI on Twitter" className="text-slate-400 transition-colors hover:text-cyan-200">
                <Twitter size={18} strokeWidth={1.6} />
              </a>
              <a href="#" aria-label="DrapeAI on LinkedIn" className="text-slate-400 transition-colors hover:text-cyan-200">
                <Linkedin size={18} strokeWidth={1.6} />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-body text-[11px] uppercase tracking-[0.16em] text-slate-500">{col.title}</h4>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="font-body text-[13px] text-slate-300 transition-colors hover:text-cyan-200">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="studio-footer-divider relative z-10 mt-12 flex flex-wrap items-center justify-between gap-4 pt-6 font-body text-[11px] text-slate-500">
          <span>© 2026 DrapeAI. All rights reserved.</span>
          <span className="flex items-center gap-2 text-slate-400"><i className="studio-engine-beacon h-1.5 w-1.5 rounded-full bg-emerald-300" /> VTON Engine operational</span>
        </div>
      </div>
    </footer>
  );
}
