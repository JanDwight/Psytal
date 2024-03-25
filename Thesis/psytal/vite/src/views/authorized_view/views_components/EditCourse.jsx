import React, { useState } from 'react';
import axiosClient from '../../../axios.js';
import ReactModal from 'react-modal';
import CreatePrompt from '../prompts/CreatePrompt.jsx'
import Feedback from '../../feedback/Feedback.jsx';

export default function EditCourse({ showEditcourse, onClose, curriculum}) {
  const [class_year, setClassYear] = useState(curriculum.class_year);
  const [semester, setSemester] = useState(curriculum.semester);
  const [course_code, setCourseCode] = useState(curriculum.course_code);
  const [units, setUnits] = useState(curriculum.units);
  const [course_title, setTitle] = useState(curriculum.course_title);
  const [hoursperWeek, setHoursperWeek] = useState(curriculum.hoursperWeek);
  const [course_type, setCourseType] = useState(curriculum.course_type);
  const [preReq, setPrereq] = useState(curriculum.preReq);
  const [successMessage, setSuccessMessage] = useState('');
  const [successStatus, setSuccessStatus] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptMessage, setPromptMessage] = useState('');
  const action = "Confirm Edit Course?";

  //<><><><><>
  const editprompt = (ev) => {
    ev.preventDefault();
    const concatmessage = 'Changes to the course "' + curriculum.course_code + '-' + curriculum.course_title + '" will be saved. Do you wish to proceed?';
    setPromptMessage(concatmessage);
    setShowPrompt(true);
  }

  const handleSubmit = async() => {
    // Create an object with the updated curriculum data
    const updatedCourse = {
      // Assuming curriculumId is still the same
      class_year,
      semester,
      course_code,
      units,
      course_title,
      hoursperWeek,
      course_type,
      preReq,
    };
  
    try {
      const response = await axiosClient.put(`/updatecurriculum/${curriculum.id}`, updatedCourse);
      setSuccessMessage(response.data.message);
      setSuccessStatus(response.data.success);
    } catch (error) {

    }
  };

  if (!showEditcourse) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <Feedback isOpen={successMessage !== ''} onClose={() => setSuccessMessage('')} successMessage={successMessage} status={successStatus} refresh={false}/>

      <div className="w-[20%] h-fit bg-[#FFFFFF] rounded-3xl ring-1 ring-black shadow-2xl mt-[10%] mx-auto p-5">
        <div className="w-full px-4 mx-auto mt-6">
          <div className='flex justify-center font-bold text-4xl text-[#525252]'>
              Edit Course
          </div>
          <div>
            <form onSubmit={editprompt}>
                <div className='mt-2 flex flex-col-2 justify-between'>
                    <label htmlFor="class_year" className="block text-sm text-gray-700">
                    Year:
                    </label>
                    <input
                      id="class_year"
                      name="class_year"
                      type="text"
                      placeholder={curriculum.class_year}
                      value={class_year}
                      onChange={(e) => setClassYear(e.target.value)}
                      className="block w-[48%] rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 type=text" 
                    />

                    <label htmlFor="semester" className="block text-sm text-gray-700">
                    Semester:
                    </label>
                    <input
                      id="semester"
                      name="semester"
                      type="text"
                      placeholder={curriculum.semester}
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      className="block w-[48%] rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 type=text" 
                    />
                </div>

                <div className='mt-2 flex flex-col-2 justify-between'>
                    <label htmlFor="course_code" className="block text-sm text-gray-700">
                    Course Code:
                    </label>
                    <input
                      id="course_code"
                      name="course_code"
                      type="text"
                      placeholder={curriculum.course_code}
                      value={course_code}
                      onChange={(e) => setCourseCode(e.target.value)}
                      className="block w-[50%] rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 type=text" 
                    />
                    
                    <label htmlFor="units" className="block text-sm text-gray-700">
                    Units:
                    </label>
                    <input
                      id="units"
                      name="units"
                      type="number"
                      placeholder={curriculum.units}
                      value={units}
                      onChange={(e) => setUnits(e.target.value)}
                      className="block w-[40%] rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 type=text" 
                    />
                </div>

                <div className='mt-2 flex flex-col-1 justify-between'>
                    <label htmlFor="course_title" className="block text-sm text-gray-700">
                    Course Title:
                    </label>
                    <textarea
                      id="course_title"
                      name="course_title"
                      type="text"
                      placeholder={curriculum.course_title}
                      value={course_title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="block w-full h-[50%] rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 type=text" 
                    />
                </div>

                <div className='mt-2 flex flex-col-3 justify-between'>
                    <label htmlFor="hoursperWeek" className="block text-sm text-gray-700">
                    Hours per Week:
                    </label>
                    <input
                      id="hoursperWeek"
                      name="hoursperWeek"
                      type="number"
                      placeholder={curriculum.hoursperWeek}
                      value={hoursperWeek}
                      onChange={(e) => setHoursperWeek(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 t" 
                    />  
                </div>

                <p className="block text-sm font-bold text-gray-700">
                    Course Type: {curriculum.course_type}
                </p>
                <div className="flex justify-between mt-2">
                  <div>
                      <label className="block text-sm text-gray-700" for= "lec">Lecture</label>
                      <input
                        id="course_type"
                        name="course_type"
                        type="radio" //change to radio
                        value="Lec" 
                        // checked={curriculum.course_type === "Lec"}
                        onChange={(e) => setCourseType(e.target.value)}
                        // onChange={(e) => setCourseType({curriculum, course_type: e.target.value})}
                        // onChange={(e) => setCourseType(e.target.value)}
                        className="block rounded-md border-2 border-solid border-neutral-300" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700" for= "lab">Laboratory</label>
                      <input
                        id="course_type"
                        name="course_type"
                        type="radio" //change to radio
                        value="Lab" 
                        // checked={curriculum.course_type === "Lab"}
                        onChange={(e) => setCourseType(e.target.value)}
                        className="block rounded-md border-2 border-solid border-neutral-300" 
                      />
                  </div>
                </div>

                <div className='flex justify-between mt-2'>
                    <label htmlFor="Pre Requisite" className="block text-sm text-gray-700">
                    Pre Requisite/s:
                    </label>
                    <input
                      id="preReq"
                      name="preReq"
                      type="text"
                      placeholder={curriculum.preReq}
                      value={preReq}
                      onChange={(e) => setPrereq(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 type=text" 
                    />
                </div>
              <div className="text-center flex justify-center my-7">
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
    
  );
}