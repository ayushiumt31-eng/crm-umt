import { useState, useCallback } from "react";
import { AxiosError } from "axios";

export interface UseSubmitApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export interface UseSubmitApiOptions<T> {
  timeout?: number;
  retry?: number;
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
  onSettled?: () => void;
}

/**
 * Generic hook for API POST/PUT requests (Create/Update)
 * Usage: const { execute: submit, loading, error } = useSubmitApi(async (data) => fetch(...))
 * 
 * @param submitFunction - Async function that makes the API call and returns data
 * @param options - Optional configuration
 * @returns State and functions
 */
export function useSubmitApi<T, P = any>(
  submitFunction: (payload: P) => Promise<T>,
  options: UseSubmitApiOptions<T> = {}
) {
  const {
    timeout = 30000,
    retry = 1,
    onSuccess,
    onError,
    onSettled,
  } = options;

  const [state, setState] = useState<UseSubmitApiState<T>>({
    data: null,
    loading: false,
    error: null,
    success: false,
  });

  const [retryCount, setRetryCount] = useState(0);

  /**
   * Execute the submission
   */
  const execute = useCallback(
    async (payload: P) => {
      try {
        setState({
          data: null,
          loading: true,
          error: null,
          success: false,
        });

        setRetryCount(0);

        // Create timeout promise
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Request timeout")), timeout)
        );

        // Race between submit and timeout
        const result = await Promise.race([
          submitFunction(payload),
          timeoutPromise,
        ]);

        setState({
          data: result,
          loading: false,
          error: null,
          success: true,
        });

        onSuccess?.(result);
        onSettled?.();

        return result;
      } catch (err) {
        const errorMessage =
          err instanceof AxiosError
            ? err.response?.data?.message || err.message
            : err instanceof Error
              ? err.message
              : "Unknown error occurred";

        // Retry logic
        if (retryCount < retry) {
          setRetryCount((prev) => prev + 1);
          // Retry after 1 second
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              execute(payload).then(resolve).catch(reject);
            }, 1000);
          });
        }

        setState({
          data: null,
          loading: false,
          error: errorMessage,
          success: false,
        });

        onError?.(errorMessage);
        onSettled?.();

        throw new Error(errorMessage);
      }
    },
    [submitFunction, timeout, retry, retryCount, onSuccess, onError, onSettled]
  );

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

  /**
   * Clear error only
   */
  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    execute,
    reset,
    clearError,
    isLoading: state.loading,
    isError: state.error !== null,
    isSuccess: state.success,
  };
}
