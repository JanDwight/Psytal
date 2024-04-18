import React, { useEffect, useState } from 'react';
import axiosClient from '../../../axios.js';
import ReactModal from 'react-modal';
import CreatePrompt from '../prompts/CreatePrompt.jsx'
import Feedback from '../../feedback/Feedback.jsx';

export default function EditClasses({ showModal, onClose, subject, onSave}) {
  const course_title = subject.course_title;
  const course_code = subject.course_code;
  const class_code_old = subject.class_code;
  const section_old = subject.class_section;
  const instructor_old = subject.instructor_name;
  const class_schedule_old = subject.class_schedule;

  const [instructor_name, setInstructor] = useState(instructor_old);
  const [class_section, setClass_Section] = useState(section_old);
  const [class_section_error, setSectionError] = useState(''); 
  const [class_code, setClass_Code] = useState(class_code_old);
  const [class_schedule, setClassSchedule] = useState(class_schedule_old);
  const [successMessage, setSuccessMessage] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptMessage, setPromptMessage] = useState('');
  const action = "Confirm Edit Class?";
  
  const [successStatus, setSuccessStatus] = useState('');

  //<><><><><>
  const editprompt = (ev) => {
    ev.preventDefault();
    const concatmessage = 'Changes to the class "' + course_code + '-' + course_title + '" will be saved. Do you wish to proceed?';
    setPromptMessage(concatmessage);
    setShowPrompt(true);
  }

  const handleSubmit = async() => {
    // Create an object with the updated class data
    
    if (!validateYearSection(class_section)) {
      setSectionError('Section should be a Letter (ex.A).');
      return;
    } else {
      setSectionError('');
    }

    const updatedClass = {
      // Assuming classId is still the same
      instructor_name,
      class_section: class_section,
      class_code,
      class_schedule: class_schedule
    };
  
    axiosClient
      .put(`/updateclasses/${subject.class_id}`, updatedClass)
      .then((response) => {
         // Handle a successful response here
         console.log('Data sent successfully:', response.data);

         // Close the modal or perform any other action as needed
         setSuccessMessage(response.data.message);
         setSuccessStatus(response.data.success);
 
       })
       .catch((error) => {
         setSuccessMessage(error.response.data.message)
         setSuccessStatus(false)
       });
   };

  if (!showModal) {
    return null;
  }

  const validateYearSection = (class_section) => {
    return /^[A-Za-z]$/.test(class_section);
  };

  return (
    <> 
      <Feedback isOpen={successMessage !== ''} onClose={() => setSuccessMessage('')} successMessage={successMessage} status={successStatus} refresh={false}/>
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full lg:w-1/2 px-4 py-6 shadow-lg rounded-lg">
        <div className="w-full px-4 mx-auto mt-6">
          <p className="block uppercase tracking-wide font-semibold text-green-800 my-3">Assign Class Information</p>
          <div>
            <form onSubmit={editprompt} >
            <div className="mb-4">
                <label htmlFor="class" className="block text-sm text-gray-700">
                  Course Title:
                </label>
                <input
                  id="class"
                  name="class"
                  type="text"
                  value={course_code + ' - ' +course_title}
                  disabled //makes field uneditable
                  className="block w-full rounded-md border border-gray-300 bg-gray-100 py-1.5 px-3 text-gray-700 shadow-sm focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="c_code" className="block text-sm text-gray-700">
                  Class Code:
                </label>
                <input
                  id="c_code"
                  name="c_code"
                  type="text"
                  placeholder={class_code_old}
                  //value={class_code_old}
                  onChange={(ev) => setClass_Code(ev.target.value.toUpperCase())}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  //required
                />
              </div>
             {/*User Input*/}
              <div className="mb-4">
                <label htmlFor="instructor" className="block text-sm text-gray-700">
                  Instructor:
                </label>
                <input
                  id="instructor"
                  name="instructor"
                  type="text"
                  placeholder={instructor_old}
                  onChange={(e) => setInstructor(e.target.value)}
                  //required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="mb-4 flex space-x-2">
                <div className='block w-full'>
                  <label htmlFor="section" className="block text-sm text-gray-700">
                    Section:
                  </label>
                  <input
                        id="section"
                        name="section"
                        type="text"
                        maxLength={1}
                        placeholder={section_old}
                        //required
                        onChange={(ev) => setClass_Section(ev.target.value.toUpperCase())}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                        /*onChange={(e) => {
                          const value = e.target.value.toUpperCase();
                          setClass_Section(value);
                        }}
                        className={`block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 ${
                          class_section_error ? 'border-red-500' : ''
                        }`}*/
                      />
                      {class_section_error && (
                        <p className="text-red-500 text-sm mt-1">{class_section_error}</p>
                      )}
                </div>
                <div className='block w-full'> 
                <label htmlFor="sched" className="block text-sm text-gray-700">
                    Schedule:
                  </label>
                  <input
                        id="sched"
                        name="sched"
                        type="text"
                        placeholder={class_schedule_old}
                        onChange={(e) => setClassSchedule(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
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
                    handleSave={handleSubmit}
                    action={action}
                    promptMessage={promptMessage}
                />
            </div>
      </ReactModal>

    </div>
    
  
</>
  )
}