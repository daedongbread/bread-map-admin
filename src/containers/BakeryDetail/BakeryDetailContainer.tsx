import React from 'react';
import { useParams } from 'react-router-dom';

import type { BakeryDetailEntity, BakeryMenuEntity, BakeryStatus } from '@/apis';
import { useCreateBakery, useGetBakery, useUpdateBakery } from '@/apis/bakery/useBakery';
import { Form } from '@/components/BakeryDetail';
import useForm from '@/hooks/useForm';

import styled from '@emotion/styled';

export type BakeryForm = Omit<BakeryDetailEntity, 'image' | 'status' | 'menu'> & {
  status: BakeryStatus | null;
  menu: (Omit<BakeryMenuEntity, 'image'> & {
    image: File | string | null; // 수정시에 menu img는 file or str (빈값), 데이터 내려올때 null일수 있음.
  })[];
};

export const BakeryDetailContainer = () => {
  const { bakeryId } = useParams();

  const { form, onChangeForm, onSetForm } = useForm<BakeryForm>(initialBakeryForm);
  const [bakeryImg, setBakeryImg] = React.useState<File | null>(null); // hook으로 뺄지 고민

  React.useEffect(() => {
    if (bakeryId) {
      const { bakery, loading } = useGetBakery({ bakeryId: Number(bakeryId) });
      onSetForm(bakery); // image(bakery img 제거하기)
      // setBakeryImg(bakery.image) => image가 string으로 내려오면 File로?
    }
  }, []);

  React.useEffect(() => {
    console.log('form', form);
  }, [form]);

  const onChangeBakeryImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBakeryImg(e.target.files && e.target.files[0]);
  };

  const onCreateForm = (payload: FormData) => {
    const { mutate } = useCreateBakery();
    mutate({ payload });
  };

  const onUpdateForm = (payload: FormData) => {
    if (bakeryId) {
      const { mutate } = useUpdateBakery();
      mutate({ bakeryId: Number(bakeryId), payload });
    }
  };

  return (
    <Container>
      <Form
        form={form}
        bakeryImg={bakeryImg}
        onChangeForm={onChangeForm}
        onChangeBakeryImg={onChangeBakeryImg}
        onSaveForm={bakeryId ? onUpdateForm : onCreateForm}
      />
    </Container>
  );
};

// 새로 작성한다 = img = File
// 받아온다 = img = str 인가?
// 빵집 수정할때만 breadId가 존재한다.

/** constants */
const initialBakeryForm = {
  name: '',
  // image: null, // 빵집 이미지. 받아올때 없는걸로
  address: '',
  latitude: 0,
  longitude: 0,
  hours: '',
  instagramURL: '',
  facebookURL: '',
  blogURL: '',
  websiteURL: '',
  phoneNumber: '',
  facilityInfoList: [],
  menu: [
    {
      breadId: 0, // 생성시에만 있음
      name: '',
      price: 0,
      image: '', // 조회시에만 이미지 여기에 들어옴
    },
  ],
  status: null,
};

// 시설에 대한 정보가 없다?

/** style */

const Container = styled.div``;
