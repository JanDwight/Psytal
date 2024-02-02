import React, { useState, useEffect } from 'react';
import axiosClient from '../../../axios.js';

export default function EditLinks({ showEditlink, onClose, selected }) {
   // Initialize state with default values or values from 'link' if it's defined
   const [class_code, setClassCode] = useState(selected.class_code || '');
   const [class_description, setClassDescription] = useState(selected.class_description || '');
   const [instructor_name, setInstructorName] = useState(selected.instructor_name || '');
   const [url, setUrl] = useState(selected.url || '');
   const [successMessage, setSuccessMessage] = useState(null);

 // Set initial values when modal is opened
 useEffect(() => {
  if (selected) {
    setClassCode(selected.class_code || '');
    setClassDescription(selected.class_description || '');
    setInstructorName(selected.instructor_name || '');
    setUrl(selected.url || '');
  }
}, [selected]);

   
    const handleSave = async(e) => {
      e.preventDefault();
      const updatedUserLinks = {
        class_code,
        class_description, 
        instructor_name,
        url,
      };

      axiosClient
      .put(`/updatelink/${selected.id}`, updatedUserLinks)
      .then(({ data }) => {
        // Handle success, e.g., show a success message
        setSuccessMessage({
          message: 'Link Edited successfully!',
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
 
    };
  
    if (!showEditlink) {
      return null;
    }



  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full lg:w-1/2 px-4 py-6 shadow-lg rounded-lg">
        <div className="w-full px-4 mx-auto mt-6">
          <p className="block uppercase tracking-wide font-semibold text-green-800 my-3">Update Links Information</p>
          <div>
            <form>
              <div className="mb-4">
                <label htmlFor="class_code" className="block text-sm text-gray-700">
                  Class Code:
                </label>
                <input
                  id="class_code"
                  name="class_code"
                  type="text"
                  placeholder={selected.class_code}
                  value={class_code}
                  onChange={(e) => setClassCode(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="class_description" className="block text-sm text-gray-700">
                Class Description:
                </label>
                <input
                  id="class_description"
                  name="class_description"
                  placeholder={selected.class_description}
                  value={class_description}
                  onChange={(e) => setClassDescription(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="instructor_name" className="block text-sm text-gray-700">
                Instructor
                </label>
                <input
                  id="instructor_name"
                  name="instructor_name"
                  type="text"
                  placeholder={selected.instructor_name}
                  value={instructor_name}
                  onChange={(e) => setInstructorName(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="instructor_name" className="block text-sm text-gray-700">
                Link
                </label>
                <input
                  id="url"
                  name="url"
                  type="text"
                  placeholder={selected.url}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="text-center flex justify-end my-7">
              <button onClick={handleSave} className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 mr-6 rounded-full">
                  Save Changes
                </button>
                <button onClick={onClose} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                  Cancel
                </button>
              </div>
            </form>
          </div>
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
  );
}
