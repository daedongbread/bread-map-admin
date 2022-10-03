import { useQuery } from 'react-query';
import { BakeriesItemEntity } from '@/apis/bakery/types';
import { TableData } from '@/components/Shared';
import type { CompleteStatusProps as StatusProps } from '@/components/Shared';
import { bakeryUtils } from '@/utils';
import { fetcher } from '../axios/fetcher';

type GetBakeriesResponse = {
  data: BakeriesItemEntity[];
};

type GetBakeriesPayload = {
  page: number;
};

const requestGetBakeries = async ({ page }: GetBakeriesPayload) => {
  const resp = await fetcher.get<GetBakeriesResponse>(`/bakery/all?page=${page}`);
  return resp.data.data;
};

const useGetBakeries = ({ page }: GetBakeriesPayload) => {
  // ** server 동작시 주석 제거
  // const queryKey = ['bakeries', { page }] as const;
  // const { data, isLoading, isError, refetch } = useQuery(queryKey, () => requestGetBakeries({ page }));
  // enabled 필요한가?
  const MOCK_DATA: TableData<Omit<BakeriesItemEntity, 'status'> & { status: StatusProps; notification: string }> = [
    {
      bakeryId: 1,
      name: '루엘드파리2',
      notification: '',
      createdAt: '2021-03-02',
      modifiedAt: '2021-04-06',
      status: bakeryUtils.formatStatusColumn('POSTING'),
    },
    {
      bakeryId: 2,
      name: '서울앵무새',
      notification: '',
      createdAt: '2021-04-07',
      modifiedAt: '2021-08-03',
      status: bakeryUtils.formatStatusColumn('UNPOSTING'),
    },
  ];
  return {
    bakeries: MOCK_DATA,
    loading: false, //isLoading,
    error: false, // isError,
    refetch: null,
  };
};

export { useGetBakeries };
