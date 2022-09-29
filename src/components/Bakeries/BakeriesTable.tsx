import React from 'react';
import { Table } from '@/components/Shared';
import type { TableProps } from '@/components/Shared';

export const BakeriesTable = ({ columns, data }: TableProps) => {
  return <Table columns={columns} data={data} />;
};
