import { useQuery } from 'react-query';
import { getBakeries, GetBakeriesPayload } from './bakery';

const useGetBakeries = ({ page }: GetBakeriesPayload) => {
  const queryKey = ['bakeries', { page }] as const;
  const { data, isLoading, isFetching, isError, refetch } = useQuery(queryKey, () => getBakeries({ page }), {
    enabled: Boolean(page),
  });
  return {
    data,
    loading: isLoading,
    fetching: isFetching,
    error: isError,
    refetch,
  };
};

export { useGetBakeries };
