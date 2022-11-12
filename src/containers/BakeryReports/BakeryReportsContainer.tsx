import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Column } from 'react-table';
import { useGetBakeryReports } from '@/apis';
import { BakeryReportsTable } from '@/components/BakeryReports';
import { Pagination, CompleteStatus as Status } from '@/components/Shared';

import { Header } from '@/components/Shared/Header';
import { GhRoutes } from '@/constants/routes';
import usePagination from '@/hooks/usePagination';

import { formatReflectStatusColumn } from '@/utils';
import styled from '@emotion/styled';

export const BakeryReportsContainer = () => {
  const navigate = useNavigate();
  const { currPage, totalItemCount, leftPosition, onChangeTotalCount, onClickPage, onClickNext, onClickPrev, onClickEnd, onClickStart } = usePagination({
    perCount: PER_COUNT,
  });

  const { data, error, loading, fetching } = useGetBakeryReports({ page: currPage });
  const bakeryReportsRow = data?.bakeryReports.map(report => ({ ...report, status: formatReflectStatusColumn(report.status) }));

  React.useEffect(() => {
    if (data && data.totalCount) onChangeTotalCount(data.totalCount);
  }, [data]);

  const bakeryReportsColumns = useMemo(() => COLUMNS, []);

  const onClickRequestItem = (reportId: number) => {
    navigate(`${GhRoutes.BAKERY_REPORT}/${reportId}`);
  };

  if (loading) {
    return <div>로딩중..</div>; // 에러 화면 or 메세지 필요
  }

  if (fetching) {
    return <div>fetching...</div>;
  }

  if (error || !bakeryReportsRow) {
    return <div>error...</div>;
  }

  return (
    <>
      <Header name={'제보관리'} />
      <Container>
        <BakeryReportsTable route={GhRoutes.BAKERY_REPORT} columns={bakeryReportsColumns} data={bakeryReportsRow} rowClickFn={onClickRequestItem} />
        <Pagination
          totalCount={totalItemCount}
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
    </>
  );
};

const COLUMNS: (Column & { percentage: number })[] = [
  { accessor: 'reportId', Header: 'NO.', percentage: 5 },
  { accessor: 'nickName', Header: '제보자', percentage: 9 },
  { accessor: 'bakeryName', Header: '빵집 이름', percentage: 18 },
  { accessor: 'location', Header: '빵집 위치', percentage: 18 },
  { accessor: 'content', Header: '추천 이유', percentage: 30 },
  { accessor: 'createdAt', Header: '제보날짜', percentage: 10 },
  {
    accessor: 'status',
    Header: '처리상태',
    percentage: 10,
    Cell: ({ cell: { value } }) => <Status color={value.color} text={value.text} />,
  },
];

const PER_COUNT = 20;

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
