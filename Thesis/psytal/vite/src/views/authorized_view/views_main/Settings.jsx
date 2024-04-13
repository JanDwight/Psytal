import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import OpenPreRegModal from '../views_components/Settings/OpenPreRegModal'
import EmailDomainModal from '../views_components/Settings/EmailDomainModal'
import ShowBackup from '../views_components/Settings/showBackup.jsx';
import axiosClient from '../../../axios.js';
import Feedback from '../../feedback/Feedback.jsx';
import ImportPrompt from '../views_components/Settings/ImportPrompt.jsx';
import RollBackPrompt from '../views_components/Settings/RollBackPrompt.jsx';
import BackupPrompt from '../views_components/Settings/BackupPrompt.jsx';
import HelpModal from '../views_components/Settings/HelpModal.jsx';
import page32 from "@assets/Help/Admin/Settings/1.png";
import page33 from "@assets/Help/Admin/Settings/2.png";
import page34 from "@assets/Help/Admin/Settings/3.png";
import page35 from "@assets/Help/Admin/Settings/4.png";
import page36 from "@assets/Help/Admin/Settings/5.png";
import page37 from "@assets/Help/Admin/Settings/6.png";
import page38 from "@assets/Help/Admin/Settings/7.png";
import page39 from "@assets/Help/Admin/Settings/8.png";
import page40 from "@assets/Help/Admin/Settings/9.png";
import page41 from "@assets/Help/Admin/Settings/10.png";
import page41a from "@assets/Help/Admin/Settings/11.png";

