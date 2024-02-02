import React, { useState, useEffect } from 'react';
import axiosClient from '../../../../axios';

export default function EditEmailDomain({ closeModal, selectedEmailDomain }) {
    const [error, setError] = useState({__html: ""});
    const [successMessage, setSuccessMessage] = useState(null);
    const [emailDomain, setEmailDomain] = useState(
        selectedEmailDomain && selectedEmailDomain.email_domains ? selectedEmailDomain.email_domains : ''
    );
    const emailDomainId = selectedEmailDomain && selectedEmailDomain.id ? selectedEmailDomain.id : ''
    const [existingEmailDomains, setExistingEmailDomains] = useState('');

    // Fetch all existing email domains from your data source
    useEffect(() => {
        axiosClient.get(`/getallemaildomains`)
          .then(({ data }) => {
            setExistingEmailDomains(data);          
          })
          .catch((error) => {
            console.error('Error fetching existing email domains:', error);
          });
      }, []);

    //update Email Domains
    const onSubmit = (ev) => {
        ev.preventDefault();
        setError({ __html: "" });


         // Check if the updated email domain already exists
        const isDuplicate = existingEmailDomains.some(domain => domain.email_domains === emailDomain);

        if (isDuplicate) {
            setSuccessMessage({ message: "Email Domain Already Exists." });
            setTimeout(() => {
                setSuccessMessage(null); 
              }, 1500);
            return; // Exit the function 
        }

        axiosClient
        .put(`/updateemaildomain/${emailDomainId}`, {
            email_domains: (emailDomain)
        })
        .then(({ data }) => {
            // Handle success, e.g., show a success message
            console.log(data);
      
            setSuccessMessage({
              message: 'Email Domain Edited successfully!',
            });
      
            setTimeout(() => {
              setSuccessMessage(null);
              window.location.reload(false);
            }, 2000);
          })
          .catch((error) => {
            // Handle errors, including validation errors
            console.error('Error sending data:', error);
            
          });
    }

    return (
        <>
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
                        placeholder={emailDomain}
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
                {successMessage && (
                <div className="fixed top-0 left-0 w-full h-full overflow-y-auto bg-black bg-opacity-50">
                <div className="lg:w-1/2 px-4 py-1 shadow-lg w-[20%] h-fit bg-[#FFFFFF] rounded-xl mt-[10%] mx-auto p-5">
                    <div className="w-full px-4 mx-auto mt-6">
                    <div className="text-center text-xl text-green-600 font-semibold my-3">
                        {successMessage.message}
                    </div>
                    </div>
                </div>
                </div>
            )}
            </div> 
        </>
    );
}
