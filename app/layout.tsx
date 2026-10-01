import type { Metadata } from 'next';
import { Lora, Manrope } from 'next/font/google';
import { siteConfig } from '@/data/siteConfig';
import '@/styles/globals.css';

const lora = Lora({ subsets: ['latin'], weight: '500', variable: '--font-lora', display: 'swap' });
const manrope = Manrope({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-manrope', display: 'swap' });

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  // Protótipo não indexado. Em produção: remover e definir canonical/sitemap/robots com o domínio confirmado.
  robots: siteConfig.mode === 'prototype' ? { index: false, follow: false } : undefined,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    locale: 'pt_BR',
    type: 'website',
    // images: imagem oficial posterior
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${lora.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
