'use client';
import { useState } from 'react';

interface ReadMoreProps {
  id: string;
  text: string;
  amountOfWords?: number;
  additionalClassName: string;
}

export const ReadMore = ({
  id,
  text,
  amountOfWords = 36,
  additionalClassName,
}: ReadMoreProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const splittedText = text.split(' ');
  const itCanOverflow = splittedText.length > amountOfWords;
  const beginText = itCanOverflow
    ? splittedText.slice(0, amountOfWords - 1).join(' ')
    : text;
  const endText = splittedText.slice(amountOfWords - 1).join(' ');

  const handleKeyboard = (e: any) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <>
      <span
        className={`${additionalClassName}__text`}
        dangerouslySetInnerHTML={{ __html: beginText }}
      />
      {itCanOverflow && (
        <>
          {!isExpanded && <span>... </span>}
          &nbsp;
          <span
            className={`${additionalClassName}__text ${
              !isExpanded && `${additionalClassName}__text--hidden`
            }`}
            aria-hidden={!isExpanded}
            dangerouslySetInnerHTML={{ __html: endText }}
          />
          &nbsp;
          <span
            className={`${additionalClassName}__more`}
            role="button"
            tabIndex={0}
            aria-expanded={isExpanded}
            aria-controls={id}
            onKeyDown={handleKeyboard}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Read less' : 'Read more'}
          </span>
        </>
      )}
    </>
  );
};
