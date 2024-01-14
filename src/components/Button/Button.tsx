import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  text: string;
  additionalClassName?: string;
  action?: () => unknown;
  link?: string;
  icon?: string;
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
      {icon && (
        <Image
          className="Button__icon"
          priority={true}
          alt=""
          src={icon}
          width={28}
          height={28}
        />
      )}
      <span>{text}</span>
    </button>
  );
};

export default Button;
