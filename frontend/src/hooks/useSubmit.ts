import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";

import api from "@/lib/axios";

type HttpMethod = "POST" | "PUT" | "PATCH" | "DELETE";

interface UseSubmitProps<TData, TVariables> {
  url: string | ((variables: TVariables) => string);
  method?: HttpMethod;
  invalidateQueries?: string[][];
  options?: Omit<
    UseMutationOptions<TData, Error, TVariables>,
    "mutationFn"
  >;
}

export default function useSubmit<TData = unknown, TVariables = unknown>({
  url,
  method = "POST",
  invalidateQueries = [],
  options,
}: UseSubmitProps<TData, TVariables>) {
  const queryClient = useQueryClient();

  return useMutation<TData, Error, TVariables>({
    mutationFn: async (variables) => {
      const finalUrl =
        typeof url === "function"
          ? url(variables)
          : url;

      const response = await api.request<TData>({
        url: finalUrl,
        method,
        ...(method === "DELETE"
          ? {}
          : { data: variables }),
      });

      return response.data;
    },

    onSuccess: async (...args) => {
      await Promise.all(
        invalidateQueries.map((queryKey) =>
          queryClient.invalidateQueries({
            queryKey,
          })
        )
      );

      options?.onSuccess?.(...args);
    },

    ...options,
  });
}