import { useEffect, useState } from "react";

export function useRawg(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
  const separator = endpoint.includes("?") ? "&" : "?";

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `https://api.rawg.io/api/${endpoint}${separator}key=${API_KEY}`,
        );
        if (!res.ok) throw new Error("failed to fetch");
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(true);
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [API_KEY, endpoint, separator]);

  return { data, loading, error };
}
