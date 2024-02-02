import React, { useState } from 'react';
import axiosClient from '../../../axios.js';

export default function AddCourse({closeModal}) {
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
    axiosClient.post('/addcurriculum', formData)
      .then(response => {
        // Handle success, e.g., show a success message
        console.log(response.data);
        

          setSuccessMessage({
            message: 'The COURSE was added successfully!',
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
        <div className='flex justify-center font-bold text-4xl text-[#525252]'>
        Add Course
        </div>
        <div>
            <form onSubmit={handleSubmit}>
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
                      onChange={handleChange}
                      className="block w-[48%] rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 type=text" 
                    />
                </div>

                <div className='mt-2 flex flex-col-2 justify-between'>
                  <label htmlFor="course_code" className="block text-sm text-gray-700 px-2">
                    Course:
                  </label>
                    <input
                      id="course_code"
                      name="course_code"
                      type="text"
                      placeholder='(eg. NSTP1)'
                      value={formData.course_code}
                      onChange={handleChange}
                      className="block w-[50%] rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 type=text" 
                    />
                  <label htmlFor="units" className="block text-sm text-gray-700 px-2">
                    Units:
                  </label>
                    <input
                      id="units"
                      name="units"
                      type="text"
                      placeholder='(eg. 3)'
                      value={formData.units}
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
                      type="text"
                      placeholder='(eg. 4)'
                      value={formData.hoursperWeek}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 t" 
                    />
                   
                </div>
                <div className="mt-3 flex flex-col">
                  <label htmlFor="course_type" className="block text-sm font-semibold text-gray-700 px-2">
                    Course Type:
                  </label>
                    <div className=" flex flex-row ml-10">
                      <input
                        id="course_type"
                        name="course_type"
                        type="radio" //change to radio
                        value="Lec"
                        onChange={handleChange}
                        className="block rounded-full border-2 border-solid border-neutral-300" 
                      />
                      <label for= "Lec" className="block text-sm text-gray-700 px-2">Lecture</label>
                    
                    
                      
                      <input
                        id="course_type"
                        name="course_type"
                        type="radio" //change to radio
                        value="Lab"
                        onChange={handleChange}
                        className="block rounded-full border-2 border-solid border-neutral-300 ml-2" 
                      />
                      <label for= "Lab" className="block text-sm text-gray-700 px-2">Laboratory</label>
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
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 type=text" 
                    />
                </div>

                <div className="text-center flex justify-center my-7">
                    <button type="submit" className="bg-[#0FE810] hover:bg-lime-700 text-white font-bold py-2 px-4 mr-6 rounded-full">
                         Add
                    </button>

                    <button onClick={closeModal} className="bg-[#f34450] hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
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
  )
}