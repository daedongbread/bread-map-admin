import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Column } from 'react-table';
import { BakeriesItemEntity, useGetBakeries } from '@/apis';
import { BakeriesTable } from '@/components/Bakeries';
import { Button, TableData, SearchBar, Pagination, CompleteStatus as Status } from '@/components/Shared';
import type { CompleteStatusProps as StatusProps } from '@/components/Shared';

import Routes from '@/constants/routes';
import usePagination from '@/hooks/usePagination';

import styled from '@emotion/styled';

type BakeriesTableData = TableData<Omit<BakeriesItemEntity, 'status'> & { status: StatusProps; notification: string }>;

export const BakeriesContainer = () => {
  const navigate = useNavigate();
  const { currPage, leftPosition, onClickPage, onClickNext, onClickPrev, onClickEnd, onClickStart } = usePagination(TOTAL_COUNT, PER_COUNT);

  const [bakeries, setBakeries] = React.useState<BakeriesTableData>([]);

  React.useEffect(() => {
    const { bakeries, loading } = useGetBakeries({ page: currPage });
    // loading중일때 로딩화면 보여주기
    console.log(currPage, 'bakeries', bakeries);
    setBakeries(bakeries);
  }, [currPage]);

  const bakeryColumns = useMemo(() => columns, []);

  const onClickTableRow = () => {
    navigate(`${Routes.BAKERIES}/4`);
  };

  const onClickCreate = () => {
    navigate(`${Routes.BAKERIES}/new`);
  };

  return (
    <Container>
      <TopContainer>
        <SearchBarWrapper>
          <SearchBar placeholder={'빵집 이름으로 검색하기'} />
        </SearchBarWrapper>
        <Button text={'신규등록'} type={'orange'} btnSize={'medium'} onClickBtn={onClickCreate} />
      </TopContainer>
      <BakeriesTable columns={bakeryColumns} data={bakeries} rowClickFn={onClickTableRow} />
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
    </Container>
  );
};

const columns: (Column & { percentage: number })[] = [
  { accessor: 'bakeryId', Header: 'Bakery_ID', percentage: 10 },
  { accessor: 'name', Header: '빵집이름', percentage: 25 },
  { accessor: 'notification', Header: '알람', percentage: 35 },
  { accessor: 'createdAt', Header: '최초 등록일', percentage: 10 },
  { accessor: 'modifiedAt', Header: '마지막 수정일', percentage: 10 },
  {
    accessor: 'status',
    Header: '상태',
    percentage: 10,
    Cell: ({ cell: { value } }) => <Status color={value.color} text={value.text} />,
  },
];

const TOTAL_COUNT = 500;
const PER_COUNT = 15;

const Container = styled.div`
  padding: 3rem 6rem;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.8rem;
`;

const SearchBarWrapper = styled.div`
  flex: 1;
  margin-right: 2.8rem;
`;
