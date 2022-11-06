import React from 'react';
import { ChevronDown } from '@/components/Shared/Icons';
import styled from '@emotion/styled';
import { SelectOption } from './SelectOption';

export const BasicSelectTrigger = ({ selectedOption }: { selectedOption: SelectOption | null }) => {
  return (
    <div>
      <Trigger>
        <span>{selectedOption?.name || '선택'}</span>
        <ChevronDown />
      </Trigger>
    </div>
  );
};

export const StatusSelectTrigger = ({ selectedOption }: { selectedOption: SelectOption | null }) => {
  return (
    <StatusTrigger color={(selectedOption && selectedOption.color) ?? ''}>
      <span>{selectedOption?.name}</span>
      <ChevronDown />
    </StatusTrigger>
  );
};

const Trigger = styled.div`
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

const StatusTrigger = styled(Trigger)<{ color: string }>`
  background: ${({ theme }) => theme.color.white};
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ color }) => color};
  }
  span {
    color: ${({ color }) => color};
    margin-left: 7px;
  }
`;
