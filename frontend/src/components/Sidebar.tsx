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

const Sidebar = () => {
  return (
    <div className="fixed right-0 top-0 h-full w-[25%] p-4 bg-gray-800 text-white shadow-lg">
      <h2 className="text-lg font-bold">Sidebar</h2>
      <p>Your content here</p>
      <button className="mt-4 p-2 bg-blue-500 rounded">Action 1</button>
      <button className="mt-2 p-2 bg-green-500 rounded">Action 2</button>
    </div>
  );
};

export default Sidebar;
