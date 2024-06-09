import React from 'react';
import Modal from '@/components/Modal/Modal';
import { NftType } from '@/types';

interface DescriptionModalProps extends Partial<NftType> {
  showDescriptionModal: boolean;
  setShowDescriptionModal: React.Dispatch<React.SetStateAction<boolean>>;
  description: string;
  name: string;
}

const DescriptionModal = (props: DescriptionModalProps) => (
  <Modal
    title={props.name}
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
