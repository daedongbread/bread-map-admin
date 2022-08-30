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
      <button>
        <Search />
      </button>
    </Container>
  );
};

const Container = styled.div`
  position: relative;

  button {
    position: absolute;
    top: 43%;
    right: 22px;
    transform: scale(0.7) translateY(-50%);
  }
`;

const Input = styled.input`
  padding: 1.8rem 2.3rem;
  border-radius: 16px;
  width: 100%;
  border: ${({ theme }) => `1px solid ${theme.color.gray400}`};
  outline: none;

  ::placeholder {
    font-size: 1.5rem;
  }
`;
