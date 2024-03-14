import React, { useState, useEffect } from 'react';
import axiosClient from '../../../../axios';
import Feedback from '../../../feedback/Feedback';

export const EditEmail = ({ onCloseEditEmail, data, onClose }) => {
    const [email, setEmail] = useState(data);
    const [successMessage, setSuccessMessage] = useState('');
    const [successStatus, setSuccessStatus] = useState('');

    const handleCloseModal = () => {
        window.location.reload(); // Reload the page to close the modal
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
                <div className='mt-5 flex felx-row-2 justify-center'>
                    <button onClick={handleSubmit} 
                        className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-xl">
                        Confirm
                    </button>
                    <button onClick={handleCloseModal} className="bg-[#E2202C] hover:bg-[#B30D0F] text-white font-bold py-2 px-4 rounded-xl">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
