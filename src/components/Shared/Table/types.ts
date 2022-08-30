import { Column } from 'react-table';

export type TableProps = {
  columns: readonly (Column & { percentage: number })[];
  data: readonly object[];
};

export type TableData<T extends object> = T[];
