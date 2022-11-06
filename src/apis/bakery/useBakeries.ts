import { useQuery, QueryClient, useQueryClient } from 'react-query';
import { getBakeries, GetBakeriesPayload, searchBakeries } from './bakery';

const useGetBakeries = ({ name, page }: GetBakeriesPayload) => {
  const queryClient = useQueryClient();

  const queryKey = ['getBakeries', { page }] as const;
  const { data, isLoading, isFetching, isError, refetch } = useQuery(queryKey, () => getBakeries({ page }), {
    enabled: !isNaN(page) && !name,
    // onSuccess: data => {
    //   queryClient.setQueryData('getBakeries', [page], data);
    // },
  });
  return {
    data,
    loading: isLoading,
    fetching: isFetching,
    error: isError,
    refetch,
  };
};

const useSearchBakeries = ({ name, page }: GetBakeriesPayload) => {
  const queryKey = ['searchBakeries', { name, page }] as const;
  const { data, isLoading, isFetching, isError, refetch } = useQuery(queryKey, () => searchBakeries({ name, page }), {
    enabled: !isNaN(page) && !!name,
  });
  return {
    data,
    loading: isLoading,
    fetching: isFetching,
    error: isError,
    refetch,
  };
};

export { useGetBakeries, useSearchBakeries };
