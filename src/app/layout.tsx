import type { Metadata } from 'next';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';
import '@/styles/globals.scss';
import '@/styles/globals.css';
import { Providers } from './providers';
import LoginModal from '@/components/Modal/LoginModal/LoginModal';
import { Toaster } from 'sonner';

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
          <LoginModal />
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
