import React from 'react';

import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/Shared/Button';
import Routes from '@/constants/routes';
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
  onSaveForm: (payload: FormData) => void;
};

export const Form = ({ form, bakeryImg, onChangeForm, onChangeBakeryImg, onSaveForm }: Props) => {
  const navigate = useNavigate();
  const [links, setLinks] = React.useState<{ key: string; value: string }[]>([]);

  React.useEffect(() => {
    // 나중엔 최상위에서 객체 만들어서 내려주기만 하기
    const links: { key: string; value: string }[] = [];
    for (const [key, value] of Object.entries(form)) {
      if (key.includes('URL')) {
        links.push({ key, value: value as string });
      }
    }
    console.log('links', links);
    setLinks(links);
  }, []);

  const updateLinks = (links: { key: string; value: string }[]) => {
    setLinks(links);
  };

  const onClickSave = () => {
    const formData = new FormData();

    // link에 대한 순회
    const linkPayload: { [key: string]: string } = {};
    links.forEach(link => {
      linkPayload[link.key] = link.value;
    });
    formData.append('request', JSON.stringify({ ...form, ...linkPayload }));

    // 빵 메뉴 이미지 순회
    if (form.menu.length) {
      form.menu.forEach(bread => {
        formData.append('breadImageList', bread.image || '');
      });
    }

    // 빵집 이미지 추가
    formData.append('bakeryImage', bakeryImg || '');

    const payload = formData;
    // axios.post('/aaa', payload)~

    onSaveForm(payload);
  };

  const onChangeBreadMenuInput = (currIdx: number, currInput: 'name' | 'price' | 'image', value: string) => {
    const breadMenus = form.menu.map((menu, idx) => {
      if (idx === currIdx) return { ...menu, [currInput]: value };
      else return menu;
    });
    onChangeForm('menu', breadMenus);
  };

  const onRemoveBreadMenu = (currIdx: number) => {
    const breadMenus = form.menu.filter((menu, idx) => idx !== currIdx);
    onChangeForm('menu', breadMenus);
  };

  const onAddBreadMenu = () => {
    const breadMenus = [...form.menu, { breadId: 134, name: '', price: '', image: null }];
    onChangeForm('menu', breadMenus);
  };

  const onChangeBreadImg = (currIdx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const breadMenus = form.menu.map((menu, idx) => {
      if (idx === currIdx) {
        return { ...menu, image: e.target.files?.[0] };
      } else return menu;
    });
    onChangeForm('menu', breadMenus);
  };

  const onClickBack = () => {
    navigate(Routes.BAKERIES);
  };

  return (
    <Container>
      <div>
        <Button type={'gray'} text={'목록 돌아가기'} btnSize={'small'} onClickBtn={onClickBack} />
      </div>
      <form>
        <div>
          <BasicForm label={'삥집명'} form={form} onChangeForm={onChangeForm} name={'name'} />
          <BakeryImgForm label={'대표이미지'} previewImg={bakeryImg} onChangeBakeryImg={onChangeBakeryImg} />
          <AddressForm label={'주소'} form={form} onChangeForm={onChangeForm} />
          <BasicForm label={'시간'} form={form} onChangeForm={onChangeForm} name={'hours'} placeholder={'엔터키를 치면 줄바꿈이 적용됩니다.'} />
          <LinkForm label={'홈페이지'} links={links} updateLinks={updateLinks} />
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
        <Button type={'orange'} text={'저장하기'} fontSize={'medium'} btnSize={'medium'} onClickBtn={onClickSave} />
      </BtnWrapper>
    </Container>
  );
};

/** style */

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
