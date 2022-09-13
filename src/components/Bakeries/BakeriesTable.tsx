import React from 'react';
import { Table } from '@/components/Shared/Table';
import type { TableProps } from '@/components/Shared/Table';

export const BakeriesTable = ({ columns, data }: TableProps) => {
  return <Table columns={columns} data={data} />;
};
