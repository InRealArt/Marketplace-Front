import React from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';


type Props = {
  text: string;
  additionalClassName?: string;
  activeClassName?: string;
  action?: (() => void) | ((e: unknown) => void);
  link?: string;
  icon?: JSX.Element;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
};

const Button = ({
  text,
  additionalClassName,
  activeClassName,
  action,
  link,
  icon,
  disabled,
  type = "button",
  className
}: Props) => {
  const baseStyles = "font-poppins text-base md:text-lg tracking-[-1px] font-bold flex md:py-[15px] md:px-[30px] text-center justify-center items-center gap-2.5 rounded-[10px] bg-transparent text-white border-none cursor-pointer disabled:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none py-[15px] px-[15px] mx-auto m-0";
  
  const variantStyles = {
    gold: "bg-[#b39e73]",
    goldBorder: "border-[3px] border-[#b39e73]",
    whiteBorder: "border border-white py-3 px-[30px] active:bg-white active:text-black",
    purple: "bg-[#786df2]",
    'purple--marginTop': "bg-[#786df2] mt-5",
    blur: "py-[13px] px-[15px] border border-white bg-white/30 backdrop-blur-[26px] text-sm w-max",
    login: "bg-[#b39e73] text-white",
    logout: "bg-[#9d4141] text-white",
    viewAll: "w-20 border border-white py-3 px-[30px] m-0 md:hidden",
    'viewAll--mobile': "hidden md:flex md:ml-auto",
    verifyCaptcha: "w-20 bg-[#b39e73] text-white",
    large: "py-[15px] px-0",
    small: "!py-[10px] !px-[12px] !md:py-[12px] !md:px-[15px] !text-xs"
  };

  const activeStyles = activeClassName === 'active' && additionalClassName === 'whiteBorder' 
    ? "bg-white text-black" 
    : "";

  const additionalStyles = additionalClassName?.split(' ').map(style => variantStyles[style as keyof typeof variantStyles]).join(' ')

  const computedClassNames = twMerge(
    baseStyles,
    additionalClassName ? additionalStyles : "",
    activeStyles,
    className
  );

  const actionOnClick = (e: unknown) => {
    if (disabled) {
      return;
    }
    action?.(e)
  }

  if (link) {
    return (
      <Link className={computedClassNames} href={link} onClick={actionOnClick}>
        {text}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled}
      className={computedClassNames}
      type={type}
      onClick={actionOnClick}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};

export default Button;
