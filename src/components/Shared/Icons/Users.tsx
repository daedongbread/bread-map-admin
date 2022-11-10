import * as React from 'react';
import { SVGProps } from 'react';

export const Users = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={17} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#a)" stroke="#000" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M11.334 14.5v-1.333A2.667 2.667 0 0 0 8.667 10.5H3.334a2.667 2.667 0 0 0-2.667 2.667V14.5M6 7.833A2.667 2.667 0 1 0 6 2.5a2.667 2.667 0 0 0 0 5.333ZM15.333 14.5v-1.334a2.667 2.667 0 0 0-2-2.58M10.667 2.586a2.667 2.667 0 0 1 0 5.167" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" transform="translate(0 .5)" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
