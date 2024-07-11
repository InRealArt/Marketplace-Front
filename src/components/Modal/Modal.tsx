'use client'
import { X } from 'lucide-react';
import React, { PropsWithChildren, useEffect } from 'react';

interface ModalProps extends PropsWithChildren {
  title: string;
  show: boolean;
  hide: () => void;
  additionalClassName?: string
  disabledClosing?: boolean
}

const Modal = ({ children, title, show, hide, additionalClassName, disabledClosing }: ModalProps) => {
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
      <div className={`Modal__backdrop Modal__backdrop--${additionalClassName}`} onClick={!disabledClosing ? hide : () => {}} />
      <div className={`Modal Modal--${additionalClassName}`}>
        <header className="Modal__header">
          <h1 className="Modal__title">{title}</h1>
          {!disabledClosing && <X className="Modal__close" width={28} height={28} onClick={hide} />}
        </header>
        {children}
      </div>
    </>
  );
};

export default Modal;
