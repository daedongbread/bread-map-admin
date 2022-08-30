import { theme } from '@/styles';

const formatUseColumn = (use: boolean) => {
  if (use)
    return {
      color: theme.color.green,
      text: '게시중',
    };
  else
    return {
      color: theme.color.red,
      text: '미게시',
    };
};

export { formatUseColumn };
