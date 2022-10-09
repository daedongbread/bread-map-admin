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
  page: number;
};

export type CreateUpdateBakeryPayload = {
  payload: FormData;
};

const getBakeries = async ({ page }: GetBakeriesPayload) => {
  const resp = await fetcher.get<GetBakeriesResponse>(`/bakery/all?page=${page}`);
  console.log('resp', resp);
  return { bakeries: resp.data.contents, totalCount: resp.data.totalElements };
};

const getBakery = async (bakeryId: { bakeryId: number }) => {
  const resp = await fetcher.get<BakeryDetailEntity>('bakery', { params: { bakeryId } });
  return resp.data;
};

const createBakery = async ({ payload }: CreateUpdateBakeryPayload) => {
  await fetcher.post('bakery', { data: { ...payload } });
};

const updateBakery = async ({ bakeryId, payload }: { bakeryId: number } & CreateUpdateBakeryPayload) => {
  await fetcher.patch('bakery', { params: { bakeryId }, data: { ...payload } });
};

export { getBakeries, getBakery, createBakery, updateBakery };
