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
          src="/IntroLetter.png"
          width={90}
          height={400}
        />
        <Image
          className="Intro__castleImg"
          priority={true}
          alt="IntroCastle"
          src="/IntroCastle.png"
          width={750}
          height={750}
        />
      </div>
      <span className="Intro__verticalText">Limited edition</span>
    </section>
  );
};

export default Intro;
