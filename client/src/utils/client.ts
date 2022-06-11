const defaultconfig: Partial<RequestInit> = {
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  },
};

export async function request<T = Record<string, unknown>>(
  url: string,
  method = "GET",
  config: Partial<RequestInit> = {},
  data: unknown = {},
): Promise<T> {
  const response = await fetch(url, {
    ...defaultconfig,
    ...config,
    method,
    body: method === "GET" ? undefined : JSON.stringify(data),
  });

  if (response.status >= 200) {
    return response.json().catch(() => null) as Promise<T>;
  }

  throw new Error("Request failed");
}
