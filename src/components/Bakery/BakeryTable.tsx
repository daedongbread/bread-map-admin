import React from 'react';
import { Table } from '@/components/Shared/Table';
import type { TableProps } from '@/components/Shared/Table';

export const BakeryTable = ({ columns, data }: TableProps) => {
  return <Table columns={columns} data={data} />;
};
