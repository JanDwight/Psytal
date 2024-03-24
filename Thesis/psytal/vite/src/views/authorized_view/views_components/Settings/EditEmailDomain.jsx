import React, { useState, useEffect } from 'react';
import axiosClient from '../../../../axios';
import Feedback from '../../../feedback/Feedback';

export default function EditEmailDomain({ closeModal, selectedEmailDomain }) {
    const [error, setError] = useState({__html: ""});
    const [emailDomain, setEmailDomain] = useState(selectedEmailDomain.email_domains);
    const [successMessage, setSuccessMessage] = useState('');
    const [successStatus, setSuccessStatus] = useState('');

    console.log('test',emailDomain);
    //update Email Domains
    const onSubmit = async (ev) => {
        ev.preventDefault();

        try {
          const response = await axiosClient.put(`/updateemaildomain/${selectedEmailDomain.id}`, {
            email_domains: (emailDomain)
        });
          setSuccessMessage(response.data.message);
          setSuccessStatus(response.data.success);

          // setTimeout(() => {
          //   setSuccessMessage(null);
          //   closeModal();
          //   window.location.reload();
          // }, 2000);
        } catch (error) {
            setSuccessMessage(error.response.data.message)
            setSuccessStatus(error.response.data.success)
        }
    }

    return (
        <>
        <Feedback isOpen={successMessage !== ''} onClose={() => setSuccessMessage('')} successMessage={successMessage} status={successStatus} refresh={false}/>  
          <div className='text-center mb-4'>
              <h2 className='text-2xl font-semibold text-[#65a30d]'>Edit Domain Modal</h2>
          </div>

            <div className='flex justify-center'>
                <form onSubmit={onSubmit}>
                <label className='pr-2'>
                    Email Domain: 
                </label>
                    <input 
                        id="emailDomain"
                        type="text" 
                        value={emailDomain}
                        onChange={ev => setEmailDomain(ev.target.value)}
                    />

                    {/**===========SUMBIT Button============= */}
                    <div className="text-center items-center my-8">
                            <button 
                                type='button'
                                onClick={closeModal}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 mr-6 rounded-full">
                                  Cancel
                            </button>
                            <button 
                                type="submit"
                                className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-full">
                                  Submit
                            </button>
                        </div> 
                </form>
            </div> 
        </>
    );
}
