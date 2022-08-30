import React, { ReactNode } from 'react';
import { color } from '@/styles';
import styled from '@emotion/styled';

type Btn = {
  bgColor: string;
  fontColor: string;
  borderColor?: string;
};

const buttons: { [key: string]: Btn } = {
  orange: {
    bgColor: color.primary500,
    fontColor: color.white,
  },
  lightOrange: {
    bgColor: color.primary400,
    fontColor: color.white,
  },
  gray: {
    bgColor: color.gray500,
    fontColor: color.white,
  },
  white: {
    bgColor: color.white,
    fontColor: color.primary500,
    borderColor: color.primary500,
  },
};

type BtnColor = 'orange' | 'lightOrange' | 'gray' | 'white';

type BtnSize = 'large' | 'medium' | 'small';

type ButtonProps = {
  type: BtnColor;
  size: BtnSize;
  text: string;
  icon?: ReactNode;
};

export const Button = ({ type, size, text, icon }: ButtonProps) => {
  const button = Object.entries(buttons).find(([key, value]) => key === type)!;
  return (
    <BtnStyle size={size} {...button?.[1]}>
      {icon}
      {text}
    </BtnStyle>
  );
};

const BtnStyle = styled.button<Btn & { size: BtnSize }>`
  border-radius: 1rem;
  font-weight: bold;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ fontColor }) => fontColor};
  border: ${({ borderColor }) =>
    borderColor ? `1px solid ${borderColor}` : 'none'};
  padding: ${({ size }) =>
    size === 'large'
      ? '2.2rem 2.8rem'
      : size === 'medium'
      ? '1.2rem 5.4rem'
      : '1rem 1.8rem'};
  font-size: ${({ size }) =>
    size === 'large' ? '2rem' : size === 'medium' ? '1.6rem' : '1.4rem'};

  display: flex;
  justify-content: center;
  align-items: center;
  // svg 위치 설정 필요
`;
