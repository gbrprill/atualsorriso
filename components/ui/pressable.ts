/** Retorno de toque discreto (Motion). Cor, sombra e seta ficam no CSS; sem mola nem elevação em botões. */
export const pressable = {
  whileTap: { scale: 0.98 },
  transition: { duration: 0.15, ease: 'easeOut' },
} as const;
