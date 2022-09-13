import React from 'react';
import styled from '@emotion/styled';

type PreviewProps = {
  src: string | null;
  widthRem: number;
  heightRem: number;
};

export const Preview = ({ src, widthRem, heightRem }: PreviewProps) => {
  return (
    <Container widthRem={widthRem} heightRem={heightRem}>
      {src ? <img src={src} /> : <span>클릭 후 이미지 업로드</span>}
    </Container>
  );
};

const Container = styled.div<{ widthRem: number; heightRem: number }>`
  background-color: ${({ theme }) => theme.color.gray100};
  border: ${({ theme }) => `1px solid ${theme.color.gray400}`};
  border-radius: 10px;
  width: ${({ widthRem }) => `${widthRem}rem`};
  height: ${({ heightRem }) => `${heightRem}rem`};
  display: flex;
  justify-content: center;
  align-items: center;

  > span {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.color.gray500};
  }
`;
