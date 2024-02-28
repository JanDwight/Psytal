import React from 'react'
import { useEffect, useState } from 'react';
import axiosClient from '../../../axios';
import ReactModal from 'react-modal';
import PreRegistrationFormView from '../views_components/Pre_Registration_Components/PreRegistrationFormView';
import PreRegistrationForContinuingView from '../views_components/Pre_Registration_Components/PreRegistrationForContinuingView';

export default function PreRegistration() {
  const [loading, setLoading] = useState(true);
  const [isPreRegFormModalOpen, setIsPreRegFormModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  const [filter, setFilter] = useState(null);

  const handleFilter = (filterValue) => {
      setFilter(filterValue);
  };

      // // Filter the data based on the selected filter
      // const filteredData = filter
      // ? data.filter(item.new_student === filter)
      // : data;

const handleRowClick = (items) => {
  setIsPreRegFormModalOpen(true);
  setSelectedData(items);
}

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get('/listpreregincoming')
      .then((res) => {
        setLoading(false);
        setData(res.data);  // Assuming res.data is an array
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="w-full h-[auto] px-4 mx-auto rounded-3xl bg-white shadow-2xl pt-5 pb-12">
      <div className="mt-5 mx-5 pb-5 border-b-2 border-black flex flex-row justify-between items-baseline">
        <div className="font-bold text-4xl lg:text-6xl text-[#525252]">Pre-Registration</div>
        
        <div className='mt-5 mx-5 flex flex-row justify-between items-baseline'>      
        <button
                className={`bg-[#397439] rounded-2xl px-7 py-2 text-white font-size ml-10 ${filter === 'Incoming' ? 'bg-[#397439]' : 'bg-gray-400'}`}
                onClick={() => handleFilter('Incoming')}
            >
                Incoming Student
            </button>
            <button
                className={`bg-[#397439] rounded-2xl px-7 py-2 text-white font-size ml-10 ${filter === 'Continuing' ? 'bg-[#397439]' : 'bg-gray-400'}`}
                onClick={() => handleFilter('Continuing')}
            >
                Continuing Student
            </button>
        </div>   
      </div>
      <div className="mt-2 mb-5"></div>
      <div >
      <table className="table w-full table-striped">
        <thead>
          <tr>
            <th className="text-left text-gray-700 bg-gray-200 p-2" style={{ width: "20%" }}>Name</th>
            <th className="text-left text-gray-700 bg-gray-200 p-2" style={{ width: "10%" }}>Date of Submission</th>
            {/* <th className="text-left text-gray-700 bg-gray-200 p-2">Section</th> */}
            <th className="text-left text-gray-700 bg-gray-200 p-2" style={{ width: "10%" }}>Incoming/Continuing</th>
            <th className="text-left text-gray-700 bg-gray-200 p-2" style={{ width: "12%" }}>Status</th>
          </tr>
        </thead>
        </table>
        
        <div className="table-container overflow-y-auto max-h-[400px] ">
        <table className="w-full">
          {data.map((item, index) => (
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
                    : 'bg-red-600'
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

