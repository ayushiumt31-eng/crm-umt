import { useState, useCallback } from "react";

export interface CRUDResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface CRUDState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

/**
 * Generic hook for GET operations
 * Usage: const { data, loading, error } = useGet(apiFunction)
 */
export function useGet<T>(
  fetchFunction: () => Promise<T>,
  immediate = true
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction();
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch data";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  // Execute immediately if requested
  React.useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  const refetch = useCallback(async () => {
    return execute();
  }, [execute]);

  return { data, loading, error, refetch, execute };
}

/**
 * Generic hook for CREATE/UPDATE operations
 * Usage: const { execute: submit, loading, error, success } = useSubmit(submitFunction)
 */
export function useSubmit<T, P>(
  submitFunction: (payload: P) => Promise<T>
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const execute = useCallback(
    async (payload: P) => {
      try {
        setLoading(true);
        setError(null);
        setSuccess(false);

        const result = await submitFunction(payload);
        setData(result);
        setSuccess(true);
        
        return result;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Operation failed";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [submitFunction]
  );

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setSuccess(false);
    setData(null);
  }, []);

  return { execute, loading, error, success, data, reset };
}

/**
 * Generic hook for DELETE operations
 * Usage: const { execute: delete, loading, error, success } = useDelete(deleteFunction)
 */
export function useDelete<T = void>(
  deleteFunction: (id: string) => Promise<T>
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [deletedId, setDeletedId] = useState<string | null>(null);

  const execute = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        setError(null);
        setSuccess(false);

        await deleteFunction(id);
        setDeletedId(id);
        setSuccess(true);
        
        return true;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Delete failed";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [deleteFunction]
  );

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setSuccess(false);
    setDeletedId(null);
  }, []);

  return { execute, loading, error, success, deletedId, reset };
}

// Import React for useEffect
import React from "react";
