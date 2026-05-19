import CreateFeedForm from '@/components/CreateFeedForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SYNCUP Admin',
  description: 'Create and publish new coaching feeds.',
};

export default function AdminPage() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-8 animate-slideIn">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Post new updates to the feed.</p>
      </div>
      
      <CreateFeedForm />
    </div>
  );
}
