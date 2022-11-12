import { Column } from 'react-table';
import { GhRoutes } from '@/constants/routes';

export type TableProps = {
  route: GhRoutes;
  columns: readonly (Column & { percentage: number })[];
  data: readonly object[];
  rowClickFn?: (id: number) => void;
};

export type TableData<T extends object> = T[];
