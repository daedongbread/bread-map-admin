import React from 'react';
import { Input } from '@/components/Shared/Input';
import styled from '@emotion/styled';

export const Form = () => {
  return (
    <div>
      <InputWrapper>
        <Input placeholder={'아이디'} type={'orange'} padding={'large'} />
      </InputWrapper>
      <InputWrapper>
        <Input placeholder={'비밀번호'} type={'orange'} padding={'large'} />
      </InputWrapper>
    </div>
  );
};

const Container = styled.div``;

const InputWrapper = styled.div`
  margin: 1.6rem 0;
  width: 100%;
`;
