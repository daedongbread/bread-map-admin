import { BarGraph, Pencil } from '@/components/Shared/Icons';
import styled from '@emotion/styled';
import { MenuItem } from './MenuItem';

export const SideBar = () => {
  return (
    <Container>
      <Header>
        <h1>대동빵지도</h1>
      </Header>
      <ul>
        <MenuItem icon={<Pencil />} name={'제보관리'} noti={43} />
        <MenuItem icon={<BarGraph />} name={'빵집관리'} noti={143} />
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
