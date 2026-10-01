'use client';

import { useEffect, useState } from 'react';
import { ContactButton } from '@/components/ui/ContactButton';
import { IconClose, IconMenu } from '@/components/ui/Icons';

export const navItems = [
  { href: '#procedimentos', label: 'Procedimentos' },
  { href: '#resultados', label: 'Resultados' },
  { href: '#equipe', label: 'Equipe' },
  { href: '#como-chegar', label: 'Como chegar' },
];

export function LogoPlaceholder() {
  return (
    <a className="logo-ph" href="#topo" aria-label="Atual Sorriso, início (logo oficial pendente)">
      [LOGO OFICIAL ATUAL SORRISO]
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
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
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="header" id="topo">
      <div className="container header__in">
        <LogoPlaceholder />
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
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="Principal (mobile)">
          {navItems.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
          <ContactButton position="header-mobile" />
        </nav>
      )}
    </header>
  );
}
