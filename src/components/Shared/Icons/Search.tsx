import * as React from 'react';
import { SVGProps } from 'react';

export const Search = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={30}
    height={31}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13.75 24.219c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10ZM26.688 27.158l-5.438-5.437"
      stroke="#FF6E40"
      strokeWidth={1.875}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
