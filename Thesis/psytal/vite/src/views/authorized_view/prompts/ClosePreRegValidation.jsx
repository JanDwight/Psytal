import React, { useState } from 'react'
import axiosClient from '../../../axios';
import Feedback from '../../feedback/Feedback';

export default function ClosePreRegValidation() {
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [successStatus, setSuccessStatus] = useState('');
    const id = 1;
    const onSubmit = async (ev) => {
        ev.preventDefault();
        axiosClient
        try {
          const response = await axiosClient.put(`/closeprereg/${id}`, {
            open_pre_reg: 0,
            fullName,
            password
          });
          setSuccessMessage(response.data.message);
          setSuccessStatus(response.data.success);
  

        } catch (error) {
            console.log(error);
            setSuccessStatus(false)
        }
    }

  return (
    <div className='p-5 text-center'>
        <Feedback isOpen={successMessage !== ''} onClose={() => setSuccessMessage('')} successMessage={successMessage} status={successStatus} refresh={false}/>
        <form onSubmit={onSubmit}>
            <div>
                Please input your credentials if you want to close the pre-registration.
                <br /> {/* This will create a line break */}
                <span className="text-red-500 font-bold">ALL SUBMITTED FORMS FOR THIS SEMESTER WILL BE DELETED</span>
            </div>
            <div>
              <label htmlFor="fullName" className="mt-5 block text-m font-medium leading-6 text-gray-900">
                Full Name
              </label>
              <div className="mt-2"> 
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="fullName"
                  required
                  value={fullName}
                  onChange={ev => setFullName(ev.target.value)}
                  className="block w-[100%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
                <label>Password</label>
                <input
                  id="password"
                  name="password"
                  required
                  value={password}
                  onChange={ev => setPassword(ev.target.value)}
                  className="block w-[100%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>

            <button className="bg-red-600 hover:bg-red-700 rounded-2xl px-7 py-2 text-white font-size">
                Close Pre-Reg
            </button>
        </form>
    </div>
  )
}
