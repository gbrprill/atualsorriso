'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ContactButton } from '@/components/ui/ContactButton';
import { IconArrow } from '@/components/ui/Icons';
import { ReviewNote } from '@/components/ui/ReviewNote';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Hero com dois vídeos.
 * - pin (desktop alto, sem movimento reduzido): hero fixa por um trecho curto; a troca de vídeo dispara ao rolar ~15% da tela.
 * - auto (celular / telas baixas): sem pinning; troca quando o vídeo ativo termina.
 * - static (movimento reduzido): capa estática, sem reprodução automática.
 * A troca usa uma camada da paleta que cobre a cena antes de trocar o vídeo: os rostos nunca se sobrepõem.
 * GSAP é usado só aqui (ScrollTrigger + timeline da camada), com escopo e cleanup via useGSAP.
 */
const scenes = [
  { id: 'lentes', label: 'Lentes de resina', src: '/videos/lentes.mp4', poster: '/videos/lentes-poster.jpg' },
  { id: 'otomodelacao', label: 'Otomodelação', src: '/videos/otomodelacao.mp4', poster: '/videos/otomodelacao-poster.jpg' },
] as const;

type Mode = 'pin' | 'auto' | 'static';
const REDUCED = '(prefers-reduced-motion: reduce)';
/** Mesmo critério das media queries de .stage em globals.css. */
const PIN = '(prefers-reduced-motion: no-preference) and (min-width: 768px) and (min-height: 640px)';

function IconPause() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <rect x="6.5" y="5" width="3.5" height="14" rx="1" />
      <rect x="14" y="5" width="3.5" height="14" rx="1" />
    </svg>
  );
}
function IconPlay() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.2-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
    </svg>
  );
}

