import { useState, useEffect } from "react";
import { fetchHealth, HealthData } from "../lib/api";

export function useHealth() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const check = async () => {
    try {
      setLoading(true);
      const data = await fetchHealth();
      setHealth(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to contact local backend");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    check();
    const interval = setInterval(check, 10000);
    return () => clearInterval(interval);
  }, []);

  return { health, loading, error, refetch: check };
}
