import React from 'react';
import { Button } from '@/components/Shared/Button';
import { Input } from '@/components/Shared/Input';
import { Preview } from '@/components/Shared/Preview';
import { Row, RowContents, RowHalf } from '@/styles';
import styled from '@emotion/styled';
import { AddressForm } from './AddressForm';
import { BasicForm } from './BasicForm';
import { ImageForm } from './ImageForm';
import { LinkForm } from './LinkForm';
import { MenuForm } from './MenuForm';
type Props = {
  form: { [key: string]: any };
  onChangeForm: (key: string, value: any) => void;
};

export const Form = ({ form, onChangeForm }: Props) => {
  return (
    <Container>
      <div>
        <Button type={'gray'} text={'목록 돌아가기'} btnSize={'small'} />
      </div>
      <form>
        <div>
          <BasicForm label={'삥집명'} name={'name'} form={form} onChangeForm={onChangeForm} />
          <ImageForm label={'대표이미지'} />
          <AddressForm label={'주소'} form={form} onChangeForm={onChangeForm} />
          <Row>
            <label>시간</label>
            <RowContents>
              <Input placeholder={'엔터키를 치면 줄바꿈이 적용됩니다.'} type={'plain'} />
            </RowContents>
          </Row>
          <LinkForm label={'홈페이지'} form={form} onChangeForm={onChangeForm} />
          <BasicForm label={'전화번호'} name={'phoneNumber'} placeholder={'000-000-0000'} form={form} onChangeForm={onChangeForm} />
          <MenuForm label={'메뉴'} />
        </div>
      </form>
      <BtnWrapper>
        <Button type={'reverseOrange'} text={'임시저장'} fontSize={'medium'} btnSize={'medium'} />
        <Button type={'orange'} text={'저장하기'} fontSize={'medium'} btnSize={'medium'} />
      </BtnWrapper>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  > div {
    padding: 2rem 6rem;
  }
  form {
    flex: 1;
    border-top: ${({ theme }) => `1px solid ${theme.color.gray200}`};
    border-bottom: ${({ theme }) => `1px solid ${theme.color.gray200}`};
    padding: 2rem 6rem;
  }
`;

const BtnWrapper = styled.div`
  > button {
    width: 18rem;
  }
  display: flex;
  justify-content: space-between;
`;
