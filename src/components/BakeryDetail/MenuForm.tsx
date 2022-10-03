import React from 'react';
import { Button } from '@/components/Shared';
import { BakeryForm } from '@/containers/BakeryDetail';
import { Row, RowContents } from '@/styles';
import styled from '@emotion/styled';
import MenuItem from './MenuItem';

type Props = {
  label: string;
  form: BakeryForm;
  onChangeMenuInput: (payload: { currIdx: number; name: string; value: string }) => void;
  onRemoveMenu: (currIdx: number) => void;
  onAddMenu: () => void;
  onChangeMenuImg: ({ currIdx, e }: { currIdx: number; e: React.ChangeEvent<HTMLInputElement> }) => void;
};

export const MenuForm = ({ label, form, onChangeMenuInput, onRemoveMenu, onAddMenu, onChangeMenuImg }: Props) => {
  return (
    <Row alignTop>
      <label>{label}</label>
      <RowContents>
        {form.menu.map((item, idx) => (
          <MenuItem
            key={`menu-${idx}`}
            idx={idx}
            menu={item}
            onChangeMenuInput={onChangeMenuInput}
            onRemoveMenu={onRemoveMenu}
            onChangeMenuImg={onChangeMenuImg}
          />
        ))}
        <BtnWrapper>
          <Button type={'lightOrange'} text={'추가하기'} btnSize={'small'} onClickBtn={onAddMenu} />
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
