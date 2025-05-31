'use client';

import React from 'react';
import CustomTooltip from '@/components/ui/CustomTooltip';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

const TooltipExample = () => {
  return (
    <div className="flex flex-col gap-8 p-6">
      <h2 className="text-2xl font-bold">Tooltip Examples</h2>

      <div className="flex flex-wrap gap-8">
        {/* Basic tooltip */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Basic Tooltip</h3>
          <CustomTooltip
            trigger={<Button>Hover Me</Button>}
            content={<p>This is a basic tooltip</p>}
          />
        </div>

        {/* Tooltip with icon */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Icon Tooltip</h3>
          <CustomTooltip
            trigger={<Info className="h-5 w-5 text-blue-500 cursor-help" />}
            content={<p>Additional information</p>}
          />
        </div>

        {/* Tooltip with different positions */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Position Variations</h3>
          <div className="flex gap-4">
            <CustomTooltip
              trigger={<Button variant="outline">Top</Button>}
              content={<p>Tooltip on top</p>}
              side="top"
            />
            <CustomTooltip
              trigger={<Button variant="outline">Right</Button>}
              content={<p>Tooltip on right</p>}
              side="right"
            />
            <CustomTooltip
              trigger={<Button variant="outline">Bottom</Button>}
              content={<p>Tooltip on bottom</p>}
              side="bottom"
            />
            <CustomTooltip
              trigger={<Button variant="outline">Left</Button>}
              content={<p>Tooltip on left</p>}
              side="left"
            />
          </div>
        </div>

        {/* Disabled tooltip */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Disabled Tooltip</h3>
          <CustomTooltip
            trigger={<Button disabled>Disabled Button</Button>}
            content={<p>This tooltip won't show</p>}
            disabled={true}
          />
        </div>

        {/* Rich content tooltip */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Rich Content</h3>
          <CustomTooltip
            trigger={<Button variant="secondary">Feature Info</Button>}
            content={
              <div className="max-w-xs">
                <h4 className="font-bold">Feature Name</h4>
                <p className="text-sm mt-1">This feature helps you accomplish specific tasks with ease.</p>
                <ul className="list-disc list-inside text-xs mt-2">
                  <li>Benefit one</li>
                  <li>Benefit two</li>
                  <li>Benefit three</li>
                </ul>
              </div>
            }
            contentClassName="p-4"
          />
        </div>
      </div>
    </div>
  );
};

export default TooltipExample; 