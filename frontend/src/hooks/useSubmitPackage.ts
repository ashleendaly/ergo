// useSubmitPackage.ts
import { useState } from 'react';

const useSubmitPackage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const submitPackage = async (packageDetails: {
    name: string;
    longitude_start: number | '';
    latitude_start: number | '';
    longitude_dest: number | '';
    latitude_dest: number | '';
  }) => {
    const packageData = {
      id: 0,
      name: packageDetails.name,
      longitude_start: packageDetails.longitude_start,
      latitude_start: packageDetails.latitude_start,
      longitude_dest: packageDetails.longitude_dest,
      latitude_dest: packageDetails.latitude_dest,
      status: 'awaiting_assignment',
    };

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("http://localhost:8080/addPackage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(packageData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setSuccessMessage(result.message);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { submitPackage, loading, error, successMessage };
};

export default useSubmitPackage;
