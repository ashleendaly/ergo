import { useState } from 'react';
import Tabs from './Tabs';
import { Button } from './Button';
import fetchDrones from '../hooks/fetchDrones.ts';
import FormComponent from './FormComponent.tsx';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { drones, loading, error } = fetchDrones(); // Fetch drones data
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

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        // Tab 1: Displaying a list of active drones
        if (loading) return <p>Loading drones...</p>;
        if (error) return <p>Error: {error}</p>;

        return (
          <ul>
            {drones.map((drone) => (
              <li key={drone.id}>
                <p>ID: {drone.id}</p>
                <p>Address: {drone.address}</p>
                <p>Longitude: {drone.longitude}</p>
                <p>Latitude: {drone.latitude}</p>
                <p>Status: {drone.status}</p>
              </li>
            ))}
          </ul>
        );

      case 1:
        return (
          <FormComponent onSubmit={handlePackageSubmit} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed right-0 top-0 h-full w-[25%] p-4 text-white shadow-lg"
      style={{ backgroundColor: '#343332'}} >
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
