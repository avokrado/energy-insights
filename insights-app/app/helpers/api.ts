const BASE_URL = `http://localhost:${process.env.PORT || 3000}`;

export async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  if (res.status !== 204) {
    return res.json() as Promise<T>;
  }

  return {} as T; // return empty object if no content
}
