import { useState, useEffect, useCallback, useRef } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Use a ref to store the abort controller
  const abortControllerRef = useRef(null);
  
  // Use a ref to track if the component is mounted
  const mounted = useRef(true);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mounted.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Reset state when URL changes
  useEffect(() => {
    setPage(1);
    setData(null);
    setHasMore(true);
  }, [url]);

  const fetchData = useCallback(async () => {
    try {
      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController();
      
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${url}${url.includes('?') ? '&' : '?'}_page=${page}&_limit=10`,
        { signal: abortControllerRef.current.signal }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      
      if (mounted.current) {
        if (json.length < 10) {
          setHasMore(false);
        }
        
        setData(prevData => {
          if (page === 1) return json;
          return [...(prevData || []), ...json];
        });
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Fetch aborted');
        return;
      }
      if (mounted.current) {
        setError(error.message);
      }
    } finally {
      if (mounted.current) {
        setLoading(false);
      }
    }
  }, [url, page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  }, [loading, hasMore]);

  const refresh = useCallback(() => {
    setPage(1);
    setData(null);
    setHasMore(true);
    fetchData();
  }, [fetchData]);

  return { 
    data, 
    loading, 
    error, 
    loadMore, 
    hasMore, 
    refresh,
    setData 
  };
};

export default useFetch;