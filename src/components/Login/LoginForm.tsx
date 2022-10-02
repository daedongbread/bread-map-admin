import React from 'react';
import { useRequestLogin } from '@/apis';
import { Input } from '@/components/Shared';
import { LoginForm as LoginFormType } from '@/containers/Login';
import styled from '@emotion/styled';
import { InputProps } from '../Shared/Input/Input';

type Props = {
  form: LoginFormType;
  onChangeForm: (key: string, value: any) => void;
};

export const LoginForm = ({ form, onChangeForm }: Props) => {
  return (
    <div>
      <Wrapper>
        {inputs.map(input => (
          <InputWrapper key={`login-${input.name}`}>
            <Input
              value={form[input.name]}
              onChangeInput={e => onChangeForm(input.name, e.target.value)}
              placeholder={input.placeholder}
              textType={input.textType}
              type={input.type}
              padding={input.padding}
            />
          </InputWrapper>
        ))}
      </Wrapper>
      <CheckBox>
        <input type="checkbox" id="remember" />
        <label htmlFor="remember">ID/PW 기억하기</label>
      </CheckBox>
    </div>
  );
};

const inputs: ({ name: keyof LoginFormType; textType?: string } & Pick<InputProps, 'placeholder' | 'type' | 'padding'>)[] = [
  { name: 'email', placeholder: '아이디', type: 'orange', padding: 'large' },
  { name: 'password', placeholder: '비밀번호', type: 'orange', padding: 'large', textType: 'password' },
];

const Container = styled.div``;

const Wrapper = styled.div`
  margin-top: 50px;
`;

const InputWrapper = styled.div`
  margin: 1.6rem 0;
  width: 100%;
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
