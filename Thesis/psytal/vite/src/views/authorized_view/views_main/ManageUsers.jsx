import React, { useState } from 'react';
import AddUsers from '../views_components/AddUsers.jsx';
import StudentList from '../views_components/StudentList.jsx';
import EmployeeList from '../views_components/EmployeeList.jsx';
import { useStateContext } from '../../../context/ContextProvider';

{/*Tab Highlight */}
const Tab = ({ label, isActive, onClick }) => {
  const activeClasses = isActive
    ? 'text-green-800 dark:text-gray-800 dark:bg-highlightGreen'
    : 'hover:text-gray-800 hover:bg-gray-50 dark:hover:text-gray-800 dark:hover:bg-highlightGreen';
    const labelClasses ='uppercase text-gray-600 text-xl';

  return (
    <li className="mx-6">
      <a
        href="#"
        onClick={onClick}
        className={`inline-block p-2 rounded-t-lg ${activeClasses} ${labelClasses}`}
      >
        {label}
      </a>
    </li>
  );
};

export default function ManageUsers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [activeTab, setActiveTab] = useState(1); // Initialize active tab
  const [filterText, setFilterText] = useState(''); // Filter text state

  const {userRole} = useStateContext(''); //just refresh server

  console.log('role: ', userRole);
  const handleAddUserClick = () => {
    console.log('ModalShowing');
    setIsModalOpen(true);
  };

  return (
    <>
  <div className="w-full h-[auto] px-4 mx-auto rounded-3xl bg-white shadow-2xl pt-5 pb-12">{/**WHole container */}
    {/**______________________1st Container from Manage - Btn Add________________________________*/}
    <div className="mt-5 mx-5 pb-5 border-b-2 border-black flex flex-row justify-between items-baseline">
      <div className="font-bold text-4xl lg:text-6xl text-[#525252]"> Manage Accounts</div>
      <div className="flex">
        <div>
          {/**Add Users */}
          
            <button onClick={handleAddUserClick} className="bg-[#397439] hover:bg-[#0FE810] rounded-2xl  px-7 py-2 text-white font-size ml-10">
              Add User
            </button>
        </div>
      </div>

    </div>

    {/**___________________________2nd Container from Student to Filter________________________________ */}
    <div className="m-5 md:col-span-2 lg:col-span-1">
        <div className="mx-7 font-bold flex flex-col-10 justify-between">
          <div>
            <ul className="flex mb-0 list-none flex-wrap px-4 flex-row text-gray-700">
              <Tab
                label="students list"
                isActive={activeTab === 1}
                onClick={() => setActiveTab(1)}
              />
              <Tab
                label="employees list"
                isActive={activeTab === 2}
                onClick={() => setActiveTab(2)}
              />
              <div className="flex px-16">
                <div className="my-4 mx-4">
                    <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>     
                {/* Search bar */}
                <input
                    type="text"
                    placeholder={
                      activeTab === 1
                        ? 'Search Students...'
                        : 'Search Employees...'
                    }
                    value={filterText}
                    onChange={(event) => setFilterText(event.target.value)}
                    className="h-10 px-6 py-4 border border-gray-300 focus:ring-viridianHue focus:border-viridianHue  rounded-lg"
                  ></input>
              </div>
            </ul>
          </div>
        </div>
      </div>
      
      {/**___________________________3rd Container________________________________ */}
      <div className="m-5">
        <div>
          {activeTab === 1 && (
              <StudentList filterText={filterText} />
            )}
          {activeTab === 2 && (
              <EmployeeList filterText={filterText} />
           )}
          
        </div>
      </div>
        <AddUsers
          showModal={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
  </div>
    </>
  );
}
