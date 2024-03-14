import React, { useState } from 'react';
import ReactModal from 'react-modal';
import OpenPreRegModal from '../views_components/Settings/OpenPreRegModal'
import EmailDomainModal from '../views_components/Settings/EmailDomainModal'
import axiosClient from '../../../axios.js';

export default function Settings() {
    const [showOpenPreRegModal, setShowOpenPreRegModal]= useState(false);
    const [showEmailDomainModal, setShowEmailDomainModal]= useState(false);

    const handleBackup  = () => {
        axiosClient.post('/backupDB')
                .then(response => {
                    //alert(response.data.message);
                })
                .catch(error => {
                    //console.error('Backup failed:', error);
                    //alert('Backup failed. Please try again.');
                });
      }
    
      const handleRestore  = () => {
        
      }
    
    const downloadAll = () => {
        axiosClient
          .get('/getallbackup')
          .then((res) => {
            // Loop through each backup object in the response
            if (res.data.length === 0) {
                console.log("No backup files available.")
                // Concatenate all file contents into a single string
                const allBackupContents = res.data.reduce((accumulator, backupFile) => {
                  return accumulator + `${backupFile.content}\n\n`;
                }, '');
    
                const currentDate = new Date();
                const formattedDate = currentDate.toISOString().replace(/:/g, '-').split('.')[0]; // Format: YYYY-MM-DDTHH-MM-SS
                const filename = `psytal_backup_${formattedDate}.txt`;
              
                // Create a Blob object from the concatenated file contents
                const blob = new Blob([allBackupContents], { type: 'text/plain' });
                const downloadLink = document.createElement('a');
                downloadLink.href = window.URL.createObjectURL(blob);
                downloadLink.download = filename;
    
                // Append the link to the body
                document.body.appendChild(downloadLink);
                downloadLink.click();
    
                document.body.removeChild(downloadLink);
            }
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      };

  return (
    <>
        <div className="w-full h-full px-4 mx-auto rounded-3xl bg-white pt-5 pb-12  table-container ">{/*For the Container*/}
            <div>
                <div> {/**For opening the pre-registration and recoding what semester */}
                    <button onClick={() => setShowOpenPreRegModal(true)} 
                        className="bg-[#397439] hover:bg-[#0FE810] rounded-2xl  px-7 py-2 text-white font-size ml-10">
                            Open Pre-Registration
                    </button>
                </div>

                <div className='pt-2'> {/**Forsaving the valid email domains */}
                    <button onClick={() => setShowEmailDomainModal(true)} 
                        className="bg-[#397439] hover:bg-[#0FE810] rounded-2xl  px-7 py-2 text-white font-size ml-10">
                            Add Email Domains
                    </button>
                </div>
                <br></br>
                <div className="pt-5 flex justify-end space-x-3">
                    <button onClick={handleBackup} className="bg-lime-600 hover:bg-lime-700 text-white px-3 py-1 rounded-full cursor-pointer">
                        Backup Database --- Must be downloadable after the fact
                    </button>
                    <button onClick={handleRestore} className="bg-lime-600 hover:bg-lime-700 text-white px-3 py-1 rounded-full cursor-pointer">
                        Restore Database Contents
                    </button>
                    <button onClick={downloadAll} className="bg-lime-600 hover:bg-lime-700 text-white px-3 py-1 rounded-full cursor-pointer">
                        Download All Backups [will download all backup archive, currently downloading separately]
                    </button>
                </div>
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
    </>
  )
}
