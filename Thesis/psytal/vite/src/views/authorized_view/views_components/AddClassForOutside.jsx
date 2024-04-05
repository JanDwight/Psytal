import React from 'react';
import { useState, useEffect } from 'react';
import axiosClient from '../../../axios.js';
import ReactModal from 'react-modal';
import CreatePrompt from '../prompts/CreatePrompt.jsx'
import Feedback from '../../feedback/Feedback.jsx';

export default function AddClassForOutside({closeModal}) {
  const [courseTitle, setCourseTitle] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [classCode, setClassCode] = useState(''); // Define state for class code
  const [courseType, setCourseType] = useState('Lec');
  const [units, setUnits] = useState('');
  const [semester, setSemester] = useState('1st');
  const [year, setYear] = useState('1');
  const [section, setSection] = useState('');
  const [instructorName, setInstructor] = useState(''); // Define state for instructor

  const [successMessage, setSuccessMessage] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptMessage, setPromptMessage] = useState('');
  const action = "Confirm Add New Class?";

  const [successStatus, setSuccessStatus] = useState('');

  //<><><><><><>
  const addprompt = (ev) => {
    ev.preventDefault();
    const concatmessage = 'A new class for the subject: "' + courseTitle + '" will be created. Do you wish to proceed?';
    setPromptMessage(concatmessage);
    setShowPrompt(true);
  }

  const handleSubmit = () => {

      // Create a formData object and send it using axios
      const formData = {
        course_title: courseTitle,
        course_code: courseCode,
        course_type: courseType,
        units: units,
        semester: semester,
        class_year: year,
        //course_id: selected_subject,
        class_section: section,
        class_code: classCode,
        instructor_name: instructorName,
      };
      
  
    axiosClient.post('/addclass', formData)
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
  
  return (
    <> 
      <Feedback isOpen={successMessage !== ''} onClose={() => setSuccessMessage('')} successMessage={successMessage} status={successStatus} refresh={false}/>
       <div>
        {/*For creating sections 1 class = 2 or more sections * 2 if there is both lec and lab 
        meaning one subject can potentially have 4 classes minimum*/}
        <div className='flex text-center font-bold text-4xl text-[#525252] mt-1'>
          Create New Outside Class
        </div>
        
        {/*----------*/}
        <div className='w-full'>
          <form onSubmit={addprompt} className='flex flex-col justify-center'>
            <div className="mt-5 flex flex-col-2 justify-between">
            <label htmlFor="course_title" className="block text-sm text-gray-700">
              Class Title:
            </label>
              <input
                id="course_title"
                name="course_title"
                placeholder='Course Title'
                onChange={(e) => setCourseTitle(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 text-center font-bold mt-2 mb-2">
                Class Details
              </label>
            </div>
            <div className="mt-2 flex flex-col-2 justify-between">
            <label htmlFor="class_code" className="block text-sm text-gray-700">
              Class Code:
            </label>
            <input
                id="class_code"
                type="text"
                name="class_code"
                placeholder='Class Code'
                onChange={(e) => setClassCode(e.target.value)}
                className="block w-[49%] rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 type=text" 
                required
            />
              <label htmlFor="course_code" className="block text-sm text-gray-700">
              Course Code:
            </label>
            <input
                id="course_code"
                type="text"
                name="course_code"
                placeholder='Course Code'
                onChange={(e) => setCourseCode(e.target.value)}
                className="block w-[49%] rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 type=text" 
                required
            />
            </div>
            <div className="mt-5 flex flex-col-2 justify-between">
              <label htmlFor="course_type" className="mx-1 block text-sm text-gray-700">
                Type:
              </label>
              <select
                id="course_type"
                name="course_type"
                onChange={(e) => setCourseType(e.target.value)}
                className="block w-[49%] rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              >
                <option value="Lec">Lecture</option>
                <option value="Lab">Laboratory</option>
              </select>
              <label htmlFor="units" className="block text-sm text-gray-700 px-2">
                Units:
              </label>
              <input
                id="units"
                type="number"
                name="units"
                placeholder='Units'
                pattern="[0-9]"
                onChange={(e) => {
                    const inputValue = e.target.value;
                    if (inputValue.length > 1) {
                        e.target.value = inputValue.slice(0, 1); // Keep only the first digit
                    }
                    const stringValue = e.target.value.toString(); // Convert number to string
                    setUnits(stringValue);
                }}
                className="block w-[49%] rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 type=text"
                required
              />
            </div>
            <div className="mt-3 flex justify-center">
              <label htmlFor="semester" className="block text-sm text-gray-700 px-2">
                Semester:
              </label>
              <select
                id="semester"
                name="semester"
                onChange={(e) => setSemester(e.target.value)}
                className="block w-[49%] rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              >
                <option value="1st">1st</option>
                <option value="2nd">2nd</option>
                <option value="Midyear">Midyear</option>
              </select>
                <label htmlFor="yrlvl" className="block text-sm text-gray-700 px-2">
                  Year:
                </label>
                <select
                  id="yrlvl"
                  name="yrlvl"
                  onChange={(e) => setYear(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                >
                  <option value="1st">1st</option>
                  <option value="2nd">2nd</option>
                  <option value="3rd">3rd</option>
                  <option value="4th">4th</option>
                </select>
            </div>
            <div className="mt-5 flex flex-col-2 justify-between">
              <label htmlFor="instructor" className="block text-sm text-gray-700 px-2">
                Instructor:
              </label>
                <input
                    id="instructor"
                    name="instructor"
                    type="text"
                    placeholder='Teacher X'
                    onChange={(e) => setInstructor(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    required
                  />
            
                <label htmlFor="section" className="block text-sm text-gray-700 px-2">
                  Section:
                </label>
                  <input
                    id="section"
                    name="section"
                    type="text"
                    maxLength={1}
                    placeholder='Section'
                    onChange={(e) => setSection(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 type=text" 
                  />
            </div>
            <div className="text-center flex justify-center">
                <button type="submit" className="bg-[#0FE810]  hover:bg-lime-700 text-white font-bold py-2 px-4 mt-5 rounded-full">
                  Save
                </button>
                <button onClick={closeModal} className="bg-[#f34450]  hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-5 ml-3 font-size">
                  Cancel
                </button>
            </div>
          </form>
        </div>
        {/*----------*/}
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