import { BakeryReportsItemEntity, BakeryReportStatus } from '@/apis';
import { ContentsRow } from '@/components/BakeryReportDetail';
import { theme } from '@/styles';

const formatReflectStatusColumn = (status: BakeryReportStatus) => {
  switch (status) {
    case 'BEFORE_REFLECT':
      return {
        color: theme.color.green,
        text: '검토전',
      };
    case 'NOT_REFLECT':
      return {
        color: theme.color.green,
        text: '미반영',
      };
    case 'REFLECT':
    default:
      return {
        color: theme.color.red,
        text: '반영완료',
      };
  }
};

const extractContentsWithType = (bakeryReport: BakeryReportsItemEntity): ContentsRow[] => {
  const contents: ContentsRow[] = [
    { label: '제보자', text: bakeryReport.nickName, type: 'input' },
    { label: '빵집 이름', text: bakeryReport.bakeryName, type: 'input' },
    { label: '빵집 위치', text: bakeryReport.location, type: 'input' },
    { label: '추천 이유', text: bakeryReport.content, type: 'textarea' },
  ];
  return contents;
};

export { formatReflectStatusColumn, extractContentsWithType };
