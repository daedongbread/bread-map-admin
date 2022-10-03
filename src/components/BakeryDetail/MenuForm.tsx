import React from 'react';
import { Button } from '@/components/Shared';
import { BakeryForm } from '@/containers/BakeryDetail';
import { Row, RowContents } from '@/styles';
import styled from '@emotion/styled';
import MenuItem from './MenuItem';

type Props = {
  label: string;
  form: BakeryForm;
  onChangeBreadMenuInput: (currIdx: number, currInput: 'name' | 'price' | 'image', value: string) => void;
  onRemoveBreadMenu: (currIdx: number) => void;
  onAddBreadMenu: () => void;
  onChangeBreadImg: (currIdx: number, e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const MenuForm = ({ label, form, onChangeBreadMenuInput, onRemoveBreadMenu, onAddBreadMenu, onChangeBreadImg }: Props) => {
  return (
    <Row alignTop>
      <label>{label}</label>
      <RowContents>
        {form.menu.map((item, idx) => (
          <MenuItem
            key={`menu-${idx}`}
            idx={idx}
            menu={item}
            onChangeBreadMenuInput={onChangeBreadMenuInput}
            onRemoveBreadMenu={onRemoveBreadMenu}
            onChangeBreadImg={onChangeBreadImg}
          />
        ))}
        <BtnWrapper>
          <Button type={'lightOrange'} text={'추가하기'} btnSize={'small'} onClickBtn={onAddBreadMenu} />
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
