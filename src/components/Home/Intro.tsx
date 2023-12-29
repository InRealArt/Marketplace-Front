import Image from 'next/image';
import Button from '../Button/Button';

const Intro = () => {
  return (
    <section className="Intro">
      <div className="Intro__infos">
        <h2 className="Intro__title">Buy, Sell & collect your premium nft</h2>
        <p className="Intro__description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam velit
          elit, hendrerit vel porta nec, mollis commodo justo. Suspendisse
          potenti. Duis eget sollicitudin nisl. Donec scelerisque
        </p>
        <div className="Intro__buttons">
          <Button text="Proposed NFT" additionalClassName="gold" />
          <Button text="Buy NFT" />
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
