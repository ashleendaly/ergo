import { useState } from 'react';
// import { Pie } from 'react-chartjs-2';
import Tabs from './Tabs';
import fetchDrones from '../hooks/fetchDrones.ts';
import FormComponent from './FormComponent.tsx';
import DroneCard from './DroneCard.tsx';
import PackageCard from './PackageCard.tsx';
import useSubmitPackage from '../hooks/useSubmitPackage.ts';
import useGetUncollectedPackages from '../hooks/useGetUncollectedPackages.ts';
import redDroneIcon from '../assets/red-drone.svg';
import greenDroneIcon from '../assets/green-drone.svg';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary components for Chart.js
// ChartJS.register(ArcElement, Tooltip, Legend);

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { drones, error: dronesError } = fetchDrones();
  const { packages, error: packagesError } = useGetUncollectedPackages();
  const { submitPackage } = useSubmitPackage();

  console.log("ran fetchDrones");
  console.log(drones);

  const handlePackageSubmit = (packageDetails: {
    name: string;
    longitude_start: number | '';
    latitude_start: number | '';
    longitude_dest: number | '';
    latitude_dest: number | '';
  }) => {
    console.log("Package form submitted with values:");
    console.log(packageDetails);
    submitPackage(packageDetails);
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
        const totalDrones = drones.length;
        const flyingDrones = drones.filter((drone) => drone.status === 'Flying').length;
        const waitingDrones = totalDrones - flyingDrones;

        // Package status calculations
        const totalPackages = packages.length;
        const awaitingAssignment = packages.filter((pkg) => pkg.status === 'awaiting_assignment').length;
        const awaitingDrone = packages.filter((pkg) => pkg.status === 'awaiting_drone').length;
        const inTransit = packages.filter((pkg) => pkg.status === 'in_transit').length;
        const delivered = packages.filter((pkg) => pkg.status === 'delivered').length;

        // Data for pie chart
        const pieData = {
          labels: ['Awaiting Assignment', 'Awaiting Drone', 'In Transit', 'Delivered'],
          datasets: [
            {
              data: [awaitingAssignment, awaitingDrone, inTransit, delivered],
              backgroundColor: ['#FFA500', 'yellow', '#007BFF', '#28A745'],
              borderWidth: 1,
            },
          ],
        };

        return (
          <div>
            <h5 className="mb-6 text-2xl font-semibold tracking-tight text-[#f4f4f4] text-white">General Overview</h5>

            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-2">
                <img src={redDroneIcon} alt="Waiting Drone" style={{ width: '20px', height: '20px' }} />
                <span>{waitingDrones} Waiting</span>
              </div>
              <div className="flex items-center space-x-2">
                <img src={greenDroneIcon} alt="Flying Drone" style={{ width: '20px', height: '20px' }} />
                <span>{flyingDrones} Flying</span>
              </div>
            </div>

            {/* Progress Bar for Drones */}
            <div className="w-full bg-gray-300 h-4 rounded-md overflow-hidden">
              <div
                className="h-full bg-green-500"
                style={{ width: `${(flyingDrones / totalDrones) * 100}%`, float: 'left', transition: 'width 0.5s' }}
              ></div>
              <div
                className="h-full bg-red-500"
                style={{ width: `${(waitingDrones / totalDrones) * 100}%`, float: 'left', transition: 'width 0.5s' }}
              ></div>
            </div>
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

      case 2:
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
              ))}
            </ul>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="overflow-y-scroll bg-opacity-50 z-10 fixed right-0 top-20 h-full w-[25%] p-4 text-white shadow-lg space-y-4" style={{ backgroundColor: '#343332' }}>
      <span>
        <div className="fixed overflow-auto right-0 top-19 h-full w-[25%] p-4 text-white shadow-lg space-y-4" style={{ backgroundColor: '#343332' }}>
          <Tabs activeTab={activeTab} onTabClick={setActiveTab} />
          {renderContent()}
        </div>
        {/* <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div>Edit your package details here.</div>
        </Modal> */}
      </span>
    </div>
  );
};

export default Sidebar;
