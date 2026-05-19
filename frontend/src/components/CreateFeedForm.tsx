"use client";

import { useState } from 'react';
import { createFeed } from '@/services/api';
import toast from 'react-hot-toast';

export default function CreateFeedForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setIsSubmitting(true);
      await createFeed({ title, description });
      toast.success('Feed published successfully!');
      setTitle('');
      setDescription('');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to publish feed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 animate-slideIn">
      <div className="mb-6 border-b border-gray-100 pb-4">
        <h2 className="text-xl font-bold text-gray-900">Create Update</h2>
        <p className="text-sm text-gray-500 mt-1">Broadcast an update to everyone in the feed.</p>
      </div>
      
      <div className="space-y-5">
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Headline
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-400"
            placeholder="What's the main topic?"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Details
          </label>
          <textarea
            id="description"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-400 resize-none"
            placeholder="Provide more context here..."
            disabled={isSubmitting}
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting || !title.trim() || !description.trim()}
            className={`w-full sm:w-auto px-6 py-2.5 rounded-lg font-semibold text-white transition-colors flex items-center justify-center ${
              isSubmitting || !title.trim() || !description.trim()
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? 'Publishing...' : 'Publish Update'}
          </button>
        </div>
      </div>
    </form>
  );
}
