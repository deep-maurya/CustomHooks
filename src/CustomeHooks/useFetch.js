import { useState, useEffect, useRef } from 'react';

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cache = useRef({});

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      if (cache.current[url]) {
        setData(cache.current[url]);
        setLoading(false);
      } else {
        try {
          const response = await fetch(url);
          if (!response.ok) throw new Error('Failed to fetch data');
          const result = await response.json();
          if (isMounted) {
            cache.current[url] = result;
            setData(result);
          }
        } catch (err) {
          if (isMounted) setError(err.message);
        } finally {
          if (isMounted) setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
};
