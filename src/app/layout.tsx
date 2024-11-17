import type { Metadata } from 'next';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';
import '@/styles/globals.scss';
import '@/styles/globals.css';
import { Providers } from './providers';
import LoginModal from '@/components/Modal/LoginModal/LoginModal';
import { Toaster } from 'sonner';
import GoogleCaptchaWrapper from './captcha/google-captcha-wrapper';
import BuyModal from '@/components/Modal/BuyModal';
import SellModal from '@/components/Modal/SellModal';

export const metadata: Metadata = {
  title: 'InRealArt - MarketPlace',
  description: 'InRealArt is a RWA platform for artists',
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
      <GoogleCaptchaWrapper>
        <body suppressHydrationWarning={true}>
          <Providers>
            <Header />
            <section className="container">{children}</section>
            <Footer />
            <Toaster richColors />
            {/* <BuyModal /> */}
            {/* <SellModal /> */}
            <LoginModal />
          </Providers>
        </body>
      </GoogleCaptchaWrapper>
    </html>
  );
}
