import React from 'react';
import Link from 'next/link';

type Props = {
  text: string;
  additionalClassName?: string;
  activeClassName?: string;
  action?: (() => void) | ((e: unknown) => void);
  link?: string;
  icon?: JSX.Element;
  disabled?: boolean;
  type?: "button" | "submit" | "reset"
};

const Button = ({
  text,
  additionalClassName,
  activeClassName,
  action,
  link,
  icon,
  disabled,
  type = "button"
}: Props) => {
  const className = `Button ${additionalClassName ? `Button--${additionalClassName}` : ""} ${activeClassName ? `Button--${activeClassName}` : ""}`;

  if (link)
    return (
      <Link className={className} href={link} onClick={action}>
        {text}
      </Link>
    );

  return (
    <button
      disabled={disabled}
      className={className}
      type={type}
      onClick={action}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};

export default Button;
