import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Column } from 'react-table';
import { useGetBakeries } from '@/apis';
import { BakeriesTable } from '@/components/Bakeries';
import { Button, SearchBar, Pagination, CompleteStatus as Status } from '@/components/Shared';

import Routes from '@/constants/routes';
import usePagination from '@/hooks/usePagination';

import { formatPostStatusColumn } from '@/utils';
import styled from '@emotion/styled';

export const BakeriesContainer = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = React.useState('');
  const [word, setWord] = React.useState('');
  const { currPage, totalItemCount, leftPosition, onChangeTotalCount, onClickPage, onClickNext, onClickPrev, onClickEnd, onClickStart } = usePagination({
    perCount: PER_COUNT,
  });

  const { data, error, loading, fetching, refetch } = useGetBakeries({ page: currPage });
  const bakeriesRow = data?.bakeries.map(bakery => ({ ...bakery, notification: '', status: formatPostStatusColumn(bakery.status) }));
  // 추후 알람영역 활성화

  React.useEffect(() => {
    if (data && data.totalCount) onChangeTotalCount(data.totalCount);
  }, [data]);

  const bakeryColumns = useMemo(() => COLUMNS, []);

  const onClickBakeryItem = (bakeryId: number) => {
    console.log('bakeryId', bakeryId);
    navigate(`${Routes.BAKERIES}/${bakeryId}`);
  };

  const onChangeText = (text: string) => {
    setSearchText(text);
  };

  // const onChangeWord = () => {
  //   setWord(searchText);
  // };

  const onClickCreate = () => {
    navigate(`${Routes.BAKERIES}/new`);
  };

  const onSearch = () => {
    setWord(searchText);
    refetch();
  };

  if (loading) {
    return <div>로딩중..</div>; // 에러 화면 or 메세지 필요
  }

  if (fetching) {
    return <div>fetching...</div>;
  }

  if (error || !bakeriesRow) {
    return <div>error...</div>;
  }

  return (
    <Container>
      <TopContainer>
        <SearchBarWrapper>
          <SearchBar placeholder={'빵집 이름으로 검색하기'} text={searchText} onChangeText={onChangeText} onSearch={onSearch} />
        </SearchBarWrapper>
        <Button text={'신규등록'} type={'orange'} btnSize={'medium'} onClickBtn={onClickCreate} />
      </TopContainer>
      <BakeriesTable route={Routes.BAKERIES} columns={bakeryColumns} data={bakeriesRow} rowClickFn={onClickBakeryItem} />
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
  );
};

const COLUMNS: (Column & { percentage: number })[] = [
  { accessor: 'bakeryId', Header: 'Bakery_ID', percentage: 15 },
  { accessor: 'name', Header: '빵집이름', percentage: 25 },
  { accessor: 'notification', Header: '알람', percentage: 30 },
  { accessor: 'createdAt', Header: '최초 등록일', percentage: 10 },
  { accessor: 'modifiedAt', Header: '마지막 수정일', percentage: 10 },
  {
    accessor: 'status',
    Header: '상태',
    percentage: 10,
    Cell: ({ cell: { value } }) => <Status color={value.color} text={value.text} />,
  },
];

const PER_COUNT = 20; // default로 20 놓을지 고민

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
