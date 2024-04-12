import React, { useState } from 'react';
import axiosClient from '../../../../axios';
import ReactModal from 'react-modal';
import InputCode from './InputCode';
import Feedback from '../../../feedback/Feedback';

export default function InputEmail() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [propData, setPropData] = useState({
    code: '',
    email: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [successStatus, setSuccessStatus] = useState('')

  const onSubmit = async (ev) => {
  ev.preventDefault();

  setSuccessMessage('Loading...');
  setSuccessStatus('Loading');

  // Generate a 4-digit random code
  const randomCode = Math.floor(1000 + Math.random() * 9000);
  const generatedCode = randomCode.toString();
  setCode(generatedCode);

  // Preparing formData to be sent to the backend
  let formData = new FormData();

  // Append some data to the FormData object
  formData.append('code', generatedCode); // Use the generatedCode variable
  formData.append('email', email);

  // Update the propData state using the callback function
  setPropData((prevPropData) => ({
    ...prevPropData,
    code: generatedCode,
    email: email,
  }));

  try {
    const response = await axiosClient.get('/forgotpasswordsendemail', {
      params: Object.fromEntries(formData), // Convert FormData to a plain object
    });

    setSuccessMessage(response.data.message);
    setSuccessStatus(response.data.success);

    if (response.data.success === true) {
      setIsModalOpen(true);
    }

  } catch (error) {
    console.error('Error:', error);
    setSuccessMessage(error.message);
    setSuccessStatus(false);
  }
};

  return (
    <>
    <Feedback isOpen={successMessage !== ''} onClose={() => setSuccessMessage('')} successMessage={successMessage} status={successStatus} refresh={true}/>
      <div className='flex min-h-[100%] flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8'>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block font-medium leading-6 text-gray-900 text-xl">
            Please Enter Your Email:
          </label>
        </div>
        <form onSubmit={onSubmit} className="space-y-6" action="#" method="POST">
          <div className='flex justify-center'>
            <input
              name="end"
              type="text"
              className="w-[100%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
              value={email}
              onChange={ev => setEmail(ev.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="flex w-[100%] justify-center rounded-md bg-lime-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-lime-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Send Code
            </button>
          </div>
        </form>
      </div>

      <ReactModal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            className="w-[100%] md:w-[30%] h-fit bg-gray-300 rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-2"
        >
            <div>
                <InputCode
                 closeModal={() => setIsModalOpen(false)}
                 propData={propData} // Pass propData as a prop
                 />
            </div>
      </ReactModal>
    </>
  )
}