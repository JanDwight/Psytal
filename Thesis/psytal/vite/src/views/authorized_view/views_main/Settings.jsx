import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import OpenPreRegModal from '../views_components/Settings/OpenPreRegModal'
import EmailDomainModal from '../views_components/Settings/EmailDomainModal'
import ShowBackup from '../views_components/Settings/showBackup.jsx';
import axiosClient from '../../../axios.js';
import Feedback from '../../feedback/Feedback.jsx';
import ImportPrompt from '../views_components/Settings/ImportPrompt.jsx';
import RollBackPrompt from '../views_components/Settings/RollBackPrompt.jsx';

export default function Settings() {
    const [showOpenPreRegModal, setShowOpenPreRegModal]= useState(false);
    const [showEmailDomainModal, setShowEmailDomainModal]= useState(false);
    const [showshowBackup, setShowBackup]= useState(false);
    const [showPrompt, setShowPrompt]= useState(false);
    const [showRollBack, setShowRollBack]= useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [successStatus, setSuccessStatus] = useState('');
    const [latestBackup, setLatestBackup] = useState('Loading...');
    const [shown, setShown] = useState(false);

    const handleBackup  = () => {
        axiosClient.post('/backupDB')
                .then(response => {
                    console.log(response);
                    setSuccessMessage(response.data.message);
                    setSuccessStatus(response.data.success);
                });
        fetchLatestBackup();
    }

    useEffect(() => {
        fetchLatestBackup();
    }, []);

    const fetchLatestBackup = async () => {
        try {
            const response = await axiosClient.get('/latestBackup');
            setLatestBackup(response.data);
        } catch (error) {
            console.error('Error fetching latest backup:', error);
        }
    };

    const handleView = () => {
        setShown(!shown);
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
                            Add Email Domains
                    </button>
                </div>
                <br></br>
                <hr></hr>
                <strong>Data Backup and Restore</strong>
                <div>
                    <button onClick={handleBackup} className="bg-[#397439] hover:bg-[#0FE810] rounded-2xl  px-7 py-2 text-white font-size ml-3 mt-2">
                        Backup Database
                    </button>
                </div>
                <br></br>
                <strong className='ml-3'>Latest Backup</strong>
                <div>
                    <input
                        id="latestbackup"
                        name="latestbackup"
                        type="text"
                        value={latestBackup}
                        disabled //makes field uneditable
                        className="min-w-[20vw] rounded-md border border-gray-300 bg-gray-100 text-gray-700 shadow-sm focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 mt-2 ml-3"
                    />
                    <button onClick={() => setShowRollBack(true)} className="bg-[#397439] hover:bg-[#0FE810] rounded-2xl  px-7 py-2 text-white font-size ml-3 mt-2">
                        Restore To Latest Backup
                    </button>
                    {/*<label for="latestbackup" className='ml-4'>Latest Backup: </label>*/}
                </div>
                <div className='pt-4'>
                    <input onChange={handleView} type="checkbox" id="showOption" className='ml-7'/>
                    <label for="showOption" className='ml-2' >Advanced Options</label>
                </div>
                <br></br>
                <div id="advanced" hidden={!shown}>
                    <strong className='ml-3'>Import/Export</strong>
                        <div className='pt-3'>
                            <button onClick={() => setShowBackup(true)} className="bg-[#397439] hover:bg-[#0FE810] rounded-2xl  px-7 py-2 text-white font-size ml-3">
                                View Backup Files
                            </button>
                            <button onClick={() => setShowPrompt(true)} className="bg-[#397439] hover:bg-[#0FE810] rounded-2xl  px-7 py-2 text-white font-size ml-3">
                                Import Backup File
                            </button>
                        </div>
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
            isOpen={showRollBack}
            onRequestClose={() => setShowRollBack(false)}
            className="md:w-[1%]"
        >
            <div>
                <RollBackPrompt
                    closeModal={() => setShowRollBack(false)}
                />
            </div>
        </ReactModal>
    </>
  )
}
