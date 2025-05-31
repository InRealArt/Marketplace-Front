import Image from 'next/image';
import Button from '../Button/Button';

const Intro = () => {
  return (
    <section className="relative w-full inline-block">
      <div className="desktop:w-[45%] desktop:mt-[80px] desktop:mb-[250px] max-desktop:w-[91%] max-desktop:mt-[15px] max-desktop:mb-0">
        <h2 className="text-[70px] font-medium leading-[78px] tracking-[-1.5px] max-desktop:text-[32px] max-desktop:leading-[40px]">
          Buy, Sell & collect your premium RWA Artworks
        </h2>
        <p className="w-4/5 mt-[70px] font-light max-desktop:mt-[30px] max-desktop:text-base max-desktop:w-full">
          Welcome in InRealArt,  the exclusive RWA (Real World Asset) marketplace of high-quality artworks. Explore an exceptional selection tailored for privileged buyers. Excellence and elegance await you, featuring physical canvases, NFTs, copyright, and more.
        </p>
        <div className="mt-[60px]">
          <Button additionalClassName="gold" className="w-[170px] !m-0" text="Buy RWA" link="/artwork" />
        </div>
      </div>
      <div className="flex absolute left-[40%] bottom-[87px] max-desktop:hidden">
        <Image
          className="w-[70px] h-max mt-auto mr-[60px]"
          priority={true}
          alt="IntroLetter"
          src="/images/IntroLetter.png"
          width={90}
          height={400}
        />
        <Image
          className="max-w-[600px]"
          priority={true}
          alt="IntroCastle"
          src="/images/IntroCastle.png"
          width={750}
          height={750}
        />
      </div>
      <div className="absolute z-[-1] bg-[#525252] h-[200px] w-[70%] left-0 bottom-0 max-desktop:hidden" />
      <span className="text-[48px] font-light absolute uppercase right-0 top-0 origin-bottom-right rotate-[-90deg] before:content-[''] before:w-[200px] before:h-[2px] before:bg-white before:block before:absolute before:top-1/2 before:left-[-230px] before:transform before:-translate-y-1/2 max-desktop:text-base">Limited edition</span>

      <Image
        className="hidden mx-auto mt-[60px] max-desktop:block"
        priority={true}
        alt="IntroCastle"
        src="/images/IntroMobile.png"
        width={377}
        height={482}
      />
    </section>
  );
};

export default Intro;
