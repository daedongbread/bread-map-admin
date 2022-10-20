import { Column } from 'react-table';
import Routes from '@/constants/routes';

export type TableProps = {
  route: Routes;
  columns: readonly (Column & { percentage: number })[];
  data: readonly object[];
  rowClickFn?: (id: number) => void;
};

export type TableData<T extends object> = T[];
