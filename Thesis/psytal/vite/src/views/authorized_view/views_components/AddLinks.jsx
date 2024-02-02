import React, { useState, } from 'react';
import axiosClient from '../../../axios.js';

export default function AddLinks({closeModal}) { 
  const [formData, setFormData] = useState({
    class_code: '',
    class_description: '',
    instructor_name: '',
    url: '',
    
  });

  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted!');  // Add this line
    // Make a POST request to your backend endpoint (/addlink)
    axiosClient.post('/addlink', formData)
      .then(response => {
        // Handle success, e.g., show a success message
        console.log(response.data);
        

        setSuccessMessage({
          message: 'The LINK was added successfully!',
        });

        setTimeout(() => {
          setSuccessMessage(null);
          closeModal();
          window.location.reload();
        }, 2000);
      })
      .catch(error => {
        // Handle errors, including validation errors
        if (error.response.status === 422) {
          console.log(error.response.data.errors);
        } else {
          console.error(error.response.data);
        }
      });
  };

  return (
    <>
      {/* ... your JSX ... */}
      <div className='flex justify-center font-bold text-4xl text-[#525252] mt-5'>Add Link</div>
    <div>
      <form onSubmit={handleSubmit}>
        <div className='mt-10 flex flex-col-2 justify-between'>
          <input
              id="class_code"
              name="class_code"
              type="text"
              placeholder='Class Code'
              value={formData.class_code}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 type=text" 
          />         
        </div>
        <div className='mt-5'>
          <textarea
            id="class_description"
            name="class_description"
            type="text"
            placeholder='Class Description'
            value={formData.class_description}
            onChange={handleChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 type=text" 
          />
        </div>
        <div className='mt-5'>
          <input
            id="instructor_name"
            name="instructor_name"
            type="text"
            placeholder='Instructor'
            value={formData.instructor_name}
            onChange={handleChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 type=text" 
          />
        </div><div className='mt-5'>
          <input
            id="url"
            name="url"
            type="text"
            placeholder='Link'
            value={formData.url}
            onChange={handleChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 type=text" 
          />
           
        </div>
        {/* ... your Archive form inputs ... */}

        
     
        {/* ... your form inputs ... */}
        <div className="text-center flex justify-center my-7">
            <button type="submit" className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 mr-6 rounded-full">
                Add
            </button>

            <button onClick={closeModal} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                Cancel
            </button>
        </div>
          </form>
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
    </>
    
  );
}