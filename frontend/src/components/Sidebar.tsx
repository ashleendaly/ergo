import { useState } from 'react';
import Tabs from './Tabs';
import fetchDrones from '../hooks/fetchDrones.ts';
import FormComponent from './FormComponent.tsx';
import DroneCard from './DroneCard.tsx';
import PackageCard from './PackageCard.tsx';
import { Button } from './Button.tsx';
import Loader from './Loader.tsx';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { drones, loading: dronesLoading, error: dronesError } = fetchDrones();
  const { packages, loading: packagesLoading, error: packagesError } = useGetUncollectedPackages();
  const {submitPackage, successMessage} = useSubmitPackage()

  console.log("ran fetchDrones");
  console.log(drones);

  const handlePackageSubmit = (packageDetails: {
    packageName: string;
    currentLat: number | '';
    currentLng: number | '';
    destLat: number | '';
    destLng: number | '';
  }) => {
    console.log("Package form submitted with values:");
    console.log(packageDetails);
  };

  const handleClick = () => {
    console.log("Drone command sent!");
  };

  const shortenAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        if (dronesError) return <p>Error: {dronesError}</p>;

        return (
          <ul className="space-y-4">
            {drones.map((drone) => (
              <li key={drone.id}>
                <DroneCard 
                  title={`Drone ID: ${drone.id}`} 
                  shortAddress={`Address: ${shortenAddress(drone.address)}`}
                  address={drone.address}
                  longitude={`Longitude: ${drone.longitude}`}
                  latitude={`Latitude: ${drone.latitude}`}
                  status={`Status: ${drone.status}`} 
                />
              </li>
            ))}
          </ul>
        );

      case 1:
        if (packagesError) return <p>Error: {packagesError}</p>;
        return (
          <div>
            <span>
              <br></br>
            <h5 className="mb-6 text-2xl font-semibold tracking-tight text-[#f4f4f4] text-white">Packages</h5>
            <FormComponent onSubmit={handlePackageSubmit} />
            </span>
            <ul className="space-y-4">
              {packages.map((pkg) => (
                <li key={pkg.id}>
                  <PackageCard
                    id={pkg.id}
                    name={pkg.name}
                    longitude_start={pkg.longitude_start}
                    latitude_start={pkg.latitude_start}
                    longitude_dest={pkg.longitude_dest}
                    latitude_dest={pkg.latitude_dest}
                    status={pkg.status}
                  />
                </li>
              ))};
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-opacity-50 z-10 fixed right-0 top-20 h-full w-[25%] p-4 text-white shadow-lg space-y-4" style={{ backgroundColor: '#343332' }}>
      <Tabs activeTab={activeTab} onTabClick={setActiveTab} />
      {renderContent()}
      {activeTab === 0 && (
        <Button handleClick={handleClick}>
          Send drone to location
        </Button>
      )}
    </div>
  );
};

export default Sidebar;
