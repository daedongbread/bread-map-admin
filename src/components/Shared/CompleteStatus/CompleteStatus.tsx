import React from 'react';
import styled from '@emotion/styled';

export type CompleteStatusProps = {
  color: string;
  text: string;
};

export const CompleteStatus = ({ color, text }: CompleteStatusProps) => {
  return (
    <Container color={color}>
      <div></div>
      <span>{text}</span>
    </Container>
  );
};

const Container = styled.div<{ color: string }>`
  display: flex;
  align-items: center;

  div {
    background-color: ${({ color }) => color};
    border-radius: 50%;
    width: 6px;
    height: 6px;
    margin-right: 4px;
  }

  span {
    color: ${({ color }) => color};
  }
`;
