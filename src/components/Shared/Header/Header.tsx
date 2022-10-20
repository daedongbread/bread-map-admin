import React from 'react';
import styled from '@emotion/styled';

type Props = {
  name: string;
};

export const Header = ({ name }: Props) => {
  return (
    <Container>
      <h1>{name}</h1>
    </Container>
  );
};

const Container = styled.div`
  padding: 3rem 6rem;
  border-bottom: ${({ theme }) => `1px solid ${theme.color.gray200}`};

  > h1 {
    font-size: 2rem;
    font-weight: 800;
  }
`;
