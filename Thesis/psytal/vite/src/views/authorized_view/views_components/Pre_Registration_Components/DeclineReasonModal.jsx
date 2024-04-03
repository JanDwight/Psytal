import React, { useState } from 'react'
import axiosClient from '../../../../axios';

export default function DeclineReasonModal() {
    const [reason, setReason] = useState('');

    const onSubmit = (ev) => {

      };

  return (
    <div>
        <form onSubmit={onSubmit}>
            <div>
              <label htmlFor="reason" className="mt-5 block text-m font-medium leading-6 text-gray-900">
                Reason for Declined Pre-Registration
              </label>
              <div className="mt-2"> 
                <textarea
                  id="reason"
                  name="reason"
                  autoComplete="reason"
                  required
                  value={reason}
                  onChange={ev => setReason(ev.target.value)}
                  className="block w-[100%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            
            <div className='text-center'>
                <button type="submit" className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-full">
                    Accept
                </button>
            </div>
        </form>
    </div>
  )
}
