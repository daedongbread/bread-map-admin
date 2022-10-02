import React from 'react';
import { useRequestLogin } from '@/apis';
import { Logo } from '@/components/Login';
import { LoginForm } from '@/components/Login/LoginForm';
import { Button } from '@/components/Shared';
import Routes from '@/constants/routes';
import useForm from '@/hooks/useForm';
import useNavigation from '@/hooks/useNavigation';
import styled from '@emotion/styled';

export type LoginForm = typeof initialForm;

const initialForm = {
  email: '',
  password: '',
};

export const LoginContainer = () => {
  const { navigatePath } = useNavigation();
  const { form, onChangeForm } = useForm<LoginForm>(initialForm);

  const { mutate } = useRequestLogin({ successFn: () => navigatePath(Routes.BAKERIES) });

  const onSubmit = () => {
    const { email, password } = form;
    mutate({ email, password });
  };

  return (
    <Container>
      <Wrapper>
        <Logo />
        <LoginForm form={form} onChangeForm={onChangeForm} />
        <Button type={'orange'} text={'로그인'} onClickBtn={onSubmit} />
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
