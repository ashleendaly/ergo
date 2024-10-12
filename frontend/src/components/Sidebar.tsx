import { useState } from 'react';
import Tabs from './Tabs';
import fetchDrones from '../hooks/fetchDrones.ts';
import Card from './Card.tsx';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { drones, loading, error } = fetchDrones();
  console.log("ran fetchDrones");
  console.log(drones);

  const shortenAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        if (loading) return <p>Loading drones...</p>;
        if (error) return <p>Error: {error}</p>;

        return (
          <ul className="space-y-4">
            {drones.map((drone) => (
              <li key={drone.id}>
                <Card 
                  title={`Drone ID: ${drone.id}`} 
                  address={`Address: ${shortenAddress(drone.address)}`}
                  longitude={`Longitude: ${drone.longitude}`}
                  latitude={`Latitude: ${drone.latitude}`}
                  status={`Status: ${drone.status}`} 
                />
              </li>
            ))}
          </ul>
        );

      case 1:
        return <p>tab 2 content</p>;
      default:
        return null;
    }
  };

  return (
    <div className="fixed right-0 top-0 h-full w-[25%] p-4 text-white shadow-lg space-y-4" style={{ backgroundColor: '#343332' }}>
      <Tabs activeTab={activeTab} onTabClick={setActiveTab} />
      {renderContent()}
    </div>
  );
};

export default Sidebar;
