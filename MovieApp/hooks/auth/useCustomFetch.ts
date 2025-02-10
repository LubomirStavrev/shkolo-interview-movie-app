import { useState } from "react";
import { API_ENDPOINT } from "../../config/api";

const API_BASE_URL = API_ENDPOINT;

export const useCustomFetch = () => {
  const [error, setError] = useState<string | null>(null);

  const customFetch = async <T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data as T;
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
      return null;
    }
  };

  return { customFetch, error };
};
