import { useMutation, useQuery } from 'react-query';
import { createBakery, getBakery, updateBakery } from './bakery';

const useGetBakery = ({ bakeryId }: { bakeryId: number }) => {
  const queryKey = ['bakery', { bakeryId }] as const;
  const { data, isLoading, isError, refetch } = useQuery(queryKey, () => getBakery({ bakeryId }), {
    enabled: !isNaN(bakeryId),
  });

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
