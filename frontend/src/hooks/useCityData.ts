import { useState, useEffect } from "react";
import { fetchCityData } from "../lib/api";
import { CityDataResponse } from "../types/city";

export function useCityData() {
  const [data, setData] = useState<CityDataResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCityData()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load city map");
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
