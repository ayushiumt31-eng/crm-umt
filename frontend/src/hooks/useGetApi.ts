import { useState, useCallback, useEffect } from "react";
import { AxiosError } from "axios";

export interface UseGetApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export interface UseGetApiOptions {
  immediate?: boolean;
  retry?: number;
  timeout?: number;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

/**
 * Generic hook for API GET requests
 * Usage: const { data, loading, error, refetch } = useGetApi(async () => fetch(...))
 * 
 * @param fetchFunction - Async function that makes the API call
 * @param options - Optional configuration
 * @returns State and functions
 */
export function useGetApi<T>(
  fetchFunction: () => Promise<T>,
  options: UseGetApiOptions = {}
) {
  const {
    immediate = true,
    retry = 0,
    timeout = 30000,
    onSuccess,
    onError,
  } = options;

  const [state, setState] = useState<UseGetApiState<T>>({
    data: null,
    loading: immediate,
    error: null,
    success: false,
  });

  const [retryCount, setRetryCount] = useState(0);

  /**
   * Execute the API call
   */
  const execute = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      // Create timeout promise
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Request timeout")), timeout)
      );

      // Race between fetch and timeout
      const result = await Promise.race([fetchFunction(), timeoutPromise]);

      setState({
        data: result,
        loading: false,
        error: null,
        success: true,
      });

      onSuccess?.();
      setRetryCount(0);
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof AxiosError
          ? err.response?.data?.message || err.message
          : err instanceof Error
            ? err.message
            : "Unknown error occurred";

      setState({
        data: null,
        loading: false,
        error: errorMessage,
        success: false,
      });

      onError?.(errorMessage);

      // Auto-retry logic
      if (retryCount < retry) {
        setRetryCount((prev) => prev + 1);
        // Retry after 1 second
        setTimeout(() => execute(), 1000);
        throw err;
      }

      throw err;
    }
  }, [fetchFunction, retry, retryCount, timeout, onSuccess, onError]);

  /**
   * Manual refetch
   */
  const refetch = useCallback(async () => {
    setRetryCount(0);
    return execute();
  }, [execute]);

  /**
   * Reset to initial state
   */
  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
      success: false,
    });
    setRetryCount(0);
  }, []);

  // Execute immediately if requested
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  return {
    ...state,
    refetch,
    reset,
    execute,
    isLoading: state.loading,
    isError: state.error !== null,
    isSuccess: state.success,
  };
}
