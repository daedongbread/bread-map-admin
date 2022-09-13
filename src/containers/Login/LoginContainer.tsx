import React from 'react';
import { Form, Logo } from '@/components/Login';
import { Button } from '@/components/Shared/Button';
import styled from '@emotion/styled';

export const LoginContainer = () => {
  return (
    <Container>
      <Wrapper>
        <Logo />
        <FormWrapper>
          <Form />
        </FormWrapper>
        <CheckBox>
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">ID/PW 기억하기</label>
        </CheckBox>
        <Button type={'orange'} text={'로그인'} />
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 420px;
  min-width: 380px;
  width: 100%;
`;

const FormWrapper = styled.div`
  margin-top: 50px;
`;

const CheckBox = styled.div`
  display: flex;
  margin-bottom: 1.6rem;

  > label {
    color: ${({ theme }) => theme.color.gray600};
    font-size: 1.6rem;
    margin-left: 5px;
  }
`;
