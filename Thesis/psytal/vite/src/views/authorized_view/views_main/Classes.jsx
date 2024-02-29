import {React, Fragment, useState} from "react";
import { Menu, Transition } from '@headlessui/react';
import ReactModal from 'react-modal';
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import AddClass from "../views_components/AddClass";
import ClassPopUp from "../views_components/ClassPopUp";
import ClassList from '../views_components/ClassList.jsx';

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

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Classes(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClassModalOpen, setIsClassModalOpen] = useState(false);
    const [filterText, setFilterText] = useState(''); // Filter text state
    const [activeTab] = useState(1); // Initialize active tab
    const [selectedYear, setSelectedYear] = useState(null);
    
    //filter year_level
    const handleYearSelect = (year) => {
      setSelectedYear(year);
      // Perform any other actions based on the selected year
  };


    return(
    <>
        <div className="w-full h-[auto]  rounded-t-3xl  bg-white shadow-2xl pt-5 pb-6 ">{/*For the Container*/}
            <div className="mt-5 mx-5 pb-5 border-b-2 border-black flex flex-row justify-between items-baseline">
                <div className="font-bold text-4xl lg:text-6xl text-[#525252]">Classes</div>
                <div className="mt-5 mx-5 flex flex-row justify-between items-baseline">
                  
                    
                    {/*search*/}
                    <div className="flex items-baseline">
                        
                        <div className="my-4 mx-4" id="magnifying_glass">
                          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
              
                        <input
                          id="search_bar"
                          type="text"
                          placeholder="Search..."
                          value={filterText}
                          onChange={(event) => setFilterText(event.target.value)}
                          className="h-10 px-6 py-4 border border-gray-300 focus:ring-viridianHue focus:border-viridianHue rounded-lg"
                        ></input>

                        {/*add class*/}
                    <button onClick={() => setIsModalOpen(true)} 
                        className="bg-[#397439] hover:bg-[#0FE810] rounded-2xl  px-7 py-2 text-white font-size ml-10">
                            Add Class
                    </button>
                    </div>

                </div>
            </div>
            <div className="table-container px-4 overflow-x-auto max-h-[400px]">
        <table className="table w-full table-striped text-gray-700 mt-5">
            <thead >
              <tr >
                        <th className="text-center bg-gray-200 p-2" style={{ width: "5%" }}>Class Code</th>
                        <th className="text-center bg-gray-200 p-2" style={{ width: "10%" }}>Course Code</th>
                        <th className="bg-gray-200 text-center p-2" style={{ width: "30%" }}>Course Title</th>
                        <th className="bg-gray-200 text-center p-2" style={{ width: "5%" }}>Semester</th>
                        {/* <th className="bg-gray-200 text-center p-2" style={{ width: "10%" }}>Year</th>  */}
                        <th className="bg-gray-200 text-center p-2 z-10" style={{ width: "10%" }}>
                        <Menu as="div" className="relative block text-left z-10">
                        <div>
                          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            Year
                            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="relative right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                      'block px-4 py-2 text-sm'
                                    )}
                                  >
                                    ALL
                                  </a>
                                )}
                              </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                      'block px-4 py-2 text-sm'
                                    )}
                                  >
                                    1st Year
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                      'block px-4 py-2 text-sm'
                                    )}
                                  >
                                    2nd Year
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                      'block px-4 py-2 text-sm'
                                    )}
                                  >
                                    3rd Year
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                      'block px-4 py-2 text-sm'
                                    )}
                                  >
                                    4th Year
                                  </a>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                      </th>
                        <th className="bg-gray-200 text-center p-2" style={{ width: "10%" }}>Section</th> 
                        <th className="bg-gray-200 text-centert p-2" style={{ width: "15%" }}>Instructor</th>
                        <th className="bg-gray-200 text-center p-2" style={{ width: "10%" }}>Action</th>
                        </tr>
                        </thead>
                    </table>
                    </div>
            </div>
          

                    {/* table */}
                      <div>
                      {activeTab === 1 && (
                        <ClassList filterText={filterText} />
                      )}
                      </div>

       
                        
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="w-full md:w-[30%] h-fit bg-[#FFFFFF] rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5"
      >
        <div>
          <AddClass closeModal={() => setIsModalOpen(false)} />
        </div>
      </ReactModal>

      <ReactModal
        isOpen={isClassModalOpen}
        onRequestClose={() => setIsClassModalOpen(false)}
        className="w-[20%] h-fit bg-[#FFFFFF] rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5"
      >
        <div>
          <ClassPopUp closeModal={() => setIsClassModalOpen(false)} />
        </div>
      </ReactModal>
      </>
)}