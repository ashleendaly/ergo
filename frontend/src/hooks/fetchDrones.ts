import { useState, useEffect } from 'react';
import { Drone } from '../models/drone.ts';

const fetchDrones = () => {
  const [drones, setDrones] = useState<Drone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDrones = async () => {
      try {
        const response = await fetch('http://localhost:8080/getDrones');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const dronesData: Drone[] = data.drones.map((drone: any) => ({
          id: drone.id,
          address: drone.address,
          longitude: drone.longitude,
          latitude: drone.latitude,
          status: drone.status as 'flying' | 'waiting',
        }));

        setDrones(dronesData);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    // Fetch drones immediately and then every 5 seconds
    fetchDrones();
    const intervalId = setInterval(fetchDrones, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return { drones, loading, error };
};

export default fetchDrones;