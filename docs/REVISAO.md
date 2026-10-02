# Notas de revisão (não aparecem para o visitante)

Estas notas saíram da copy pública. No protótipo, aparecem em `/?revisao` como etiquetas tracejadas. Em `mode: 'production'` não são renderizadas.

| Onde | Nota | Fonte no código |
|---|---|---|
| Faixa de confiança · Google | 4,9 e 119 avaliações: snapshot da pesquisa pública de 30/09/2026. Revalidar antes de publicar; não é atualizado automaticamente. | `siteConfig.google.snapshot` |
| Faixa de confiança · trajetória | "15 anos": bio do Instagram, observada em 30/09/2026. Revalidar. | `siteConfig.trajectory.snapshot` |
| Faixa de confiança · "Ver avaliações" | Hoje aponta para o perfil no Maps. Trocar pelo link direto das avaliações, se a clínica fornecer. | `siteConfig.links.reviews` |
| Hero | Copy institucional proposta para validação da clínica. | `HeroStage.tsx` |
| Primeira conversa | Textos das etapas propostos para validação. Sem promessa de avaliação gratuita, atendimento imediato ou disponibilidade automática. | `FirstConversation.tsx` |
| Depoimentos | Módulo opcional. Publicar só com depoimento e autorização aprovados. Diferente da nota do Google. Em produção, a seção some se não houver depoimento aprovado. | `Testimonials.tsx` |
| Localização · horário | Horário observado na pesquisa pública de 30/09/2026. Revalidar. | `siteConfig.hours` |
| Resultados | Nenhum caso aprovado nesta versão. Os 8 cards são espaços reservados e são identificados como tal ("Espaço reservado", "Ver espaço reservado", contagem "8 espaços reservados"). | `caseStudies.ts` (`editorialState`) |
| Vídeos da hero | Confirmar autorização de uso das pessoas retratadas e se os vídeos podem representar a clínica. | `public/videos/` |

Os rótulos de placeholder de imagem (`[IMAGEM …]`, `TEAM-01`, `[CRO A CONFIRMAR]` etc.) continuam visíveis de propósito: indicam um espaço reservado, não são instruções internas.
