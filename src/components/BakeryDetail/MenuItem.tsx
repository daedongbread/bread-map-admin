import React from 'react';
import { Row } from '@/styles';
import styled from '@emotion/styled';
import { Button } from '../Shared/Button';
import { Input } from '../Shared/Input';
import { Preview } from '../Shared/Preview';

const MenuItem = () => {
  return (
    <Container>
      <LeftContainer>
        <CustomRow>
          <label>메뉴명</label>
          <Input type={'plain'} />
        </CustomRow>
        <CustomRow>
          <label>가격</label>
          <Input type={'plain'} />
        </CustomRow>
        <BtnWrapper>
          <Button text={'메뉴 삭제'} type={'gray'} btnSize={'small'} />
          <Button text={'이미지 변경'} type={'lightOrange'} btnSize={'small'} />
        </BtnWrapper>
      </LeftContainer>
      <div>
        <Preview widthRem={16} heightRem={16} src={null} />
      </div>
    </Container>
  );
};

export default MenuItem;

const Container = styled.div`
  padding: 1rem 0;
  border-top: ${({ theme }) => `1px solid ${theme.color.gray400}`};
  display: flex;
  justify-content: space-between;
`;

const LeftContainer = styled.div`
  flex: 1;
  margin-right: 7rem;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 4rem;

  button:first-of-type {
    margin-right: 10px;
  }
  // height: 30px;
`;

const CustomRow = styled(Row)`
  > label {
    font-size: 1.35rem;
    font-weight: 500;
    margin-left: 2rem;
  }

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

// display: flex;
// align-items: ${({ alignTop }) => (alignTop ? 'flex-start' : 'center')};

// > label {
//   width: 12rem;
//   font-size: 1.5rem;
//   font-weight: 700;
// }

// &:not(:last-child) {
//   margin-bottom: 2.5rem;
// }

// &:not(label) {
//   flex: 1;
// }
