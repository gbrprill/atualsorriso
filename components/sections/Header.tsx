'use client';

import { useEffect, useState, type MouseEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useApp } from '@/components/AppProvider';
import { ContactButton } from '@/components/ui/ContactButton';
import { IconClose, IconMenu } from '@/components/ui/Icons';
import { scrollToY } from '@/lib/scroll';

export const navItems = [
  { href: '#procedimentos', label: 'Procedimentos' },
  { href: '#resultados', label: 'Resultados' },
  { href: '#equipe', label: 'Equipe' },
  { href: '#como-chegar', label: 'Como chegar' },
];

/** Volta ao início real do documento (o header é fixo, então uma âncora nele não rola). */
function goTop(e: MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  scrollToY(0);
  document.getElementById('inicio')?.focus({ preventScroll: true });
  history.replaceState(null, '', window.location.pathname + window.location.search);
}

export function LogoPlaceholder({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <a
      className="logo-ph"
      href="#inicio"
      aria-label="Atual Sorriso, voltar ao início (logo oficial pendente)"
      onClick={(e) => {
        onNavigate?.();
        goTop(e);
      }}
    >
      [LOGO OFICIAL ATUAL SORRISO]
    </a>
  );
}

export function Header() {
  const { menuOpen: open, setMenuOpen: setOpen } = useApp();
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: '-40% 0px -55% 0px' },
    );
    navItems.forEach((n) => {
      const el = document.querySelector(n.href);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const mq = window.matchMedia('(min-width: 992px)');
    const onWide = () => mq.matches && setOpen(false);
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onWide);
    return () => {
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onWide);
    };
  }, [open, setOpen]);

  return (
    <header className="header">
      <div className="container header__in">
        <LogoPlaceholder onNavigate={() => setOpen(false)} />
        <nav className="nav" aria-label="Principal">
          {navItems.map((n) => (
            <a key={n.href} href={n.href} aria-current={active === n.href ? 'true' : undefined}>
              {n.label}
            </a>
          ))}
          <ContactButton position="header" />
        </nav>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen(!open)}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Principal (mobile)"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.14 } }}
          >
            {navItems.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
                {n.label}
              </a>
            ))}
            <ContactButton position="header-mobile" />
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
