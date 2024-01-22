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
        <PopoverContent>{children}</PopoverContent>
      </Popover>
    </>
  );
};

export default Popup;
