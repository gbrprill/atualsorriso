import type { SVGProps } from 'react';

const base: SVGProps<SVGSVGElement> = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

type P = SVGProps<SVGSVGElement>;
const I = (d: React.ReactNode) =>
  function Icon(props: P) {
    return (
      <svg {...base} {...props}>
        {d}
      </svg>
    );
  };

export const IconChat = I(<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />);
export const IconPin = I(
  <>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </>,
);
export const IconStar = I(<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z" />);
export const IconCalendar = I(
  <>
    <rect x="3.5" y="5" width="17" height="15" rx="2" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </>,
);
export const IconImage = I(
  <>
    <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
    <circle cx="9" cy="10" r="1.6" />
    <path d="m4 18 5-5 4 4 3-3 4 4" />
  </>,
);
export const IconUser = I(
  <>
    <circle cx="12" cy="8.5" r="3.5" />
    <path d="M5 20c.8-3.5 3.6-5.5 7-5.5s6.2 2 7 5.5" />
  </>,
);
export const IconMenu = I(<path d="M4 7h16M4 12h16M4 17h16" />);
export const IconClose = I(<path d="M6 6l12 12M18 6 6 18" />);
export const IconPlus = I(<path d="M12 5v14M5 12h14" />);
export const IconArrow = I(<path d="M5 12h14m-5-5 5 5-5 5" />);
export const IconCheck = I(<path d="m5 12.5 4.5 4.5L19 7.5" />);
export const IconInstagram = I(
  <>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="3.8" />
    <circle cx="17" cy="7" r="0.6" fill="currentColor" />
  </>,
);
