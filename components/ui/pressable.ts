/** Física de botão (Motion): sobe um pouco no hover/foco e afunda no toque. Cor e sombra ficam no CSS. */
export const pressable = {
  whileHover: { y: -2 },
  whileFocus: { y: -2 },
  whileTap: { y: 0, scale: 0.97 },
  transition: { type: 'spring', stiffness: 480, damping: 30, mass: 0.7 },
} as const;
