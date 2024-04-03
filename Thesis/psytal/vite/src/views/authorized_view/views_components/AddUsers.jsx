import React, { useState } from 'react';
import axiosClient from '../../../axios.js';
import ReactModal from 'react-modal';
import Feedback from '../../feedback/Feedback.jsx';
import CreatePrompt from '../prompts/CreatePrompt.jsx'

export default function AddUsers({ onClose}) {

  //for addusers modal
  const [last_name, setLast_name] = useState(''); // Required by AddUsers
  const [first_name, setFirst_name] = useState(''); // Required by AddUsers
  const [middle_name, setMiddle_name] = useState(''); // Required by AddUsers
  const [includeNumbers] = useState(true); // Required by AddUsers
  const [includeSymbols] = useState(true); // Required by AddUsers
  const [selectedRole, setSelectedRole] = useState('1'); // Required by AddUsers
  const [email, setEmail] = useState(''); // Required by AddUsers
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [successStatus, setSuccessStatus] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptMessage, setPromptMessage] = useState('');
  const action = "Confirm Add New User?";


  const resetForm = () => {
    setLast_name('');
    setFirst_name('');
    setMiddle_name('');
    setEmail('');
    setSelectedRole('');
    setSuccessMessage(null);
  };

  const addprompt = (ev) => {
    ev.preventDefault();
    const concatname = last_name + ', ' + first_name + ' ' + middle_name + '.';
    const concatmessage = 'A new user account with user name: "' + concatname + '" will be created. Do you wish to proceed?';
    setPromptMessage(concatmessage);
    setShowPrompt(true);
  }
  
  //add users onsubmit
  const onSubmit = async () => {
    // Password generator
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+{}[]~-';
    const length = 12;
  
    const getRandomChar = (charSet) => {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      return charSet.charAt(randomIndex);
    };
  
    let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;
  
    let password = '';
  
    // Ensure at least one of each character type
    password += getRandomChar('abcdefghijklmnopqrstuvwxyz');
    password += getRandomChar('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    password += getRandomChar('0123456789');
    password += getRandomChar('!@#$%^&*()_+{}[]~-');
  
    // Generate the rest of the password
    for (let i = 4; i < length; i++) {
      password += getRandomChar(characters);
    }
  
    //---------------------------------------------------------------------------
    const formData = {
      last_name,
      first_name,
      middle_name,
      password: password,
      role: selectedRole,
      email: email,
    };
  
    try {
      const response = await axiosClient.post('/adduser', formData);
      if (response.data.success) {
        const response2 = await axiosClient.get('/sendstudentaccountpassword', {
          params: formData,
        });
        setSuccessMessage(response2.data.message);
        setSuccessStatus(response2.data.success);
  
      } else {
        setSuccessMessage(response.data.message);
        setSuccessStatus(response.data.success);
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error here
    }
  };
  
  return (
    <>
      <Feedback isOpen={successMessage !== ''} onClose={() => setSuccessMessage('')} successMessage={successMessage} status={successStatus} refresh={false}/>

        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[250px] h-fit bg-[#FFFFFF] rounded-3xl ring-1 ring-black shadow-2xl mx-auto p-5">           
            <div className='flex justify-center font-bold text-4xl text-[#525252] mt-5'>
            Add User
            </div>
              <form onSubmit={addprompt}>
                <div className="mt-10">
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    autoComplete="last_name"
                    placeholder="Last Name"
                    required
                    onChange={ev => setLast_name(ev.target.value)}
                    className="block w-full rounded-md border-0 py-2 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder-text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-5"
                  />
                </div>
                <div className="mt-2">
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    autoComplete="first_name"
                    placeholder="First Name"
                    required
                    onChange={ev => setFirst_name(ev.target.value)}
                    className="block w-full rounded-md border-0 py-2 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder-text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-5"
                  />
                </div>
                <div className="mt-2">
                  <input
                    id="middle_name"
                    name="middle_name"
                    type="text"
                    autoComplete="middle_name"
                    placeholder="Middle Name"
                    required
                    onChange={ev => setMiddle_name(ev.target.value)}
                    className="block w-full rounded-md border-0 py-2 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder-text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-5"
                  />
                </div>
                <div className="mt-5">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="email"
                    placeholder="Email Address"
                    required
                    onChange={ev => setEmail(ev.target.value)}
                    className="block w-full rounded-md border-0 py-2 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder-text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-5"
                  />
                </div>
                <div className="mt-10 font-bold text-xl">
                  Role:
                </div>
                <select
                  className="block w-full rounded-md border-0 py-2 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:leading-5"
                  id="accounttype"
                  onChange={ev => setSelectedRole(ev.target.value)}
                >
                  <option value="1">Admin</option>
                  <option value="2">Staff</option>
                  <option hidden={true} value="3">Instructor</option>
                  <option value="4">Student</option>
                </select>
                <div className="text-center flex justify-center">
                  
                  <button type="submit" className="bg-[#0FE810]  hover:bg-lime-700 text-white font-bold py-2 px-4 mt-5 rounded-full">
                    Save
                  </button>
                  <button type="button" onClick={onClose} className="bg-[#f34450]  hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-5 ml-3 font-size">
                    Cancel
                  </button>
                </div>
              </form>
          </div>
          <ReactModal
            isOpen={showPrompt}
            onRequestClose={() => setShowPrompt(false)}
            className="md:w-[1%]"
          >
            <div>
                <CreatePrompt
                    closeModal={() => setShowPrompt(false)}
                    handleSave={onSubmit}
                    action={action}
                    promptMessage={promptMessage}
                />
            </div>
          </ReactModal>
        </div>

    </>
  );
}