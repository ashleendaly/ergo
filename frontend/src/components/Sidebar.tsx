import { useState } from 'react';
import Tabs from './Tabs';
import fetchDrones from '../hooks/fetchDrones.ts';
import FormComponent from './FormComponent.tsx';
import Card from './Card.tsx';
import { Button } from './Button.tsx';
import Loader from './Loader.tsx';
import useSubmitPackage from '../hooks/useSubmitPackage.ts';
import useGetUncollectedPackages from '../hooks/useGetUncollectedPackages.ts';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { drones, loading, error } = fetchDrones();
  const {submitPackage, successMessage} = useSubmitPackage()

  console.log("ran fetchDrones");
  console.log(drones);

  const handlePackageSubmit = async (packageDetails: {
    name: string;
    longitude_start: number | '';
    latitude_start: number | '';
    longitude_dest: number | '';
    latitude_dest: number | '';
  }) => {
    console.log("Package form submitted with values:");
    console.log(packageDetails);
    await submitPackage(packageDetails)
    console.log(successMessage)
    await fetchDrones()
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
        if (loading) return <Loader />;
        if (error) return <p>Error: {error}</p>;

        return (
          <ul className="space-y-4">
            {drones.map((drone) => (
              <li key={drone.id}>
                <Card 
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
        return (
          <span>
            <br></br>
          <h5 className="mb-6 text-2xl font-semibold tracking-tight text-[#f4f4f4] text-white">Packages</h5>
          <FormComponent onSubmit={handlePackageSubmit} />
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed right-0 top-0 h-full w-[25%] p-4 text-white shadow-lg space-y-4" style={{ backgroundColor: '#343332' }}>
      <Tabs activeTab={activeTab} onTabClick={setActiveTab} />
      {renderContent()}
      {activeTab === 0}
    </div>
  );
};

export default Sidebar;
