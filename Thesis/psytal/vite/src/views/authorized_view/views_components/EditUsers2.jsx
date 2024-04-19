import React, { useState } from 'react';
import axiosClient from '../../../axios.js';
import ReactModal from 'react-modal';
import CreatePrompt from '../prompts/CreatePrompt.jsx'

export default function EditUsers({ showModal, onClose, user }) {
  const [user_id, setUserid] = useState(user.user_id);
  const [id, setid] = useState(user.employee_id);
  const [name, setName] = useState(user.full_name);
  const [username, setUsername] = useState(user.username);
  const [role, setRole] = useState(user.role);
  const [email, setEmail] = useState(user.email_address);
  const [successMessage, setSuccessMessage] = useState(null);
  const [lastedit, setLastedit] = useState(user.updated_at);
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptMessage, setPromptMessage] = useState('');
  const action = "Confirm Edit Employee Account?";

  //<><><><><>
  const editprompt = (ev) => {
    ev.preventDefault();
    const concatmessage = 'Changes to the user account of "' + user.full_name + '" will be saved. Do you wish to proceed?';
    setPromptMessage(concatmessage);
    setShowPrompt(true);
  }

  const handleSave = async() => {
    const updatedUser = {
      user_id,
      id,
      name,
      username,
      role,
      email,
      lastedit,
    };

    //update here should be on employee_profile
    try {
      const response = await axiosClient.put(`/updateemployeeprofile/${user.user_id}`, updatedUser);
      // Handle success, e.g., show a success message
      setSuccessMessage({
        message: 'Account Updated successfully!',
      });

      setTimeout(() => {
        setSuccessMessage(null);
        // Close the modal
        onClose();
        //window.location.reload(); // Consider if you really need to reload the page
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
          <p className="block uppercase tracking-wide font-semibold text-green-800 my-3">Update Account Information</p>
          <div>
            <form onSubmit={editprompt}>
            <div className="mb-4">
                <label htmlFor="id" className="block text-sm text-gray-700">
                  Employee ID:
                </label>
                <input
                  id="id"
                  name="id"
                  type="number"
                  value={id}
                  //disabled //makes field uneditable
                  onChange={(e) => setid(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 bg-gray-100 py-1.5 px-3 text-gray-700 shadow-sm focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
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
                <label htmlFor="username" className="block text-sm text-gray-700">
                  Username:
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="role" className="block text-sm text-gray-700">
                  Role:
                </label>
                <select
                  id="role"
                  name="role"
                  defaultValue={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                >
                  <option value="1">Admin</option>
                  <option value="2">Staff</option>
                  <option hidden={true} value="3">Instructor</option>
                  <option hidden={true} value="4">Student</option>
                </select>
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
              <div hidden={true} className="mb-4">
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
              <div className="text-center flex justify-end my-7">
              <button type="submit" className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 mr-6 rounded-full">
                  Update
                </button>
                <button onClick={onClose} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ReactModal
            isOpen={showPrompt}
            onRequestClose={() => setShowPrompt(false)}
            className="md:w-[1%]"
          >
            <div>
                <CreatePrompt
                    closeModal={() => setShowPrompt(false)}
                    handleSave={handleSave}
                    action={action}
                    promptMessage={promptMessage}
                />
            </div>
      </ReactModal>
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
    // ... (rest of your component code)
  );
}