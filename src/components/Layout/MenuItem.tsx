import { ReactNode } from 'react';
import styled from '@emotion/styled';

type MenuItemProps = {
  icon: ReactNode;
  name: string;
  noti: number;
};

export const MenuItem = ({ icon, name, noti }: MenuItemProps) => {
  return (
    <ItemContainer>
      <a href="#">
        {icon}
        <span>{name}</span>
        <Notification>{noti}</Notification>
      </a>
    </ItemContainer>
  );
};

const ItemContainer = styled.li`
  padding: 1.6rem 2.7rem 1.6rem 2.2rem;

  a {
    width: 100%;
    display: flex;
    align-items: center;

    text-decoration: none;
    color: ${({ theme }) => theme.color.gray900};
    font-weight: bold;
    font-size: 1.4rem;
  }

  span {
    margin-left: 2rem;
    flex: 1;
  }
`;

const Notification = styled.div`
  color: ${({ theme }) => theme.color.primary500};
  background-color: ${({ theme }) => theme.color.primary100};
  display: inline-block;
  border-radius: 10px;
  padding: 0.2rem 1rem;
  font-weight: bold;
`;
