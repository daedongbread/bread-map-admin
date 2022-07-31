import React from 'react';
import styled from '@emotion/styled';
import { Search } from '../Icons';

type Props = {
  placeholder: string;
};

export const SearchBar = ({ placeholder }: Props) => {
  return (
    <Container>
      <Input placeholder={placeholder} />
      <Search />
    </Container>
  );
};

const Container = styled.div`
  position: relative;

  svg {
    position: absolute;
    top: 45%;
    right: 22px;
    transform: scale(0.8) translateY(-50%);
  }
`;

const Input = styled.input`
  padding: 2.1rem 2.3rem;
  border-radius: 16px;
  width: 100%;
  border: ${({ theme }) => `1px solid ${theme.color.gray400}`};

  ::placeholder {
    font-size: 1.5rem;
  }
`;
