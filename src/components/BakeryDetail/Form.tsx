import React from 'react';

import { BakeryDetailEntity } from '@/apis';
import { Button } from '@/components/Shared';
import { BakeryForm } from '@/containers/BakeryDetail';

import { BakeryFormChangeKey } from '@/store/slices/bakery';
import { urlToFile } from '@/utils';
import styled from '@emotion/styled';

import { AddressForm } from './AddressForm';
import { BakeryImgForm } from './BakeryImgForm';
import { BasicForm } from './BasicForm';
import { Link, LinkForm } from './LinkForm';
import { MenuForm } from './MenuForm';

type Props = {
  origin?: BakeryDetailEntity;
  form: BakeryForm;
  links: Link[];
  openedLinkIdx: number | null;
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
  origin,
  form,
  links,
  openedLinkIdx,
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
  const onClickSave = async () => {
    const formData = new FormData();

    // link에 대한 순회
    const linkPayload: { [key: string]: string } = {};
    links.forEach(link => {
      linkPayload[link.key] = link.value;
    });

    const copiedForm = { ...form };
    const { image, ...requestData } = copiedForm;
    const request = new Blob([JSON.stringify({ ...requestData, ...linkPayload })], { type: 'application/json' });
    formData.append('request', request);

    //이미지들은 원본데이터(original)와 달라졌을 경우만 아래로직들 실행하기.
    //메뉴들의 순서가 바뀔수있으므로, 순회해서 target을 찾는다.
    //빵 메뉴 이미지 순회,
    // 빵메뉴가 없으면 append X, 빵메뉴가 없을때 productImageList = [] 로 보내면 에러가 난다.
    if (form.productList.length) {
      if (origin) {
        // 수정시
        for (const bread of form.productList) {
          let file: File | string = '';
          const target = origin.productList.find(item => item.breadId === bread.breadId);

          if (target) {
            if (bread.image === target.image) {
              file = target.image ? target.image : '';
            } else {
              file = bread.image ? await urlToFile(bread.image as string, bread.name) : '';
            }
          } else {
            file = bread.image ? await urlToFile(bread.image as string, bread.name) : '';
          }
          formData.append('productImageList', file);
        }
      } else {
        // 생성시
        for (const bread of form.productList) {
          const file = bread.image ? await urlToFile(bread.image as string, bread.name) : '';
          formData.append('productImageList', file);
        }
      }
    }

    // 빵집 이미지 추가
    // 빵집 이미지없으면 append X
    if (form.image) {
      let file: File | string = '';
      if (origin) {
        if (form.image === origin.image) {
          file = origin.image ? origin.image : '';
        } else {
          file = await urlToFile(form.image, form.name);
        }
      }
      formData.append('bakeryImage', file);
    }

    const payload = await formData;
    for (const [key, value] of payload) {
      console.log(`${key}: ${value}`);
    }
    onSaveForm(payload);
  };

  return (
    <>
      <Forms>
        <div>
          <BasicForm label={'삥집명'} form={form} onChangeForm={onChangeForm} name={'name'} />
          <BakeryImgForm label={'대표이미지'} previewImg={form.image} onChangeBakeryImg={onChangeBakeryImg} />
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
