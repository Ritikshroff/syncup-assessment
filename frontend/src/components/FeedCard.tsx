import { formatRelativeTime } from '@/utils/formatDate';
import { FiClock } from 'react-icons/fi';

interface FeedCardProps {
  feed: {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
  };
  isNew?: boolean;
}

export default function FeedCard({ feed, isNew = false }: FeedCardProps) {
  return (
    <div className={`bg-white rounded-xl p-6 border ${isNew ? 'border-blue-400 shadow-md ring-1 ring-blue-400' : 'border-gray-200 shadow-sm'} transition-shadow hover:shadow-md animate-slideIn relative`}>
      {isNew && (
        <div className="absolute top-6 right-6 flex items-center bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-200">
          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse mr-1.5"></span>
          New
        </div>
      )}
      
      <h3 className="text-xl font-semibold text-gray-900 mb-3 pr-16">{feed.title}</h3>
      
      <p className="text-gray-700 mb-5 whitespace-pre-wrap leading-relaxed">
        {feed.description}
      </p>
      
      <div className="flex items-center text-sm text-gray-500 pt-4 border-t border-gray-100">
        <FiClock className="mr-1.5" />
        <time dateTime={feed.createdAt}>{formatRelativeTime(feed.createdAt)}</time>
      </div>
    </div>
  );
}
