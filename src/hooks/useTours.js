import { useState, useEffect, useCallback } from 'react';
import { toursService } from '../services/tours';

/**
 * Custom hook for tours
 */
const useTours = (params = {}) => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTours = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await toursService.getTours(params);
      setTours(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  return { tours, loading, error, refetch: fetchTours };
};

export default useTours;

