import React from 'react';
import { Table } from '@/components/Shared';
import type { TableProps } from '@/components/Shared';

export const BakeriesTable = ({ route, columns, data, rowClickFn }: TableProps) => {
  return <Table route={route} columns={columns} data={data} rowClickFn={rowClickFn} />;
};
