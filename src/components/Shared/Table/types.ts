import { Column } from 'react-table';

export type TableProps = {
  columns: readonly (Column & { percentage: number })[];
  data: readonly object[];
  rowClickFn?: (id: number) => void;
};

export type TableData<T extends object> = T[];
