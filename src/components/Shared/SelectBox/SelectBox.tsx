import React from 'react';
import styled from '@emotion/styled';

export type SelectBoxProps = {
  width?: number;
  isOpen: boolean;
  onToggleSelectBox: () => void;
  triggerComponent: JSX.Element;
  children: React.ReactNode;
};

// useSelectBox랑 이용
export const SelectBox = ({ width, isOpen, onToggleSelectBox, triggerComponent, children }: SelectBoxProps) => {
  return (
    <ContainerWrapper onClick={onToggleSelectBox} width={width}>
      <Container>
        {triggerComponent}
        <SelectOptions isOpen={isOpen}>{children}</SelectOptions>
      </Container>
    </ContainerWrapper>
  );
};

export const ContainerWrapper = styled.div<{ width: number | undefined }>`
  position: relative;
  user-select: none;
  width: ${({ width }) => (width ? `${width}px` : '100%')};

  > span,
  div {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.color.gray900};
    font-weight: 400;
  }
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const SelectTrigger = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  font-size: 1.5rem;
  font-weight: 300;
  color: #3b3b3b;
  height: 3.8rem;
  line-height: 3.8rem;
  background: ${({ theme }) => theme.color.gray100};
  cursor: pointer;
  border: ${({ theme }) => `1px solid ${theme.color.gray500}`};
  border-radius: 10px;

  img {
    width: 1.5rem;
  }
`;

export const SelectOptions = styled.div<{ isOpen: boolean }>`
  position: absolute;
  display: block;
  top: calc(100% + 10px);
  left: 0;
  right: 0;
  outline: ${({ theme }) => `1px solid ${theme.color.gray300}`};
  border-top: 0;
  background: #fff;
  transition: all 0.2s;
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  pointer-events: ${({ isOpen }) => (isOpen ? 'all' : 'none')};
  z-index: 2;
  border-radius: 10px;
  overflow: hidden;
`;
