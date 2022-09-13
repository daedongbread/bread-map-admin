import React from 'react';
import { Cell, HeaderGroup, Row, useTable } from 'react-table';
import styled from '@emotion/styled';
import { TableProps } from './types';

export const Table = ({ columns, data }: TableProps) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  if (columns.reduce((prev, curr) => prev + curr.percentage, 0) !== 100) {
    throw Error('table column의 percentage 합이 100이 되어야합니다.');
  }

  return (
    <TableWrapper {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup: HeaderGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: HeaderGroup, idx: number) => (
              <Th percentage={columns[idx].percentage} {...column.getHeaderProps()}>
                {column.render('Header')}
              </Th>
            ))}
          </tr>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row: Row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell: Cell, idx: number) => {
                return (
                  <Td percentage={columns[idx].percentage} {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </Td>
                );
              })}
            </tr>
          );
        })}
      </TableBody>
    </TableWrapper>
  );
};

const TableWrapper = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  display: flex;
  flex-direction: column;

  tr {
    display: flex;
    justify-content: space-between;
  }

  thead,
  tbody {
  }

  th,
  td {
    display: inline-block;
    padding: 1rem 0;
    min-width: 12rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.4rem;
  }
`;

const Th = styled.th<{ percentage?: number | undefined }>`
  width: ${({ percentage }) => (percentage ? `${percentage}%` : '100%')};
`;

const Td = styled.td<{ percentage?: number | undefined }>`
  width: ${({ percentage }) => (percentage ? `${percentage}%` : '100%')};
`;

const TableHead = styled.thead`
  tr {
    background-color: ${({ theme }) => theme.color.gray200};
  }
`;

const TableBody = styled.tbody`
  tr {
    &:nth-of-type(even) {
      background-color: ${({ theme }) => theme.color.gray50};
      border-top: ${({ theme }) => `1px solid ${theme.color.gray200}`};
    }
  }
`;
