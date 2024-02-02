import React, { useState } from 'react'
import axiosClient from '../../../axios.js';

export default function ArchiveLinks({onclose, selected}) {
    
    const [successMessage, setSuccessMessage] = useState(null);
    const onSubmitarchivelink = async (e) => { 
        e.preventDefault();
        try {
            const response = await axiosClient.put(`/archivelink/${selected.id}`)
            .then(({ data }) => {
                // Handle success, e.g., show a success message
                setSuccessMessage({
                  message: 'Link Deleted successfully!',
                });
          
                setTimeout(() => {
                  setSuccessMessage(null);
                  window.location.reload();
                }, 2000);
                
              })
              .catch((error) => {
                // Handle errors, including validation errors
                console.error('Error sending data:', error);
                
              });
              
            

            } catch (error) {
            console.error('Error Deleting link:', error);
          }
    };


  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-gray-200 w-full lg:w-3/12 px-4 py-6 shadow-lg rounded-3xl">
            <div className="w-full px-4 mx-auto">
                <form >
                <h className='font-bold text-3xl text-[#525252] flex items-center justify-center pb-5'>Delete Link?</h>
                    {/**BUTTONS */}
                    <div className="text-center flex justify-end my-2">
                        {/**YES */}
                        
                        <button onClick={onSubmitarchivelink} type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 mr-6 w-full rounded-full">
                            Yes
                        </button>
                        {/**NO */}
                        <button onClick={onclose} type="submit" className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 w-full rounded-full">
                            No
                        </button>
                    </div>
                </form>
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
    
  )
}
