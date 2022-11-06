import React from 'react';
import { color } from '@/styles';
import styled from '@emotion/styled';

type BtnStyles = {
  bgColor: string;
  fontColor: string;
  borderColor?: string;
};

const buttons: { [key: string]: BtnStyles } = {
  orange: {
    bgColor: color.primary500,
    fontColor: color.white,
  },
  lightOrange: {
    bgColor: color.primary400,
    fontColor: color.white,
  },
  reverseOrange: {
    bgColor: color.white,
    fontColor: color.primary500,
    borderColor: color.primary500,
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

type BtnColor = 'orange' | 'lightOrange' | 'reverseOrange' | 'gray' | 'white';

type Size = 'large' | 'medium' | 'small';

type ButtonProps = {
  type: BtnColor;
  text: string;
  btnSize?: Size;
  fontSize?: Size;
  icon?: React.ReactNode;
  onClickBtn?: () => void;
};

export const Button = ({ type, text, btnSize, fontSize = 'small', icon, onClickBtn }: ButtonProps) => {
  const onClickCustomBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (onClickBtn) {
      onClickBtn();
    }
  };

  const matchedStyle = Object.entries(buttons).find(([key]) => key === type);

  if (!matchedStyle) return <button />;

  return (
    <CustomBtn btnSize={btnSize} fontSize={fontSize} {...matchedStyle[1]} onClick={onClickCustomBtn}>
      {icon}
      {text}
    </CustomBtn>
  );
};

// 기본 스타일을 확장해서 만들 수 있는지 확인 필요
const CustomBtn = styled.button<BtnStyles & { btnSize?: Size; fontSize?: Size }>`
  border-radius: 0.9rem;
  background-color: ${({ bgColor }) => bgColor};
  border: ${({ borderColor }) => (borderColor ? `1px solid ${borderColor}` : 'none')};
  padding: ${({ btnSize }) =>
    btnSize === 'large' ? '2.2rem 2.8rem' : btnSize === 'medium' ? '1.2rem 2.2rem' : btnSize === 'small' ? '1rem 1.8rem' : '1.6rem 0'};
  width: ${({ btnSize }) => !btnSize && '100%'};
  font-weight: bold;
  color: ${({ fontColor }) => fontColor};
  font-size: ${({ fontSize }) => (fontSize === 'large' ? '2rem' : fontSize === 'medium' ? '1.6rem' : '1.4rem')};
  display: flex;
  justify-content: center;
  align-items: center;
  // svg 위치 설정 필요
`;
// btnSize 없애고 위아래 패딩으로?..
