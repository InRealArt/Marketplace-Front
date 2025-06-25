import Footer from '@/components/client/footer/Footer';
import Guarantees from '@/components/client/guarantee/Guarantees';
import { Suspense } from 'react'
import { HeroSectionServer } from '@/components/server/hero/HeroSection';
import CategoriesSection from '@/components/client/categories/CategoriesSection';
import SelectionSection from '@/components/client/sections/SelectionSection';
import JoinUsSection from '@/components/client/sections/JoinUsSection';

const Landing = () => {
  return (
    <main className="Landing">
      <Suspense fallback={<div>Loading...</div>}>
        <HeroSectionServer />
      </Suspense>
      <CategoriesSection />
      <SelectionSection />
      <Guarantees />
      <JoinUsSection />
    </main>
  );
};

export default Landing;
