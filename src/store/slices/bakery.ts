import { BakeryDetailBaseEntity, BakeryDetailEntity, BakeryStatus } from '@/apis';
import { Link } from '@/components/BakeryDetail/LinkForm';
import { SelectOption } from '@/components/Shared';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// 타입지정시 reducer type error..
export type BakeryForm = BakeryDetailBaseEntity & {
  productList: {
    breadId: number;
    name: string;
    price: number;
    image: string | null;
  }[];
  status: BakeryStatus | null;
  facilityInfoList: string[];
};

const initialBakeryForm: BakeryForm = {
  name: '',
  image: null,
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
  productList: [
    {
      breadId: 0, // 생성시에만 있음
      name: '',
      price: 0,
      image: '', // 조회시에만 이미지 여기에 들어옴
    },
  ],
  status: 'UNPOSTING',
};

export type BakeryFormChangeKey = keyof BakeryDetailBaseEntity;

interface BakeryState {
  loading: boolean;
  error: boolean;
  form: BakeryForm;
  formLinks: Link[];
  openedLinkIdx: number | null;
}

const initialState: BakeryState = {
  loading: false,
  error: false,
  form: initialBakeryForm,
  formLinks: [],
  openedLinkIdx: null,
};

const bakerySlice = createSlice({
  name: 'bakery',
  initialState,
  reducers: {
    changeForm(state, action: PayloadAction<{ name: BakeryFormChangeKey; value: never }>) {
      // naver type 수정필요
      const { name, value } = action.payload;
      state.form[name] = value;
    },
    setForm(state, action: PayloadAction<{ form: BakeryDetailEntity }>) {
      const { form } = action.payload;
      state.form = form;
    },
    changeBakeryStatus(state, action: PayloadAction<{ status: string }>) {
      const { status } = action.payload;
      state.form.status = status as BakeryStatus;
    },
    changeBakeryImg(state, action: PayloadAction<{ imgPreview: string }>) {
      const { imgPreview } = action.payload;
      state.form.image = imgPreview;
    },
    toggleLinkOption(state, action: PayloadAction<{ currIdx: number }>) {
      const { openedLinkIdx } = state;
      const { currIdx } = action.payload;
      if (currIdx === openedLinkIdx) {
        state.openedLinkIdx = null;
      } else {
        state.openedLinkIdx = currIdx;
      }
    },
    selectLinkOption(state, action: PayloadAction<{ currIdx: number; optionValue: SelectOption['value']; linkValue: string }>) {
      // 중복 선택 안되도록 구현필요
      const { currIdx, optionValue, linkValue } = action.payload;
      const target = state.formLinks[currIdx];
      state.formLinks.splice(currIdx, 1, { ...target, key: optionValue });

      const updatedLinks: { [name: string]: string } = {};
      state.formLinks.forEach(link => {
        updatedLinks[optionValue] = linkValue;
      });
      state.form = { ...state.form, ...updatedLinks };
    },
    changeLinkValue(state, action: PayloadAction<{ currIdx: number; optionValue: SelectOption['value']; linkValue: string }>) {
      const { currIdx, optionValue, linkValue } = action.payload;
      const target = state.formLinks[currIdx];
      state.formLinks.splice(currIdx, 1, { ...target, value: linkValue });

      const updatedLinks: { [key: string]: string } = {};
      state.formLinks.forEach(link => {
        updatedLinks[optionValue] = linkValue;
      });
      state.form = { ...state.form, ...updatedLinks };
    },
    setLinks(state, action: PayloadAction<{ links: Link[] }>) {
      const { links } = action.payload;
      state.formLinks = links;
    },
    removeLink(state, action: PayloadAction<{ currIdx: number }>) {
      const { currIdx } = action.payload;
      state.formLinks.splice(currIdx, 1);
    },
    addLink(state) {
      state.formLinks.push({ key: '', value: '' });
    },
    changeMenuInput(state, action: PayloadAction<{ currIdx: number; name: string; value: string }>) {
      const { currIdx, name, value } = action.payload;
      const target = state.form.productList[currIdx];
      state.form.productList.splice(currIdx, 1, { ...target, [name]: value });
    },
    removeMenu(state, action: PayloadAction<{ currIdx: number }>) {
      const { currIdx } = action.payload;
      state.form.productList = state.form.productList.filter((meu, idx) => idx !== currIdx);
    },
    addMenu(state) {
      const breadId = 324; // random
      state.form.productList.push({ breadId, name: '', price: 0, image: null });
    },
    changeMenuImg(state, action: PayloadAction<{ currIdx: number; imgPreview: string }>) {
      const { currIdx, imgPreview } = action.payload;
      const target = state.form.productList[currIdx];
      state.form.productList.splice(currIdx, 1, { ...target, image: imgPreview });
    },
  },
});

export default bakerySlice.reducer;
export const {
  changeForm,
  setForm,
  changeBakeryStatus,
  changeBakeryImg,
  toggleLinkOption,
  selectLinkOption,
  changeLinkValue,
  setLinks,
  removeLink,
  addLink,
  changeMenuInput,
  removeMenu,
  addMenu,
  changeMenuImg,
} = bakerySlice.actions;
