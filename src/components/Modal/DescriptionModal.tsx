import React from 'react';
import { Nft } from '@/mocks/types';
import Modal from '@/components/Modal/Modal';

interface DescriptionModalProps extends Partial<Nft> {
  showDescriptionModal: boolean;
  setShowDescriptionModal: React.Dispatch<React.SetStateAction<boolean>>;
  description: string;
}

const DescriptionModal = (props: DescriptionModalProps) => (
  <Modal
    title="NFT Description"
    show={props.showDescriptionModal}
    hide={() => props.setShowDescriptionModal(false)}
  >
    <div className="DescriptionModal">
      <p
        className="DescriptionModal__infos"
        dangerouslySetInnerHTML={{ __html: props.description }}
      />
    </div>
  </Modal>
);

export default DescriptionModal;
