import React from 'react';
import Link from 'next/link';

type Props = {
  text: string;
  additionalClassName?: string;
  action?: () => unknown;
  link?: string;
  icon?: JSX.Element;
};

const Button = ({ text, additionalClassName, action, link, icon }: Props) => {
  const className = `Button Button--${additionalClassName}`;

  if (link)
    return (
      <Link className={className} href={link}>
        {text}
      </Link>
    );

  return (
    <button className={className} type="button" onClick={action}>
      {icon}
      <span>{text}</span>
    </button>
  );
};

export default Button;
