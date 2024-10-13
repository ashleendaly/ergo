import React from 'react';

interface TabsProps {
  activeTab: number;
  onTabClick: (index: number) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabClick }) => {
  return (
    <ul className="flex flex-wrap text-sm font-medium text-center">
      <li className="me-2">
        <a
          href="#"
          onClick={() => onTabClick(0)}
          className={`inline-block px-4 py-3 rounded-lg ${
            activeTab === 0 
              ? 'text-[#171717] bg-[#f4f4f4]'
              : 'text-white bg-[#171717] hover:bg-gray-300'
          }`}
          aria-current={activeTab === 0 ? 'page' : undefined}
        >
          General Overview
        </a>
      </li>
      <li className="me-2">
        <a
          href="#"
          onClick={() => onTabClick(1)}
          className={`inline-block px-4 py-3 rounded-lg ${
            activeTab === 1 
              ? 'text-[#171717] bg-[#fafafa]'
              : 'text-white bg-[#171717] hover:bg-gray-300'
          }`}
          aria-current={activeTab === 1 ? 'page' : undefined}
        >
          Drones
        </a>
      </li>
      <li className="me-2">
        <a
          href="#"
          onClick={() => onTabClick(2)}
          className={`inline-block px-4 py-3 rounded-lg ${
            activeTab === 2
              ? 'text-[#171717] bg-[#f4f4f4]'
              : 'text-white bg-[#171717] hover:bg-gray-300'
          }`}
          aria-current={activeTab === 2 ? 'page' : undefined}
        >
          Packages
        </a>
      </li>
      <li className="me-3">
        <a
          href="#"
          onClick={() => onTabClick(3)}
          className={`inline-block px-4 py-3 rounded-lg ${
            activeTab === 3
              ? 'text-[#171717] bg-[#f4f4f4]'
              : 'text-white bg-[#171717] hover:bg-gray-300'
          }`}
          aria-current={activeTab === 3 ? 'page' : undefined}
        >
          Edit Packages
        </a>
      </li>
    </ul>
  );
};

export default Tabs;
