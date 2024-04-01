import React, { useState } from 'react';
import axiosClient from '../../../axios.js';
import ReactModal from 'react-modal';
import CreatePrompt from '../prompts/CreatePrompt.jsx'
import Feedback from '../../feedback/Feedback.jsx';

export default function AddCourse({closeModal}) {

  const [showPrompt, setShowPrompt] = useState(false);
  const [promptMessage, setPromptMessage] = useState('');
  const action = "Confirm Add New Course?";

  const [formData, setFormData] = useState({
    class_year: '',
    semester: '',
    course_code: '',
    units: '',
    course_title: '',
    hoursperWeek: '',
    course_type: '',
    preReq: '',
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
    const concatmessage = 'A new course with the course title: "' + formData['course_title'] + '" will be created. Do you wish to proceed?';
    setPromptMessage(concatmessage);
    setShowPrompt(true);
  }

  const handleSubmit = async () => {
        try {
          const response = await axiosClient.post('/addcurriculum', formData);
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
        <div className='flex justify-center font-bold text-4xl text-[#525252]'>
        Add Course
        </div>
        <div>
            <form onSubmit={addprompt}>
                <div className='mt-2 flex flex-col-2 justify-between'>
                  <label htmlFor="class_year" className="block text-sm text-gray-700 px-2">
                    Year:
                  </label>
                    <input
                      id="class_year"
                      name="class_year"
                      type="text"
                      placeholder='(eg. 1st)'
                      value={formData.class_year}
                      required
                      onChange={handleChange}
                      className="block w-[48%] rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 type=text" 
                    />
                  <label htmlFor="semester" className="block text-sm text-gray-700 px-2">
                    Semester:
                  </label>
                    <input
                      id="semester"
                      name="semester"
                      type="text"
                      placeholder='(eg. 1st)'
                      value={formData.semester}
                      required
                      onChange={handleChange}
                      className="block w-[48%] rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 type=text" 
                    />
                </div>

                <div className='mt-2 flex flex-col-2 justify-between'>
                  <label htmlFor="course_code" className="block text-sm text-gray-700 px-2">
                    Course Code:
                  </label>
                    <input
                      id="course_code"
                      name="course_code"
                      type="text"
                      placeholder='(eg. NSTP1)'
                      value={formData.course_code}
                      required
                      onChange={handleChange}
                      className="block w-[50%] rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 type=text" 
                    />
                  <label htmlFor="units" className="block text-sm text-gray-700 px-2">
                    Units:
                  </label>
                    <input
                      id="units"
                      name="units"
                      type="number"
                      min="0"
                      placeholder='(eg. 3)'
                      value={formData.units}
                      required
                      onChange={handleChange}
                      className="block w-[40%] rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 type=text" 
                    />
                </div>

                <div className='mt-2 flex flex-col-1 justify-between'>
                  <label htmlFor="course_title" className="block text-sm text-gray-700 px-2">
                    Course Title:
                  </label>
                    <textarea
                      id="course_title"
                      name="course_title"
                      type="text"
                      placeholder='(eg. NSTP-edit)'
                      value={formData.course_title}
                      required
                      onChange={handleChange}
                      className="block w-full h-[50%] rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 type=text" 
                    />
                </div>

                <div className='mt-2 flex flex-col-3 justify-between'>
                  <label htmlFor="hoursperweek" className="block text-sm text-gray-700 px-2">
                    Hours per Week:
                  </label>
                    <input
                      id="hoursperWeek"
                      name="hoursperWeek"
                      type="number"
                      min="0"
                      placeholder='(eg. 4)'
                      value={formData.hoursperWeek}
                      required
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 t" 
                    />
                   
                </div>
                <div className="mt-3 flex flex-col">
                  <label htmlFor="course_type" className="block text-sm font-semibold text-gray-700 px-2">
                    <b>Course Type:</b>
                  </label>
                    <div className=" flex flex-row ml-2" required>
                      <input
                        id="course_type_lec"
                        name="course_type"
                        type="radio" //change to radio
                        value="Lec"
                        onChange={handleChange}
                        required
                        className="block rounded-full border-2 border-solid border-neutral-300 mt-1" 
                      />
                      <label for= "Lec" className="block text-sm text-gray-700 ml-1">Lecture</label>

                      <input
                        id="course_type_lab"
                        name="course_type"
                        type="radio" //change to radio
                        value="Lab"
                        onChange={handleChange}
                        required
                        className="block rounded-full border-2 border-solid border-neutral-300 ml-2 mt-1" 
                      />
                      <label for= "Lab" className="block text-sm text-gray-700 ml-1">Laboratory</label>
                    </div>  
                      
                  
                </div>

                <div className='flex justify-between mt-3'>
                  <label htmlFor="preReq" className="block text-sm text-gray-700 px-2">
                    Pre Requisite/s:
                  </label>
                    <input
                      id="preReq"
                      name="preReq"
                      type="text"
                      placeholder='(eg. none)'
                      value={formData.preReq}
                      required
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 type=text" 
                    />
                </div>

                <div className="text-center flex justify-center my-7">
                    <button type="submit" className="bg-[#0FE810] hover:bg-lime-700 text-white font-bold py-2 px-4 mr-6 rounded-full">
                         Save
                    </button>

                    <button onClick={closeModal} className="bg-[#f34450] hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
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
    </>
  )
}