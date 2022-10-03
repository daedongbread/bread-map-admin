import React from 'react';
import { Input } from '@/components/Shared/Input';
import { BakeryFormChangeKey } from '@/store/slices/bakery';
import { Row, RowHalf } from '@/styles';
import styled from '@emotion/styled';

type Props = {
  label: string;
  form: { [key: string]: any };
  onChangeForm: (payload: { name: BakeryFormChangeKey; value: never }) => void;
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
          onChangeInput={e => onChangeForm({ name: 'address', value: e.target.value as never })}
        />
        <RowHalf>
          <div>
            <label>위도</label>
            <Input type={'plain'} value={form && form['latitude']} onChangeInput={e => onChangeForm({ name: 'latitude', value: e.target.value as never })} />
          </div>
          <div>
            <label>경도</label>
            <Input type={'plain'} value={form && form['longitude']} onChangeInput={e => onChangeForm({ name: 'longitude', value: e.target.value as never })} />
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
