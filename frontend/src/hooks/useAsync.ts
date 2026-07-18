import { useState, useCallback, useEffect } from "react";

interface UseAsyncState<T> {
  status: "idle" | "pending" | "success" | "error";
  data: T | null;
  error: Error | null;
}

interface UseAsyncOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate = true,
  options?: UseAsyncOptions
) {
  const [state, setState] = useState<UseAsyncState<T>>({
    status: "idle",
    data: null,
    error: null,
  });

  const execute = useCallback(async () => {
    setState({ status: "pending", data: null, error: null });
    try {
      const response = await asyncFunction();
      setState({ status: "success", data: response, error: null });
      options?.onSuccess?.();
      return response;
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      setState({ status: "error", data: null, error: err });
      options?.onError?.(err);
      throw err;
    }
  }, [asyncFunction, options]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { ...state, execute };
}
