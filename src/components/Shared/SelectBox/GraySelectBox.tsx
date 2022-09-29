import React from 'react';
import { ChevronDown } from '@/components/Shared/Icons';
import styled from '@emotion/styled';

export type SelectOption = {
  name: string;
  value: string;
};

export type SelectBoxProps = {
  isOpen: boolean;
  width?: number;
  options: SelectOption[];
  onToggleSelectBox: () => void;
  selectedOption: SelectOption | null;
  onSelectOption: (option: SelectOption | null) => void;
};

// useSelectBox랑 이용
export const GraySelectBox = ({ isOpen, width, options, onToggleSelectBox, selectedOption, onSelectOption }: SelectBoxProps) => {
  return (
    <ContainerWrapper onClick={onToggleSelectBox} width={width}>
      <Container>
        <SelectTrigger>
          <span>{selectedOption?.name || '선택'}</span>
          <ChevronDown />
        </SelectTrigger>
        <SelectOptions isOpen={isOpen}>
          {options.map((option, idx) => (
            <Option key={idx} onClick={() => onSelectOption(option)}>
              {option.name}
            </Option>
          ))}
        </SelectOptions>
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

export const Option = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 0 1.5rem;
  font-size: 1.5rem;
  font-weight: 300;
  color: #3b3b3b;
  line-height: 3.8rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.color.gray100};
  }
`;

export const Text = styled.span``;

export const Price = styled.span``;
