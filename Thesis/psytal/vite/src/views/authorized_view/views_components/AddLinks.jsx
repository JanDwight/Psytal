import React, { useState, } from 'react';
import axiosClient from '../../../axios.js';
import ReactModal from 'react-modal';
import CreatePrompt from '../prompts/CreatePrompt.jsx'
import Feedback from '../../feedback/Feedback.jsx';

export default function AddLinks({closeModal}) { 

  const [showPrompt, setShowPrompt] = useState(false);
  const [promptMessage, setPromptMessage] = useState('');
  const action = "Confirm Add New Link?";

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

  //<><><><><><>
  const addprompt = (ev) => {
    ev.preventDefault();
    //const concatname = last_name + ', ' + first_name + ' ' + middle_name + '.';
    const concatmessage = 'A new link with the title: "' + formData['class_code'] + '" will be created. Do you wish to proceed?';
    setPromptMessage(concatmessage);
    setShowPrompt(true);
  }

  const handleSubmit = async () => {
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
      <form onSubmit={addprompt}>
      <div className='mt-2'>
      <label htmlFor="class_code" className="text-lg font-bold mb-2">Title</label>
        <div className='flex flex-col-2 justify-between'>
          
          <input
              id="class_code"
              name="class_code"
              type="text"
              placeholder='Title '
              value={formData.class_code}
              required
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 type=text"  
          />       
          </div>
        </div>
        <div className='mt-2'>
        <label htmlFor="class_code" className="text-lg font-bold mb-2">Description</label>
          <textarea
            id="class_description"
            name="class_description"
            type="text"
            placeholder='Description'
            value={formData.class_description}
            required
            onChange={handleChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 type=text" 
          />
        </div>
        
        <div className='mt-2'>
        <label htmlFor="class_code" className="text-lg font-bold mb-2">Contact</label>
          <input
            id="instructor_name"
            name="instructor_name"
            type="text"
            placeholder='Contact'
            value={formData.instructor_name}
            required
            onChange={handleChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 type=text" 
          />
          
        </div><div className='mt-2'>
        <label htmlFor="class_code" className="text-lg font-bold mb-2">Link</label>
          <input
            id="url"
            name="url"
            type="text"
            placeholder='Link'
            value={formData.url}
            required
            onChange={handleChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 type=text" 
          />
           
        </div>
        {/* ... your Archive form inputs ... */}

        
     
        {/* ... your form inputs ... */}
        <div className="text-center flex justify-center my-7">
            <button type="submit" className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 mr-6 rounded-full">
                Save
            </button>

            <button onClick={closeModal} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
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
                    handleSave={handleSubmit}
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
    </>
    
  );
}