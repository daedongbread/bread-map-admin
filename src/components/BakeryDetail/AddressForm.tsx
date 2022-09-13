import React from 'react';
import { Input } from '@/components/Shared/Input';
import { Row, RowHalf } from '@/styles';
import styled from '@emotion/styled';

type Props = {
  label: string;
  form: { [key: string]: any };
  onChangeForm: (key: string, value: any) => void;
};

export const AddressForm = ({ label, form, onChangeForm }: Props) => {
  return (
    <Row alignTop>
      <label>{label}</label>
      <Address>
        <Input
          placeholder={'도로명 주소를 적어주세요.'}
          type={'plain'}
          value={form && form['address']}
          onChangeInput={e => onChangeForm('address', e.target.value)}
        />
        <RowHalf>
          <div>
            <label>위도</label>
            <Input type={'plain'} value={form && form['latitude']} onChangeInput={e => onChangeForm('latitude', e.target.value)} />
          </div>
          <div>
            <label>경도</label>
            <Input type={'plain'} value={form && form['longitude']} onChangeInput={e => onChangeForm('longitude', e.target.value)} />
          </div>
        </RowHalf>
      </Address>
    </Row>
  );
};

const Address = styled.div`
  flex: 1;
  font-size: 1.4rem;
`;
