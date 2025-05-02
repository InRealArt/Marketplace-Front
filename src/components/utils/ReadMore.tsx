'use client';
import { useState } from 'react';

interface ReadMoreProps {
  id: string;
  text: string;
  amountOfWords?: number;
  additionalClassName?: string;
  action?: () => void;
}

export const ReadMore = ({
  id,
  text,
  amountOfWords = 36,
  additionalClassName,
  action,
}: ReadMoreProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const splittedText = text.split(' ');
  const itCanOverflow = splittedText.length > amountOfWords;
  const beginText = itCanOverflow
    ? splittedText.slice(0, amountOfWords - 1).join(' ')
    : text;
  const endText = splittedText.slice(amountOfWords - 1).join(' ');

  const handleClickOnReadMore = () => {
    if (action) {
      action();
    } else {
      setIsExpanded(!isExpanded);
    }
  };
  const handleKeyboard = (e: any) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <>
      <span
        className={additionalClassName}
        dangerouslySetInnerHTML={{ __html: beginText }}
      />
      {itCanOverflow && (
        <>
          {!isExpanded && <span>... </span>}
          &nbsp;
          <span
            className={`${additionalClassName} ${!isExpanded ? 'hidden' : ''}`}
            aria-hidden={!isExpanded}
            dangerouslySetInnerHTML={{ __html: endText }}
          />
          &nbsp;
          <span
            className="cursor-pointer text-[#b39e73] font-bold"
            role="button"
            tabIndex={0}
            aria-expanded={isExpanded}
            aria-controls={id}
            onKeyDown={handleKeyboard}
            onClick={handleClickOnReadMore}
          >
            {isExpanded ? 'Read less' : 'Read more'}
          </span>
        </>
      )}
    </>
  );
};
