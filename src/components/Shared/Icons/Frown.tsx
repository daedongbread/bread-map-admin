import * as React from 'react';
import { SVGProps } from 'react';

export const Frown = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={17} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M8 15.165A6.667 6.667 0 1 0 8 1.832a6.667 6.667 0 0 0 0 13.333Z" stroke="#000" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M10.666 11.165S9.666 9.832 8 9.832c-1.667 0-2.667 1.333-2.667 1.333"
      stroke="#000"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M6 6.5h.008M10 6.5h.008" stroke="#000" strokeWidth={1.333} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
