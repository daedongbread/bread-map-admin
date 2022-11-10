export * from './types';
import { fetcher } from '../axios';
import { BakeryReportsItemEntity } from './types';

type GetBakeryReportsResponse = {
  contents: BakeryReportsItemEntity[];
  numberOfElements: number;
  pageNumber: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export type GetBakeryReportsPayload = {
  page: number;
};

const getBakeryReports = async ({ page }: GetBakeryReportsPayload) => {
  const resp = await fetcher.get<GetBakeryReportsResponse>('/bakery/report/all', { params: { page } });
  return { bakeryReports: resp.data.contents, totalCount: resp.data.totalElements };
};

const getBakeryReport = async ({ reportId }: { reportId: number }) => {
  const resp = await fetcher.get<BakeryReportsItemEntity>(`/bakery/report/${reportId}`);
  return resp.data;
};

export { getBakeryReports, getBakeryReport };
