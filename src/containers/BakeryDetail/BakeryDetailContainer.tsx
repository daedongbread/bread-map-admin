import React, { useState } from 'react';
import { Form } from '@/components/BakeryDetail';
import useForm from '@/hooks/useForm';
import styled from '@emotion/styled';

type BakeryForm = {
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
  breadList: {
    name: string;
    price: string;
  }[];
  status: string;
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
      name: '',
      price: '',
    },
  ],
  status: '',
};

export const BakeryDetailContainer = () => {
  const { form, onChangeForm } = useForm<BakeryForm>(bakeryForm);
  return (
    <Container>
      <Form form={form} onChangeForm={onChangeForm} />
    </Container>
  );
};

const Container = styled.div``;