export function HeroStage() {
  const root = useRef<HTMLDivElement>(null);
  const sticky = useRef<HTMLElement>(null);
  const wipe = useRef<HTMLDivElement>(null);
  const vids = useRef<(HTMLVideoElement | null)[]>([]);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const activeRef = useRef(0);
  const pausedRef = useRef(false);
  const visibleRef = useRef(true);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [mode, setMode] = useState<Mode>('auto');
  const [failed, setFailed] = useState<boolean[]>([false, false]);

  /** Só o vídeo ativo toca, e só com a hero visível e sem pausa. */
  const sync = useCallback(() => {
    vids.current.forEach((v, i) => {
      if (!v) return;
      const shouldPlay = i === activeRef.current && visibleRef.current && !pausedRef.current;
      if (shouldPlay) {
        if (v.preload !== 'auto') v.preload = 'auto';
        void v.play().catch(() => {});
      } else if (!v.paused) {
        v.pause();
      }
    });
  }, []);

  const goTo = useCallback(
    (n: number) => {
      if (n === activeRef.current) return;
      activeRef.current = n;
      setActive(n);
      tl.current?.kill();

      const swap = () => {
        root.current?.querySelectorAll<HTMLElement>('[data-scene]').forEach((el, i) => el.toggleAttribute('data-active', i === n));
        const v = vids.current[n];
        if (v && v.readyState > 0) v.currentTime = 0;
        sync();
      };

      if (window.matchMedia(REDUCED).matches || !wipe.current) {
        swap();
        return;
      }
      // Camada da marca (com bordas esfumadas) sobe e cobre a cena, o vídeo troca por baixo,
      // e a camada continua subindo até sair. ~1,5 s no total, sem cortes secos.
      tl.current = gsap
        .timeline()
        .set(wipe.current, { y: 0, yPercent: 100 })
        .to(wipe.current, { yPercent: 0, duration: 0.7, ease: 'power2.inOut' })
        .call(swap)
        .to(wipe.current, { yPercent: -100, duration: 0.8, ease: 'power2.inOut' }, '+=0.05');
    },
    [sync],
  );

  // Modo por breakpoint/preferência.
  useEffect(() => {
    const mqReduced = window.matchMedia(REDUCED);
    const mqPin = window.matchMedia(PIN);
    const compute = () => {
      const m: Mode = mqReduced.matches ? 'static' : mqPin.matches ? 'pin' : 'auto';
      setMode(m);
      if (m === 'static') {
        // Movimento reduzido: capa estática; nada é baixado até a pessoa pedir para reproduzir.
        pausedRef.current = true;
        setPaused(true);
        vids.current.forEach((v) => v && v.paused && v.readyState === 0 && (v.preload = 'none'));
      }
      vids.current.forEach((v) => v && (v.loop = m !== 'auto'));
      sync();
    };
    compute();
    mqReduced.addEventListener('change', compute);
    mqPin.addEventListener('change', compute);
    return () => {
      mqReduced.removeEventListener('change', compute);
      mqPin.removeEventListener('change', compute);
    };
  }, [sync]);

  // Pausa tudo quando a hero sai da tela.
  useEffect(() => {
    const el = sticky.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        visibleRef.current = e.isIntersecting;
        sync();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [sync]);

  // Celular: troca quando o vídeo ativo termina.
  useEffect(() => {
    if (mode !== 'auto') return;
    const handlers = vids.current.map((v, i) => {
      const h = () => i === activeRef.current && goTo(i === 0 ? 1 : 0);
      v?.addEventListener('ended', h);
      return h;
    });
    return () => vids.current.forEach((v, i) => v?.removeEventListener('ended', handlers[i]));
  }, [mode, goTo]);

  // Pré-carrega o segundo vídeo só depois que o primeiro já pode tocar.
  useEffect(() => {
    const first = vids.current[0];
    const second = vids.current[1];
    if (!first || !second || mode === 'static') return;
    let timer: number | undefined;
    const warm = () => {
      timer = window.setTimeout(() => {
        if (second.preload === 'none') second.preload = 'metadata';
      }, 1500);
    };
    if (first.readyState >= 3) warm();
    else first.addEventListener('canplaythrough', warm, { once: true });
    return () => {
      first.removeEventListener('canplaythrough', warm);
      window.clearTimeout(timer);
    };
  }, [mode]);

  // Desktop: troca ao rolar 15% da altura da tela; volta ao subir.
  useGSAP(
    () => {
      if (mode !== 'pin') return;
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * 0.15)}`,
        onLeave: () => goTo(1),
        onEnterBack: () => goTo(0),
      });
      return () => st.kill();
    },
    { dependencies: [mode, goTo], scope: root },
  );

  useEffect(() => {
    // Assume o controle do transform da camada (o CSS já a deixa abaixo da cena sem JS).
    if (wipe.current) gsap.set(wipe.current, { y: 0, yPercent: 100 });
    return () => void tl.current?.kill();
  }, []);

  const togglePause = () => {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
    sync();
  };

  return (
    <div className="stage" ref={root}>
      <section className="stage__sticky" id="inicio" tabIndex={-1} aria-labelledby="hero-title" ref={sticky}>
        <div className="stage__media" aria-hidden="true">
          {scenes.map((s, i) => (
            <div
              key={s.id}
              className={`scene scene--${s.id}`}
              data-scene={i}
              data-active={i === 0 ? '' : undefined}
              data-failed={failed[i] ? '' : undefined}
              style={{ backgroundImage: `url(${s.poster})` }}
            >
              <video
                ref={(el) => {
                  vids.current[i] = el;
                }}
                className="scene__video"
                src={s.src}
                poster={s.poster}
                muted
                loop
                playsInline
                preload={i === 0 ? 'auto' : 'none'}
                tabIndex={-1}
                onError={() => setFailed((f) => f.map((x, j) => (j === i ? true : x)))}
                onCanPlay={i === 0 ? sync : undefined}
              />
              <p className="scene__label">
                <span>Em destaque</span>
                {s.label}
              </p>
            </div>
          ))}
          <div className="stage__wipe" ref={wipe} />
          <div className="stage__shade" />
        </div>

        <div className="container stage__content">
          <div className="stage__copy">
            <p className="stage__eyebrow">Odontologia e estética em Francisco Beltrão</p>
            <h1 id="hero-title" className="stage__title">
              Seu sorriso, cuidado de perto.
            </h1>
            <p className="stage__sub">
              Conheça os cuidados da Atual Sorriso em Francisco Beltrão. Nossa equipe ouve você e orienta os próximos passos.
            </p>
            <div className="stage__actions" data-hero-cta>
              <ContactButton position="hero" variant="light" trace />
              <a className="btn btn--on-dark" href="#procedimentos">
                Conhecer os procedimentos
                <IconArrow className="ico-arrow" />
              </a>
            </div>
            <ReviewNote>Copy institucional proposta para validação da clínica.</ReviewNote>
          </div>

          <div className="stage__controls">
            <div className="stage__dots" role="group" aria-label="Vídeos em destaque">
              {scenes.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  className="stage__dot"
                  aria-pressed={active === i}
                  aria-label={`Mostrar vídeo: ${s.label}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
            <button type="button" className="stage__pause" aria-pressed={paused} onClick={togglePause}>
              {paused ? <IconPlay /> : <IconPause />}
              <span>{paused ? 'Reproduzir vídeo' : 'Pausar vídeo'}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
