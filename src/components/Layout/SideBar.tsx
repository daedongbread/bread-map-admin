import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarGraph, Frown, Pencil, Server, Users } from '@/components/Shared/Icons';
import Routes from '@/constants/routes';
import styled from '@emotion/styled';
import { MenuItem } from './MenuItem';

export const SideBar = () => {
  const location = useLocation();

  useEffect(() => {
    console.log('-->', location.pathname);
  }, [location]);

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
        <MenuLink to={Routes.BAKERY_REQUEST}>
          <MenuItem icon={<Pencil />} name={'제보관리'} noti={43} active={isCurrent(Routes.BAKERY_REQUEST)} />
        </MenuLink>
        <MenuLink to={Routes.BAKERIES}>
          <MenuItem icon={<Server />} name={'빵집관리'} noti={143} active={isCurrent(Routes.BAKERIES)} />
        </MenuLink>
        <MenuLink to={Routes.USER_REPORT}>
          <MenuItem icon={<Frown />} name={'신고목록'} active={isCurrent(Routes.USER_REPORT)} />
        </MenuLink>
        <MenuLink to={Routes.USERS}>
          <MenuItem icon={<Users />} name={'사용자관리'} active={isCurrent(Routes.USERS)} />
        </MenuLink>
      </ul>
    </Container>
  );
};

const Container = styled.div`
  width: 27rem;
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
