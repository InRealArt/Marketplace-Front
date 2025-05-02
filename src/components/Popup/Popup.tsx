import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';
import { PropsWithChildren } from 'react';

interface PopupProps extends PropsWithChildren {
  placement: 'bottom-end';
  buttonTrigger: JSX.Element;
}

const Popup = ({ placement, buttonTrigger, children }: PopupProps) => {
  return (
    <>
      <Popover key={placement} placement={placement} showArrow>
        <PopoverTrigger>{buttonTrigger}</PopoverTrigger>
        <PopoverContent className="rounded-[20px] border border-[#a6a6a6] bg-[#313130] p-[40px] mt-[12px] w-[200px]">
          {children}
        </PopoverContent>
      </Popover>
    </>
  );
};

export default Popup;
