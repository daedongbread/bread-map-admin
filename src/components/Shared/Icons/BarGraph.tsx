import * as React from 'react';
import { SVGProps } from 'react';

export const BarGraph = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={17} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <mask
      id="a"
      style={{
        maskType: 'alpha',
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={16}
      height={17}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 11.5H2v3h2v-3Zm5-4H7v7h2v-7Zm5-5h-2v12h2v-12Zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-12a1 1 0 0 0-1-1h-2Zm-6 6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7Zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3Z"
        fill="#000"
      />
    </mask>
    <g mask="url(#a)">
      <path fill="#FF6E40" d="M0 .5h16v16H0z" />
    </g>
  </svg>
);
