import React from 'react';
import Modal from '@/components/Modal/Modal';
import { ItemPhysicalType } from '@/types';

interface DescriptionModalProps extends Partial<ItemPhysicalType> {
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
    <div className="overflow-auto max-h-[70vh] py-4">
      <p
        className="font-poppins text-[15px] tracking-[-0.25px] leading-relaxed"
        dangerouslySetInnerHTML={{ __html: props.description }}
      />
    </div>
  </Modal>
);

export default DescriptionModal;
