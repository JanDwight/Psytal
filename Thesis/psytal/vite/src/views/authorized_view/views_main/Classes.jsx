import {React, Fragment, useState} from "react";
import { Menu, Transition } from '@headlessui/react';
import ReactModal from 'react-modal';
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

export default function Classes(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClassModalOpen, setIsClassModalOpen] = useState(false);
    const [filterText, setFilterText] = useState(''); // Filter text state
    const [activeTab] = useState(1); // Initialize active tab

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
            <div className="table-container overflow-x-auto max-h-[400px] overflow-y-auto">
          <table className="table w-full px-4 table-striped text-gray-700 mt-5" >
            <thead>
              <tr>
                        <th className="text-left bg-gray-200 p-2">Class Code</th>
                        <th className="text-left bg-gray-200 p-2">Course Code</th>
                        <th className="bg-gray-200 text-left p-2">Course Title</th>
                        <th className="bg-gray-200 text-left p-2">Semester</th>
                        <th className="bg-gray-200 text-left p-2">Year</th> 
                        <th className="bg-gray-200 text-left p-2">Section</th> 
                        <th className="bg-gray-200 text-left p-2">Instructor</th>
                        <th className="bg-gray-200 text-left p-2">Action</th>
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