import { useState } from 'react';
import Tabs from './Tabs';
import { Button } from './Button';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleClick = () => {
    console.log("Drone command sent!");
  };

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <p>tab 1 content</p>;
      case 1:
        return <p>tab 2 content</p>;
      default:
        return null;
    }
  };

  return (
    <div className="fixed right-0 top-0 h-full w-[25%] p-4 text-white shadow-lg"
      style={{ backgroundColor: '#343332'}} >
      <Tabs activeTab={activeTab} onTabClick={setActiveTab} />
      {renderContent()}
      <Button handleClick={handleClick}>
        Send drone to location
      </Button>
    </div>
  );
};

export default Sidebar;
