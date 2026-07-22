import {
  useQuery,
  type QueryKey,
  type UseQueryOptions,
} from "@tanstack/react-query";

import api from "@/lib/axios";

interface UseGetProps<T> {
  url: string;
  queryKey: QueryKey;
  enabled?: boolean;
  params?: Record<string, unknown>;
  options?: Omit<
    UseQueryOptions<T>,
    "queryKey" | "queryFn"
  >;
}

export default function useGet<T>({
  url,
  queryKey,
  enabled = true,
  params,
  options,
}: UseGetProps<T>) {
  return useQuery<T>({
    queryKey,
    queryFn: async () => {
      const response = await api.get<T>(url, {
        params,
      });

      return response.data;
    },
    enabled,
    ...options,
  });
}