import { ReactNode } from 'react';
import styled from '@emotion/styled';

type MenuItemProps = {
  icon: ReactNode;
  name: string;
  active: boolean;
  noti?: number;
};

export const MenuItem = ({ icon, name, active, noti }: MenuItemProps) => {
  return (
    <ItemContainer active={active}>
      <div>
        {icon}
        <span>{name}</span>
        {noti && <Notification>{noti}</Notification>}
      </div>
    </ItemContainer>
  );
};

const ItemContainer = styled.li<{ active: boolean }>`
  padding: 1.6rem 2.7rem 1.6rem 2.2rem;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 2px;
    height: 100%;
    background-color: ${({ theme }) => theme.color.primary500};
    opacity: ${({ active }) => (active ? '1' : '0')};
  }

  > div {
    width: 100%;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.color.gray900};
    font-weight: bold;
    font-size: 1.4rem;
  }

  path {
    stroke: ${({ active, theme }) => (active ? `${theme.color.primary500}` : `${theme.color.gray900}`)};
  }

  span {
    margin-left: 2rem;
    flex: 1;
    color: ${({ active, theme }) => (active ? theme.color.primary500 : theme.color.gray900)};
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
