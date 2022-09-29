import React from 'react';
import { Button } from '@/components/Shared/Button';
import { BakeryForm } from '@/containers/BakeryDetail';
import styled from '@emotion/styled';

import { AddressForm } from './AddressForm';
import { BakeryImgForm } from './BakeryImgForm';
import { BasicForm } from './BasicForm';
import { LinkForm } from './LinkForm';
import { MenuForm } from './MenuForm';

type Props = {
  form: BakeryForm;
  bakeryImg: File | null;
  onChangeForm: (key: string, value: any) => void;
  onChangeBakeryImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Form = ({ form, bakeryImg, onChangeForm, onChangeBakeryImg }: Props) => {
  // const [bakeryImage, setBakeryImage] = useState<File | null>(null);

  const onSubmitForm = () => {
    // 이미지가 없는 빵의경우 0:null 형태로 잡아줘야함.

    const formData = new FormData();
    formData.append('request', JSON.stringify(form));
    formData.append('bakeryImage', bakeryImg || '');
    if (form.breadList.length) {
      form.breadList.forEach(bread => {
        formData.append('breadImageList', bread.image || ''); // 이미지가 없을때 null을 보낼수가 없다. 얘기하기!
      });
    }

    const payload = formData;
    // axios.post('/aaa', payload)~
  };

  // 메뉴 최초 추가시, null로 초기화
  // const addNewBreadImg = (currIdx: number) => {
  //   //const lastIdx = object.keys()
  //   setBreadImageList(prev => ({ ...prev, [currIdx]: null }));
  //   // 만약에 빵이미지가 {1,2,3,4,5} 있다가
  //   // 중간을 삭제해서 {1,2,4,5}면,
  //   // 그다음에 추가하면 idx가 어떻게되는거야..? 여기서부터 문제가있는데? No.. 그냥 최종인덱스를 확인해서 추가하자.
  // };

  // 메뉴 삭제시, 이미지 정보 오브젝트에서 제거
  // const removeBreadImg = (currIdx: number) => {
  //   if (!breadImageList) return;
  //   const updated: { [key: number]: File | null } = {};
  //   Object.keys(breadImageList).forEach(key => {
  //     const numKey = Number(key);
  //     if (numKey !== currIdx) {
  //       updated[numKey] = breadImageList[numKey];
  //     }
  //   });
  //   // const updatedBreadImg = Object.keys(breadImageList).filter(key => Number(key) !== currIdx);
  //   setBreadImageList({ ...updated });
  // };

  // const onChangeBakeryImg = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setBakeryImage(e.target.files && e.target.files[0]);
  // };

  const onChangeBreadMenuInput = (currIdx: number, currInput: 'name' | 'price' | 'image', value: string) => {
    const updatedBreadList = form.breadList.map((menu, idx) => {
      if (idx === currIdx) return { ...menu, [currInput]: value };
      else return menu;
    });
    onChangeForm('breadList', updatedBreadList);
  };

  const onRemoveBreadMenu = (currIdx: number) => {
    const updatedBreadList = form.breadList.filter((menu, idx) => idx !== currIdx);
    onChangeForm('breadList', updatedBreadList);
  };

  const onAddBreadMenu = () => {
    const updatedBreadList = [...form.breadList, { breadId: 134, name: '', price: '', image: null }];
    onChangeForm('breadList', updatedBreadList);
  };

  const onChangeBreadImg = (currIdx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedBreadList = form.breadList.map((menu, idx) => {
      if (idx === currIdx) {
        return { ...menu, image: e.target.files?.[0] };
      } else return menu;
    });
    onChangeForm('breadList', updatedBreadList);
  };

  return (
    <Container>
      <div>
        <Button type={'gray'} text={'목록 돌아가기'} btnSize={'small'} />
      </div>
      <form>
        <div>
          <BasicForm label={'삥집명'} form={form} onChangeForm={onChangeForm} name={'name'} />
          <BakeryImgForm label={'대표이미지'} previewImg={bakeryImg} onChangeBakeryImg={onChangeBakeryImg} />
          <AddressForm label={'주소'} form={form} onChangeForm={onChangeForm} />
          <BasicForm label={'시간'} form={form} onChangeForm={onChangeForm} name={'hours'} placeholder={'엔터키를 치면 줄바꿈이 적용됩니다.'} />
          <LinkForm label={'홈페이지'} form={form} onChangeForm={onChangeForm} />
          <BasicForm label={'전화번호'} form={form} onChangeForm={onChangeForm} name={'phoneNumber'} placeholder={'000-000-0000'} />
          <MenuForm
            label={'메뉴'}
            form={form}
            onChangeBreadMenuInput={onChangeBreadMenuInput}
            onRemoveBreadMenu={onRemoveBreadMenu}
            onAddBreadMenu={onAddBreadMenu}
            onChangeBreadImg={onChangeBreadImg}
          />
        </div>
      </form>
      <BtnWrapper>
        <Button type={'reverseOrange'} text={'임시저장'} fontSize={'medium'} btnSize={'medium'} />
        <Button type={'orange'} text={'저장하기'} fontSize={'medium'} btnSize={'medium'} />
      </BtnWrapper>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  > div {
    padding: 2rem 6rem;
  }
  form {
    flex: 1;
    border-top: ${({ theme }) => `1px solid ${theme.color.gray200}`};
    border-bottom: ${({ theme }) => `1px solid ${theme.color.gray200}`};
    padding: 2rem 6rem;
  }
`;

const BtnWrapper = styled.div`
  > button {
    width: 18rem;
  }
  display: flex;
  justify-content: space-between;
`;
