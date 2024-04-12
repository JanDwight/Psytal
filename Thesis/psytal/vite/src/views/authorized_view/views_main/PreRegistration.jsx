import {React, Fragment, useState, useEffect} from "react";
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import axiosClient from '../../../axios';
import ReactModal from 'react-modal';
import { useStateContext } from '../../../context/ContextProvider';
import PreRegistrationFormView from '../views_components/Pre_Registration_Components/PreRegistrationFormView';
import PreRegistrationForContinuingView from '../views_components/Pre_Registration_Components/PreRegistrationForContinuingView';

export default function PreRegistration() {
  const [loading, setLoading] = useState(true);
  const [isPreRegFormModalOpen, setIsPreRegFormModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [filter, setFilter] = useState(null);
  const [activeFilter, setActiveFilter] = useState(''); 
  const [sortByNameAsc, setSortByNameAsc] = useState(true);
  const [sortByDateAsc, setSortByDateAsc] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const [filterText, setFilterText] = useState(''); // Filter text state
  const {userRole} = useStateContext(''); //just refresh server

      //filter semester
      const handleStatus = (status) => {
        setSelectedStatus (status);
        setSelectedStatus (status === 'All' ? null : status);
    };

  const handleFilter = (filterValue) => {
    if(filterValue === 'All'){
      setActiveFilter(''); // Update active filter state
      setFilter('');
    } else{
      setActiveFilter(filterValue); // Update active filter state
      setFilter(filterValue);
    }
  };

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get('/listpreregincoming')
      .then((res) => {
        setData(res.data); // Set data directly instead of appending
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once on component mount
    // Function to toggle sorting by name
    const handleSortByName = () => {
      setData((prevData) => {
        const sortedData = [...prevData].sort((a, b) => {
          return sortByNameAsc ? a.full_name.localeCompare(b.full_name) : b.full_name.localeCompare(a.full_name);
        });
        setSortByNameAsc(!sortByNameAsc);
        return sortedData;
      });
    };

    // Function to toggle sorting by date
    const handleSortByDate = () => {
      setData((prevData) => {
        const sortedData = [...prevData].sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return sortByDateAsc ? dateA - dateB : dateB - dateA;
        });
        setSortByDateAsc(!sortByDateAsc);
        return sortedData;
      });
    };

  const handleRowClick = (items) => {
    setIsPreRegFormModalOpen(true);
    setSelectedData(items);
  }

  const filteredData = data.filter(item => {
      if (filter) {
        return (
          item.new_student === filter &&
          (
            item.last_name.toLowerCase().includes(filterText.toLowerCase()) ||
            item.first_name.toLowerCase().includes(filterText.toLowerCase()) ||
            item.middle_name.toLowerCase().includes(filterText.toLowerCase())
          )
        );
      } else {
        return (
          item.last_name.toLowerCase().includes(filterText.toLowerCase()) ||
          item.first_name.toLowerCase().includes(filterText.toLowerCase()) ||
          item.middle_name.toLowerCase().includes(filterText.toLowerCase())
        );
      }
  });
  console.log("THIS IS THE DATA " + selectedData.type_of_student);


  return (
    <div className="w-full h-[auto] px-4 mx-auto rounded-3xl bg-white shadow-2xl pt-5 pb-12">
      <div className=" overflow-x-auto">
      <div className="mt-5 mx-5 pb-5 border-b-2 border-black flex flex-row justify-between items-baseline">
        <div className="font-bold text-4xl lg:text-6xl text-[#525252]">Pre-Registration</div>
        <div className='mt-5 mx-5 flex flex-row justify-between items-baseline'>      
        </div>   
          <div className='mt-5 flex flex-row justify-between items-baseline'> 

            <div className="my-4 mx-2" id="magnifying_glass">
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
              className="h-8 w-40 sm:w-39 border border-gray-300 focus:ring-viridianHue focus:border-viridianHue rounded-lg"
            ></input>
          </div>

        </div>
      </div>
      <div className="mt-2 mb-5"></div>
      <div>
        <table className="table w-full table-striped">
          <thead>
            <tr>
            <th className="text-left text-gray-700 bg-gray-200 p-2" style={{ width: "20%" }} onClick={handleSortByName}>
              Name
              {sortByNameAsc ? <span>&#9650;</span> : <span>&#9660;</span>}
            </th>
            <th className="text-left text-gray-700 bg-gray-200 p-2" style={{ width: "10%" }} onClick={handleSortByDate}>
              Date of Submission
              {sortByDateAsc ? <span>&#9650;</span> : <span>&#9660;</span>}
            </th>
              <th className="text-left text-gray-700 bg-gray-200 p-2" style={{ width: "10%" }}>
                <Menu as="div" className="relative block text-left">
                          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-m font-bold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:ring-lime-300">
                            Pre-Registration Type
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
                          <Menu.Items className="fixed z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {['All', 'Incoming', 'Continuing'].map((status, index) => (
                              <Menu.Item key={index}>
                                <button onClick={() => handleFilter(status)}
                                  className="block px-4 py-2 text-sm text-gray-700 text-left w-full hover:bg-green-500"
                                >
                                  {status}
                                </button>
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                    </Menu></th>
              <th className="text-left text-gray-700 bg-gray-200 p-2" style={{ width: "12%" }}>
                    <Menu as="div" className="relative block text-left">
                          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-m font-bold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:ring-lime-300">
                            Status
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
                          <Menu.Items className="fixed z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {['All', 'Pending', 'Accepted', 'Declined'].map((status, index) => (
                              <Menu.Item key={index}>
                                <button onClick={() => handleStatus(status)}
                                  className="block px-4 py-2 text-sm text-gray-700 text-left w-full hover:bg-green-500"
                                >
                                  {status}
                                </button>
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                    </Menu>
              </th>
            </tr>
          </thead>
        </table>
        
        <div className="table-container overflow-y-auto max-h-[400px] ">
          <table className="w-full">
            {filteredData.filter(item => 
                  (!selectedStatus || item.pre_reg_status === selectedStatus)
                ).map((item, index) => (
              <tr 
                onClick={() => handleRowClick(item)}
                key={index} 
                className={`${index % 2 === 0 ? 'bg-green-100' : 'bg-white'}`}
              >
                <td className="text-left p-2" style={{ width: "20%" }}>
                  <div className="m-2">{item.full_name}</div>
                </td>
                <td className="text-left p-2" style={{ width: "10%" }}>
                  <div className="m-2">{item.created_at}</div>
                </td>
                <td className="text-left p-2" style={{ width: "10%" }}>
                  <div className="m-2">{item.new_student}</div>
                </td>
                <td className="text-center p-1" style={{ width: "10%" }}>
                  <div className={`${
                      item.pre_reg_status === 'Accepted'
                      ? 'bg-green-600'
                      : item.pre_reg_status === 'Pending'
                      ? 'bg-blue-600'
                      : item.pre_reg_status === 'Declined'
                      ? 'bg-red-600'
                      : ''
                  } w-fit py-2 px-2 rounded-xl`}>
                    {item.pre_reg_status}
                  </div>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
      
      {/* For the Pop ups */}
      <ReactModal
        isOpen={isPreRegFormModalOpen}
        onRequestClose={() => setIsPreRegFormModalOpen(false)}
        className="w-fit h-[98%] bg-[#FFFFFF] rounded-3xl shadow-2xl mt-[1%] mx-auto p-5 overflow-y-scroll"
      >
        <div>
          {selectedData.type_of_student === 'Continuing' ? (
            <PreRegistrationForContinuingView
              closeModal={() => setIsPreRegFormModalOpen(false)}
              prereg={selectedData}
              
            />
          ) : (
            <PreRegistrationFormView
              closeModal={() => setIsPreRegFormModalOpen(false)}
              prereg={selectedData}
            />
          )}
        </div>
      </ReactModal>
    </div>
  )
}
