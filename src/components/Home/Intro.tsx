import Image from 'next/image';
import Button from '../Button/Button';

const Intro = () => {
  return (
    <section className="Intro">
      <div className="Intro__infos">
        <h2 className="Intro__title">
          Buy, Sell & collect your premium RWA Artworks
        </h2>
        <p className="Intro__description">
          Bienvenue sur InRealArt, la marketplace RWA exclusive d&apos;œuvres de
          haute qualité. Découvrez une sélection d&apos;exception pour des acheteurs
          privilégiés. Excellence et élégance vous attendent.
        </p>
        <div className="Intro__buttons">
          <Button additionalClassName="gold" text="Buy NFT" link="/nfts" />
        </div>
      </div>
      <div className="Intro__imgs">
        <Image
          className="Intro__letterImg"
          priority={true}
          alt="IntroLetter"
          src="/images/IntroLetter.png"
          width={90}
          height={400}
        />
        <Image
          className="Intro__castleImg"
          priority={true}
          alt="IntroCastle"
          src="/images/IntroCastle.png"
          width={750}
          height={750}
        />
      </div>
      <div className="Intro__rectangle" />
      <span className="Intro__verticalText">Limited edition</span>

      <Image
        className="Intro__mobileImg"
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
