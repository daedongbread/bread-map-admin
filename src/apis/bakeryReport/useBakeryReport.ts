import { useQuery } from 'react-query';
import { getBakeryReport } from './bakeryReport';

const useGetBakeryReport = ({ reportId }: { reportId: number }) => {
  const queryKey = ['bakeryReport', { reportId }] as const;
  const { data, isLoading, isError, refetch } = useQuery(queryKey, () => getBakeryReport({ reportId }), {
    enabled: Boolean(reportId),
  });

  return {
    bakeryReport: data,
    loading: isLoading,
    error: isError,
    refetch: null,
  };
};

export { useGetBakeryReport };
