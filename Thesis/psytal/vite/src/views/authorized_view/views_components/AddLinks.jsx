import React, { useState, } from 'react';
import axiosClient from '../../../axios.js';
import Feedback from '../../feedback/Feedback.jsx';

export default function AddLinks({closeModal}) { 
  const [formData, setFormData] = useState({
    class_code: '',
    class_description: '',
    instructor_name: '',
    url: '',
    
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [successStatus, setSuccessStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
        const response = await axiosClient.post('/addlink', formData);
        setSuccessMessage(response.data.message);
        setSuccessStatus(response.data.success);

        // setTimeout(() => {
        //   setSuccessMessage(null);
        //   closeModal();
        //   window.location.reload();
        // }, 2000);
      } catch (error) {
          setSuccessMessage(error.response.data.message)
          setSuccessStatus(false)
      }
  };

  return (
    <>
      <Feedback isOpen={successMessage !== ''} onClose={() => setSuccessMessage('')} successMessage={successMessage} status={successStatus} refresh={false}/>
      <div className='flex justify-center font-bold text-4xl text-[#525252] mt-5'>Add Link</div>
    <div>
      <form onSubmit={handleSubmit}>
        <div className='mt-10 flex flex-col-2 justify-between'>
          <input
              id="class_code"
              name="class_code"
              type="text"
              placeholder='Title '
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
            placeholder='Description'
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
            placeholder='Contact'
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
    </>
    
  );
}