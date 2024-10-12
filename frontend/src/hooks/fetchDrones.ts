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

        const dronesData: Drone[] = data.drones.map((droneArray: any[]) => ({
          id: droneArray[0],
          address: droneArray[1],
          longitude: droneArray[2],
          latitude: droneArray[3],
          status: droneArray[4] as 'flying' | 'waiting',
        }));

        setDrones(dronesData);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchDrones();
  }, []);

  return { drones, loading, error };
};

export default fetchDrones;
