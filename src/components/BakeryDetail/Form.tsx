import React from 'react';

import { Button } from '@/components/Shared';
import { BakeryForm } from '@/containers/BakeryDetail';

import { BakeryFormChangeKey } from '@/store/slices/bakery';
import styled from '@emotion/styled';

import { AddressForm } from './AddressForm';
import { BakeryImgForm } from './BakeryImgForm';
import { BasicForm } from './BasicForm';
import { Link, LinkForm } from './LinkForm';
import { MenuForm } from './MenuForm';

type Props = {
  form: BakeryForm;
  links: Link[];
  openedLinkIdx: number | null;
  bakeryImg: File | null;
  onChangeForm: (payload: { name: BakeryFormChangeKey; value: never }) => void;
  onChangeBakeryImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleLinkOption: (currIdx: number) => void;
  onSelectLinkOption: (payload: { currIdx: number; optionValue: string; linkValue: string }) => void;
  onChangeLinkValue: (payload: { currIdx: number; optionValue: string; linkValue: string }) => void;
  onSetLinks: (links: { key: string; value: string }[]) => void;
  onRemoveLink: (currIdx: number) => void;
  onAddLink: () => void;
  onChangeMenuInput: (payload: { currIdx: number; name: string; value: string }) => void;
  onRemoveMenu: (currIdx: number) => void;
  onAddMenu: () => void;
  onChangeMenuImg: ({ currIdx, e }: { currIdx: number; e: React.ChangeEvent<HTMLInputElement> }) => void;
  onSaveForm: (payload: FormData) => void;
};

export const Form = ({
  form,
  links,
  openedLinkIdx,
  bakeryImg,
  onChangeForm,
  onChangeBakeryImg,
  onToggleLinkOption,
  onSelectLinkOption,
  onChangeLinkValue,
  onSetLinks,
  onRemoveLink,
  onAddLink,
  onChangeMenuInput,
  onRemoveMenu,
  onAddMenu,
  onChangeMenuImg,
  onSaveForm,
}: Props) => {
  const onClickSave = () => {
    const formData = new FormData();

    // link에 대한 순회
    const linkPayload: { [key: string]: string } = {};
    links.forEach(link => {
      linkPayload[link.key] = link.value;
    });
    formData.append('request', JSON.stringify({ ...form, ...linkPayload }));

    // 빵 메뉴 이미지 순회
    if (form.productList.length) {
      form.productList.forEach(bread => {
        formData.append('breadImageList', bread.image || '');
      });
    }

    // 빵집 이미지 추가
    formData.append('bakeryImage', bakeryImg || '');

    const payload = formData;
    onSaveForm(payload);
  };

  return (
    <>
      <Forms>
        <div>
          <BasicForm label={'삥집명'} form={form} onChangeForm={onChangeForm} name={'name'} />
          <BakeryImgForm label={'대표이미지'} previewImg={bakeryImg} onChangeBakeryImg={onChangeBakeryImg} />
          <AddressForm label={'주소'} form={form} onChangeForm={onChangeForm} />
          <BasicForm label={'시간'} form={form} onChangeForm={onChangeForm} name={'hours'} placeholder={'엔터키를 치면 줄바꿈이 적용됩니다.'} />
          <LinkForm
            label={'홈페이지'}
            links={links}
            openedLinkIdx={openedLinkIdx}
            onToggleLinkOption={onToggleLinkOption}
            onSelectLinkOption={onSelectLinkOption}
            onChangeLinkValue={onChangeLinkValue}
            onSetLinks={onSetLinks}
            onRemoveLink={onRemoveLink}
            onAddLink={onAddLink}
          />
          <BasicForm label={'전화번호'} form={form} onChangeForm={onChangeForm} name={'phoneNumber'} placeholder={'000-000-0000'} />
          <MenuForm
            label={'메뉴'}
            form={form}
            onChangeMenuInput={onChangeMenuInput}
            onRemoveMenu={onRemoveMenu}
            onAddMenu={onAddMenu}
            onChangeMenuImg={onChangeMenuImg}
          />
        </div>
      </Forms>
      <SaveBtns>
        <Button type={'reverseOrange'} text={'임시저장'} fontSize={'medium'} btnSize={'medium'} />
        <Button type={'orange'} text={'저장하기'} fontSize={'medium'} btnSize={'medium'} onClickBtn={onClickSave} />
      </SaveBtns>
    </>
  );
};

const Forms = styled.form`
  flex: 1;
  border-top: ${({ theme }) => `1px solid ${theme.color.gray200}`};
  padding: 2rem 6rem;
  margin-bottom: 10rem;
`;

const SaveBtns = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  border-top: ${({ theme }) => `1px solid ${theme.color.gray200}`};
  width: ${({ theme }) => `calc(100% - ${theme.size.sidebarWidth})`};
  background-color: ${({ theme }) => theme.color.white};
  z-index: 2;
  > button {
    width: 18rem;
  }
`;
