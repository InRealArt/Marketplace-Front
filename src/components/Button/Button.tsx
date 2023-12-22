import React from 'react';
import Link from 'next/link';

type Props = {
  text: string;
  additionalClassName?: string;
  action?: () => unknown;
  link?: string;
};

const Button = ({ text, additionalClassName, action, link }: Props) => {
  const className = `Button Button--${additionalClassName}`;

  if (link)
    return (
      <Link className={className} href={link}>
        {text}
      </Link>
    );

  return (
    <button className={className} type="button" onClick={action}>
      {text}
    </button>
  );
};

export default Button;
