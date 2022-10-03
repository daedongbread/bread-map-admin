import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Frown, Pencil, Server, Users } from '@/components/Shared/Icons';
import Routes from '@/constants/routes';
import styled from '@emotion/styled';
import { MenuItem } from './MenuItem';

export const SideBar = () => {
  const location = useLocation();

  const isCurrent = (path: Routes) => {
    const url = location.pathname;
    const detailRegex = /(\/.*)(?:\/)\w/;
    const regex = /(\/.*)/;
    const matched = url.match(detailRegex) || url.match(regex);

    return path === matched?.[1];
  };

  return (
    <Container>
      <Header>
        <h1>대동빵지도</h1>
      </Header>
      <ul>
        {SidebarMenu.map(menu => (
          <MenuLink to={menu.path}>
            <MenuItem icon={menu.icon} name={menu.name} noti={menu.noti} active={isCurrent(menu.path)} />
          </MenuLink>
        ))}
      </ul>
    </Container>
  );
};

const SidebarMenu = [
  {
    name: '제보관리',
    path: Routes.BAKERY_REQUEST,
    icon: <Pencil />,
    noti: 43,
  },
  {
    name: '빵집관리',
    path: Routes.BAKERIES,
    icon: <Server />,
    noti: 141,
  },
  {
    name: '신고목록',
    path: Routes.USER_REPORT,
    icon: <Frown />,
    noti: 0,
  },
  {
    name: '사용자관리',
    path: Routes.USERS,
    icon: <Users />,
    noti: 0,
  },
];

const Container = styled.div`
  width: ${({ theme }) => theme.size.sidebarWidth};
`;

const Header = styled.div`
  padding: 3rem 2.4rem;

  h1 {
    font-size: 2rem;
    font-weight: bold;
  }
`;

const MenuLink = styled(Link)`
  text-decoration: none;
`;
