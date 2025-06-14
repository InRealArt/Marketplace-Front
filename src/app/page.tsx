import Footer from '@/components/client/footer/Footer';
import Guarantees from '@/components/client/guarantee/Guarantees';
import { Suspense } from 'react'
import ContactUs from '@/components/Home/ContactUs';
import Intro from '@/components/Home/Intro';
import ArtistsListSlider from '@/components/List/ArtistsListSlider';
import ListOfFeaturedArtworks from '@/components/List/ListOfFeaturedArtworks';
import { HeroSectionServer } from '@/components/server/hero/HeroSection';


const Landing = () => {
  return (
    <main className="Landing">
      <Suspense fallback={<div>Loading...</div>}>
        <HeroSectionServer />
      </Suspense>
      <Guarantees />
      <Footer/>

    </main>
  );
};

export default Landing;
