import '@emotion/react';
import { color } from './theme';

declare module '@emotion/react' {
  export interface Theme {
    color: typeof color;
    mq: {
      laptop: string;
      tablet: string;
      mobile: string;
    };
  }
}
