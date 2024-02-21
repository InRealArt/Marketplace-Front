import React from 'react';
import { Nft } from '@/mocks/types';
import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';

interface BuyModalProps extends Partial<Nft> {
  showBuyModal: boolean;
  setShowBuyModal: React.Dispatch<React.SetStateAction<boolean>>;
  buy: (() => void) | undefined;
  isMinting: boolean;
  isSuccess: boolean;
}

const BuyModalContent = ({
  setShowBuyModal,
  buy,
  isMinting,
  price,
  artist,
  img,
}: BuyModalProps) => (
  <div className="BuyModal">
    <div
      className="BuyModal__img"
      style={{
        backgroundImage: ` url('${img}')`,
      }}
    />
    <div className="BuyModal__infos">
      <h3 className="BuyModal__price">{price} ETH</h3>
      <p className="BuyModal__description">
        Cette œuvre réalisé par {artist?.name} coûte actuellement{' '}
        <span>{price} ETH</span> ce qui représente donc l’équivalent de 10
        972.73 €
      </p>
      <div className="BuyModal__buttons">
        <Button
          action={() => setShowBuyModal(false)}
          text="Cancel"
          additionalClassName="goldBorder"
        />
        <Button
          action={buy}
          text={isMinting ? 'Minting...' : 'Buy now'}
          additionalClassName="gold"
        />
      </div>
    </div>
  </div>
);

const BuyModalSuccessfulContent = ({ setShowBuyModal, img }: BuyModalProps) => (
  <div className="BuyModal BuyModal--successful">
    <p className="BuyModal__description">
      Félicitations, l’oeuvre est désormais la votre. Vous pouvez la télécharger
      directement sur cette page. Vous pouvez également la consulté et traider
      depuis votre profil dans les NFT récente.
    </p>
    <div className="BuyModal__flex">
      <div
        className="BuyModal__miniature"
        style={{
          backgroundImage: ` url('${img}')`,
        }}
      />
      <p className="BuyModal__download">Télécharger votre nouvelle NFT ici</p>
    </div>
    <div className="BuyModal__buttons">
      <Button
        action={() => setShowBuyModal(false)}
        text={'Terminer'}
        additionalClassName="gold"
      />
    </div>
  </div>
);

const BuyModal = (props: BuyModalProps) => (
  <Modal
    title={props.isSuccess ? 'Acquisition confirmé' : props.name || ''}
    show={props.showBuyModal}
    hide={() => props.setShowBuyModal(false)}
  >
    {props.isSuccess ? (
      <BuyModalSuccessfulContent {...props} />
    ) : (
      <BuyModalContent {...props} />
    )}
  </Modal>
);

export default BuyModal;
