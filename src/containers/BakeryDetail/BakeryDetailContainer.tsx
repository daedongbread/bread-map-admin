import React, { useState } from 'react';
import { Form } from '@/components/BakeryDetail';
import useForm from '@/hooks/useForm';
import styled from '@emotion/styled';

export type BakeryForm = {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  hours: string;
  instagramURL: string;
  facebookURL: string;
  blogURL: string;
  websiteURL: string;
  phoneNumber: string;
  facilityInfoList: any[];
  breadList: BreadMenu[];
  status: string;
};

export type BreadMenu = {
  breadId: number;
  name: string;
  price: string;
  image: File | null; // api 요청시 이걸로 createObjURL 한다. & form내부에서 보내지않음.
};

const bakeryForm = {
  name: '',
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
  breadList: [
    {
      breadId: 0,
      name: '',
      price: '',
      image: null,
    },
  ],
  status: '',
};

export const BakeryDetailContainer = () => {
  const { form, onChangeForm } = useForm<BakeryForm>(bakeryForm);
  const [bakeryImg, setBakeryImg] = React.useState<File | null>(null); // hook으로 뺄지 고민

  const onChangeBakeryImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBakeryImg(e.target.files && e.target.files[0]);
  };

  return (
    <Container>
      <Form form={form} bakeryImg={bakeryImg} onChangeForm={onChangeForm} onChangeBakeryImg={onChangeBakeryImg} />
    </Container>
  );
};

const Container = styled.div``;