export default function Settings() {
    const [showOpenPreRegModal, setShowOpenPreRegModal]= useState(false);
    const [showEmailDomainModal, setShowEmailDomainModal]= useState(false);
    const [showshowBackup, setShowBackup]= useState(false);
    const [showPrompt, setShowPrompt]= useState(false);
    const [showBackupPrompt, setShowBackupPrompt]= useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [successStatus, setSuccessStatus] = useState('');

    
    const [isHelpModalOpen, setIsHelpModalOpen]= useState(false);
    const [isHelpModalOpen2, setIsHelpModalOpen2]= useState(false);
    // Function to toggle help modal

    const toggleHelpModal = () => {
      setIsHelpModalOpen(!isHelpModalOpen);
    };
    
    const toggleHelpModal2 = () => {
        setIsHelpModalOpen2(!isHelpModalOpen2);
      };

    const handleBackup  = () => {

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
        const day = ('0' + currentDate.getDate()).slice(-2);
        const hours = ('0' + currentDate.getHours()).slice(-2);
        const minutes = ('0' + currentDate.getMinutes()).slice(-2);
        const seconds = ('0' + currentDate.getSeconds()).slice(-2);

        const formattedDateTime = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
        const filename = `psytal_backup_${formattedDateTime}.sql`;

        axiosClient.post('/backupDB')
                .then(response => {
                    const blob = new Blob([response.data], { type: 'application/sql' });
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = filename;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                    
                    //setSuccessMessage('Please press Save to download.');
                    setSuccessMessage('Download Success.');
                    setSuccessStatus(true);
                })
                .catch(error => {
                    console.error('Backup creation failed:', error);
                    setErrorMessage('Failed to export database backup.');
                    setErrorStatus(false);
                });
            
    }
    
    return (
    <>
        <div className="w-full h-full px-4 mx-auto rounded-3xl bg-white pt-5 pb-12  table-container ">{/*For the Container*/}
            <Feedback isOpen={successMessage !== ''} onClose={() => setSuccessMessage('')} successMessage={successMessage} status={successStatus} refresh={false}/>
            <div>
                <hr></hr>
                <strong>Pre-registration</strong>
                <div>
                    {/**For opening the pre-registration and recoding what semester */}
                    <button onClick={() => setShowOpenPreRegModal(true)} 
                        className="bg-[#397439] hover:bg-[#0FE810] rounded-2xl  px-7 py-2 text-white font-size ml-3 mt-2">
                            Configure Pre-Registration
                    </button>
                    {/**Forsaving the valid email domains */}
                    <button onClick={() => setShowEmailDomainModal(true)} 
                        className="bg-[#397439] hover:bg-[#0FE810] rounded-2xl  px-7 py-2 text-white font-size ml-3 mt-2">
                            Configure Email Domains
                    </button>
                </div>
                <br></br>
                <hr></hr>
                <strong>Data Backup and Restore</strong>
                <div>
                    <button onClick={() => setShowBackupPrompt(true)} className="bg-[#397439] hover:bg-[#0FE810] rounded-2xl  px-7 py-2 text-white font-size ml-3 mt-2">
                        Backup Database
                    </button>
                    <button onClick={() => setShowPrompt(true)} className="bg-[#397439] hover:bg-[#0FE810] rounded-2xl  px-7 py-2 text-white font-size ml-3 mt-2">
                        Import Backup File
                    </button>
                </div>
                <br></br>
                <hr></hr>
                <strong>Help Manual</strong>
                <div>
                <button onClick={() => setIsHelpModalOpen(true)} className="bg-[#397439] hover:bg-[#0FE810] rounded-2xl  px-7 py-2 text-white font-size ml-3 mt-2">
                        User's Guide
                    </button>
                </div>
                <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
            </div>
        </div>

        <ReactModal
            isOpen={showOpenPreRegModal}
            onRequestClose={() => setShowOpenPreRegModal(false)}
            className="w-full md:w-[30%] lg:w-fit h-fit bg-[#FFFFFF] rounded-3xl ring-1 ring-black shadow-2xl mt-[5%] mx-auto p-5"
        >
            <div className='relative'>
                <button onClick={() => setShowOpenPreRegModal(false)} className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700 cursor-pointer">
                    X
                </button>
            </div>
            <div>
                <OpenPreRegModal
                 closeModal={() => setShowOpenPreRegModal(false)}/>
            </div>
        </ReactModal>

        <ReactModal
            isOpen={showEmailDomainModal}
            onRequestClose={() => setShowEmailDomainModal(false)}
            className="w-full md:w-[50%] h-fit bg-[#FFFFFF] rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5 overflow-auto"
        >
            <div className='text-right'>
                <button onClick={() => setShowEmailDomainModal(false)} className="bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700 cursor-pointer">
                    X
                </button>
            </div>
            <div>
                <EmailDomainModal
                 closeModal={() => setShowEmailDomainModal(false)}/>
            </div>
        </ReactModal>

        <ReactModal
            isOpen={showshowBackup}
            onRequestClose={() => setShowBackup(false)}
            className="md:w-[1%]"
        >
            <div>
                <ShowBackup
                    closeModal={() => setShowBackup(false)}
                />
            </div>
        </ReactModal>

        <ReactModal
            isOpen={showPrompt}
            onRequestClose={() => setShowPrompt(false)}
            className="md:w-[1%]"
        >
            <div>
                <ImportPrompt
                    closeModal={() => setShowPrompt(false)}
                />
            </div>
        </ReactModal>

        <ReactModal
            isOpen={showBackupPrompt}
            onRequestClose={() => setShowBackupPrompt(false)}
            className="md:w-[1%]"
        >
            <div>
                <BackupPrompt
                    closeModal={() => setShowBackupPrompt(false)}
                    handleSave={handleBackup}
                />
            </div>
        </ReactModal>

        {/* Help Icon */}
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '9999' }}>
                    <button onClick={toggleHelpModal2} style={{ backgroundColor: '#b3d7b2', color: '#000', border: 'none', borderRadius: '50%', width: '60px', height: '60px', fontSize: '30px', cursor: 'pointer' }}>?</button>
              </div>    

      {/* HELP*/}
    <ReactModal
      isOpen={isHelpModalOpen2}
      onRequestClose={toggleHelpModal2}
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
    <p className='text-3xl bg-[#91b482]'>SETTINGS</p>
        <img
            src={page32}
        />
        <img
            src={page33}
        />
        <img
            src={page34}
        />
        <img
            src={page35}
        />
        <img
            src={page36}
        />
        <img
            src={page37}
        />
        <img
            src={page38}
        />
        <img
            src={page39}
        />
        <img
            src={page40}
        />
        <img
            src={page41}
        />
        <img
            src={page41a}
        />
        </div>
        
        
        <button
          onClick={toggleHelpModal2}
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
  )
}
