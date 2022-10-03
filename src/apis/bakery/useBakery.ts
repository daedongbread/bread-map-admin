import { useMutation, useQuery } from 'react-query';
import { BakeryDetailEntity } from '@/apis/bakery/types';
import { bakeryUtils } from '@/utils';
import { fetcher } from '../axios/fetcher';

type GetBakeryResponse = {
  data: BakeryDetailEntity;
};

type CreateUpdateBakeryPayload = {
  payload: FormData;
};

const getBakery = async (bakeryId: { bakeryId: number }) => {
  const resp = await fetcher.get<GetBakeryResponse>('bakery', { params: { bakeryId } });
  return resp.data.data;
};

const createBakery = async ({ payload }: CreateUpdateBakeryPayload) => {
  await fetcher.post('bakery', { data: { ...payload } });
};

const updateBakery = async ({ bakeryId, payload }: { bakeryId: number } & CreateUpdateBakeryPayload) => {
  await fetcher.patch('bakery', { params: { bakeryId }, data: { ...payload } });
};

const useGetBakery = ({ bakeryId }: { bakeryId: number }) => {
  // ** server 동작시 주석 제거
  // const queryKey = ['bakery', { bakeryId }] as const;
  // const { data, isLoading, isError, refetch } = useQuery(queryKey, () => getBakery({ bakeryId }));
  // enabled 필요한가?
  const MOCK_DATA: GetBakeryResponse['data'] = {
    name: 'bakery',
    image: null,
    address: '서울시',
    latitude: 33,
    longitude: 32,
    hours: '오전 11시 - 오후 9시',
    websiteURL: 'http://website',
    instagramURL: 'http://instagram',
    facebookURL: 'http://facebook',
    blogURL: 'http://blog',
    phoneNumber: '010-1111-1111',
    facilityInfoList: ['화장실', '주차장'],
    menu: [
      {
        breadId: 35324,
        name: '소금빵',
        price: 3000,
        image: null,
      },
      {
        breadId: 2322,
        name: '크림샌드위치',
        price: 4500,
        image: null,
      },
    ],
    status: 'UNPOSTING',
  };

  return {
    bakery: MOCK_DATA, // data
    loading: false, //isLoading,
    error: false, // isError,
    refetch: null,
  };
};

const useCreateBakery = () => {
  const { mutate, isLoading, isError } = useMutation(createBakery, {
    onSuccess: () => {},
    onError: () => {},
  });
  return {
    mutate,
    loading: false, //isLoading,
    error: false, // isError,
    refetch: null,
  };
};

const useUpdateBakery = () => {
  const { mutate, isLoading, isError } = useMutation(updateBakery, {
    onSuccess: () => {},
    onError: () => {},
  });

  return {
    mutate,
    loading: false, //isLoading,
    error: false, // isError,
    refetch: null,
  };
};

export { useGetBakery, useCreateBakery, useUpdateBakery };
