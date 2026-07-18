import { useEffect, useState, useCallback } from "react";
import axios, { AxiosError } from "axios";

interface UseApiOptions {
  skip?: boolean;
  dependencies?: unknown[];
}

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
}

export function useApi<T = unknown>(
  url: string,
  options?: UseApiOptions
): UseApiState<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchData = useCallback(async () => {
    if (options?.skip) return;

    setState((prev) => ({ ...prev, loading: true }));
    try {
      const response = await axios.get<T>(url);
      setState({ data: response.data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error as AxiosError,
      });
    }
  }, [url, options?.skip]);

  useEffect(() => {
    fetchData();
  }, [fetchData, options?.dependencies]);

  return state;
}

export function usePost<T = unknown>(url: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const post = useCallback(
    async (data: unknown) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post<T>(url, data);
        setLoading(false);
        return response.data;
      } catch (err) {
        const axiosError = err as AxiosError;
        setError(axiosError);
        setLoading(false);
        throw axiosError;
      }
    },
    [url]
  );

  return { post, loading, error };
}

export function usePut<T = unknown>(url: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const put = useCallback(
    async (data: unknown) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.put<T>(url, data);
        setLoading(false);
        return response.data;
      } catch (err) {
        const axiosError = err as AxiosError;
        setError(axiosError);
        setLoading(false);
        throw axiosError;
      }
    },
    [url]
  );

  return { put, loading, error };
}

export function useDelete(url: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const remove = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(url);
      setLoading(false);
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError);
      setLoading(false);
      throw axiosError;
    }
  }, [url]);

  return { remove, loading, error };
}
