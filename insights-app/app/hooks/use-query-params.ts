// hooks/use-query-param.ts

import { useSearchParams } from "react-router";

/**
 * Hook for reading and writing a single search param in the URL
 */
export function useQueryParam(
  key: string,
  defaultValue?: string
): [string, (value: string) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const raw = searchParams.get(key);

  const value = raw ?? defaultValue ?? "";

  const setValue = (newValue: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set(key, newValue);
      return next;
    });
  };

  return [value, setValue];
}
