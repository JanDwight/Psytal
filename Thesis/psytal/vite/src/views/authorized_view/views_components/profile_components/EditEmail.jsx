import React, { useState, useEffect } from 'react';
import axiosClient from '../../../../axios';
import ReactModal from 'react-modal';
import Feedback from '../../../feedback/Feedback';
import CreatePrompt from '../../prompts/CreatePrompt';

export const EditEmail = ({ onCloseEditEmail, data }) => {
    const [email, setEmail] = useState(data);
    const [successMessage, setSuccessMessage] = useState('');
    const [successStatus, setSuccessStatus] = useState('');
    const [showPrompt, setShowPrompt] = useState(false);
    const [promptMessage, setPromptMessage] = useState('');
    const action = "Confirm Email Address Change";

    //<><><><><>
    const editprompt = (ev) => {
        ev.preventDefault();
        const concatmessage = 'Changes to your email will be saved. Do you wish to proceed?';
        setPromptMessage(concatmessage);
        setShowPrompt(true);
    }

    const handleCloseModal = () => {
        onCloseEditEmail();
        //window.location.reload(); // Reload the page to close the modal
        //why is it reload?
    };

    const handleSubmit = async () => {
        const response = await axiosClient.post('/userprofileemailupdate', { email: email });

        setSuccessMessage(response.data.message);
        setSuccessStatus(response.data.success);
    };

    const handleFeedbackClose = () => {
        setSuccessMessage('');
        handleCloseModal();
    };

    return (
        <div className="popup">
            <Feedback isOpen={successMessage !== ''} onClose={handleFeedbackClose} successMessage={successMessage} status={successStatus} refresh={false}/>
            <div className="popup-content">
                <div className="flex flex-wrap flex-col mx-2 mb-2">
                    <label className="text-lg font-franklin">Email:</label>
                    <input className="appearance-none block bg-gray-300 rounded-md w-full py-1.5 text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                        type="email"
                        name="oldemail"
                        value={email.email}
                        readOnly
                        placeholder="Old Email"
                        style={{
                            border: "none",
                            outline: "none",
                            fontSize: 16,
                        }}
                    />
                    <label className="mt-3 text-lg font-franklin">New Email</label>
                    <input className="appearance-none block bg-gray-300 rounded-md w-full py-1.5 text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                        type="email"
                        name="newemail"
                        value={email.email}
                        onChange={ev => setEmail(ev.target.value)}
                        placeholder="New Email"
                        style={{
                            border: "none",
                            outline: "none",
                            fontSize: 16,
                        }}
                    />
                </div>
                <div className='mt-5 flex felx-row-2 justify-center space-x-2'>
                    <button onClick={editprompt} 
                        className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-xl">
                        Confirm
                    </button>
                    <button onClick={handleCloseModal} className="bg-[#E2202C] hover:bg-[#B30D0F] text-white font-bold py-2 px-4 rounded-xl">
                        Cancel
                    </button>
                </div>
            </div>
            <ReactModal
                isOpen={showPrompt}
                onRequestClose={() => setShowPrompt(false)}
                className="md:w-[1%]"
            >
            <div>
                <CreatePrompt
                    closeModal={() => setShowPrompt(false)}
                    handleSave={handleSubmit}
                    action={action}
                    promptMessage={promptMessage}
                />
            </div>
            </ReactModal>
        </div>
    );
};
