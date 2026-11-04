import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const links = [
  { label: 'Home', href: '#top' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'About', href: '#about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header id="top" className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className={`studio-navbar mx-auto flex h-[68px] max-w-6xl items-center justify-between rounded-full border px-5 transition-all duration-500 md:px-8 ${scrolled ? 'is-scrolled' : ''}`}>
        <a href="#top" className="flex items-center gap-2.5 font-display text-[21px] font-semibold tracking-tightest text-white">
          <span className="studio-brand-mark grid h-8 w-8 place-items-center rounded-xl text-[12px]">D</span>
          DrapeAI
        </a>

        <ul className="hidden items-center gap-8 font-body text-[13px] text-slate-300 lg:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="relative py-2 transition-colors hover:text-cyan-200 after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-cyan-300 after:transition-all after:duration-300 hover:after:w-full"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-5 lg:flex">
          <span className="flex items-center gap-2 font-body text-[9px] uppercase tracking-[0.12em] text-slate-400">
            <i className="studio-engine-beacon h-1.5 w-1.5 rounded-full bg-emerald-300" /> VTON Engine v2.4 Live
          </span>
          <Link to="/login" className="font-body text-[13px] text-slate-300 transition-colors hover:text-white">
            Login
          </Link>
          <Link
            to="/signup"
            className="studio-navbar-cta rounded-full px-5 py-2.5 font-body text-[12px] tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5"
          >
            Get Started
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-full p-2 text-slate-200 transition-colors hover:bg-white/10 lg:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="studio-mobile-menu mx-auto mt-3 max-w-6xl rounded-3xl border px-6 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col gap-4 pt-4 font-body text-[14px] text-slate-300">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} onClick={() => setOpen(false)} className="block py-1 transition-colors hover:text-cyan-200">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 mt-6">
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="rounded-full border border-white/15 px-5 py-3 text-center font-body text-[14px] text-white"
            >
              Login
            </Link>
            <Link
              to="/signup"
              onClick={() => setOpen(false)}
              className="studio-navbar-cta rounded-full px-5 py-3 text-center font-body text-[14px] text-white"
            >
              Get Started
            </Link>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </header>
  );
}
