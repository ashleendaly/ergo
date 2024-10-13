import { useState } from 'react';
import Tabs from './Tabs';
import fetchDrones from '../hooks/fetchDrones.ts';
import FormComponent from './FormComponent.tsx';
import DroneCard from './DroneCard.tsx';
import PackageCard from './PackageCard.tsx';
import useSubmitPackage from '../hooks/useSubmitPackage.ts';
import useGetUncollectedPackages from '../hooks/useGetUncollectedPackages.ts';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { drones, error: dronesError } = fetchDrones();
  const { packages, error: packagesError } = useGetUncollectedPackages();
  const { submitPackage } = useSubmitPackage();

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
        return (
          <div>
            <h5 className="text-2xl font-semibold text-white">General Overview</h5>
          </div>
        );

      case 1:
        if (dronesError) return <p>Error: {dronesError}</p>;

        return (
          <ul className="space-y-4">
            {drones.map((drone) => (
              <li key={drone.id}>
                <DroneCard
                  title={`Drone ID: ${drone.id}`}
                  address={drone.address}
                  longitude={`Longitude: ${drone.longitude}`}
                  latitude={`Latitude: ${drone.latitude}`}
                  status={`Status: ${drone.status}`} shortAddress={''}                />
              </li>
            ))}
          </ul>
        );

      case 2:
        if (packagesError) return <p>Error: {packagesError}</p>;
        return (
          <div>
            <h5 className="text-2xl font-semibold text-white">Packages</h5>
            {packages.length === 0 ? (
              <p>No packages available.</p>
            ) : (
              <ul className="space-y-4">
                {packages.map((pkg) => (
                  <li key={pkg.id}>
                    <PackageCard
                      id={`Package ID: ${pkg.id}`}
                      name={`Package Name: ${pkg.name}`}
                      longitude_start={`Longitude start: ${pkg.longitude_start}`}
                      latitude_start={`Latitude start: ${pkg.latitude_start}`}
                      longitude_dest={`Longitude destination: ${pkg.longitude_dest}`}
                      latitude_dest={`Latitude destination: ${pkg.latitude_dest}`}
                      status={`Status: ${pkg.status}`}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        );

      case 3:
        return (
          <div>
            <h5 className="text-2xl font-semibold text-white">Edit Package</h5>
            <FormComponent onSubmit={handlePackageSubmit} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-opacity-50 z-10 fixed right-0 top-20 h-full w-[25%] p-4 text-white shadow-lg space-y-4" style={{ backgroundColor: '#343332' }}>
      <span>
        <div className="overflow-y-scroll fixed right-0 top-19 h-full w-[25%] p-4 text-white shadow-lg space-y-4" style={{ backgroundColor: '#343332' }}>
          <Tabs activeTab={activeTab} onTabClick={setActiveTab} />
          {renderContent()}
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </span>     
    </div>
  );
};

export default Sidebar;
