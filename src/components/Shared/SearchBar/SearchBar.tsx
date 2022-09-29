import React from 'react';
import { Input } from '@/components/Shared';
import { Search } from '@/components/Shared/Icons';
import styled from '@emotion/styled';

type Props = {
  placeholder: string;
};

export const SearchBar = ({ placeholder }: Props) => {
  return (
    <Container>
      <Input placeholder={placeholder} type={'plain'} padding={'large'} />
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
