import React from 'react';

interface TabsProps {
  activeTab: number;
  onTabClick: (index: number) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabClick }) => {
  return (
    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
      <li className="me-2">
        <a
          href="#"
          onClick={() => onTabClick(0)}
          className={`inline-block px-4 py-3 rounded-lg ${
            activeTab === 0 ? 'text-white bg-blue-600 active' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'
          }`}
          aria-current={activeTab === 0 ? 'page' : undefined}
        >
          Tab 1
        </a>
      </li>
      <li className="me-2">
        <a
          href="#"
          onClick={() => onTabClick(1)}
          className={`inline-block px-4 py-3 rounded-lg ${
            activeTab === 1 ? 'text-white bg-blue-600 active' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'
          }`}
          aria-current={activeTab === 1 ? 'page' : undefined}
        >
          Tab 2
        </a>
      </li>
    </ul>
  );
};

export default Tabs;
