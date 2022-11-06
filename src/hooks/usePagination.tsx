import React, { useCallback, useState } from 'react';

const LI_MARGIN = 0.6; // 양쪽 마진 합, rem
const LI_WIDTH = 3.5; // rem
const PAGING_COUNT = 5; // pagination 컴포넌트의 페이징 갯수
// PER_COUNT = 20; // 한 페이지의 리스트 갯수. Pagination 컴포넌트에서도 써야하기때문에 Pagination이 쓰이는 곳마다 선언필요 -> 어떻게해야 안쓸수 있을지..?

const usePagination = ({ totalCount, perCount }: { totalCount?: number; perCount: number }) => {
  const [currPage, setCurrPage] = useState(0);
  const [leftPosition, setLeftPosition] = useState(0);
  const [lastIndexLeft, setLastIndexLeft] = useState(0);
  const [totalItemCount, setTotalItemCount] = useState(0);

  React.useEffect(() => {
    if (totalCount) {
      setTotalItemCount(totalCount);
    }
  }, []);

  React.useEffect(() => {
    const pageCount = totalItemCount / perCount; // 페이지 갯수
    const index = Math.floor(pageCount / PAGING_COUNT);
    const left = (LI_MARGIN + LI_WIDTH) * PAGING_COUNT * index;
    setLastIndexLeft(left);
  }, [totalItemCount]);

  const onChangeTotalCount = (count: number) => {
    setTotalItemCount(count);
  };

  const onClickPage = (page: number) => {
    setCurrPage(page);
  };

  const onClickNext = () => {
    if (leftPosition === lastIndexLeft) return;
    const updatedLeft = leftPosition + (LI_MARGIN + LI_WIDTH) * PAGING_COUNT;
    setLeftPosition(updatedLeft);
  };

  const onClickPrev = () => {
    if (leftPosition === 0) return;
    const updatedLeft = leftPosition - (LI_MARGIN + LI_WIDTH) * PAGING_COUNT;
    setLeftPosition(updatedLeft);
  };

  const onClickEnd = () => {
    if (leftPosition === lastIndexLeft) return;
    const updatedLeft = lastIndexLeft;
    setLeftPosition(updatedLeft);
  };

  const onClickStart = useCallback(() => {
    const updatedLeft = 0;
    setLeftPosition(updatedLeft);
  }, []);

  return {
    currPage,
    totalItemCount,
    leftPosition,
    onChangeTotalCount,
    onClickPage,
    onClickNext,
    onClickPrev,
    onClickEnd,
    onClickStart,
  };
};

export default usePagination;
