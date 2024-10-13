import { useState, useEffect } from 'react';
import { Package } from '../models/package.ts';
const useGetUncollectedPackages = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUncollectedPackages = async () => {
      try {
        const response = await fetch('http://localhost:8080/getUncollectedPackages');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log("Fetched data:", data); // Log the fetched data

        if (Array.isArray(data.packages)) {
          const uncollectedPackages: Package[] = data.packages.map((pkg: any) => ({
            id: pkg.id,
            name: pkg.name,
            longitude_start: pkg.longitude_start,
            latitude_start: pkg.latitude_start,
            longitude_dest: pkg.longitude_dest,
            latitude_dest: pkg.latitude_dest,
            status: pkg.status as 'awaiting_assignment' | 'awaiting_drone',
          }));
          setPackages(uncollectedPackages);
        } else {
          throw new Error('Unexpected data structure');
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUncollectedPackages();
    const intervalId = setInterval(fetchUncollectedPackages, 5000);

    return () => clearInterval(intervalId);
  }, []);
    
  console.log("Current uncollected packages:", packages); // Log the current state of packages

  return { packages, loading, error };
};

export default useGetUncollectedPackages;
