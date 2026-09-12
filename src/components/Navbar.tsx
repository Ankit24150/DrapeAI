import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

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
    <header
      id="top"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-canvas/80 backdrop-blur-md border-b border-stone/70'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="mx-auto max-w-content px-6 md:px-10 h-[76px] flex items-center justify-between">
        <a href="#top" className="font-display text-[22px] font-semibold tracking-tightest text-ink">
          DrapeAI
        </a>

        <ul className="hidden lg:flex items-center gap-10 font-body text-[14.5px] text-charcoal">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="relative py-2 transition-colors hover:text-ink after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-brass after:transition-all after:duration-300 hover:after:w-full"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-6">
          <Link to="/login" className="font-body text-[14.5px] text-charcoal hover:text-ink transition-colors">
            Login
          </Link>
          <Link
            to="/signup"
            className="font-body text-[14px] tracking-wide bg-ink text-canvas px-5 py-2.5 rounded-full hover:bg-brass transition-colors duration-300"
          >
            Get Started
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden text-ink p-2 -mr-2"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-canvas border-t border-stone/70 px-6 pb-8 pt-2">
          <ul className="flex flex-col gap-5 pt-4 font-body text-[16px] text-charcoal">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} onClick={() => setOpen(false)} className="block py-1 hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 mt-6">
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="text-center font-body text-[15px] border border-stoneDark/60 text-ink px-5 py-3 rounded-full"
            >
              Login
            </Link>
            <Link
              to="/signup"
              onClick={() => setOpen(false)}
              className="text-center font-body text-[15px] bg-ink text-canvas px-5 py-3 rounded-full"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
