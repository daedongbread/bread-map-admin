import React from 'react';
import styled from '@emotion/styled';

export type SelectOption = {
  name: string;
  value: string;
  color?: string;
};

type SelectOptionProps = {
  option: SelectOption;
  onSelectOption: (option: SelectOption | null) => void;
};

export const BasicSelectOption = ({ option, onSelectOption }: SelectOptionProps) => {
  return (
    <Option onClick={() => onSelectOption(option)}>
      <span>{option.name}</span>
    </Option>
  );
};

export const StatusSelectOption = ({ active, option, onSelectOption }: { active: boolean } & SelectOptionProps) => {
  return (
    <StatusOption active={active} onClick={() => onSelectOption(option)}>
      <span>{option.name}</span>
    </StatusOption>
  );
};

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
    background-color: ${({ theme }) => theme.color.gray100};
  }
`;

export const StatusOption = styled(Option)<{ active: boolean }>`
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
  background-color: ${({ theme, active }) => (active ? theme.color.primary100 : theme.color.white)};

  span {
    color: ${({ theme, active }) => (active ? theme.color.primary500 : theme.color.gray900)};
  }

  &:hover {
    background-color: ${({ theme, active }) => (!active ? theme.color.gray100 : theme.color.primary100)};
    color: ${({ theme }) => theme.color.primary500};
  }
`;
