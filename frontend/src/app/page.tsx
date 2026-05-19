"use client";

import { useEffect, useState, useCallback } from 'react';
import FeedCard from '@/components/FeedCard';
import { getFeeds } from '@/services/api';
import { useSocket } from '@/hooks/useSocket';
import toast from 'react-hot-toast';

export default function HomePage() {
  const [feeds, setFeeds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeeds = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getFeeds();
      setFeeds(data.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch feeds');
      toast.error('Failed to load feed data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeeds();
  }, [fetchFeeds]);

  // Use the custom socket hook to listen for real-time updates
  useSocket({
    onNewFeed: (newFeed) => {
      setFeeds((prevFeeds) => {
        if (prevFeeds.some((feed) => feed._id === newFeed._id)) {
          return prevFeeds;
        }
        return [{ ...newFeed, isNew: true }, ...prevFeeds];
      });
      toast.success('New update available!');
    },
    onDisconnect: () => {
      toast.error('Connection lost. Reconnecting...', { id: 'socket-disconnect' });
    }
  });

  if (loading) {
    return (
      <div className="space-y-6 pt-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SYNCUP Feed</h1>
          <p className="text-gray-600">Company updates and coaching insights.</p>
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-5"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 bg-white border border-gray-200 rounded-xl mt-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Unable to load feed</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button 
          onClick={fetchFeeds}
          className="px-5 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-6">
      <div className="mb-8 animate-slideIn">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">SYNCUP Feed</h1>
        <p className="text-gray-600">Company updates and coaching insights.</p>
      </div>

      {feeds.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-xl animate-slideIn">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">No updates yet</h2>
          <p className="text-gray-500">Check back later for new announcements.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {feeds.map((feed) => (
            <FeedCard key={feed._id} feed={feed} isNew={feed.isNew} />
          ))}
        </div>
      )}
    </div>
  );
}
