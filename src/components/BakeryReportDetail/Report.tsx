import React from 'react';
import styled from '@emotion/styled';
import ContentRow from './ContentRow';

// TODO: 나중에 같은 형식으로 UI 나오면 공통 레이아웃으로 잡기

export type ContentsRow = {
  label: string;
  text: string;
  type: 'input' | 'textarea';
};

type Props = {
  contents: ContentsRow[];
};

export const Report = ({ contents }: Props) => {
  return (
    <Container>
      {contents.map(item => (
        <ContentRow key={item.label} type={item.type} title={item.label} content={item.text} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 0.9rem;
`;
