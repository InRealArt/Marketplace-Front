import { X } from 'lucide-react';
import React, { PropsWithChildren, useEffect } from 'react';

interface ModalProps extends PropsWithChildren {
  title: string;
  show: boolean;
  hide: () => void;
}

const Modal = ({ children, title, show, hide }: ModalProps) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [show]);

  if (!show) return null;
  return (
    <>
      <div className="Modal__backdrop" onClick={hide} />
      <div className="Modal">
        <header className="Modal__header">
          <h1 className="Modal__title">{title}</h1>
          <X className="Modal__close" width={28} height={28} onClick={hide} />
        </header>
        {children}
      </div>
    </>
  );
};

export default Modal;
