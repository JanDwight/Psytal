import React, { useState } from 'react';
import AddUsers from '../views_components/AddUsers.jsx';
import StaffStudentList from '../views_components/StaffStudentList.jsx'
import { useStateContext } from '../../../context/ContextProvider';
import ReactModal from 'react-modal';
import page12 from "@assets/Help/Admin/ManageAccounts/1.png";
import page13 from "@assets/Help/Admin/ManageAccounts/2.png";
import page14 from "@assets/Help/Admin/ManageAccounts/3.png";
import page15 from "@assets/Help/Admin/ManageAccounts/4.png";
import page15a from "@assets/Help/Admin/ManageAccounts/5.png";
import page15b from "@assets/Help/Admin/ManageAccounts/6.png";
import page15c from "@assets/Help/Admin/ManageAccounts/7.png";
import page45 from "@assets/Help/Staff/ManageAccounts/1.png";
import page46 from "@assets/Help/Staff/ManageAccounts/2.png";
import page47 from "@assets/Help/Staff/ManageAccounts/3.png";
import page48 from "@assets/Help/Staff/ManageAccounts/4.png";

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

export default function ManageGrades() {

  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false); //help modal
    
  // Function to toggle help modal
    const toggleHelpModal = () => {
      setIsHelpModalOpen(!isHelpModalOpen);
    };
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [activeTab, setActiveTab] = useState(1); // Initialize active tab
  const [filterText, setFilterText] = useState(''); // Filter text state

  const {userRole} = useStateContext(''); //just refresh server

  const handleAddUserClick = () => {
    console.log('ModalShowing');
    setIsModalOpen(true);
  };

  const handleAddUserClose = () => {
    console.log('ModalClosed');
    setIsModalOpen(false);
    window.location.reload(); // Reload the page
  };


  return (
    <>
  <div className="w-full h-[auto] px-4 mx-auto rounded-3xl bg-white shadow-2xl pt-5 pb-10">{/**WHole container */}
  <div className='flex flex-col sm:none overflow-x-auto'>
{/**______________________1st Container from Manage - Btn Add________________________________*/}
<div className="mt-5 mx-5 pb-5 border-b-2 border-black flex flex-row justify-between items-baseline">
    <div className="font-bold text-4xl lg:text-6xl text-[#525252]"> Student Grades</div>
      <div className="flex">
        <div>
            <div className="flex px-1">
              <div className="my-2 mx-4">
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
                  className="h-10 px-6 py-4 border border-gray-300 focus:ring-viridianHue focus:border-viridianHue rounded-lg"
                ></input>
            </div>
        </div>
        <div>
          {/**Add Users */}
          
            <button onClick={handleAddUserClick} className="bg-[#397439] hover:bg-[#0FE810] rounded-2xl  px-7 py-2 text-white font-size ml-1">
              Add User
            </button>
        </div>
      </div>

    </div>
    </div>
    {/**___________________________2nd Container from Student to Filter________________________________ */}

      <div className="m-2">
        <div>
          {activeTab === 1 && (
              <StaffStudentList filterText={filterText} />
            )}
        </div>
      </div>
      <ReactModal
        appElement={document.getElementById('root')}
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="w-[20%] h-fit mt-[10%] mx-auto" //it just works don't question
      >
        <AddUsers
          onClose={handleAddUserClose}
        />
            
      </ReactModal>

  </div>
  <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '9999' }}>
                    <button onClick={toggleHelpModal} style={{ backgroundColor: '#b3d7b2', color: '#000', border: 'none', borderRadius: '50%', width: '60px', height: '60px', fontSize: '30px', cursor: 'pointer' }}>?</button>
              </div>    

      {/* HELP*/}
    <ReactModal
      isOpen={isHelpModalOpen}
      onRequestClose={toggleHelpModal}
      style={{ content: {
        position: 'fixed',
        width:'60%',
        bottom: '20px',
        top:'15%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: '9999',
        backgroundColor: '#fff',
        border: '1px solid #000',
        padding: '20px',
        textAlign: 'center', // Align the content center
      }
    }}
    >

    <div>
        
      
        {userRole == 1 && (
        <>
            <p className='text-4xl bg-[#7e9f70]'>ADMIN USER'S MANUAL</p>
            <p className='text-3xl bg-[#91b482]'>MANAGE ACCOUNTS</p>
            <img
            src={page12}
            />
            <img
                src={page13}
            />
            <img
                src={page14}
            />
            <img
                src={page15}
            />
            <img
                src={page15a}
            />
            <img
                src={page15b}
            />
            <img
                src={page15c}
            />
        </>
          )}

        {userRole == 2 && (
        <>
            <p className='text-4xl bg-[#7e9f70]'>STAFF USER'S MANUAL</p>
            <p className='text-3xl bg-[#91b482]'>MANAGE ACCOUNTS</p>
            <img
            src={page45}
            />
            <img
                src={page46}
            />
            <img
                src={page47}
            />
            <img
                src={page48}
            />
            
            </>
          )}
        
       
        </div>
        
        <button
          onClick={toggleHelpModal}
          style={{
            backgroundColor: 'red',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 20px',
            cursor: 'pointer',
          }}
        >
          Close
        </button>
    </ReactModal>
    </>
  );
}
