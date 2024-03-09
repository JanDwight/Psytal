import React, { useState } from 'react';
import axiosClient from '../../../axios.js';
import ReactModal from 'react-modal';
import StudentGrades from './Manageusers/StudentGrades.jsx';

export default function EditUsers({ showModal, onClose, user }) {
  const [user_id, setUserid] = useState(user.user_id);
  const [id, setid] = useState(user.student_school_id);
  const [name, setName] = useState(user.full_name);
  const [yr, setYr] = useState(user.yrsection);
  const [email, setEmail] = useState(user.email);
  const [successMessage, setSuccessMessage] = useState(null);
  const [lastedit, setLastedit] = useState(user.updated_at);

  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);
  
  const handleSave = async(e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const updatedUser = {
      user_id,
      id,
      name,
      //used to be role
      yr,
      email,
      lastedit,
    };

     //update here should be on student_profile
    try {
      const response = await axiosClient.put(`/updatestudentprofile/${user.user_id}`, updatedUser);
      // Handle success, e.g., show a success message
      setSuccessMessage({
        message: 'Account Updated successfully!',
      });

      setTimeout(() => {
        setSuccessMessage(null);
        // Close the modal
        onClose();
        window.location.reload(); // Consider if you really need to reload the page
      }, 2000);

    } catch (error) {
      // Handle errors here, e.g., display an error message
      console.error('Error Updating Account:', error);
    }
  };

  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full lg:w-1/2 px-4 py-6 shadow-lg rounded-lg">
        <div className="w-full px-4 mx-auto mt-6">
          <p className="block uppercase tracking-wide font-semibold text-green-800 my-3">Update Account Information of: {name}</p>
          <div>
            <form>
            <div className="mb-4">
                <label htmlFor="id" className="block text-sm text-gray-700">
                  School ID:
                </label>
                <input
                  id="id"
                  name="id"
                  type="number"
                  value={id}
                  //disabled //makes field uneditable
                  onChange={(e) => setid(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm text-gray-700">
                  Name:
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="yr" className="block text-sm text-gray-700">
                  Year and Section:
                </label>
                <input
                  //used to be role
                  id="yr"
                  name="yr"
                  defaultValue={yr}
                  onChange={(e) => setYr(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm text-gray-700">
                  Email:
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="lastedit" className="block text-sm text-gray-700">
                  Last Update:
                </label>
                <input
                  id="lastedit"
                  name="lastedit"
                  type="text"
                  value={lastedit}
                  onChange={(e) => setLastedit(e.target.value)}
                  disabled //makes field uneditable
                  className="block w-full rounded-md border border-gray-300 bg-gray-100 py-1.5 px-3 text-gray-700 shadow-sm focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  //old css: block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6
                />
              </div>
            <div className='text-center flex justify-end my-7'>
                <button onClick={handleSave} className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 mr-6 rounded-full">
                  Save Changes
                </button>
                <button onClick={onClose} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                  Cancel
                </button>
            </div>
            </form>

            <div className='text-center flex justify-end '>
              <button onClick={() => setIsGradeModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-6 rounded-full">
                    Grades
              </button>
            </div>
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

      <ReactModal
        isOpen={isGradeModalOpen}
        onRequestClose={()=> setIsGradeModalOpen(false)}
        className="w-full lg:w-8/12 px-4 container h-fit bg-white rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5 ">
        <div className='relative flex flex-col min-w-0 break-words w-full mt-3'>
          <StudentGrades 
            showModal={isGradeModalOpen}
            onClose={()=> setIsGradeModalOpen(false)}
            selectedStudent={user}
          />
        </div>
      </ReactModal>

    </div>
  );
}