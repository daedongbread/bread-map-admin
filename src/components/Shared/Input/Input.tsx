import React, { ChangeEvent } from 'react';
import { color } from '@/styles';
import styled from '@emotion/styled';

type InputStyles = {
  bgColor: string;
  fontColor: string;
  placeholderColor: string;
  borderColor?: string;
};

const inputs: { [key: string]: InputStyles } = {
  plain: {
    bgColor: color.white,
    fontColor: color.gray900,
    placeholderColor: color.gray500,
    borderColor: color.gray400,
  },
  gray: {
    bgColor: color.gray200,
    fontColor: color.gray500,
    placeholderColor: color.gray500,
  },
  disabled: {
    bgColor: color.gray100,
    fontColor: color.gray800,
    placeholderColor: color.gray800,
    borderColor: color.gray300,
  },
  orange: {
    bgColor: color.prmary50,
    fontColor: color.gray600,
    placeholderColor: color.gray600,
  },
};

type InputStyleType = 'plain' | 'gray' | 'disabled' | 'orange';

type PaddingType = 'small' | 'large';

type InputProps = {
  type: InputStyleType;
  padding?: PaddingType;
  placeholder?: string;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export const Input = ({ type, padding = 'small', placeholder, onChangeInput, value }: InputProps) => {
  const matchedStyle = Object.entries(inputs).find(([key]) => key === type);
  if (!matchedStyle) return <input />;

  return (
    <CustomInput
      value={value}
      onChange={onChangeInput}
      borderColor={matchedStyle[1].borderColor}
      fontColor={matchedStyle[1].fontColor}
      bgColor={matchedStyle[1].bgColor}
      placeholderColor={matchedStyle[1].placeholderColor}
      padding={padding}
      placeholder={placeholder || ''}
    />
  );
};

const CustomInput = styled.input<InputStyles & { padding?: PaddingType }>`
  padding: ${({ padding }) => (padding === 'small' ? '1rem 1.4rem' : '1.8rem 2.3rem')};
  border-radius: ${({ padding }) => (padding === 'small' ? '10px' : '16px')};
  width: 100%;
  outline: none;
  border: ${({ borderColor }) => (borderColor ? `1px solid ${borderColor}` : 'none')};
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ fontColor }) => fontColor};
  font-size: ${({ padding }) => (padding === 'small' ? '1.3rem' : '1.5rem')};

  ::placeholder {
    font-size: ${({ padding }) => (padding === 'small' ? '1.3rem' : '1.5rem')};
    color: ${({ placeholderColor }) => placeholderColor};
  }
`;
