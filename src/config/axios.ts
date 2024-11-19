interface ApiResponse<T> {
  data: T;
  status: number;
}

const fetchInterceptor = async <T>(
  url: string,
  options?: RequestInit,
): Promise<ApiResponse<T>> => {
  const BASE_URL = import.meta.env.VITE_BASE_API_URL;
  const token = import.meta.env.VITE_API_TOKEN;

  const modifiedOptions: RequestInit = {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(BASE_URL + url, modifiedOptions);
    const data = (await response.json()) as T;

    if (!response.ok) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorMessage = (data as any)?.message || "An error occurred";
      throw new Error(errorMessage);
    }

    return { data, status: response.status };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Fetch interceptor error:", error.message);
      throw new Error(error.message);
    } else {
      console.error("Unknown error occurred:", error);
      throw new Error("An unknown error occurred");
    }
  }
};

export default fetchInterceptor;
