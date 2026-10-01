# Atual Sorriso — protótipo da landing page

Next.js (App Router) + React + TypeScript + Tailwind CSS v4. Sem backend. Todas as imagens são placeholders.

## Comandos

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build && npm start
```

## Arquitetura

- `app/` layout (fontes Lora 500 + Manrope 400/600 via `next/font`) e página.
- `components/sections/` seções; `components/ui/` botões, modal (`<dialog>` nativo), placeholder; `components/motion/Reveal.tsx` entrada em CSS.
- `data/` conteúdo tipado: `services`, `team`, `caseStudies`, `mediaInventory` (15 URLs), `testimonials`, `faq`, `siteConfig`.
- `styles/globals.css` tokens (`@theme` + `:root` semânticos) e estilos.
- `lib/whatsapp.ts` gera `wa.me` só com número verificado; `lib/analytics.ts` emite eventos `whatsapp_click`, `results_filter_select`, `case_open`, `maps_click` (sem serviço real).

## Como editar

- **Foto/logo:** troque `src: null` por o caminho em `public/` no `MediaSlot` correspondente (e preencha `alt`). O layout não muda.
- **Textos:** arquivos em `data/`. Nome "Facetas de resina" centralizado em `FACETAS_LABEL` (`data/services.ts`).
- **Tokens:** `styles/globals.css`.
- **WhatsApp:** em `data/siteConfig.ts`, `whatsapp: { number: '55DDDNUMERO', verified: true }`. Hoje `null`, então todo CTA abre a modal de protótipo.
- **Produção:** `siteConfig.mode = 'production'`, definir canonical/sitemap/robots com o domínio.

## Dados a fornecer antes de publicar

Número de WhatsApp confirmado (há três candidatos); logo oficial; fotos (HERO-01, TEAM-01…05, CLINIC-01, HUMAN-01, fachada); biografias, CROs e sobrenome do Dr. Lucas; texto institucional; CNPJ, endereço cadastral, política de privacidade; revalidação de endereço, horário, nota Google (4,9 / 119) e "15 anos"; casos de resultado com autorização e profissional responsável; depoimentos autorizados; revisão clínica dos resumos; nomenclatura "facetas" vs "lentes".
