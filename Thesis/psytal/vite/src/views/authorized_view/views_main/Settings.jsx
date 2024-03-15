import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import OpenPreRegModal from '../views_components/Settings/OpenPreRegModal'
import EmailDomainModal from '../views_components/Settings/EmailDomainModal'
import ShowBackup from '../views_components/Settings/showBackup.jsx';
import axiosClient from '../../../axios.js';

export default function Settings() {
    const [showOpenPreRegModal, setShowOpenPreRegModal]= useState(false);
    const [showEmailDomainModal, setShowEmailDomainModal]= useState(false);
    const [showshowBackup, setShowBackup]= useState(false);
   

    const handleBackup  = () => {
        axiosClient.post('/backupDB')
                .then(response => {
                    //alert(response.data.message);
                    //reload?
                })
                .catch(error => {
                    //console.error('Backup failed:', error);
                    //alert('Backup failed. Please try again.');
                });
    }
    
    const handleRestore = (event) => {
        const file = event.target.files[0]; // Get the selected file

        // Create a FormData object to store the file data
        const formData = new FormData();
        formData.append('backup_file', file);
        // Send the file to the backend using Axios
        axiosClient.post('/restoreDB', formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Set content type header for FormData
            }
        })
        .then(response => {
            // Handle successful response from the backend
            console.log(response.data.message); // You can display a success message or perform any other action
        })
        .catch(error => {
            // Handle errors
            console.error('Error:', error.message);
        });
    };
    
  return (
    <>
        <div className="w-full h-full px-4 mx-auto rounded-3xl bg-white pt-5 pb-12  table-container ">{/*For the Container*/}
            <div>
                <hr></hr>
                <strong>Pre-registration</strong>
                <div className='pt-2'>
                    {/**For opening the pre-registration and recoding what semester */}
                    <button onClick={() => setShowOpenPreRegModal(true)} 
                        className="bg-[#397439] hover:bg-[#0FE810] rounded-2xl  px-7 py-2 text-white font-size ml-5">
                            Configure Pre-Registration
                    </button>
                    {/**Forsaving the valid email domains */}
                    <button onClick={() => setShowEmailDomainModal(true)} 
                        className="bg-[#397439] hover:bg-[#0FE810] rounded-2xl  px-7 py-2 text-white font-size ml-3">
                            Add Email Domains
                    </button>
                </div>
                <br></br>
                <hr></hr>
                <strong>Data Backup and Restore</strong>
                <div className='pt-2'>
                    <button onClick={handleBackup} className="bg-[#397439] hover:bg-[#0FE810] rounded-2xl  px-7 py-2 text-white font-size ml-5">
                        Backup Database
                    </button>
                    <button onClick={() => setShowBackup(true)} className="bg-[#397439] hover:bg-[#0FE810] rounded-2xl  px-7 py-2 text-white font-size ml-3">
                        View Backup Files
                    </button>
                    {/* Warning this will wipe the database clean and insert the restore data. Please use modular restore for conditional restore.*/}
                    <input type="file" onChange={handleRestore} className="hidden" id="fileInput" accept=".sql"/>
                    <label for="fileInput" className="bg-[#397439] hover:bg-[#0FE810] rounded-2xl  px-7 py-2 text-white font-size ml-3">Import Backup File</label>
                </div>
                <br></br>
                <strong className='ml-5'>Modular Backup and Restore</strong>
                <div className='pt-4'>
                    <button className="bg-[#397439] hover:bg-[#0FE810] rounded-2xl  px-7 py-2 text-white font-size ml-5">
                        Modular Backup
                    </button>
                    <input type="file" onChange={handleRestore} className="hidden" id="fileInput" accept=".sql"/>
                    <label for="fileInput" className="bg-[#397439] hover:bg-[#0FE810] rounded-2xl  px-7 py-2 text-white font-size ml-3">Load Modular Backup</label>
                </div>
                <br></br>
                <hr></hr>
            </div>
        </div>

        <ReactModal
            isOpen={showOpenPreRegModal}
            onRequestClose={() => setShowOpenPreRegModal(false)}
            className="w-full md:w-[30%] lg:w-fit h-fit bg-[#FFFFFF] rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5"
        >
            <div>
                <OpenPreRegModal
                 closeModal={() => setShowOpenPreRegModal(false)}/>
            </div>
        </ReactModal>

        <ReactModal
            isOpen={showEmailDomainModal}
            onRequestClose={() => setShowEmailDomainModal(false)}
            className="w-full md:w-[30%] h-fit bg-[#FFFFFF] rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5"
        >
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
    </>
  )
}
