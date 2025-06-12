import type { Metadata } from 'next';
import Header from '@/components/Header/Header';
import HeaderMenu from '@/components/Header/HeaderMenu';
import UserMenu from '@/components/Header/UserMenu';
import Cart from '@/components/Header/Cart';
import Footer from '@/components/Footer';
import '@/styles/globals.scss';
import '@/styles/globals.css';
import { Providers } from './providers';
import LoginModal from '@/components/Modal/LoginModal/LoginModal';
import { Toaster } from 'sonner';
import GoogleCaptchaWrapper from './captcha/google-captcha-wrapper';
import '@coinbase/onchainkit/styles.css';
import Navbar from '@/components/client/navbar/Navbar';
import { HeroSection } from '@/components/client/hero/HeroSection';
import { HeroSectionServer } from '@/components/server/hero/HeroSectionServer';

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
            <Navbar />
            {/* <Header /> */}
            {/* <HeaderMenu /> */}
            {/* <UserMenu /> */}
            <Cart />
            <section className="max-w-[90%] desktop:max-w-[1414px] mx-auto mt-[80px] 2xl:mt-[80px + 40px]">{children}</section>
            {/* <Footer /> */}
            <Toaster richColors />
            <LoginModal />
          </Providers>
        </body>
      </GoogleCaptchaWrapper>
    </html>
  );
}
