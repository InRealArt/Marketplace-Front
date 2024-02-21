import React from 'react';
import Link from 'next/link';

type Props = {
  text: string;
  additionalClassName?: string;
  action?: () => void;
  link?: string;
  icon?: JSX.Element;
  disabled?: boolean;
};

const Button = ({
  text,
  additionalClassName,
  action,
  link,
  icon,
  disabled,
}: Props) => {
  const className = `Button Button--${additionalClassName}`;

  if (link)
    return (
      <Link className={className} href={link}>
        {text}
      </Link>
    );

  return (
    <button
      disabled={disabled}
      className={className}
      type="button"
      onClick={action}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};

export default Button;
