import React from 'react';
import { ChevronLeft, ChevronRight } from '@/components/Shared/Icons';
import styled from '@emotion/styled';

type PaginationProps = {
  totalCount: number;
  perCount: number;
  currPage: number;
  leftPosition: number;
  onClickPage: (page: number) => void;
  onClickNext: () => void;
  onClickPrev: () => void;
  onClickEnd: () => void;
  onClickStart: () => void;
};

// usePagination이랑 같이 사용
export const Pagination = ({
  totalCount,
  perCount,
  currPage,
  leftPosition,
  onClickPage,
  onClickNext,
  onClickPrev,
  onClickEnd,
  onClickStart,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalCount / perCount);

  return (
    <PaginationContainer>
      <Container>
        <ArrowLeftWrapper>
          <Btn onClick={onClickStart} margin>
            <ChevronLeft />
            <ChevronLeft />
          </Btn>
          <Btn onClick={onClickPrev}>
            <ChevronLeft />
          </Btn>
        </ArrowLeftWrapper>
        <PagesWrapper currPage={currPage} left={leftPosition}>
          <ul>
            {Array(totalPages)
              .fill('')
              .map((_, i) => (
                <Li key={i} active={currPage === i} onClick={() => onClickPage(i)}>
                  {i + 1}
                </Li>
              ))}
          </ul>
        </PagesWrapper>
        <ArrowRightWrapper>
          <Btn onClick={onClickNext} margin>
            <ChevronRight />
          </Btn>
          <Btn onClick={onClickEnd}>
            <ChevronRight />
            <ChevronRight />
          </Btn>
        </ArrowRightWrapper>
      </Container>
    </PaginationContainer>
  );
};

const PaginationContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  position: absolute;
  height: inherit;
`;

const PagesWrapper = styled.div<{ currPage: number; left: number }>`
  width: 205px;
  height: inherit;
  position: relative;

  overflow-x: hidden;

  ul {
    position: absolute;
    width: 100000vw;
    left: ${({ left }) => `-${left}rem`};
    top: 50%;
    transform: translateY(-50%);
  }
`;

const Li = styled.li<{ active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  width: 3.5rem;
  height: 3.5rem;
  background-color: ${({ theme, active }) => active && theme.color.primary500};
  color: ${({ theme, active }) => active && theme.color.white};
  border-radius: 50%;
  cursor: pointer;
  margin: 0.3rem;
`;

const ArrowLeftWrapper = styled.div`
  position: absolute;
  left: -10rem;
  top: 50%;
  transform: translateY(-50%);
`;

const ArrowRightWrapper = styled.div`
  position: absolute;
  right: -10rem;
  top: 50%;
  transform: translateY(-50%);
`;

const Btn = styled.button<{ margin?: boolean }>`
  width: 3.8rem;
  height: 3.8rem;
  border-radius: 12px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-right: ${({ margin }) => (margin ? '10px' : 0)};
`;
