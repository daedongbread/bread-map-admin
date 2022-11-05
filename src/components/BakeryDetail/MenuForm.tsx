import React from 'react';
import { Button } from '@/components/Shared';
import { BakeryForm } from '@/containers/BakeryDetail';
import { Row, RowContents } from '@/styles';
import styled from '@emotion/styled';
import { Option } from './LinkForm';
import MenuItem from './MenuItem';

type Props = {
  label: string;
  form: BakeryForm;
  openedMenuTypeIdx: number | null;
  onToggleMenuTypeOption: (currIdx: number) => void;
  onSelectMenuTypeOption: (payload: { currIdx: number; optionValue: string }) => void;
  onChangeMenuInput: (payload: { currIdx: number; name: string; value: string }) => void;
  onRemoveMenu: (currIdx: number) => void;
  onAddMenu: () => void;
  onChangeMenuImg: ({ currIdx, e }: { currIdx: number; e: React.ChangeEvent<HTMLInputElement> }) => void;
};

export const MenuForm = ({
  label,
  form,
  openedMenuTypeIdx,
  onToggleMenuTypeOption,
  onSelectMenuTypeOption,
  onChangeMenuInput,
  onRemoveMenu,
  onAddMenu,
  onChangeMenuImg,
}: Props) => {
  return (
    <Row alignTop>
      <label>{label}</label>
      <RowContents>
        {form.productList?.map((item, idx) => (
          <MenuItem
            key={`menu-${idx}`}
            idx={idx}
            menu={item}
            productTypes={productTypes}
            isOpenMenuType={openedMenuTypeIdx === idx}
            onToggleMenuTypeOption={onToggleMenuTypeOption}
            onSelectMenuTypeOption={onSelectMenuTypeOption}
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

const productTypes: Option[] = [
  { name: '빵', value: 'BREAD' },
  { name: '야채', value: 'BEVERAGE' },
  { name: '기타', value: 'ETC' },
];

const BtnWrapper = styled.div`
  border-top: ${({ theme }) => `1px solid ${theme.color.gray400}`};
  padding: 1rem 0;
  display: flex;
  justify-content: flex-end;
`;
