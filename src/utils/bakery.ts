import { theme } from '@/styles';

const formatUseColumn = (status: 'POSTING' | 'UNPOSTING') => {
  switch (status) {
    case 'POSTING':
      return {
        color: theme.color.green,
        text: '게시중',
      };
    case 'UNPOSTING':
    default:
      return {
        color: theme.color.red,
        text: '미게시',
      };
  }
};

export { formatUseColumn };
