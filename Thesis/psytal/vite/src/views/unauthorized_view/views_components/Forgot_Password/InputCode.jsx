import React, { useState } from 'react';
import axiosClient from '../../../../axios';
import Feedback from '../../../feedback/Feedback';

export default function InputCode({ closeModal, propData}) {
  const [userCode, setUserCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [successStatus, setSuccessStatus] = useState('');

  const onSubmit = async (ev) => {
    ev.preventDefault();

    setSuccessMessage('Loading...');
    setSuccessStatus('Loading');

    // Check if userCode matches the code in formData
    if (propData && userCode === propData.code) {
      // Code is correct, you can proceed with your logic
      try {
        const response = await axiosClient.put('/changepassword', {
          email: propData.email,
        })

        // Assuming the API response structure is { new_password: 'your_password' }
        const newPasswordFromResponse = response.data.new_password;

        setNewPassword(newPasswordFromResponse);

        // Preparing formData to be sent to the backend
        const newFormData = new FormData();
        newFormData.append('newPassword', newPasswordFromResponse);
        newFormData.append('email', propData.email);

        const sendNewPassResponse = await axiosClient.get('/sendnewpassword', {
          params: Object.fromEntries(newFormData), // Convert FormData to plain object
        });

        setSuccessMessage(sendNewPassResponse.data.message);
        setSuccessStatus(sendNewPassResponse.data.success);

      } catch (error) {
        console.error('Error updating password:', error);
        setSuccessMessage(error.message);
        setSuccessStatus(false);
      }
    }else {
      setSuccessMessage('Incorrect Code');
      setSuccessStatus(false);
    }

  };

  return (
    <>
    <Feedback isOpen={successMessage !== ''} onClose={() => setSuccessMessage('')} successMessage={successMessage} status={successStatus} refresh={false}/>
      <div className='flex min-h-[100%] flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8'>
        <div className='flex items-center justify-between'>
          <label htmlFor='password' className='pb-3 block text-xl font-medium leading-6 text-gray-900'>
            Enter The 4-Digit Code Sent To Your Email:
          </label>
        </div>

        <form onSubmit={onSubmit} className='space-y-6' action='#' method='POST'>
          <div className=''>
            <input
              name='end'
              type='text'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
              value={userCode}
              onChange={(ev) => setUserCode(ev.target.value)}
            />
          </div>

          <div>
            <button
              type='submit'
              className='flex w-[100%] justify-center rounded-md bg-lime-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-lime-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Enter
            </button>
          </div>
        </form>
      </div>
    </>
  );
}