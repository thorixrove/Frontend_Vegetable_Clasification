import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { House, Info, Leaf, Menu, ScanSearch, X } from 'lucide-react';

const items = [
  { to: '/', label: 'Beranda', icon: House, end: true },
  { to: '/predict', label: 'Prediksi', icon: ScanSearch },
  { to: '/about', label: 'Tentang', icon: Info },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth > 720 && setOpen(false);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // kunci scroll halaman saat menu samping terbuka
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-brand" onClick={close}>
          <span className="nav-logo"><Leaf size={20} /></span>
          Klasifikasi Sayuran
        </Link>

        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="nav-links"
          aria-label="Buka menu"
          onClick={() => setOpen(true)}
        >
          <Menu size={20} />
        </button>

        <div className={`nav-overlay ${open ? 'show' : ''}`} onClick={close} />

        <nav id="nav-links" className={`nav-links ${open ? 'open' : ''}`} aria-label="Navigasi utama">
          <div className="nav-drawer-head">
            <span>Menu</span>
            <button className="icon-btn" onClick={close} aria-label="Tutup menu">
              <X size={18} />
            </button>
          </div>
          {items.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className="nav-link" onClick={close}>
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}