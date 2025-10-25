import React, { useState, useRef, useCallback } from 'react';
import useFetch from '../hooks/useFetch';
import Card from './Card';
import Button from './Button';

const Posts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const observer = useRef();
  const { data: posts, loading, error, loadMore, hasMore } = useFetch(
    `https://jsonplaceholder.typicode.com/posts${searchTerm ? `?title_like=${searchTerm}` : ''}`
  );

  const lastPostElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, loadMore]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (error) {
    return (
      <Card>
        <div className="text-red-500 text-center p-4">
          Error: {error}
          <Button variant="primary" onClick={() => window.location.reload()} className="mt-4">
            Retry
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 shadow z-10">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts?.map((post, index) => (
          <div
            key={post.id}
            ref={posts.length === index + 1 ? lastPostElementRef : null}
          >
            <Card
              title={post.title}
              className="h-full transition-transform hover:scale-105"
            >
              <p className="text-gray-600 dark:text-gray-400">{post.body}</p>
              <div className="mt-4 text-sm text-gray-500">Post ID: {post.id}</div>
            </Card>
          </div>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* No Results */}
      {!loading && posts?.length === 0 && (
        <Card>
          <div className="text-center text-gray-500 dark:text-gray-400 p-4">
            No posts found
          </div>
        </Card>
      )}
    </div>
  );
};

export default Posts;