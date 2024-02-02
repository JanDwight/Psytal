import React, { useState, useEffect } from 'react'
import axiosClient from '../../../../axios';

export default function DeleteEmailDomainModal({ closeModal, emailDomain, onDelete }) {
    const [error, setError] = useState({ __html: "" });
    const [successMessage, setSuccessMessage] = useState(null);

    // Function to handle the delete operation
    const handleDelete = async () => {
        try {
            // Send a request to delete the email domain
            const response = await axiosClient.delete(`/deleteemaildomain/${emailDomain.id}`);

            // Handle success, e.g., show a success message
            setSuccessMessage({
                message: 'Email Domain Deleted successfully!',
            });

            setTimeout(() => {
                setSuccessMessage(null);
                onDelete(); // Trigger a callback to update the UI or close the modal
                closeModal(); // Close the modal after successful deletion
                window.location.reload(false);
            }, 2000);
            

        } catch (error) {
            // Handle errors here, e.g., display an error message
            console.error('Error deleting email domain:', error);
        }
    };

    return (
        <>
            <div className='text-center mb-4'>
                <h2 className='text-2xl font-semibold text-[#65a30d]'>Delete Domain Modal</h2>
            </div>

            <div className='flex justify-center'>
                <div >
                    <p >Are you sure you want to delete the email domain?</p>
                    <label className='pr-2'>
                    Email Domain: 
                </label>
                    <input 
                        id="emailDomain"
                        type="text" 
                        placeholder={emailDomain}
                        value={emailDomain.email_domains}
                        onChange={ev => setEmailDomain(ev.target.value)}
                    />
                    

                    {/**===========Delete Button============= */}
                    <div className="text-center items-center my-8">
                        <button
                            type='button'
                            onClick={closeModal}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 mr-6 rounded-full">
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-full">
                            Delete
                        </button>
                    </div>
                </div>
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