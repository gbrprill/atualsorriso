# Atual Sorriso — protótipo da landing page

Next.js (App Router) + React + TypeScript + Tailwind CSS v4. Sem backend.

**Mockups:** no modo protótipo, equipe, clínica, procedimentos e resultados mostram fotos de banco CC0 com selo "MOCKUP" (`public/mockups/`, créditos em `public/mockups/CREDITOS.md`). Não retratam a clínica. Os `src` reais continuam `null`; em `mode: 'production'` os mockups não aparecem.

## Comandos

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build && npm start
```

Modo revisão: abra `http://localhost:3000/?revisao` para ver as notas internas (fontes, datas e pendências) que ficam ocultas para o visitante. Ver `docs/REVISAO.md`.

## Arquitetura

- `app/`: layout (Lora 500 + Manrope 400/600 via `next/font`) e página.
- `components/sections/`: seções. `components/ui/`: botões, modal (`<dialog>` nativo), placeholder, `ReviewNote`.
- `data/`: conteúdo tipado (`services`, `team`, `caseStudies`, `mediaInventory`, `testimonials`, `faq`, `siteConfig`).
- `styles/globals.css`: tokens (`@theme` + `:root` semânticos, incluindo durações e easing) e estilos.
- `lib/whatsapp.ts` gera `wa.me` só com número verificado. `lib/analytics.ts` emite `whatsapp_click`, `results_filter_select`, `case_open`, `maps_click` (sem serviço real).

## Movimento: uma biblioteca por responsabilidade

| Responsabilidade | Tecnologia | Onde |
|---|---|---|
| Tudo que é ligado à rolagem: hero (pin curto + camada esfumada), Resultados (seção presa + cards na horizontal), Primeira conversa (etapas por rolagem), transição entre seções | GSAP + ScrollTrigger (`useGSAP`, escopo e cleanup) | `HeroStage.tsx`, `Results.tsx`, `FirstConversation.tsx`, `components/motion/SectionFlow.tsx` |
| Estados de interface: entradas de seção, carrossel infinito de procedimentos, cartão da equipe, menu, barra mobile, toque em botões | Motion (`motion/react`) | `Reveal.tsx`, `Services.tsx`, `Team.tsx` e componentes |
| Hover, foco, FAQ, modal, entrada do texto da hero | CSS | `styles/globals.css` |

- `prefers-reduced-motion`: sem pinning, sem reprodução automática (capa estática + botão "Reproduzir vídeo"), sem deslocamentos; todo o conteúdo visível.
- Nenhum conteúdo depende de JS para aparecer: `Reveal` só esconde blocos abaixo da dobra depois da hidratação.
- Nenhum estado React é atualizado por evento de scroll (IntersectionObserver e ScrollTrigger).

## Hero

- Desktop (≥ 768 px de largura e ≥ 640 px de altura): hero fixa por um trecho curto. O vídeo troca aos 15% de rolagem da tela e o conteúdo começa a cobrir a hero aos 40%.
- Celular e telas baixas: sem pinning. Vídeo acima, texto abaixo. O vídeo troca quando o ativo termina.
- Só o vídeo ativo toca. Os dois pausam fora da tela. O segundo só é pré-carregado depois que o primeiro pode tocar.
- Capas: `public/videos/*-poster.jpg`, extraídas de um quadro dos próprios vídeos.

## Como editar

- **Foto/logo:** troque `src: null` pelo caminho em `public/` no `MediaSlot` correspondente e preencha `alt`.
- **Caso de resultado real:** preencha mídia, contexto e profissional e mude `editorialState` para `'approved'`. Só então ele é chamado de "caso" (`isPublishedCase`).
- **Textos:** arquivos em `data/`. Nome "Facetas de resina" centralizado em `FACETAS_LABEL`.
- **WhatsApp:** `data/siteConfig.ts` → `whatsapp: { number: '55DDDNUMERO', verified: true }`. Hoje `null`: todo CTA abre a modal de protótipo, mantendo o procedimento escolhido.
- **Produção:** `siteConfig.mode = 'production'` oculta notas internas, depoimentos e casos não aprovados. Definir canonical/sitemap/robots com o domínio.

## Dados a fornecer antes de publicar

Número de WhatsApp confirmado (há três candidatos); logo oficial; fotos (TEAM-01…05, foto coletiva em proporção horizontal, CLINIC-01, HUMAN-01, fachada, capas dos procedimentos); biografias, CROs e sobrenome do Dr. Lucas; texto institucional; CNPJ, endereço cadastral e política de privacidade; revalidação de endereço, horário, nota Google (4,9 / 119) e "15 anos"; link direto das avaliações do Google; casos de resultado com autorização e profissional responsável; depoimentos autorizados; revisão clínica dos resumos e da copy da hero e das etapas; nomenclatura "facetas" vs "lentes"; autorização de uso dos vídeos da hero.
