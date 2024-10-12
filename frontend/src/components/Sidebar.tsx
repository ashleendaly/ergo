// import React from 'react';
// import '../Sidebar.css'; // Import styles

// const Sidebar = () => {
//   return (
//     <div className="sidebar">
//       <nav className="sidebar-nav">
//         <p>here is the sidebar</p>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;
import React from 'react';
import fetchDrones from '../hooks/fetchDrones';

const SidebarComponent: React.FC = () => {
  const { drones, loading, error } = fetchDrones();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="sidebar">
      <h2>Drones</h2>
      <ul>
        {drones.map((drone) => (
          <li key={drone.id}>
            <h3>Drone ID: {drone.id}</h3>
            <p>Address: {drone.address}</p>
            <p>Status: {drone.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarComponent;

