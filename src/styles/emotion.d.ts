import '@emotion/react';
import { size, color } from './theme';

declare module '@emotion/react' {
  export interface Theme {
    color: typeof color;
    size: typeof size;
    mq: {
      laptop: string;
      tablet: string;
      mobile: string;
    };
  }
}
