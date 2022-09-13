import * as React from 'react';
import { SVGProps } from 'react';

export const Server = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={17} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M13.334 1.836H2.667c-.736 0-1.333.597-1.333 1.333v2.667c0 .736.597 1.333 1.333 1.333h10.667c.736 0 1.333-.597 1.333-1.333V3.169c0-.736-.597-1.333-1.333-1.333ZM13.334 9.836H2.667c-.736 0-1.333.597-1.333 1.333v2.667c0 .736.597 1.333 1.333 1.333h10.667c.736 0 1.333-.597 1.333-1.333v-2.667c0-.736-.597-1.333-1.333-1.333Z"
      stroke="#000"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M4 4.5h.007M4 12.5h.007" stroke="#000" strokeWidth={1.333} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
