import React from 'react';
import styled from '@emotion/styled';

type PreviewProps = {
  src: string | null;
  widthRem: number;
  heightRem: number;
  onClickTriggerFile: () => void;
};

// img 가로,세로 계산해서 fit하게 해주는 작업 필요
export const Preview = ({ src, widthRem, heightRem, onClickTriggerFile }: PreviewProps) => {
  return (
    <Container widthRem={widthRem} heightRem={heightRem} onClick={onClickTriggerFile}>
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
  cursor: pointer;
  object-fit: cover;
  overflow: hidden;

  > span {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.color.gray500};
  }

  > input {
    position: absolute;
    top: 0;
  }

  > img {
    min-width: 100%;
  }
`;
