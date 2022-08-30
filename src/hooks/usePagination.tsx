import React, { useCallback, useState } from 'react';

const LI_MARGIN = 0.6; // 양쪽 마진 합, rem
const LI_WIDTH = 3.5; // rem
const PAGING_COUNT = 5; // pagination 컴포넌트의 페이징 갯수

const usePagination = (totalPages: number, perCount: number) => {
  const [currPage, setCurrPage] = useState(1);
  const [leftPosition, setLeftPosition] = useState(0);

  const pageCount = totalPages / perCount; // 페이지 갯수
  const index = Math.floor(pageCount / PAGING_COUNT);
  const lastIndexLeft = (LI_MARGIN + LI_WIDTH) * PAGING_COUNT * index;

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

  const onClickEnd = useCallback(() => {
    if (leftPosition === lastIndexLeft) return;
    const updatedLeft = lastIndexLeft;
    setLeftPosition(updatedLeft);
  }, []);

  const onClickStart = useCallback(() => {
    const updatedLeft = 0;
    setLeftPosition(updatedLeft);
  }, []);

  return {
    currPage,
    leftPosition,
    onClickPage,
    onClickNext,
    onClickPrev,
    onClickEnd,
    onClickStart,
  };
};

export default usePagination;
