import ContactUs from '@/components/Home/ContactUs';
import Intro from '@/components/Home/Intro';
import ArtistsListSlider from '@/components/List/ArtistsListSlider';
import ListOfFeaturedArtworks from '@/components/List/ListOfFeaturedArtworks';
import { HeroSectionServer } from '@/components/server/hero/HeroSectionServer';


const Landing = () => {
  return (
    <main className="Landing">
      <HeroSectionServer />
    </main>
  );
};

export default Landing;
