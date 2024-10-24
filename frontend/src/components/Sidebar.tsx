import { useState } from 'react';
import Tabs from './Tabs';
import fetchDrones from '../hooks/fetchDrones.ts';
import FormComponent from './FormComponent.tsx';
import DroneCard from './DroneCard.tsx';
import PackageCard from './PackageCard.tsx';
import useSubmitPackage from '../hooks/useSubmitPackage.ts';
import useGetUncollectedPackages from '../hooks/useGetUncollectedPackages.ts';
import fetchPackages from '../hooks/useGetPackages.ts';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { drones, error: dronesError } = fetchDrones();
  const { allPackages, loading, error } = fetchPackages();
  const { submitPackage } = useSubmitPackage();

  console.log(allPackages)

  const handlePackageSubmit = (packageDetails: {
    name: string;
    longitude_start: number | '';
    latitude_start: number | '';
    longitude_dest: number | '';
    latitude_dest: number | '';
  }) => {
    submitPackage(packageDetails);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        if (dronesError) return <p>Error: {dronesError}</p>;

        return (
          <div className=" min-w-60 items-center justify-center min-h-full">
            <h5 className="text-2xl font-semibold mb-3 text-white">Drones</h5>
            <ul className="space-y-4">
              {drones.map((drone) => (
                <li key={drone.id}>
                  <DroneCard
                    title={`Drone ID: ${drone.id}`}
                    address={drone.address}
                    longitude={`Longitude: ${drone.longitude}`}
                    latitude={`Latitude: ${drone.latitude}`}
                    status={`Status: ${drone.status}`}
                    shortAddress={''}
                  />
                </li>
              ))}
            </ul>
          </div>
        );

      case 1:
        if (error) return <p>Error: {error}</p>;
        return (
          <div>
            <h5 className="text-2xl font-semibold mb-3 text-white">Packages</h5>
            {allPackages.length === 0 ? (
              <p>No packages available.</p>
            ) : (
              <ul className="space-y-4">
                {allPackages.map((pkg) => (
                  <li key={pkg.id}>
                    <PackageCard
                      id={`Package ID: ${pkg.id}`}
                      name={`Package Name: ${pkg.name}`}
                      longitude_start={`Longitude start: ${pkg.longitude_start.toFixed(2)}`}
                      latitude_start={`Latitude start: ${pkg.latitude_start.toFixed(2)}`}
                      longitude_dest={`Longitude destination: ${pkg.longitude_dest.toFixed(2)}`}
                      latitude_dest={`Latitude destination: ${pkg.latitude_dest.toFixed(2)}`}
                      status={`Status: ${pkg.status}`}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        );

      case 2:
        return (
          <div>
            <h5 className="text-2xl font-semibold text-white">Edit Packages</h5>
            <FormComponent onSubmit={handlePackageSubmit} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-opacity-50 z-30 fixed right-0 h-full w-[25%] p-4 text-white shadow-lg flex flex-col" style={{ backgroundColor: '#343332' }}>
      <Tabs activeTab={activeTab} onTabClick={setActiveTab} />
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default Sidebar;
