import React from 'react';
import { useAuth } from '@/apis';
import { Logo } from '@/components/Login';
import { LoginForm } from '@/components/Login/LoginForm';
import { Button } from '@/components/Shared';
import useForm from '@/hooks/useForm';
import useToggle from '@/hooks/useToggle';
import { loginStorage } from '@/utils';
import styled from '@emotion/styled';

export type LoginForm = typeof initialForm;

export const LoginContainer = () => {
  const { login } = useAuth();
  const { data, mutate, error } = login();

  const { activate: isRemembered, onActive: onActiveRemember, onInactive: onInactiveRemeber, onToggleActive: onToggleRemember } = useToggle();
  const { form, onChangeForm, onSetForm } = useForm<LoginForm>(initialForm);

  React.useEffect(() => {
    const { form, isRemembered } = loginStorage.getMultipleItems(['form', 'isRemembered']);
    if (form && isRemembered) {
      onActiveRemember();
      onSetForm(form);
    } else {
      onInactiveRemeber();
    }
  }, []);

  React.useEffect(() => {
    if (error) {
      window.confirm('로그인 에러입니다. 대동빵지도 팀에게 문의주세요.');
    }
  });

  const onSubmit = () => {
    const { email, password } = form;
    mutate({ email, password, isRemembered });
  };

  return (
    <Container>
      <Wrapper>
        <Logo />
        <LoginForm form={form} onChangeForm={onChangeForm} isRemembered={isRemembered} onToggleRemember={onToggleRemember} />
        <Button type={'orange'} text={'로그인'} onClickBtn={() => onSubmit()} />
      </Wrapper>
    </Container>
  );
};

const initialForm = {
  email: '',
  password: '',
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
