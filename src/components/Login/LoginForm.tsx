import React from 'react';
import { useRequestLogin } from '@/apis';
import { Input } from '@/components/Shared';
import Check from '@/components/Shared/Icons/Check.svg';
import CheckOrange from '@/components/Shared/Icons/CheckOrange.svg';
import { LoginForm as LoginFormType } from '@/containers/Login';
import styled from '@emotion/styled';
import { InputProps } from '../Shared/Input/Input';

type Props = {
  form: LoginFormType;
  onChangeForm: (key: string, value: any) => void;
  isRemembered: boolean;
  onToggleRemember: () => void;
};

export const LoginForm = ({ form, onChangeForm, isRemembered, onToggleRemember }: Props) => {
  console.log('form', form);
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
        <input type="checkbox" id="remember" checked={isRemembered} onChange={onToggleRemember} />
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
  height: 24px;
  align-items: center;
  margin-bottom: 1.6rem;
  position: relative;

  label {
    font-size: ${({ theme }) => theme.size.fontMd};
    color: ${({ theme }) => theme.color.gray600};
    margin-left: 3rem;
  }

  input[type='checkbox'] {
    display: none;
  }

  input[type='checkbox'] + label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    background-image: url(${Check});
    width: 24px;
    height: 24px;
  }

  input[type='checkbox']:checked + label:before {
    background-image: url(${CheckOrange});
  }

  /* input[type='checkbox']:checked {
    background 'url(Check)';
    background-position: center;
    background-repeat: no-repeat;
    background-size: 1.5rem;
    background-color: #ffbdb4;
  } */

  /* > label {
    color: ${({ theme }) => theme.color.gray600};
    font-size: 1.6rem;
    margin-left: 5px;
  } */
`;
