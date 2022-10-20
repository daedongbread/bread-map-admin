import React from 'react';
import { Cell, HeaderGroup, Row, useTable } from 'react-table';
import Routes from '@/constants/routes';
import styled from '@emotion/styled';
import { TableProps } from './types';

type obj = {
  [key: string]: any;
};

const getId = (original: obj, route: Routes): number => {
  let id: number;
  console.log('route', route);
  switch (route) {
    case Routes.BAKERIES:
      id = original.bakeryId;
      console.log('--. ', id);
      break;
    case Routes.BAKERY_REPORT:
      id = original.reportId;
      console.log(id);
      break;
    default:
      id = 0;
      break;
  }

  return id;
};

// TODO: 나중에 테이블컴포넌트 만들기
export const Table = ({ route, columns, data, rowClickFn }: TableProps) => {
  if (!data) {
    throw new Error('Table component의 data가 없습니다.');
  }

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
        {rows.map((row: Row<{ [key: string]: any }>) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} onClick={() => rowClickFn && rowClickFn(getId(row.original, route))}>
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
    padding: 1rem 0.8rem;
    min-width: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.4rem;
  }

  tbody {
    tr {
      cursor: pointer;
      &:hover {
        background-color: ${({ theme }) => theme.color.gray100};
      }
    }
  }
`;

const Th = styled.th<{ percentage?: number | undefined }>`
  width: ${({ percentage }) => (percentage ? `${percentage}%` : '100%')};
`;

const Td = styled.td<{ percentage?: number | undefined }>`
  text-align: center;
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
