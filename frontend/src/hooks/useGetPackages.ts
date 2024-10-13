import { useState, useEffect } from 'react';
import { Package } from '../models/package.ts';
const useGetPackages = () => {
  const [allPackages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('http://localhost:8080/getPackages');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (Array.isArray(data.packages)) {
          const fetchedPackages: Package[] = data.packages.map((pkg: any) => ({
            id: pkg.id,
            name: pkg.name,
            longitude_start: pkg.longitude_start,
            latitude_start: pkg.latitude_start,
            longitude_dest: pkg.longitude_dest,
            latitude_dest: pkg.latitude_dest,
            status: pkg.status as 'awaiting_assignment' | 'awaiting_drone',
          }));
          setPackages(fetchedPackages);
        } else {
          throw new Error('Unexpected data structure');
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    // Fetch the packages immediately
    fetchPackages();

    const intervalId = setInterval(fetchPackages, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return { allPackages, loading, error };
};

export default useGetPackages;
