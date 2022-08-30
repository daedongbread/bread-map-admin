import * as React from 'react';
import { SVGProps } from 'react';

export const ChevronLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={6}
    height={10}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5 1 1 5l4 4"
      stroke="#222"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
