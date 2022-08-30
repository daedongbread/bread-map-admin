import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { ChevronDown } from '../Icons';

export type SelectOption = {
  name: string;
  [key: string]: any;
};

export type SelectBoxProps = {
  isOpen: boolean;
  width?: number;
  options?: SelectOption[]; // children 안주면 필수
  onToggleSelectBox: () => void;
  selectedOption: SelectOption | null;
  onSelectOption: (option: SelectOption) => void;
  children?: ReactNode;
};

export const SelectBox = ({
  isOpen,
  width,
  options,
  onToggleSelectBox,
  selectedOption,
  onSelectOption,
  children,
}: SelectBoxProps) => {
  console.log('rerender');
  return (
    <ContainerWrapper onClick={onToggleSelectBox} width={width}>
      <Container>
        {children ? (
          children
        ) : (
          <>
            <SelectTrigger>
              <span>{selectedOption?.name || '선택'}</span>
              <ChevronDown />
            </SelectTrigger>
            <SelectOptions isOpen={isOpen}>
              {options!.map((option, idx) => (
                <Option key={idx} onClick={() => onSelectOption(option)}>
                  {option.name}
                </Option>
              ))}
            </SelectOptions>
          </>
        )}
      </Container>
    </ContainerWrapper>
  );
};

export const ContainerWrapper = styled.div<{ width: number | undefined }>`
  position: relative;
  user-select: none;
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  margin-top: 1.2rem;
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border-width: 0 1px;
  border-style: solid;
  border-color: #9f9f9f;
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
  height: 5rem;
  line-height: 5rem;
  background: #ffffff;
  cursor: pointer;
  border-width: 1px 0;
  border-style: solid;
  border-color: #9f9f9f;

  img {
    width: 1.5rem;
  }
`;

export const SelectOptions = styled.div<{ isOpen: boolean }>`
  position: absolute;
  display: block;
  top: 100%;
  left: 0;
  right: 0;
  outline: 1px solid #9f9f9f;
  border-top: 0;
  background: #fff;
  transition: all 0.5s;
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  pointer-events: ${({ isOpen }) => (isOpen ? 'all' : 'none')};
  z-index: 2;
`;

export const Option = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 0 1.5rem;
  font-size: 1.5rem;
  font-weight: 300;
  color: #3b3b3b;
  line-height: 5rem;
  cursor: pointer;
  transition: all 0.5s;

  &:hover {
    cursor: pointer;
    background-color: #b2b2b2;
  }
`;

export const Text = styled.span``;

export const Price = styled.span``;
