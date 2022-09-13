import React from 'react';
import { Input } from '@/components/Shared/Input';
import { Row, RowContents } from '@/styles';

type Props = {
  label: string;
  placeholder?: string;
  name: string;
  form: { [key: string]: any };
  onChangeForm: (key: string, value: any) => void;
};

export const BasicForm = ({ label, placeholder, name, form, onChangeForm }: Props) => {
  return (
    <Row>
      <label>{label}</label>
      <RowContents>
        <Input type={'plain'} placeholder={placeholder || ''} value={form && form[name]} onChangeInput={e => onChangeForm(name, e.target.value)} />
      </RowContents>
    </Row>
  );
};
