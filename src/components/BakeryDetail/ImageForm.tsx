import React from 'react';
import { Button } from '@/components/Shared/Button';
import { Preview } from '@/components/Shared/Preview';
import { Row } from '@/styles';
import styled from '@emotion/styled';

type Props = {
  label: string;
};

export const ImageForm = ({ label }: Props) => {
  return (
    <Row alignTop>
      <label>{label}</label>
      <RepresentativeImg>
        <Preview src={null} widthRem={28} heightRem={20} />

        <Button type={'lightOrange'} text={'이미지 변경'} btnSize={'small'} />
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
