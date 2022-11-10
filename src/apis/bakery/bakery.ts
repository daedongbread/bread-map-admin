import { fetcher } from '../axios';
import { BakeriesItemEntity, BakeryDetailEntity } from './types';

// 데이터 내부에 이런값들이 필요한가?
type GetBakeriesResponse = {
  contents: BakeriesItemEntity[];
  numberOfElements: number;
  pageNumber: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export type GetBakeriesPayload = {
  name?: string;
  page: number;
};

export type CreateUpdateBakeryPayload = {
  payload: FormData;
};

const getBakeries = async ({ page }: GetBakeriesPayload) => {
  const resp = await fetcher.get<GetBakeriesResponse>('/bakery/all', { params: { page } });
  return { bakeries: resp.data.contents, totalCount: resp.data.totalElements };
};

const searchBakeries = async ({ name, page }: GetBakeriesPayload) => {
  const resp = await fetcher.get<GetBakeriesResponse>('/bakery/search', { params: { name, page } });
  return { bakeries: resp.data.contents, totalCount: resp.data.totalElements };
};

const getBakery = async ({ bakeryId }: { bakeryId: number }) => {
  const resp = await fetcher.get<BakeryDetailEntity>(`bakery/${bakeryId}`);
  return resp.data;
};

const createBakery = async ({ payload }: CreateUpdateBakeryPayload) => {
  await fetcher.post('bakery', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const updateBakery = async ({ bakeryId, payload }: { bakeryId: number } & CreateUpdateBakeryPayload) => {
  for (const [key, value] of payload) {
    console.log(`@@@${key}: ${value}`);
  }
  await fetcher.post(`bakery/${bakeryId}`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// const updateBakeryStatus = () => {
//   await fetcher.patch(``)
// }

export { getBakeries, searchBakeries, getBakery, createBakery, updateBakery };
