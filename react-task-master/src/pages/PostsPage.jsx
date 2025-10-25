import React from 'react';
import Posts from '../components/Posts';
import Card from '../components/Card';

const PostsPage = () => {
  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <Card title="Posts from JSONPlaceholder">
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          This page demonstrates API integration with infinite scrolling, search functionality, 
          loading states, and error handling.
        </p>
      </Card>
      
      <div className="mt-6">
        <Posts />
      </div>
    </div>
  );
};

export default PostsPage;