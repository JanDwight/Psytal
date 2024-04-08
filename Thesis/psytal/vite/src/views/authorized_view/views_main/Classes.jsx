import {React, Fragment, useState} from "react";
import { Menu, Transition } from '@headlessui/react';
import { useStateContext } from '../../../context/ContextProvider';
import ReactModal from 'react-modal';
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import AddClass from "../views_components/AddClass";
import AddClassForOutside from "../views_components/AddClassForOutside.jsx";
import ClassPopUp from "../views_components/ClassPopUp";
import ClassList from '../views_components/ClassList.jsx';
import page1 from "@assets/Help/Admin/Classes/1.png";
import page2 from "@assets/Help/Admin/Classes/2.png";
import page3 from "@assets/Help/Admin/Classes/3.png";
import page4 from "@assets/Help/Admin/Classes/4.png";
import page1E from "@assets/Help/Staff/Classes/1.png";
import page2E from "@assets/Help/Staff/Classes/2.png";
import page3E from "@assets/Help/Staff/Classes/3.png";
import page4E from "@assets/Help/Staff/Classes/4.png";
import page5E from "@assets/Help/Staff/Classes/5.png";



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
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClassModalOpen, setIsClassModalOpen] = useState(false);
    const [filterText, setFilterText] = useState(''); // Filter text state
    const [activeTab] = useState(1); // Initialize active tab
    const [selectedSemester, setSelectedSemester] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);
    const {userRole} = useStateContext(''); //just refresh server
    const menuItems = ['All', 'TBA', ...[...Array(26)].map((_, i) => String.fromCharCode(65 + i))];
    
    //filter semester
    const handleSemester = (semester) => {
      setSelectedSemester(semester);
      setSelectedSemester(semester === 'All' ? null : semester);
  };

    //filter year_level
    const handleYear = (year) => {
      setSelectedYear(year);
      setSelectedYear(year === 'All' ? null : year);
  };

    //filter section
    const handleSection = (section) => {
      setSelectedSection(section);
      setSelectedSection(section === 'All' ? null : section);
  };



    return(
    <>
        <div className="w-full h-[auto]  rounded-3xl  bg-white shadow-2xl pt-5 pb-6 ">{/*For the Container*/}
          <div className="">
          <div className="mt-5 mx-5 pb-5 border-b-2 border-black flex flex-col sm:flex-row justify-between items-baseline">
                <div className="font-bold text-4xl lg:text-6xl text-[#525252]">Classes</div>
                <div className="mt-5 mx-5 flex flex-col sm:flex-row justify-between items-baseline">
                  
                    
                    {/*search*/}
                    <div className="flex items-baseline">
                        
                        <div className="my-4 mx-0 sm:mx-4" id="magnifying_glass">
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
                  </div>
                    {/*add class*/}
                    <button onClick={() => setIsModalOpen(true)} 
                        className="bg-[#397439] hover:bg-[#0FE810] rounded-2xl  px-7 py-2 text-white font-size ml-1 sm:ml-1 mt-5">
                            Add Class
                    </button>
                    {/*add class for outside*/}
                    <button onClick={() => setIsAddModalOpen(true)} 
                        className="bg-[#397439] hover:bg-[#0FE810] rounded-2xl  px-7 py-2 text-white font-size ml-1 sm:ml-1 mt-5">
                            Outside Class
                    </button>
                    

                </div>
            </div>
            <div className="table-container px-4 overflow-x-auto max-h-[400px]">
        <table className="table w-full table-striped text-gray-700 mt-5">
            <div>
              <thead>
              <tr >
                        <th className="text-center bg-gray-200 p-2" style={{ width: "5%" }}>Class Code</th>
                        <th className="text-center bg-gray-200 p-2" style={{ width: "10%" }}>Course Code</th>
                        <th className="bg-gray-200 text-center p-2" style={{ width: "30%" }}>Course Title</th>
                        <th className="bg-gray-200 text-center p-2" style={{ width: "5%" }}>
                        <Menu as="div" className="relative block text-left">
                          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-m font-bold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:ring-lime-300">
                            Semester
                            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                          </Menu.Button>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="fixed z-50  mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              <button onClick={() => handleSemester('All')}
                                className={'block px-4 py-2 text-sm text-gray-700 text-left w-full hover:bg-green-500'}
                              >
                                ALL
                              </button>
                              </Menu.Item>
                            <Menu.Item>
                              <button onClick={() => handleSemester('1st')}
                                className={'block px-4 py-2 text-sm text-gray-700 text-left w-full hover:bg-green-500'}
                              >
                                1st Semester
                              </button>
                              </Menu.Item>
                            <Menu.Item>
                                <button onClick={() => handleSemester('2nd')}
                                  className={'block px-4 py-2 text-sm text-gray-700 text-left w-full hover:bg-green-500'}
                                >
                                  2nd Semester
                                </button>
                            </Menu.Item>
                            <Menu.Item>
                                <button onClick={() => handleSemester('Midyear')}
                                  className={'block px-4 py-2 text-sm text-gray-700 text-left w-full hover:bg-green-500'}
                                >
                                  Midyear
                                </button>
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                      </th>
                        {/* <th className="bg-gray-200 text-center p-2" style={{ width: "10%" }}>Year</th>  */}
                        <th className="bg-gray-200 text-center p-2 z-10" style={{ width: "10%" }}>
                        <Menu as="div" className="relative block text-left">
                          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-m font-bold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:ring-lime-300">
                            Year
                            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                          </Menu.Button>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="fixed z-50  mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              <button onClick={() => handleYear('All')}
                                className={'block px-4 py-2 text-sm text-gray-700 text-left w-full hover:bg-green-500'}
                              >
                                ALL
                              </button>
                              </Menu.Item>
                            <Menu.Item>
                              <button onClick={() => handleYear('1st')}
                                className={'block px-4 py-2 text-sm text-gray-700 text-left w-full hover:bg-green-500'}
                              >
                                1st Year
                              </button>
                            </Menu.Item>
                            <Menu.Item>
                              <button onClick={() => handleYear('2nd')}
                                className={'block px-4 py-2 text-sm text-gray-700 text-left w-full hover:bg-green-500'}
                              >
                                2nd Year
                              </button>
                            </Menu.Item>
                            <Menu.Item>
                              <button onClick={() => handleYear('3rd')}
                                className={'block px-4 py-2 text-sm text-gray-700 text-left w-full hover:bg-green-500'}
                              >
                                3rd Year
                              </button>
                            </Menu.Item>
                            <Menu.Item>
                              <button onClick={() => handleYear('4th')}
                                className={'block px-4 py-2 text-sm text-gray-700 text-left w-full hover:bg-green-500'}
                              >
                                4th Year
                              </button>
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                      </th>
                        <th className="bg-gray-200 text-center p-2" style={{ width: "10%" }}>
                        <Menu as="div" className="relative block text-left">
                          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-m font-bold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:ring-lime-300">
                            Section
                            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                          </Menu.Button>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                       
                          <Menu.Items className="fixed z-50  mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-80 overflow-y-auto">
                            {menuItems.map((letter, index) => (
                              <Menu.Item key={index}>
                                <button onClick={() => handleSection(letter)}
                                  className={'block px-4 py-2 text-sm text-gray-700 text-left w-full hover:bg-green-500'}
                                >
                                  {letter}
                                </button>
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                       
                        </Transition>
                      </Menu>
                          </th> 
                        <th className="bg-gray-200 text-centert p-2" style={{ width: "15%" }}>Instructor</th>
                        <th className="bg-gray-200 text-center p-2" style={{ width: "10%" }}>Action</th>
                        </tr>
                        </thead>
                        </div>
                    </table>
                    </div>
                     {/* table */}
                     <div>
                      {activeTab === 1 && (
                        <ClassList 
                        filterText={filterText}
                        selectedSemester={selectedSemester}
                        selectedYear={selectedYear}
                        selectedSection={selectedSection} 
                        />
                      )}
                      </div>
          </div>
            

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
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
        className="w-full md:w-[30%] h-fit bg-[#FFFFFF] rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5"
      >
        <div>
          <AddClassForOutside closeModal={() => setIsAddModalOpen(false)} />
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