import React from 'react';
import { Input } from '@/components/Shared/Input';
import { Row, RowContents } from '@/styles';
import styled from '@emotion/styled';
import { Button } from '../Shared/Button';
import MenuItem from './MenuItem';

type Props = {
  label: string;
};
export const MenuForm = ({ label }: Props) => {
  return (
    <Row alignTop>
      <label>{label}</label>
      <RowContents>
        <MenuItem />
        <BtnWrapper>
          <Button type={'lightOrange'} text={'추가하기'} btnSize={'small'} />
        </BtnWrapper>
      </RowContents>
    </Row>
  );
};

const BtnWrapper = styled.div`
  border-top: ${({ theme }) => `1px solid ${theme.color.gray400}`};
  padding: 1rem 0;
  display: flex;
  justify-content: flex-end;
`;
