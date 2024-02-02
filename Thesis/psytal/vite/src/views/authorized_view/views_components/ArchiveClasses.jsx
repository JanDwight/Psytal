import React, { useState } from 'react';
import axiosClient from '../../../axios.js';

export default function ArchiveClasses({ showModal, onClose, subject }) {

  const [successMessage, setSuccessMessage] = useState(null);
  const handleSave = async() => {
    //Create new migration w/ the archivde field
    try {
      // send selected subject to archive controller
      //change 'class_id' with just 'id'
      const response = await axiosClient.put(`/archiveclasses/${subject.class_id}`);

      console.log('Class archived successfully.');
      console.log(response.data);
      // Handle success, e.g., show a success message
      setSuccessMessage({
        message: 'Class Deleted successfully!',
      });

      setTimeout(() => {
        setSuccessMessage(null);
        // Close the modal
        onClose();
        window.location.reload(); // Consider if you really need to reload the page
      }, 2000);

    } catch (error) {
      // Handle errors here, e.g., display an error message
      console.error('Error Deleting class:', error);
    }
  }

  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full lg:w-1/2 px-4 py-6 shadow-lg rounded-lg">
        <div className="w-full px-4 mx-auto mt-6">
          <p className="block uppercase tracking-wide font-bold text-green-800 my-3 text-center">Delete Class?</p>
          <form className="text-center">
            <br></br>
            <div className="flex items-center justify-center flex-row"> 
              <label htmlFor="subject" className="px-6 font-bold">Selected Class:</label>
              <input
                id="subject"
                type="subject"
                name="subject"
                value={subject.course_code + ' - ' + subject.course_title}
                disabled // makes field uneditable
                className="block w-1/2 rounded-md border border-gray-300 bg-gray-100 py-1.5 px-3 text-gray-700 shadow-sm focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
            </div>
            <br></br>
            <p>Deleting a class will make it uneditable and hidden from low level users. </p>
            <p>Are you sure you want to proceeed?</p>
          </form>
          <div className="flex items-center justify-center my-7 space-x-4">
            <button onClick={handleSave} className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-full">
                Delete
            </button>
            <button onClick={onClose} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                Cancel
            </button>
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