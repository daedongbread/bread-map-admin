import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import type { BakeryDetailEntity, BakeryMenuEntity, BakeryStatus } from '@/apis';
import { useCreateBakery, useGetBakery, useUpdateBakery } from '@/apis/bakery/useBakery';
import { Form } from '@/components/BakeryDetail';
import { Link } from '@/components/BakeryDetail/LinkForm';
import { Button, SelectBox, StatusSelectTrigger, StatusSelectOption } from '@/components/Shared';
import Routes from '@/constants/routes';

import useSelectBox from '@/hooks/useSelectBox';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setForm,
  setLinks,
  changeForm,
  BakeryFormChangeKey,
  changeBakeryImg,
  toggleLinkOption,
  selectLinkOption,
  changeLinkValue,
  removeLink,
  addLink,
  changeMenuInput,
  removeMenu,
  addMenu,
  changeMenuImg,
} from '@/store/slices/bakery';

import { color } from '@/styles';
import styled from '@emotion/styled';

export type BakeryForm = Omit<BakeryDetailEntity, 'status' | 'productList'> & {
  status: BakeryStatus | null;
  productList: (Omit<BakeryMenuEntity, 'image'> & {
    image: string | null; // File 타입이 필요한가? 필요없다면 Omit 제거! 수정시에 menu img는 file or str (빈값), 데이터 내려올때 null일수 있음.
  })[];
};

const options = [
  { name: '미게시', value: 'UNPOSTING', color: color.red },
  { name: '게시중', value: 'POSTING', color: color.green },
];
// TODO: 10/11 토큰만료시 리다이렉트처리 필요...
// TODO: 10/11 작성 & 수정 테스트 필요

export const BakeryDetailContainer = () => {
  const { bakeryId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { form, formLinks, openedLinkIdx } = useAppSelector(selector => selector.bakery);
  const { isOpen, selectedOption, onToggleSelectBox, onSelectOption } = useSelectBox(options[0]);

  const { bakery, loading } = useGetBakery({ bakeryId: Number(bakeryId) });
  const { mutate: createBakery } = useCreateBakery();
  const { mutate: updateBakery } = useUpdateBakery();

  React.useEffect(() => {
    if (bakery) {
      dispatch(setForm({ form: bakery })); // image(bakery img 제거하기)
      if (bakery.image) {
        dispatch(changeBakeryImg({ imgPreview: bakery.image }));
      }
      // setBakeryImg(bakery.image); // => image가 string으로 내려오면 File로?
    }
  }, [bakery]);

  React.useEffect(() => {
    if (bakery) {
      // 나중에 이미지가없을때 기본 이미지 폼 추가해줄지 고민.. 그러면 업데이트시 예외처리 필요
      onSelectOption(options.find(option => option.value === bakery.status)); // 초기값을 null이 아니라 미게시로 셋팅하면 될거같긴한데?
    }
  }, [bakery]);

  React.useEffect(() => {
    const links: { key: string; value: string }[] = [];
    for (const [key, value] of Object.entries(form)) {
      if (key.includes('URL')) {
        links.push({ key, value: value as string });
      }
    }
    dispatch(setLinks({ links }));
  }, []);

  const onChangeForm = (payload: { name: BakeryFormChangeKey; value: never }) => {
    dispatch(changeForm(payload));
  };

  const onChangeBakeryImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const imgPreview = URL.createObjectURL(e.target.files[0]);
    dispatch(changeBakeryImg({ imgPreview }));
  };

  const onToggleLinkOption = (currIdx: number) => {
    dispatch(toggleLinkOption({ currIdx }));
  };

  const onSelectLinkOption = (payload: { currIdx: number; optionValue: string; linkValue: string }) => {
    dispatch(selectLinkOption(payload));
  };

  const onChangeLinkValue = (payload: { currIdx: number; optionValue: string; linkValue: string }) => {
    dispatch(changeLinkValue(payload));
  };

  const onSetLinks = (links: Link[]) => {
    dispatch(setLinks({ links }));
  };

  const onRemoveLink = (currIdx: number) => {
    dispatch(removeLink({ currIdx }));
  };

  const onAddLink = () => {
    dispatch(addLink());
  };

  const onChangeMenuInput = (payload: { currIdx: number; name: string; value: string }) => {
    dispatch(changeMenuInput(payload));
  };

  const onRemoveMenu = (currIdx: number) => {
    dispatch(removeMenu({ currIdx }));
  };

  const onAddMenu = () => {
    dispatch(addMenu());
  };

  const onChangeMenuImg = ({ currIdx, e }: { currIdx: number; e: React.ChangeEvent<HTMLInputElement> }) => {
    if (!e.target.files) return;

    const imgPreview = URL.createObjectURL(e.target.files[0]);
    dispatch(changeMenuImg({ currIdx, imgPreview }));
  };

  const onCreateForm = (payload: FormData) => {
    createBakery({ payload });
  };

  const onUpdateForm = (payload: FormData) => {
    if (bakeryId) {
      updateBakery({ bakeryId: Number(bakeryId), payload });
    }
  };

  const onClickBack = () => {
    navigate(Routes.BAKERIES);
  };

  return (
    <Container>
      <div>
        <Button type={'gray'} text={'목록 돌아가기'} btnSize={'small'} onClickBtn={onClickBack} />
        <SelectBox width={120} isOpen={isOpen} onToggleSelectBox={onToggleSelectBox} triggerComponent={<StatusSelectTrigger selectedOption={selectedOption} />}>
          {options.map((option, idx) => (
            <StatusSelectOption key={idx} active={option.name === selectedOption?.name} option={option} onSelectOption={onSelectOption} />
          ))}
        </SelectBox>
      </div>
      <Form
        origin={bakery}
        form={form}
        links={formLinks}
        openedLinkIdx={openedLinkIdx}
        onChangeForm={onChangeForm}
        onChangeBakeryImg={onChangeBakeryImg}
        onToggleLinkOption={onToggleLinkOption}
        onSelectLinkOption={onSelectLinkOption}
        onChangeLinkValue={onChangeLinkValue}
        onSetLinks={onSetLinks}
        onRemoveLink={onRemoveLink}
        onAddLink={onAddLink}
        onChangeMenuInput={onChangeMenuInput}
        onRemoveMenu={onRemoveMenu}
        onAddMenu={onAddMenu}
        onChangeMenuImg={onChangeMenuImg}
        onSaveForm={bakeryId ? onUpdateForm : onCreateForm}
      />
    </Container>
  );
};

// 새로 작성한다 = img = File
// 받아온다 = img = str 인가?
// 빵집 수정할때만 breadId가 존재한다.

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  > div {
    padding: 2rem 6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
