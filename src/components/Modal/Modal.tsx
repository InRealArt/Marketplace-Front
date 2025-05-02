'use client'
import { X } from 'lucide-react';
import React, { PropsWithChildren, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

interface ModalProps extends PropsWithChildren {
  title: string;
  show: boolean;
  hide: () => void;
  additionalClassName?: 'login';
  disabledClosing?: boolean;
  withoutHeader?: boolean;
}

const Modal = ({ children, title, show, hide, additionalClassName, disabledClosing, withoutHeader }: ModalProps) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [show]);

  if (!show) return null;

  const backdropClasses = twMerge(
    "fixed w-screen h-screen z-[499] left-0 top-0 bg-[rgba(49,49,48,0.5)] backdrop-blur-[1px]",
    additionalClassName === 'login' && "bg-[rgba(49,49,48,0.8)] backdrop-blur-[4px]"
  );

  const modalClasses = twMerge(
    "fixed z-[500] w-[90%] sm:w-[70%] max-w-[740px] p-[30px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 box-border transition-all duration-300 ease-out rounded-[20px] border border-[#a6a6a6] bg-[#313130]",
    additionalClassName === 'login' && "p-0"
  );

  return (
    <>
      <div
        className={backdropClasses}
        onClick={!disabledClosing ? hide : () => { }}
      />
      <div className={modalClasses}>
        {!withoutHeader && <header className="pb-5 border-b border-[#dedcd838]">
          <h1 className="font-poppins text-2xl tracking-[-1.5px] font-semibold text-center leading-[29px] sm:text-[24px] sm:w-auto sm:m-0">
            {title}
          </h1>
          {!disabledClosing && (
            <X
              className="cursor-pointer absolute top-[30px] right-[30px]"
              width={28}
              height={28}
              onClick={hide}
            />
          )}
        </header>}
        {withoutHeader && (
          <X
            className="cursor-pointer absolute top-[10px] right-[30px]"
            width={28}
            height={28}
            onClick={hide}
          />
        )}
        {children}
      </div>
    </>
  );
};

export default Modal;
