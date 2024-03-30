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
import page1 from "@assets/Help/Admin/Settings/1.png";
import page2 from "@assets/Help/Admin/Settings/2.png";
import page3 from "@assets/Help/Admin/Settings/3.png";
import page4 from "@assets/Help/Admin/Settings/4.png";
import page5 from "@assets/Help/Admin/Settings/5.png";
import page6 from "@assets/Help/Admin/Settings/6.png";
import page7 from "@assets/Help/Admin/Settings/7.png";
import page8 from "@assets/Help/Admin/Settings/8.png";
import page9 from "@assets/Help/Admin/Settings/9.png";
import page10 from "@assets/Help/Admin/Settings/10.png";


export default function Settings() {
    const [showOpenPreRegModal, setShowOpenPreRegModal]= useState(false);
    const [showEmailDomainModal, setShowEmailDomainModal]= useState(false);
    const [showshowBackup, setShowBackup]= useState(false);
    const [showPrompt, setShowPrompt]= useState(false);
    const [showBackupPrompt, setShowBackupPrompt]= useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [successStatus, setSuccessStatus] = useState('');

    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

        // Function to toggle help modal
        const toggleHelpModal = () => {
            setIsHelpModalOpen(!isHelpModalOpen);
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
                    
                    setSuccessMessage('Please press Save to download.');
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
                {/* Help Modal */}
          <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '9999' }}>
            <button onClick={toggleHelpModal} style={{ backgroundColor: '#fff', color: '#000', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '20px', cursor: 'pointer' }}>?</button>
          </div>

            </div>
        </div>

        <ReactModal
            isOpen={showOpenPreRegModal}
            onRequestClose={() => setShowOpenPreRegModal(false)}
            className="w-full md:w-[30%] lg:w-fit h-fit bg-[#FFFFFF] rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5"
        >
            <div className='text-right'>
                <button onClick={() => setShowOpenPreRegModal(false)} className="bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700 cursor-pointer">
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

        {/* HELP*/}
      <ReactModal
      isOpen={isHelpModalOpen}
      onRequestClose={toggleHelpModal}
      style={{ content: {
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: '9998',
          backgroundColor: '#fff',
          border: '1px solid #000',
          padding: '20px',
          textAlign: 'center', // Align the content center
        }
      }}
    >
      <div>
        <img
            src={page1}
            alt="Page 1"
        />
        <img
            src={page2}
            alt="Page 2"
        />
        <img
            src={page3}
            alt="Page 3"
        />
        <img
            src={page4}
            alt="Page 4"
        />
        <img
            src={page5}
            alt="Page 5"
        />
        <img
            src={page6}
            alt="Page 6"
        />
        <img
            src={page7}
            alt="Page 7"
        />
        <img
            src={page8}
            alt="Page 8"
        />
        <img
            src={page9}
            alt="Page 9"
        />
        <img
            src={page10}
            alt="Page 10"
        />

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
      </div>
    </ReactModal>
    </>
  )
}
