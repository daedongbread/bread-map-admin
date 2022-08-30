import React, { useMemo } from 'react';
import { Column } from 'react-table';
import { BakeryTable } from '@/components/Bakery';
import { Button } from '@/components/Shared/Button';
import { CompleteStatus as Status } from '@/components/Shared/CompleteStatus';
import type { CompleteStatusProps as StatusProps } from '@/components/Shared/CompleteStatus';
import { Pagination } from '@/components/Shared/Pagination';
import { SearchBar } from '@/components/Shared/SearchBar';
import { TableData } from '@/components/Shared/Table';
import usePagination from '@/hooks/usePagination';
import { bakeryUtils } from '@/utils';
import styled from '@emotion/styled';

type Bakery = {
  id: number;
  name: string;
  createdAt: string;
  modifiedAt: string;
  use: boolean;
};

export const BakeryContainer = () => {
  const columns: (Column & { percentage: number })[] = [
    { accessor: 'id', Header: 'Bakery_ID', percentage: 10 },
    { accessor: 'name', Header: '빵집이름', percentage: 25 },
    { accessor: 'notification', Header: '알람', percentage: 35 },
    { accessor: 'createdAt', Header: '최초 등록일', percentage: 10 },
    { accessor: 'modifiedAt', Header: '마지막 수정일', percentage: 10 },
    {
      accessor: 'use',
      Header: '상태',
      percentage: 10,
      Cell: ({ cell: { value } }) => (
        <Status color={value.color} text={value.text} />
      ),
    },
  ];

  // 임시데이터
  const data: TableData<
    Omit<Bakery, 'use'> & { use: StatusProps; notification: string }
  > = [
    {
      id: 1,
      name: '루엘드파리',
      notification: '',
      createdAt: '2021-03-02',
      modifiedAt: '2021-04-06',
      use: bakeryUtils.formatUseColumn(false),
    },
    {
      id: 2,
      name: '서울앵무새',
      notification: '',
      createdAt: '2021-04-07',
      modifiedAt: '2021-08-03',
      use: bakeryUtils.formatUseColumn(true),
    },
  ];

  const bakeryColumns = useMemo(() => columns, []);
  const bakeryData = useMemo(() => data, []);

  const TOTAL_COUNT = 500;
  const PER_COUNT = 15;

  const {
    currPage,
    leftPosition,
    onClickPage,
    onClickNext,
    onClickPrev,
    onClickEnd,
    onClickStart,
  } = usePagination(TOTAL_COUNT, PER_COUNT);

  return (
    <>
      <TopContainer>
        <SearchBarWrapper>
          <SearchBar placeholder="빵집 이름으로 검색하기" />
        </SearchBarWrapper>
        <Button text={'신규등록'} type={'orange'} size={'small'} />
      </TopContainer>
      <BakeryTable columns={bakeryColumns} data={bakeryData} />
      <Pagination
        totalCount={TOTAL_COUNT}
        perCount={PER_COUNT}
        currPage={currPage}
        leftPosition={leftPosition}
        onClickPage={onClickPage}
        onClickNext={onClickNext}
        onClickPrev={onClickPrev}
        onClickEnd={onClickEnd}
        onClickStart={onClickStart}
      />
    </>
  );
};

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.8rem;
`;

const SearchBarWrapper = styled.div`
  flex: 1;
  margin-right: 2.8rem;
`;
