import type { Metadata } from 'next';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';
import '@/styles/globals.scss';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'InRealArt - MarketPlace',
  description: 'InRealArt is a NFT platform for artists',
  icons: {
    icon: '/images/favicon-32x32.png',
    shortcut: '/images/favicon-16x16.png',
    apple: '/images/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>
          <Header />
          <section className="container">{children}</section>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
