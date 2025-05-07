import { useSearchParams } from "react-router";
import React from "react";

/**
 * Hook for reading & writing a single search param,
 * with an optional default that’s _also_ written into the URL.
 */
export function useQueryParam(
  key: string,
  defaultValue?: string
): [string, (value: string) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const raw = searchParams.get(key);

  // 1) On mount, if the param is missing and we have a default, write it.
  React.useEffect(() => {
    if (raw === null && defaultValue !== undefined) {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set(key, defaultValue);
        return next;
      });
    }
  }, [raw, defaultValue, key, setSearchParams]);

  // 2) Return either the raw value or the default
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
