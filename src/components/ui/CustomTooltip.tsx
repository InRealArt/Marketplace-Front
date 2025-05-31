'use client';

import React, { ReactNode } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface CustomTooltipProps {
  trigger: ReactNode;
  content: ReactNode;
  disabled?: boolean;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
}

const CustomTooltip = ({
  trigger,
  content,
  disabled = false,
  side = 'top',
  align = 'center',
  className = '',
  triggerClassName = '',
  contentClassName = '',
}: CustomTooltipProps) => {
  if (disabled) {
    return <div className={triggerClassName}>{trigger}</div>;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild className={triggerClassName}>
          <div className={className}>{trigger}</div>
        </TooltipTrigger>
        <TooltipContent side={side} align={align} className={contentClassName}>
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomTooltip; 