import * as React from 'react';
import { SVGProps } from 'react';

export const Pencil = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={17}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
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
        d="M2 14V7.5h1V14a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7.5h1V14a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14ZM13 3v3.5l-2-2V3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5Z"
        fill="#000"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.293 2a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.707L8 2.707 1.354 9.353a.5.5 0 1 1-.708-.707L7.293 2Z"
        fill="#000"
      />
    </mask>
    <path
      d="M7.333 2.668H2.666a1.333 1.333 0 0 0-1.333 1.333v9.334a1.333 1.333 0 0 0 1.333 1.333H12a1.333 1.333 0 0 0 1.333-1.333V8.668"
      stroke="#424242"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.333 1.332c-.375 0-.735.149-1 .414L6 8.08l-.667 2.666L8 10.08l6.333-6.334a1.414 1.414 0 0 0-1-2.414Z"
      stroke="#424242"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
