import { useQuery } from 'react-query';
import { getBakeryReports, GetBakeryReportsPayload } from './bakeryReport';

const useGetBakeryReports = ({ page }: GetBakeryReportsPayload) => {
  const queryKey = ['bakeryReports', { page }] as const;
  const { data, isLoading, isFetching, isError, refetch } = useQuery(queryKey, () => getBakeryReports({ page }), {
    enabled: !isNaN(page),
  });
  return {
    data,
    loading: isLoading,
    fetching: isFetching,
    error: isError,
    refetch,
  };
};

export { useGetBakeryReports };
