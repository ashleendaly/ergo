import React from 'react';

interface PackageCardProps {
    id: string;
    name: string;
    longitude_start: string;
    latitude_start: string;
    longitude_dest: string;
    latitude_dest: string;
    status: string;
}

const PackageCard: React.FC<PackageCardProps> = ({ id, name, longitude_start, latitude_start, longitude_dest, latitude_dest, status }) => {
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-white">
      <a href="#">
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-black">{id}</h5>
      </a>
      <p className="mb-3 font-normal text-gray-500 dark:text-black">{name}</p>
      <p className="mb-3 font-normal text-gray-500 dark:text-black">{longitude_start}</p>
      <p className="mb-3 font-normal text-gray-500 dark:text-black">{latitude_start}</p>
      <p className="mb-3 font-normal text-gray-500 dark:text-black">{longitude_dest}</p>
      <p className="mb-3 font-normal text-gray-500 dark:text-black">{latitude_dest}</p>
      <p className="mb-3 font-normal text-gray-500 dark:text-black">{status}</p>
    </div>
  );
};

export default PackageCard;
