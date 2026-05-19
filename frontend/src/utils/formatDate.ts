import { formatDistanceToNow } from 'date-fns';

export const formatRelativeTime = (dateString: string) => {
  try {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  } catch (error) {
    return 'Invalid date';
  }
};
