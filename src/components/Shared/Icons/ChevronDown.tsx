import * as React from 'react';
import { SVGProps } from 'react';

export const ChevronDown = (props: SVGProps<SVGSVGElement>) => (
  <svg width={10} height={6} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M9 1 5 5 1 1" stroke="#BDBDBD" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
