import React from 'react';
import { Nft } from '@/mocks/types';
import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';
import NftImage from '../../../public/images/NftBig.png';

interface BuyModalProps extends Partial<Nft> {
  showBuyModal: boolean;
  setShowBuyModal: React.Dispatch<React.SetStateAction<boolean>>;
  buy: (() => void) | undefined;
  isMinting: boolean;
}

const BuyModal = ({
  showBuyModal,
  setShowBuyModal,
  buy,
  isMinting,
  name,
  price,
  artist,
}: BuyModalProps) => (
  <Modal
    title={name || ''}
    show={showBuyModal}
    hide={() => setShowBuyModal(false)}
  >
    <div className="BuyModal">
      <div
        className="BuyModal__img"
        style={{
          backgroundImage: ` url('${NftImage.src}')`,
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
  </Modal>
);

export default BuyModal;
