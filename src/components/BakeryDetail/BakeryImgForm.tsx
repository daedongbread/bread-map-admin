import React from 'react';
import { Button, Preview } from '@/components/Shared';
import useFileInput from '@/hooks/useFileInput';
import { Row } from '@/styles';
import styled from '@emotion/styled';

type Props = {
  label: string;
  previewImg: File | null;
  onChangeBakeryImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const BakeryImgForm = ({ label, previewImg, onChangeBakeryImg }: Props) => {
  const { inputRef, onClickTriggerFile, getSrc } = useFileInput();

  return (
    <Row alignTop>
      <label>{label}</label>
      <RepresentativeImg>
        <Preview src={getSrc(previewImg)} widthRem={28} heightRem={20} onClickTriggerFile={onClickTriggerFile} />
        <Button type={'lightOrange'} text={'이미지 변경'} btnSize={'small'} onClickBtn={onClickTriggerFile} />
        <input ref={inputRef} type="file" accept="image/png, image/jpeg" onChange={onChangeBakeryImg} />
      </RepresentativeImg>
    </Row>
  );
};

const RepresentativeImg = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex: 1;
`;
