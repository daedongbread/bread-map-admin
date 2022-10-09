import { useMutation, useQuery } from 'react-query';
import { createBakery, getBakery, updateBakery } from './bakery';

const useGetBakery = ({ bakeryId }: { bakeryId: number }) => {
  const queryKey = ['bakery', { bakeryId }] as const;
  const { data, isLoading, isError, refetch } = useQuery(queryKey, () => getBakery({ bakeryId }));
  // enabled 필요한가?
  // const MOCK_DATA: GetBakeryResponse['data'] = {
  //   name: 'bakery',
  //   image: null,
  //   address: '서울시',
  //   latitude: 33,
  //   longitude: 32,
  //   hours: '오전 11시 - 오후 9시',
  //   websiteURL: 'http://website',
  //   instagramURL: 'http://instagram',
  //   facebookURL: 'http://facebook',
  //   blogURL: 'http://blog',
  //   phoneNumber: '010-1111-1111',
  //   facilityInfoList: ['화장실', '주차장'],
  //   menu: [
  //     {
  //       breadId: 35324,
  //       name: '소금빵',
  //       price: 3000,
  //       image: null,
  //     },
  //     {
  //       breadId: 2322,
  //       name: '크림샌드위치',
  //       price: 4500,
  //       image: null,
  //     },
  //   ],
  //   status: 'UNPOSTING',
  // };

  return {
    bakery: data,
    loading: isLoading,
    error: isError,
    refetch: null,
  };
};

const useCreateBakery = () => {
  const { mutate, isLoading, isError } = useMutation(createBakery, {
    // onSuccess: () => {},
    // onError: () => {},
  });
  return {
    mutate,
    loading: isLoading,
    error: isError,
    refetch: null,
  };
};

const useUpdateBakery = () => {
  const { mutate, isLoading, isError } = useMutation(updateBakery, {
    // onSuccess: () => {},
    // onError: () => {},
  });

  return {
    mutate,
    loading: isLoading,
    error: isError,
    refetch: null,
  };
};

export { useGetBakery, useCreateBakery, useUpdateBakery };
