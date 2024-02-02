import React, { useState } from 'react';
import axiosClient from '../../../axios.js';
import ReactModal from 'react-modal';
//good for now

export default function AddUsers({ showModal, onClose}) {

  //for addusers modal
  const [fullName, setFullName] = useState(''); // Required by AddUsers
  const [includeNumbers] = useState(true); // Required by AddUsers
  const [includeSymbols] = useState(true); // Required by AddUsers
  const [selectedRole, setSelectedRole] = useState('1'); // Required by AddUsers
  const [email, setEmail] = useState(''); // Required by AddUsers
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setSelectedRole('');
    setSuccessMessage(null);
  };
  
  //add users onsubmit
  const onSubmit = (ev) => {
    ev.preventDefault();
    setError('Error Detected');

    //password generator
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
    console.log('P-word:', password);
    console.log('Name:', fullName);
    console.log('Role:', selectedRole);
    console.log('Email:', email);

    const formData = {
      name: fullName,//these are errors
      password: password,
      role: selectedRole,//'selectedRole',//these are errors
      email: email,//these are errors
      
    };

    axiosClient
      .post('/adduser', formData) // Back end, needs edit
      .then((response) => {
        console.log('Success:', response.data);
        //reset feilds
        resetForm();

        setSuccessMessage({
          message: 'The USER was added successfully!',
        });

        setTimeout(() => {
          setSuccessMessage(null);
          resetForm();
          onClose();
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
        setError({
          message: 'This user cannot be added, double check the email domain if it is applicable',
          
      });
      setTimeout(() => {
        resetForm();
        onClose();
        window.location.reload();
      }, 2000);

      });

      axiosClient
    .get('/sendstudentaccountpassword', {
      params: formData
    })
      .then(({ data }) => {
      console.log('this is form sendemails' + data);
      })

    .catch(( error ) => {
      if (error.response) {
        const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum,...next], [])
        setError({__html: finalErrors.join('<br>')})
      }
        console.error(error)
    });
  };  

  

  // const handleCloseModal = () => {
  //   // Reset input field values when the modal is closed
  //   resetForm();
  //   onClose();
  // };

  return (
    <>
    <ReactModal
      appElement={document.getElementById('root')}
      isOpen={showModal}
      onRequestClose={onClose}
      className="w-[20%] h-fit mt-[10%] mx-auto" //it just works don't question
    >
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[20%] h-fit bg-[#FFFFFF] rounded-3xl ring-1 ring-black shadow-2xl mx-auto p-5">           
        <div className='flex justify-center font-bold text-4xl text-[#525252] mt-5'>
        Add User
        </div>
          <form onSubmit={onSubmit}>
            <div className="mt-10">
              <input
                id="fullname"
                name="fullname"
                type="text"
                autoComplete="fullname"
                placeholder="Last Name, First Name, M.I."
                required
                onChange={ev => setFullName(ev.target.value)}
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
              <option value="3">Instructor</option>
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
       {error && (
        <div className="fixed top-0 left-0 w-full h-full overflow-y-auto bg-black bg-opacity-50">
          <div className="lg:w-1/2 px-4 py-1 shadow-lg w-[20%] h-fit bg-[#FFFFFF] rounded-xl mt-[10%] mx-auto p-5">
            <div className="w-full px-4 mx-auto mt-6">
              <div className="text-center text-xl text-green-600 font-semibold my-3">
                {error.message}
              </div>
            </div>
          </div>
        </div>
      )}
    </ReactModal>
    </>
  );
}