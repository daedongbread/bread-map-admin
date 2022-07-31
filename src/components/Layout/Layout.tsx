import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import { SearchBar } from '../Shared/SearchBar/SearchBar';
import { SideBar } from './SideBar';

export const Layout = () => {
  return (
    <Container>
      <aside>
        <SideBar />
      </aside>
      <main>
        <Outlet />
      </main>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;

  aside {
    width: 300px;
    border-right: ${({ theme }) => `1px solid ${theme.color.gray200}`};
  }

  main {
    flex: 1;
    padding: 3rem 6rem;
  }
`;
